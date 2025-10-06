/**
 * Email Service using Resend
 * Handles all email operations for the AiPlace website
 */

// Conditional import - Resend is optional dependency
let Resend: any;
let resend: any;

try {
  Resend = require('resend').Resend;
  resend = new Resend(process.env.RESEND_API_KEY);
} catch (error) {
  console.warn('Resend package not installed. Email functionality will be disabled.');
  resend = null;
}

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@aiplace.com';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@aiplace.com';
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@aiplace.com';

// Email templates
export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Resend
 */
export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
  }>;
}) {
  try {
    const data = await resend.emails.send({
      from: params.from || FROM_EMAIL,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
      reply_to: params.replyTo,
      cc: params.cc,
      bcc: params.bcc,
      attachments: params.attachments,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}

/**
 * Send contact form notification to admin
 */
export async function sendContactNotification(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  formType: string;
  message: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #6366f1; }
          .value { margin-top: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
            <p>Form Type: ${params.formType}</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${params.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${params.email}">${params.email}</a></div>
            </div>
            ${params.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${params.phone}</div>
            </div>
            ` : ''}
            ${params.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${params.company}</div>
            </div>
            ` : ''}
            ${params.serviceType ? `
            <div class="field">
              <div class="label">Service Type:</div>
              <div class="value">${params.serviceType}</div>
            </div>
            ` : ''}
            ${params.budget ? `
            <div class="field">
              <div class="label">Budget:</div>
              <div class="value">${params.budget}</div>
            </div>
            ` : ''}
            ${params.timeline ? `
            <div class="field">
              <div class="label">Timeline:</div>
              <div class="value">${params.timeline}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${params.message}</div>
            </div>
          </div>
          <div class="footer">
            <p>AiPlace Contact Management System</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `New ${params.formType} Form Submission from ${params.name}`,
    html,
    replyTo: params.email,
  });
}

/**
 * Send contact form confirmation to user
 */
export async function sendContactConfirmation(params: {
  name: string;
  email: string;
  formType: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You, ${params.name}!</h1>
            <p>We received your message</p>
          </div>
          <div class="content">
            <p>Thank you for contacting AiPlace. We've received your ${params.formType.toLowerCase()} form submission and will get back to you within 24 hours.</p>
            <p>Our team is reviewing your inquiry and will provide you with a detailed response soon.</p>
            <p>In the meantime, feel free to explore our services and recent projects:</p>
            <a href="https://aiplace.com/services" class="button">View Our Services</a>
            <a href="https://aiplace.com/portfolio" class="button">See Our Work</a>
          </div>
          <div class="footer">
            <p>AiPlace - Your Partner in Digital Innovation & AI Solutions</p>
            <p>If you have any questions, reply to this email or contact us at ${SUPPORT_EMAIL}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: 'Thank you for contacting AiPlace',
    html,
    from: FROM_EMAIL,
  });
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(params: {
  email: string;
  name?: string;
  confirmToken: string;
}) {
  const confirmUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/newsletter/confirm?token=${params.confirmToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; margin-top: 20px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to AiPlace Newsletter!</h1>
          </div>
          <div class="content">
            <p>Hi${params.name ? ` ${params.name}` : ''},</p>
            <p>Thank you for subscribing to the AiPlace newsletter! You're now part of our community of innovators and tech enthusiasts.</p>
            <p>Please confirm your email address to start receiving our latest updates on:</p>
            <ul>
              <li>Web Development best practices</li>
              <li>AI & Machine Learning insights</li>
              <li>Business strategies and tips</li>
              <li>Blockchain and Web3 trends</li>
            </ul>
            <div style="text-align: center;">
              <a href="${confirmUrl}" class="button">Confirm Subscription</a>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              If you didn't subscribe to this newsletter, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>AiPlace - Your Partner in Digital Innovation & AI Solutions</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: 'Confirm your AiPlace newsletter subscription',
    html,
    from: FROM_EMAIL,
  });
}

/**
 * Send consultation booking confirmation
 */
export async function sendConsultationConfirmation(params: {
  name: string;
  email: string;
  serviceType: string;
  preferredDate: Date;
  status: 'pending' | 'confirmed';
  meetingLink?: string;
}) {
  const dateStr = new Date(params.preferredDate).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; border-left: 4px solid #6366f1; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin-top: 10px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Consultation ${params.status === 'confirmed' ? 'Confirmed' : 'Request Received'}!</h1>
          </div>
          <div class="content">
            <p>Hi ${params.name},</p>
            ${params.status === 'confirmed' ? `
              <p>Great news! Your consultation with AiPlace has been confirmed.</p>
            ` : `
              <p>Thank you for scheduling a consultation with AiPlace. We've received your request and will confirm the exact time within 24 hours.</p>
            `}
            <div class="info-box">
              <strong>Service:</strong> ${params.serviceType}<br>
              <strong>${params.status === 'confirmed' ? 'Date & Time' : 'Preferred Date'}:</strong> ${dateStr}
            </div>
            ${params.meetingLink ? `
              <p>Join the meeting using the link below:</p>
              <div style="text-align: center;">
                <a href="${params.meetingLink}" class="button">Join Meeting</a>
              </div>
            ` : `
              <p>We'll send you the meeting link once the consultation is confirmed.</p>
            `}
            <p>To prepare for our consultation, please consider:</p>
            <ul>
              <li>Your project goals and objectives</li>
              <li>Any specific challenges you're facing</li>
              <li>Budget and timeline expectations</li>
              <li>Questions you'd like to discuss</li>
            </ul>
          </div>
          <div class="footer">
            <p>AiPlace - Your Partner in Digital Innovation & AI Solutions</p>
            <p>Need to reschedule? Reply to this email or contact ${SUPPORT_EMAIL}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: params.status === 'confirmed'
      ? 'Your AiPlace Consultation is Confirmed'
      : 'AiPlace Consultation Request Received',
    html,
    from: FROM_EMAIL,
  });
}

/**
 * Send newsletter welcome email
 */
export async function sendNewsletterWelcome(params: {
  email: string;
  name?: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 10px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to AiPlace!</h1>
          </div>
          <div class="content">
            <p>Hi${params.name ? ` ${params.name}` : ''},</p>
            <p>Your subscription is now confirmed! Thank you for joining the AiPlace community.</p>
            <p>You'll receive regular updates about:</p>
            <ul>
              <li>Latest web development trends and techniques</li>
              <li>AI innovations and practical applications</li>
              <li>Business growth strategies</li>
              <li>Blockchain and cryptocurrency insights</li>
              <li>Exclusive resources and case studies</li>
            </ul>
            <p>Explore what we can do for you:</p>
            <div style="text-align: center;">
              <a href="https://aiplace.com/services" class="button">Our Services</a>
              <a href="https://aiplace.com/blog" class="button">Read Blog</a>
            </div>
          </div>
          <div class="footer">
            <p>AiPlace - Your Partner in Digital Innovation & AI Solutions</p>
            <p><a href="{unsubscribe_url}">Unsubscribe</a></p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: params.email,
    subject: 'Welcome to AiPlace Newsletter!',
    html,
    from: FROM_EMAIL,
  });
}

/**
 * Send admin notification for new consultation
 */
export async function sendConsultationNotification(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceType: string;
  preferredDate: Date;
  alternateDate?: Date;
  projectBrief: string;
  budget?: string;
  timeline?: string;
  urgency: string;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #6366f1; }
          .value { margin-top: 5px; }
          .urgent { color: #ef4444; font-weight: bold; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Consultation Request</h2>
            <p class="${params.urgency === 'URGENT' || params.urgency === 'HIGH' ? 'urgent' : ''}">
              Urgency: ${params.urgency}
            </p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Client Name:</div>
              <div class="value">${params.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${params.email}">${params.email}</a></div>
            </div>
            ${params.phone ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${params.phone}</div>
            </div>
            ` : ''}
            ${params.company ? `
            <div class="field">
              <div class="label">Company:</div>
              <div class="value">${params.company}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Service Type:</div>
              <div class="value">${params.serviceType}</div>
            </div>
            <div class="field">
              <div class="label">Preferred Date:</div>
              <div class="value">${new Date(params.preferredDate).toLocaleString()}</div>
            </div>
            ${params.alternateDate ? `
            <div class="field">
              <div class="label">Alternate Date:</div>
              <div class="value">${new Date(params.alternateDate).toLocaleString()}</div>
            </div>
            ` : ''}
            ${params.budget ? `
            <div class="field">
              <div class="label">Budget:</div>
              <div class="value">${params.budget}</div>
            </div>
            ` : ''}
            ${params.timeline ? `
            <div class="field">
              <div class="label">Timeline:</div>
              <div class="value">${params.timeline}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Project Brief:</div>
              <div class="value">${params.projectBrief}</div>
            </div>
          </div>
          <div class="footer">
            <p>AiPlace Consultation Management System</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `New Consultation Request - ${params.serviceType} - ${params.urgency}`,
    html,
    replyTo: params.email,
  });
}
