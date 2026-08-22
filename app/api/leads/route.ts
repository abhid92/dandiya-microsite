import { NextResponse } from 'next/server';

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  preferredDay?: unknown;
  phoneVerified?: unknown;
};

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json() as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 });
  }

  const isComplete = typeof payload.name === 'string'
    && payload.name.trim().length >= 2
    && typeof payload.phone === 'string'
    && /^[6-9]\d{9}$/.test(payload.phone.replace(/\D/g, '').replace(/^91(?=[6-9]\d{9}$)/, ''))
    && payload.phoneVerified === true;

  if (!isComplete) {
    return NextResponse.json({ ok: false, message: 'A valid name and OTP-verified mobile number are required.' }, { status: 422 });
  }

  // Placeholder only: connect the validated payload and server-side OTP provider to the production CRM before launch.
  return NextResponse.json({ ok: true, message: 'Interest received by the preview endpoint.' }, { status: 202 });
}
