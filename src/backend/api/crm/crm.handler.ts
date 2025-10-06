/**
 * CRM Integration API Handler
 * Handles CRM integration endpoints (HubSpot, Salesforce, Pipedrive, etc.)
 */

import { NextRequest } from 'next/server';
import prisma from '../../lib/prisma';
import { handlePrismaError } from '../../utils/database.utils';
import {
  successResponse,
  errorResponse,
  createdResponse,
} from '../../utils/response.utils';

// CRM Configuration types
type CRMProvider = 'hubspot' | 'salesforce' | 'pipedrive' | 'custom';

interface CRMConfig {
  provider: CRMProvider;
  apiKey?: string;
  apiUrl?: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * POST /api/crm/sync/contact/:id
 * Sync contact to CRM
 */
export async function handleSyncContactToCRM(id: string, req: NextRequest) {
  try {
    const body = await req.json();
    const { provider, createDeal, dealValue, dealStage } = body;

    // Get contact
    const contact = await prisma.contact.findUnique({
      where: { id },
    });

    if (!contact) {
      return errorResponse('Contact not found', 404, 'NOT_FOUND');
    }

    // Check if already synced
    if (contact.crmId) {
      return errorResponse('Contact already synced to CRM', 409, 'ALREADY_SYNCED');
    }

    // Sync based on provider
    let crmId: string;
    let syncResult: any;

    switch (provider) {
      case 'hubspot':
        syncResult = await syncToHubSpot(contact);
        crmId = syncResult.id;
        break;
      case 'salesforce':
        syncResult = await syncToSalesforce(contact);
        crmId = syncResult.id;
        break;
      case 'pipedrive':
        syncResult = await syncToPipedrive(contact);
        crmId = syncResult.id;
        break;
      default:
        return errorResponse('Unsupported CRM provider', 400, 'INVALID_PROVIDER');
    }

    // Update contact with CRM ID
    const updated = await prisma.contact.update({
      where: { id },
      data: {
        crmId,
        crmSyncedAt: new Date(),
      },
    });

    // Create activity log
    await prisma.contactActivity.create({
      data: {
        contactId: id,
        type: 'NOTE_ADDED',
        description: `Contact synced to ${provider}`,
        metadata: {
          provider,
          crmId,
          syncedAt: new Date().toISOString(),
        },
      },
    });

    // Create deal if requested
    if (createDeal) {
      await createCRMDeal(provider, crmId, {
        name: `${contact.name} - ${contact.serviceType || 'General'}`,
        value: dealValue,
        stage: dealStage,
        contactId: crmId,
      });
    }

    return successResponse({
      message: 'Contact synced to CRM successfully',
      crmId,
      provider,
    });
  } catch (error: any) {
    console.error('CRM sync error:', error);
    return errorResponse(error.message || 'Failed to sync to CRM', 500);
  }
}

/**
 * POST /api/crm/webhook/:provider
 * Handle CRM webhooks (for bi-directional sync)
 */
export async function handleCRMWebhook(provider: CRMProvider, req: NextRequest) {
  try {
    const body = await req.json();

    // Verify webhook signature based on provider
    const isValid = await verifyCRMWebhook(provider, req, body);
    if (!isValid) {
      return errorResponse('Invalid webhook signature', 401, 'INVALID_SIGNATURE');
    }

    // Process webhook based on event type
    const eventType = getWebhookEventType(provider, body);

    switch (eventType) {
      case 'contact.updated':
        await handleContactUpdated(provider, body);
        break;
      case 'deal.created':
        await handleDealCreated(provider, body);
        break;
      case 'deal.updated':
        await handleDealUpdated(provider, body);
        break;
      default:
        console.log('Unhandled webhook event:', eventType);
    }

    return successResponse({ message: 'Webhook processed' });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return errorResponse(error.message || 'Webhook processing failed', 500);
  }
}

/**
 * GET /api/crm/status/:id
 * Get CRM sync status for a contact
 */
export async function handleGetCRMStatus(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
      select: {
        crmId: true,
        crmSyncedAt: true,
      },
    });

    if (!contact) {
      return errorResponse('Contact not found', 404, 'NOT_FOUND');
    }

    return successResponse({
      synced: !!contact.crmId,
      crmId: contact.crmId,
      syncedAt: contact.crmSyncedAt,
    });
  } catch (error: any) {
    console.error('Get CRM status error:', error);
    const prismaError = handlePrismaError(error);
    return errorResponse(prismaError.message, prismaError.status);
  }
}

// ============================================
// CRM PROVIDER INTEGRATIONS
// ============================================

/**
 * Sync contact to HubSpot
 */
