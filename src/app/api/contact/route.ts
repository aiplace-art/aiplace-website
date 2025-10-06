import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.enum(['web', 'ai', 'business', 'blockchain', 'consultation', 'other']),
  budget: z.enum(['under-10k', '10k-50k', '50k-100k', '100k-plus', 'not-sure']).optional(),
  message: z.string().min(10).max(1000),
  timeline: z.enum(['urgent', '1-3-months', '3-6-months', '6-plus-months', 'flexible']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactFormSchema.parse(body);

    // TODO: Implement actual email sending logic here
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', validatedData);

    // In a real application, you would:
    // 1. Send an email using a service like SendGrid, AWS SES, or Resend
    // 2. Save the submission to a database
    // 3. Send a confirmation email to the user
    // 4. Notify your team via Slack/Discord/Email

    // Example with a hypothetical email service:
    // await emailService.send({
    //   to: 'hello@aiplace.com',
    //   subject: `New Contact Form: ${validatedData.service}`,
    //   template: 'contact-form',
    //   data: validatedData,
    // });

    // await emailService.send({
    //   to: validatedData.email,
    //   subject: 'Thank you for contacting AiPlace',
    //   template: 'confirmation',
    //   data: { name: validatedData.name },
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request',
      },
      { status: 500 }
    );
  }
}

// Optional: Handle OPTIONS for CORS if needed
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
