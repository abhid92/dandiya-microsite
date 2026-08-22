import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="df-page df-legal">
      <article>
        <Link href="/">← Back to Dandiya Festival</Link>
        <p className="df-eyebrow">Times Internet</p>
        <h1>Privacy Policy</h1>
        <p>This draft explains how information submitted through the Dandiya Festival interest form is intended to be handled. Final legal language and contact details must be approved before launch.</p>
        <h2>Information collected</h2>
        <p>We collect your name and OTP-verified mobile number. Email address and preferred festival night are optional.</p>
        <h2>How information is used</h2>
        <p>Your information is intended only for festival announcements, ticket-release updates and booking-related communication.</p>
        <h2>Sharing and retention</h2>
        <p>Production retention periods, service providers and deletion procedures will be documented when the final CRM and SMS verification provider are connected.</p>
        <h2>Your choices</h2>
        <p>You may opt out of promotional communication using the instructions included in the final messages.</p>
      </article>
    </main>
  );
}