async function syncToHubSpot(contact: any) {
  const apiKey = process.env.HUBSPOT_API_KEY;
  if (!apiKey) {
    throw new Error('HubSpot API key not configured');
  }

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        email: contact.email,
        firstname: contact.name.split(' ')[0],
        lastname: contact.name.split(' ').slice(1).join(' ') || '',
        phone: contact.phone,
        company: contact.company,
        message: contact.message,
        hs_lead_status: 'NEW',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Sync contact to Salesforce
 */
async function syncToSalesforce(contact: any) {
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  if (!instanceUrl || !accessToken) {
    throw new Error('Salesforce credentials not configured');
  }

  const response = await fetch(`${instanceUrl}/services/data/v57.0/sobjects/Lead`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      FirstName: contact.name.split(' ')[0],
      LastName: contact.name.split(' ').slice(1).join(' ') || 'Unknown',
      Email: contact.email,
      Phone: contact.phone,
      Company: contact.company || 'Unknown',
      Description: contact.message,
      LeadSource: 'Website',
      Status: 'New',
    }),
  });

  if (!response.ok) {
    throw new Error(`Salesforce API error: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Sync contact to Pipedrive
 */
async function syncToPipedrive(contact: any) {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  const domain = process.env.PIPEDRIVE_DOMAIN;

  if (!apiToken || !domain) {
    throw new Error('Pipedrive credentials not configured');
  }

  // First, create person
  const personResponse = await fetch(
    `https://${domain}.pipedrive.com/api/v1/persons?api_token=${apiToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contact.name,
        email: [{ value: contact.email, primary: true }],
        phone: contact.phone ? [{ value: contact.phone, primary: true }] : [],
        org_id: null,
      }),
    }
  );

  if (!personResponse.ok) {
    throw new Error(`Pipedrive API error: ${personResponse.statusText}`);
  }

  return await personResponse.json();
}

/**
 * Create deal in CRM
 */
async function createCRMDeal(provider: CRMProvider, contactId: string, dealData: any) {
  switch (provider) {
    case 'hubspot':
      return await createHubSpotDeal(contactId, dealData);
    case 'salesforce':
      return await createSalesforceDeal(contactId, dealData);
    case 'pipedrive':
      return await createPipedriveDeal(contactId, dealData);
    default:
      throw new Error('Unsupported CRM provider');
  }
}

async function createHubSpotDeal(contactId: string, dealData: any) {
  const apiKey = process.env.HUBSPOT_API_KEY;

  const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      properties: {
        dealname: dealData.name,
        amount: dealData.value,
        dealstage: dealData.stage || 'appointmentscheduled',
        pipeline: 'default',
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
        },
      ],
    }),
  });

  return await response.json();
}

async function createSalesforceDeal(contactId: string, dealData: any) {
  const instanceUrl = process.env.SALESFORCE_INSTANCE_URL;
  const accessToken = process.env.SALESFORCE_ACCESS_TOKEN;

  const response = await fetch(`${instanceUrl}/services/data/v57.0/sobjects/Opportunity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      Name: dealData.name,
      Amount: dealData.value,
      StageName: dealData.stage || 'Prospecting',
      CloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    }),
  });

  return await response.json();
}

async function createPipedriveDeal(contactId: string, dealData: any) {
  const apiToken = process.env.PIPEDRIVE_API_TOKEN;
  const domain = process.env.PIPEDRIVE_DOMAIN;

  const response = await fetch(
    `https://${domain}.pipedrive.com/api/v1/deals?api_token=${apiToken}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: dealData.name,
        value: dealData.value,
        person_id: contactId,
        status: 'open',
      }),
    }
  );

  return await response.json();
}

// ============================================
// WEBHOOK HELPERS
// ============================================

async function verifyCRMWebhook(provider: CRMProvider, req: NextRequest, body: any): Promise<boolean> {
  // Implement webhook signature verification based on provider
  // This is a simplified example
  return true;
}

function getWebhookEventType(provider: CRMProvider, body: any): string {
  switch (provider) {
    case 'hubspot':
      return body[0]?.subscriptionType || 'unknown';
    case 'salesforce':
      return body.event?.type || 'unknown';
    case 'pipedrive':
      return body.event || 'unknown';
    default:
      return 'unknown';
  }
}

async function handleContactUpdated(provider: CRMProvider, body: any) {
  // Update local contact from CRM data
  console.log('Contact updated from CRM:', provider, body);
}

async function handleDealCreated(provider: CRMProvider, body: any) {
  // Handle deal creation from CRM
  console.log('Deal created in CRM:', provider, body);
}

async function handleDealUpdated(provider: CRMProvider, body: any) {
  // Handle deal updates from CRM
  console.log('Deal updated in CRM:', provider, body);
}
