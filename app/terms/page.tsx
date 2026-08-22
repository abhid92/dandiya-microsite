import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <main className="df-page df-legal">
      <article>
        <Link href="/">← Back to Dandiya Festival</Link>
        <p className="df-eyebrow">Times Internet</p>
        <h1>Terms &amp; Conditions</h1>
        <p>These are draft event terms for the Dandiya Festival preview. Final ticketing and event terms must be approved before public launch.</p>
        <h2>Event information</h2>
        <p>The displayed dates, schedule, lineup, pricing and venue arrangements remain subject to final confirmation. Inferred details are labelled on the site.</p>
        <h2>Registration of interest</h2>
        <p>Submitting the form records interest only. It does not reserve admission, guarantee ticket availability or create a confirmed booking.</p>
        <h2>Tickets and admission</h2>
        <p>Final pass categories, taxes, inclusions, entry requirements, refund rules and venue policies will be published when ticketing opens.</p>
        <h2>Programme changes</h2>
        <p>Artists, timings and on-ground experiences may change because of production, venue, safety or operational requirements.</p>
      </article>
    </main>
  );
}
