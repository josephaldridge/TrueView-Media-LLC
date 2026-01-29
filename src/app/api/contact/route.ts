import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  help: string;
  budget: string;
  timeline: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Accept various phone formats
  const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
  return phoneRegex.test(phone);
}

function sanitize(input: string): string {
  return input.trim().slice(0, 1000);
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    const requiredFields: (keyof ContactFormData)[] = [
      'name',
      'businessName',
      'email',
      'phone',
      'industry',
      'help',
      'budget',
      'timeline',
    ];

    for (const field of requiredFields) {
      if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
        return NextResponse.json(
          { message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitize(body.name),
      businessName: sanitize(body.businessName),
      email: sanitize(body.email),
      phone: sanitize(body.phone),
      industry: sanitize(body.industry),
      help: sanitize(body.help),
      budget: sanitize(body.budget),
      timeline: sanitize(body.timeline),
    };

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate phone format
    if (!validatePhone(sanitizedData.phone)) {
      return NextResponse.json(
        { message: 'Please enter a valid phone number' },
        { status: 400 }
      );
    }

    // Service validation
    const validServices = [
      'website-build-basic',
      'larger-project',
    ];
    if (!validServices.includes(sanitizedData.budget)) {
      return NextResponse.json(
        { message: 'Please select a service' },
        { status: 400 }
      );
    }

    // Timeline validation
    const validTimelines = [
      'asap',
      '2-weeks',
      '1-month',
      '2-3-months',
      'flexible',
    ];
    if (!validTimelines.includes(sanitizedData.timeline)) {
      return NextResponse.json(
        { message: 'Please select a valid timeline' },
        { status: 400 }
      );
    }

    // Send to Formspree
    const formspreeResponse = await fetch('https://formspree.io/f/xbdylekv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: sanitizedData.name,
        businessName: sanitizedData.businessName,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        industry: sanitizedData.industry,
        message: sanitizedData.help,
        budget: sanitizedData.budget,
        timeline: sanitizedData.timeline,
      }),
    });

    if (!formspreeResponse.ok) {
      throw new Error('Failed to submit form');
    }

    return NextResponse.json(
      { 
        message: 'Thank you for your message. We will get back to you within 1 business day.',
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Something went wrong. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}
