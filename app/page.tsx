'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type LeadForm = { name: string; phone: string; email: string; preferredDay: string };
type FormErrors = Partial<Record<keyof LeadForm, string>>;
type ThemeId = 'marigold' | 'peacock' | 'bandhani' | 'gulabi' | 'kesari' | 'indigo' | 'emerald' | 'noir';
type PaymentMethod = 'upi' | 'card' | 'netbanking';
const initialForm: LeadForm = { name: '', phone: '', email: '', preferredDay: '' };
const previewOtp = '246810';
const passPrice = 999;

const themes: Array<{ id: ThemeId; name: string; description: string }> = [
  { id: 'marigold', name: 'Marigold Circle', description: 'Warm ivory · rani pink · marigold' },
  { id: 'peacock', name: 'Peacock Evening', description: 'Botanical teal · saffron · sage' },
  { id: 'bandhani', name: 'Royal Bandhani', description: 'Indigo · crimson · ceremonial gold' },
  { id: 'gulabi', name: 'Gulabi Night', description: 'Plum · rose · soft champagne' },
  { id: 'kesari', name: 'Kesari Dawn', description: 'Sindoor red · kesar · warm cream' },
  { id: 'indigo', name: 'Moonlit Indigo', description: 'Midnight blue · fuchsia · antique gold' },
  { id: 'emerald', name: 'Emerald Mehfil', description: 'Deep green · copper · jasmine' },
  { id: 'noir', name: 'Ivory Noir', description: 'Charcoal · antique gold · terracotta' },
];

const dates = [
  { day: 'Saturday', date: '17', note: 'Opening celebration' },
  { day: 'Sunday', date: '18', note: 'The festive peak' },
  { day: 'Monday', date: '19', note: 'Grand finale' },
];

const highlights = [
  { title: 'Live music & artists', copy: 'Folk-rooted Garba, Bollywood favourites and celebratory DJ sets across three evenings.', image: '/images/nandlal-chhanga-official.jpg', alt: 'Nandlal Chhanga singing into a microphone during a live performance' },
  { title: 'Garba & Dandiya', copy: 'Expansive dance zones for beginners, families and seasoned dancers alike.', image: '/images/garba-circle.jpg', alt: 'Garba dancers circling a glowing lamp' },
  { title: 'Immersive production', copy: 'A statement arrival, layered lighting and a designed stage turn the ground into a festival.', image: '/images/dates-night.jpg', alt: 'An illuminated festival entrance at night' },
  { title: 'Festive fashion', copy: 'Chaniya choli, kediyu, bandhani and mirror-work take centre stage.', image: '/images/hero-dandiya.jpg', alt: 'Colourful Navratri fashion and dandiya sticks' },
  { title: 'Food & refreshment', copy: 'A common F&B zone and hydration points keep the celebration comfortable.', image: '/images/festival-details.jpg', alt: 'Festive food, brass lamps and decorated dandiya sticks' },
  { title: 'Community & family', copy: 'A warm, family-first gathering shaped around music, movement and belonging.', image: '/images/festival-crowd.jpg', alt: 'A large community enjoying a live celebration' },
];

const schedule = [
  ['6:00 PM', 'Gates open', 'Arch gate arrival, entry bands at the box office and clear venue wayfinding.'],
  ['7:00 PM', 'Community Garba warm-up', 'A guided open-floor start for families and first-time dancers.'],
  ['8:00 PM', 'Live folk and Garba set', 'The featured Gujarati folk voice leads traditional Garba and Raas.'],
  ['9:30 PM', 'Dandiya Raas', 'Paired-stick dancing opens across the main festival floor.'],
  ['10:30 PM', 'DJ finale', 'Bollywood, commercial and retro favourites close the night.'],
];

const faqs = [
  ['When and where is the festival?', 'The festival is planned for 17, 18 and 19 October 2026 at Phoenix Marketcity, Viman Nagar, Pune.'],
  ['Is the artist lineup confirmed?', 'The current lineup is tentative. Final artists, appearance dates and set timings will be shared closer to the festival.'],
  ['What is the average pass price?', 'The current average ticket price is ₹999. Final pass categories, inclusions and taxes will be announced when bookings open.'],
  ['Is the celebration family-friendly?', 'Yes. The festival is designed as a comfortable, community-led Navratri experience for families, couples and groups of friends.'],
  ['Will food and water be available?', 'Yes. The venue plan includes a common F&B zone and hydration points across the festival area.'],
];

const marqueeItems = [
  ['✦', 'Three nights'], ['♫', 'Live artists'], ['◎', 'Garba & Dandiya'], ['✧', 'Festive fashion'], ['5K+', 'Celebrating together'],
];

export default function Home({ staticPreview = false }: { staticPreview?: boolean }) {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [theme, setTheme] = useState<ThemeId>('marigold');
  const [themeOpen, setThemeOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('17 October');
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.df-reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    elements.forEach((element) => observer.observe(element));
    const handleScroll = () => setShowMobileCta(window.scrollY > window.innerHeight * 2);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('dandiya-preview-theme');
    const restoreTheme = window.requestAnimationFrame(() => {
      if (themes.some((item) => item.id === savedTheme)) setTheme(savedTheme as ThemeId);
    });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setThemeOpen(false); setCheckoutOpen(false); }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      window.cancelAnimationFrame(restoreTheme);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = checkoutOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [checkoutOpen]);

  const openCheckout = () => {
    setMenuOpen(false);
    setPaymentMessage('');
    setCheckoutOpen(true);
  };

  const continueToPayment = () => {
    if (bookingName.trim().length < 2 || !/^[6-9]\d{9}$/.test(bookingPhone.replace(/\D/g, '')) || !/^\S+@\S+\.\S+$/.test(bookingEmail.trim()) || !termsAccepted) {
      setPaymentMessage('Complete your name, valid mobile number, email and consent before continuing.');
      return;
    }
    setPaymentMessage('Payment preview ready. Connect an approved payment gateway before accepting live payments. No payment has been taken.');
  };

  const selectTheme = (nextTheme: ThemeId) => {
    setTheme(nextTheme);
    window.localStorage.setItem('dandiya-preview-theme', nextTheme);
  };

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (field === 'phone') {
      setOtpSent(false);
      setOtp('');
      setPhoneVerified(false);
      setOtpMessage('');
    }
    if (status !== 'idle') setStatus('idle');
  };

  const indianMobile = () => {
    const digits = form.phone.replace(/\D/g, '');
    return digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  };

  const requestOtp = () => {
    if (!/^[6-9]\d{9}$/.test(indianMobile())) {
      setErrors((current) => ({ ...current, phone: 'Enter a valid 10-digit Indian mobile number.' }));
      return;
    }
    setErrors((current) => ({ ...current, phone: undefined }));
    setOtpSent(true);
    setOtp('');
    setPhoneVerified(false);
    setOtpMessage(`Preview OTP: ${previewOtp}`);
  };

  const updateOtp = (value: string) => {
    const nextOtp = value.replace(/\D/g, '').slice(0, 6);
    setOtp(nextOtp);
    if (nextOtp.length === 6) {
      const verified = nextOtp === previewOtp;
      setPhoneVerified(verified);
      setOtpMessage(verified ? 'Mobile number verified.' : 'Incorrect OTP. Please try again.');
    } else {
      setPhoneVerified(false);
      setOtpMessage(`Preview OTP: ${previewOtp}`);
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(indianMobile())) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    else if (!phoneVerified) nextErrors.phone = 'Verify your mobile number with the OTP.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (staticPreview) {
      setStatus('success');
      setForm(initialForm);
      setOtpSent(false);
      setOtp('');
      setPhoneVerified(false);
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, phoneVerified }) });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success'); setForm(initialForm); setOtpSent(false); setOtp(''); setPhoneVerified(false);
    } catch { setStatus('error'); }
  }

  return (
    <main className={`df-page ${themeOpen ? 'theme-preview-open' : ''}`} data-theme={theme} id="top">
      <a className="df-skip" href="#register">Skip to registration</a>
      <header className="df-header">
        <a className="df-brand" href="#top" aria-label="Times Internet | Dandiya Festival home"><Image src="/images/times-internet.png" alt="Times Internet" width={116} height={34} /><i aria-hidden="true" /><span><strong>Dandiya <em>Festival</em></strong><small>Pune · Navratri 2026</small></span></a>
        <button className={`df-menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        <nav className={`df-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation"><a href="#festival" onClick={() => setMenuOpen(false)}>Festival</a><a href="#lineup" onClick={() => setMenuOpen(false)}>Lineup</a><a href="#dates" onClick={() => setMenuOpen(false)}>Dates</a><a href="#venue" onClick={() => setMenuOpen(false)}>Venue</a><button type="button" onClick={openCheckout}>Book slots</button></nav>
        <button className="df-btn df-btn-small df-header-cta" type="button" onClick={openCheckout}>Book your slots</button>
      </header>

      <section className="df-hero">
        <div className="df-hero-media"><Image src="/images/hero-editorial.jpg" alt="Families and friends dancing with dandiya sticks at an open-air Navratri celebration" fill priority sizes="100vw" /></div>
        <div className="df-hero-overlay" aria-hidden="true" />
        <div className="df-wrap df-hero-content">
          <p className="df-eyebrow">Times Internet presents · Navratri 2026</p>
          <h1>Dandiya<br /><em>Festival</em></h1>
          <p className="df-hero-lede">The most immersive celebration of Navratri in Pune.</p>
          <div className="df-hero-facts" aria-label="Event date and venue">
            <div><span>Three festive nights</span><strong>17-19 October 2026</strong></div>
            <div><span>At the heart of Pune</span><strong>Phoenix Marketcity</strong><small>Viman Nagar, Pune</small></div>
          </div>
          <div className="df-hero-actions"><button className="df-btn" type="button" onClick={openCheckout}>Book your slots now <span>↗</span></button><a className="df-text-link" href="#festival">Discover the festival <span>↓</span></a></div>
        </div>
      </section>

      <div className="df-marquee" aria-label="Festival overview"><div className="df-marquee-track"><div className="df-marquee-group">{marqueeItems.map(([icon, label]) => <span key={label}><b aria-hidden="true">{icon}</b>{label}</span>)}</div><div className="df-marquee-group" aria-hidden="true">{marqueeItems.map(([icon, label]) => <span key={`repeat-${label}`}><b aria-hidden="true">{icon}</b>{label}</span>)}</div></div></div>

      <section className="df-section df-story" id="festival"><div className="df-wrap">
        <div className="df-section-head df-reveal"><div><p className="df-eyebrow">Nine nights, one circle</p><h2>A tradition that<br /><em>moves us.</em></h2></div><p>Navratri honours Goddess Durga through nine nights of devotion, movement and gathering. It is an annual return to joy, strength and community.</p></div>
        <div className="df-story-grid df-reveal"><div className="df-story-photo"><Image src="/images/garba-circle.jpg" alt="Garba dancers moving around a glowing brass lamp" fill sizes="(max-width: 760px) 100vw, 56vw" /></div><div className="df-story-copy"><h3>Devotion, rhythm and a shared circle</h3><p>In Garba, dancers move around a lamp or image of the Goddess, echoing the cycle of life. In Dandiya Raas, decorated sticks become the swords of Durga in a spirited retelling of her triumph over Mahishasura.</p><p>Rooted in Gujarat and embraced by Gujarati, Marathi and Marwari communities, the celebration feels both timeless and vividly alive.</p></div></div>
      </div></section>

      <section className="df-section df-highlights"><div className="df-wrap">
        <div className="df-section-head df-reveal"><div><p className="df-eyebrow">Festival highlights</p><h2>Every reason<br />to be there.</h2></div><p>Every element is shaped for families and friends who want the festivity, energy and craft of Navratri in a premium setting.</p></div>
        <p className="df-swipe">Swipe the festival <span>→</span></p>
        <div className="df-photo-grid">{highlights.map((item, index) => <article className="df-photo-card df-reveal" key={item.title}><div className="df-card-media"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) 82vw, 33vw" /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="df-card-copy"><h3>{item.title}</h3><p>{item.copy}</p></div></article>)}</div>
      </div></section>

      <section className="df-section df-lineup" id="lineup"><div className="df-wrap">
        <div className="df-section-head df-reveal"><div><p className="df-eyebrow">Tentative lineup</p><h2>Voices and beats<br /><em>for every circle.</em></h2></div><p>Folk-rooted Garba meets Pune&apos;s favourite commercial sounds. Final artist appearances and set timings will be announced closer to the festival.</p></div>
        <div className="df-artist-grid">
          <article className="df-artist df-reveal"><div className="df-artist-image"><Image src="/images/nandlal-chhanga-official.jpg" alt="Nandlal Chhanga singing into a microphone during a live performance" fill sizes="(max-width: 760px) 100vw, 55vw" /><span>Tentative lineup</span></div><div><p>Gujarati folk & Garba</p><h3>Nandlal Chhanga</h3><p>A celebrated folk voice with a deep Navratri and Raas connection and 5.6 lakh+ monthly Spotify listeners.</p></div></article>
          <article className="df-artist df-reveal"><div className="df-artist-image"><Image src="/images/dj-regge.jpg" alt="DJ Regge behind a DJ console" fill sizes="(max-width: 760px) 100vw, 40vw" /><span>Tentative lineup</span></div><div><p>Bollywood · Commercial · Retro</p><h3>DJ Regge</h3><p>Pune&apos;s leading commercial DJ brings 18+ years of experience and nearly a decade as resident DJ at 1000 Oaks.</p></div></article>
        </div>
      </div></section>

      <section className="df-dates" id="dates"><div className="df-dates-media"><Image src="/images/dates-night.jpg" alt="A glowing open-air Navratri festival venue at night" fill sizes="100vw" /></div><div className="df-dates-shade" aria-hidden="true" /><div className="df-wrap df-dates-content">
        <div className="df-dates-title df-reveal"><p className="df-eyebrow">Save the weekend</p><h2>17-19 <em>October</em></h2><p>2026 · Phoenix Marketcity, Pune</p></div>
        <div className="df-date-list df-reveal">{dates.map((item) => <article key={item.date}><span>{item.day}</span><strong>{item.date}</strong><div><h3>{item.note}</h3><p>Live Garba · Dandiya · DJ finale</p></div></article>)}</div>
        <button className="df-btn df-dates-cta df-reveal" type="button" onClick={openCheckout}>Book your slots now <span>↗</span></button>
      </div></section>

      <section className="df-section df-schedule"><div className="df-wrap"><div className="df-section-head df-reveal"><div><p className="df-eyebrow">Evening programme</p><h2>From first step<br />to final beat.</h2></div><p>A clear view of how each festival night unfolds, from arrival and warm-up through the headline performances and DJ finale.</p></div><div className="df-timeline df-reveal">{schedule.map(([time, title, copy]) => <article key={time}><span>{time}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

      <section className="df-section df-venue" id="venue"><div className="df-wrap df-venue-grid">
        <div className="df-venue-copy df-reveal"><p className="df-eyebrow">Venue & how to reach</p><h2>Phoenix<br /><em>Marketcity</em></h2><div className="df-address"><span>Viman Nagar, Pune</span><strong>Nagar Road, Pune,<br />Maharashtra 411014</strong></div><p>A premium open-air lifestyle destination with easy city access, on-site parking and the scale for a 5,000+ person celebration.</p><a className="df-text-link" href="https://maps.google.com/?q=Phoenix+Marketcity+Viman+Nagar+Pune" target="_blank" rel="noreferrer">Open in Google Maps <span>↗</span></a></div>
        <div className="df-venue-media df-reveal"><Image src="/images/phoenix-marketcity-evening.png" alt="Phoenix Marketcity entrance in Viman Nagar, Pune at blue hour" fill sizes="(max-width: 760px) 100vw, 52vw" /><div className="df-venue-facts"><span>350+ brands</span><span>Easy airport access</span><span>On-site parking</span></div></div>
      </div></section>

      <section className="df-section df-ticket"><div className="df-wrap df-ticket-card df-reveal"><div><p className="df-eyebrow">Festival booking</p><h2>Your place<br />in the circle.</h2><p>Select your festival night, number of passes and preferred payment option through one focused booking flow.</p></div><div className="df-price"><span>Day pass preview</span><strong>₹999</strong><small>Per person. Taxes and final inclusions will be confirmed before live payment.</small><button className="df-btn" type="button" onClick={openCheckout}>Book your slots now</button></div></div></section>

      <section className="df-section df-register" id="register"><div className="df-wrap df-register-grid">
        <div className="df-register-copy df-reveal"><p className="df-eyebrow">Join the celebration</p><h2>Be first<br /><em>to know.</em></h2><p>Tell us how you&apos;d like to attend. We&apos;ll keep you close to ticket releases and festival news.</p><div><span>3 nights</span><span>5,000+ expected</span><span>Pune</span></div></div>
        <form className="df-form df-reveal" onSubmit={handleSubmit} noValidate>
          <label className="df-field df-field-wide"><span>Full name <b>*</b></span><input value={form.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Your name" autoComplete="name" />{errors.name && <small>{errors.name}</small>}</label>
          <div className="df-field df-field-wide"><label htmlFor="mobile">Mobile number <b>*</b></label><div className="df-phone-row"><input id="mobile" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} placeholder="98765 43210" autoComplete="tel" disabled={phoneVerified} /><button type="button" onClick={phoneVerified ? undefined : requestOtp}>{phoneVerified ? '✓ Verified' : otpSent ? 'Resend OTP' : 'Send OTP'}</button></div>{errors.phone && <small>{errors.phone}</small>}{otpSent && !phoneVerified && <div className="df-otp"><input aria-label="Six digit OTP" inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => updateOtp(event.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} /><span>{otpMessage}</span></div>}{phoneVerified && <span className="df-verified">Mobile number verified successfully.</span>}</div>
          <label className="df-field"><span>Email <em>optional</em></span><input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} placeholder="you@example.com" autoComplete="email" />{errors.email && <small>{errors.email}</small>}</label>
          <label className="df-field"><span>Preferred night <em>optional</em></span><select value={form.preferredDay} onChange={(event) => updateField('preferredDay', event.target.value)}><option value="">Choose a date</option><option>17 October</option><option>18 October</option><option>19 October</option><option>Flexible / all three</option></select></label>
          <button className="df-btn df-form-submit" disabled={status === 'submitting' || !phoneVerified}>{status === 'submitting' ? 'Registering…' : phoneVerified ? 'Register my interest' : 'Verify mobile to continue'}</button><p className="df-form-note">{staticPreview ? 'Static preview only. Form data is not submitted.' : 'Preview OTP flow only. Connect an approved SMS provider before launch.'}</p><div className="df-form-status" aria-live="polite">{status === 'success' && <p>{staticPreview ? 'Preview complete. No data was submitted.' : 'Thank you. Your registration has been received.'}</p>}{status === 'error' && <p>We couldn&apos;t submit your details. Please try again.</p>}</div>
        </form>
      </div></section>

      <section className="df-section df-faq" id="faqs"><div className="df-wrap df-faq-grid"><div className="df-faq-head df-reveal"><p className="df-eyebrow">Plan with confidence</p><h2>Everything you need<br />before the first beat.</h2><p>Dates, passes, artist updates and practical details in one clear place.</p></div><div className="df-faq-list df-reveal">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <footer className="df-footer"><div className="df-wrap"><div className="df-footer-bottom"><div><span>Organised by</span><Image src="/images/times-internet.png" alt="Times Internet" width={174} height={50} /></div><nav><a href="#festival">Festival</a><a href="#lineup">Lineup</a><a href="#dates">Dates</a><a href="#venue">Venue</a><a href={staticPreview ? "#faqs" : "/privacy"}>Privacy Policy</a><a href={staticPreview ? "#faqs" : "/terms"}>Terms & Conditions</a></nav><p>© 2026 Times Internet<br />Details subject to final confirmation.</p></div></div></footer>
      {checkoutOpen && <div className="df-checkout-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
        <section className="df-checkout" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="df-checkout-head"><div><p className="df-eyebrow">Secure your festival night</p><h2 id="checkout-title">Book your slots</h2><p>Select your night, passes and payment preference.</p></div><button className="df-checkout-close" type="button" aria-label="Close booking" onClick={() => setCheckoutOpen(false)}>×</button></div>
          <div className="df-booking-summary">
            <div className="df-booking-dates" aria-label="Select festival date">{dates.map((item) => <button className={bookingDate === `${item.date} October` ? 'is-selected' : ''} type="button" key={item.date} onClick={() => setBookingDate(`${item.date} October`)}><span>{item.day}</span><strong>{item.date}</strong><small>October</small></button>)}</div>
            <div className="df-ticket-stepper"><div><span>Day pass</span><small>₹{passPrice.toLocaleString('en-IN')} per person</small></div><div><button type="button" aria-label="Remove one pass" onClick={() => setTicketCount((count) => Math.max(1, count - 1))}>−</button><strong>{ticketCount}</strong><button type="button" aria-label="Add one pass" onClick={() => setTicketCount((count) => Math.min(10, count + 1))}>+</button></div></div>
            <div className="df-booking-total"><span>Booking total</span><strong>₹{(passPrice * ticketCount).toLocaleString('en-IN')}</strong><small>Taxes calculated by the payment provider</small></div>
          </div>
          <div className="df-checkout-fields">
            <label><span>Full name *</span><input value={bookingName} onChange={(event) => { setBookingName(event.target.value); setPaymentMessage(''); }} placeholder="Enter your full name" autoComplete="name" /></label>
            <label><span>WhatsApp mobile number *</span><input type="tel" value={bookingPhone} onChange={(event) => { setBookingPhone(event.target.value.replace(/\D/g, '').slice(0, 10)); setPaymentMessage(''); }} placeholder="98765 43210" autoComplete="tel" /></label>
            <label className="is-wide"><span>Email *</span><input type="email" value={bookingEmail} onChange={(event) => { setBookingEmail(event.target.value); setPaymentMessage(''); }} placeholder="name@example.com" autoComplete="email" /></label>
          </div>
          <fieldset className="df-payment-methods"><legend>Choose payment option</legend><div>
            <button className={paymentMethod === 'upi' ? 'is-selected' : ''} type="button" onClick={() => setPaymentMethod('upi')}><i>UPI</i><span><strong>UPI</strong><small>Google Pay, PhonePe, Paytm</small></span></button>
            <button className={paymentMethod === 'card' ? 'is-selected' : ''} type="button" onClick={() => setPaymentMethod('card')}><i>Card</i><span><strong>Credit or debit card</strong><small>Visa, Mastercard, RuPay</small></span></button>
            <button className={paymentMethod === 'netbanking' ? 'is-selected' : ''} type="button" onClick={() => setPaymentMethod('netbanking')}><i>Bank</i><span><strong>Net banking</strong><small>All major Indian banks</small></span></button>
          </div></fieldset>
          <label className="df-booking-consent"><input type="checkbox" checked={termsAccepted} onChange={(event) => { setTermsAccepted(event.target.checked); setPaymentMessage(''); }} /><span>I agree to the <a href={staticPreview ? "#faqs" : "/terms"}>Terms & Conditions</a> and <a href={staticPreview ? "#faqs" : "/privacy"}>Privacy Policy</a>.</span></label>
          <button className="df-btn df-payment-submit" type="button" onClick={continueToPayment}>Continue to secure payment</button>
          <p className={`df-payment-message ${paymentMessage.startsWith('Payment preview') ? 'is-info' : ''}`} aria-live="polite">{paymentMessage || 'Payment processing will activate after an approved gateway is connected.'}</p>
        </section>
      </div>}
      <div className="df-theme-preview">
        {themeOpen && <section className="df-theme-panel" id="theme-preview-panel" role="dialog" aria-label="Preview colour themes">
          <div className="df-theme-panel-head"><div><span>Stakeholder preview</span><h2>Colour themes</h2></div><button type="button" aria-label="Close theme preview" onClick={() => setThemeOpen(false)}>×</button></div>
          <p>Switch the full experience instantly. Typography, content and layout stay consistent.</p>
          <div className="df-theme-options" role="radiogroup" aria-label="Festival colour theme">
            {themes.map((item) => <button className={theme === item.id ? 'is-active' : ''} type="button" role="radio" aria-checked={theme === item.id} key={item.id} onClick={() => selectTheme(item.id)}><i className={`df-theme-swatch is-${item.id}`} aria-hidden="true" /><span><strong>{item.name}</strong><small>{item.description}</small></span><b aria-hidden="true">{theme === item.id ? '✓' : ''}</b></button>)}
          </div>
          <small className="df-theme-note">Your selection is remembered on this device.</small>
        </section>}
        <button className="df-theme-toggle" type="button" aria-label={themeOpen ? 'Close colour theme preview' : 'Open colour theme preview'} aria-expanded={themeOpen} aria-controls="theme-preview-panel" onClick={() => setThemeOpen((open) => !open)}><span aria-hidden="true" /></button>
      </div>
      <div className={`df-mobile-cta ${showMobileCta ? 'is-visible' : ''}`}><button className="df-btn" type="button" onClick={openCheckout}>Book your slots now</button></div>
    </main>
  );
}
