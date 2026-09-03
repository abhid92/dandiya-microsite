'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

type LeadForm = { name: string; phone: string; email: string };
type FormErrors = Partial<Record<keyof LeadForm, string>>;
const initialForm: LeadForm = { name: '', phone: '', email: '' };
const previewOtp = '246810';
const festivalStart = new Date('2026-10-17T18:00:00+05:30').getTime();

const ticketTiers = [
  { id: 'cabana', name: 'Royal Cabana', price: 4999, availability: 'Almost full', claimed: 92, color: '#a23f63', copy: 'Private raised pods stage-left with cushioned seating for four, a dedicated host and unlimited soft drinks.' },
  { id: 'gold', name: 'Gold Circle', price: 2499, availability: 'Selling fast', claimed: 68, color: '#c9791a', copy: 'The innermost Raas ring, closest to the dhol line and live stage.' },
  { id: 'silver', name: 'Silver Circle', price: 1499, availability: 'Selling fast', claimed: 45, color: '#8a7355', copy: 'Full dance-floor access one ring back from centre, with more room to move.' },
  { id: 'gallery', name: 'Spectator Gallery', price: 999, availability: 'Plenty left', claimed: 20, color: '#146b62', copy: 'Raised tiered seating with a clear sightline across the full celebration.' },
  { id: 'ground', name: 'Community Ground', price: 599, availability: 'Plenty left', claimed: 12, color: '#a2551f', copy: 'The open outer ring with general standing and room to move between songs.' },
];

const heroSlides = [
  {
    image: '/images/hero-editorial.jpg',
    alt: 'Families and friends dancing with dandiya sticks at an open-air Navratri celebration',
    eyebrow: 'Times Internet presents · Navratri 2026',
    title: 'Pune enters the circle.',
    copy: 'Two festival nights of Garba, Dandiya, live music and community at Phoenix Marketcity.',
  },
  {
    image: '/images/garba-circle.jpg',
    alt: 'Garba dancers moving around a glowing ceremonial lamp',
    eyebrow: 'Rhythm · ritual · celebration',
    title: 'Tradition, after dark.',
    copy: 'A premium open-air setting shaped around movement, music, colour and a shared festive spirit.',
  },
  {
    image: '/images/dates-night.jpg',
    alt: 'An illuminated festival entrance at night',
    eyebrow: '17–18 October · Viman Nagar',
    title: 'Two nights. One festival.',
    copy: 'Choose your night, explore the programme and plan your place in Pune’s Navratri celebration.',
  },
];

const dates = [
  { day: 'Saturday', date: '17', note: 'Opening celebration' },
  { day: 'Sunday', date: '18', note: 'The festive peak' },
];

const highlights = [
  { title: 'Live music & artists', copy: 'Folk-rooted Garba, Bollywood favourites and celebratory DJ sets across two evenings.', image: '/images/festival-crowd.jpg', alt: 'A festival audience facing a brightly illuminated live stage' },
  { title: 'Garba & Dandiya', copy: 'Expansive dance zones for beginners, families and seasoned dancers alike.', image: '/images/garba-circle.jpg', alt: 'Garba dancers circling a glowing lamp' },
  { title: 'Immersive production', copy: 'A statement arrival, layered lighting and a designed stage turn the ground into a festival.', image: '/images/dates-night.jpg', alt: 'An illuminated festival entrance at night' },
];

const festivalDays = [
  {
    date: '17', day: 'Saturday', label: '17 October 2026', title: 'Opening Night',
    copy: 'The festival opens with a ceremonial welcome, community-led Garba and the first full Dandiya circle of the weekend.',
    status: 'Programme preview',
    programme: [
      ['6:00 PM', 'Gates open', 'Entry bands, box office support and venue orientation.'],
      ['7:00 PM', 'Opening Garba', 'A guided community circle for families and first-time dancers.'],
      ['8:00 PM', 'Live festival set', 'Folk-rooted music and Garba rhythms on the main stage.'],
      ['9:30 PM', 'Dandiya Raas', 'The main floor opens for paired-stick dancing.'],
      ['10:30 PM', 'Closing set', 'A high-energy finish to the opening night.'],
    ],
    venue: [
      { name: 'Main festival gate', short: 'Gate A', detail: 'General entry, box office support and entry bands.', x: 13, y: 78, featured: true, gate: true },
      { name: 'Family assistance gate', short: 'Gate B', detail: 'A quieter entry route for families and guests requiring assistance.', x: 87, y: 78, featured: false, gate: true },
      { name: 'Ceremony court', short: 'Court', detail: 'Opening-night welcome and community gathering point.', x: 33, y: 58, featured: true, gate: false },
      { name: 'Dance arena', short: 'Raas', detail: 'Primary Garba and Dandiya floor.', x: 56, y: 48, featured: true, gate: false },
      { name: 'Live stage', short: 'Stage', detail: 'Festival performances and closing set.', x: 80, y: 28, featured: false, gate: false },
      { name: 'Food court', short: 'Food', detail: 'Common food and refreshment zone.', x: 76, y: 63, featured: false, gate: false },
    ],
  },
  {
    date: '18', day: 'Sunday', label: '18 October 2026', title: 'Festival Peak',
    copy: 'The central night puts the dance floor first, moving from a community warm-up into a sustained live programme and Raas session.',
    status: 'Programme preview',
    programme: [
      ['6:00 PM', 'Gates open', 'Guest entry, refreshments and early access to the festival floor.'],
      ['7:00 PM', 'Community warm-up', 'A guided Garba session before the main programme.'],
      ['8:00 PM', 'Live Garba set', 'Traditional and contemporary festival rhythms.'],
      ['9:15 PM', 'Peak-night Raas', 'Extended Dandiya floor with the full central arena active.'],
      ['10:30 PM', 'DJ close', 'Bollywood, commercial and retro favourites.'],
    ],
    venue: [
      { name: 'Main festival gate', short: 'Gate A', detail: 'General entry and the fastest route to the main dance arena.', x: 13, y: 78, featured: true, gate: true },
      { name: 'Family assistance gate', short: 'Gate B', detail: 'A quieter entry route with direct access to guest services.', x: 87, y: 78, featured: true, gate: true },
      { name: 'Dance arena', short: 'Raas', detail: 'Expanded floor for the peak-night Garba and Raas programme.', x: 51, y: 49, featured: true, gate: false },
      { name: 'Live stage', short: 'Stage', detail: 'Live Garba programme and closing set.', x: 80, y: 28, featured: true, gate: false },
      { name: 'Food court', short: 'Food', detail: 'Common food and refreshment zone.', x: 76, y: 63, featured: true, gate: false },
      { name: 'Guest services', short: 'Help', detail: 'Information, support and first-aid direction.', x: 30, y: 67, featured: false, gate: false },
    ],
  },
];

const faqs = [
  ['When and where is the festival?', 'The festival is planned for 17 and 18 October 2026 at Phoenix Marketcity, Viman Nagar, Pune.'],
  ['Is the artist lineup confirmed?', 'The current lineup is tentative. Final artists, appearance dates and set timings will be shared closer to the festival.'],
  ['What is the average pass price?', 'The current average ticket price is ₹999. Final pass categories, inclusions and taxes will be announced when bookings open.'],
  ['Is the celebration family-friendly?', 'Yes. The festival is designed as a comfortable, community-led Navratri experience for families, couples and groups of friends.'],
  ['Will food and water be available?', 'Yes. The venue plan includes a common F&B zone and hydration points across the festival area.'],
];

const marqueeItems = [
  ['✦', 'Two nights'], ['♫', 'Live artists'], ['◎', 'Garba & Dandiya'], ['✧', 'Festive fashion'], ['5K+', 'Celebrating together'],
];

export default function Home({ staticPreview = false }: { staticPreview?: boolean }) {
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTouchStart = useRef(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeDay, setActiveDay] = useState(0);
  const [selectedGate, setSelectedGate] = useState(festivalDays[0].venue[0].name);
  const [selectedTierId, setSelectedTierId] = useState(ticketTiers[0].id);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDate, setBookingDate] = useState('17 October');
  const [bookingGate, setBookingGate] = useState(festivalDays[0].venue[0].name);
  const [ticketCount, setTicketCount] = useState(1);
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.df-reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.1 });
    elements.forEach((element) => observer.observe(element));
    const handleScroll = () => {
      setShowMobileCta(window.scrollY > window.innerHeight * 2);
      setShowScrollTop(window.scrollY > 600);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setCheckoutOpen(false); setBookingConfirmed(false); }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (heroPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setHeroSlide((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = Math.max(0, festivalStart - Date.now());
      setCountdown({
        days: Math.floor(remaining / 86400000),
        hours: Math.floor((remaining / 3600000) % 24),
        minutes: Math.floor((remaining / 60000) % 60),
        seconds: Math.floor((remaining / 1000) % 60),
      });
    };
    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = checkoutOpen || bookingConfirmed ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [checkoutOpen, bookingConfirmed]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    const header = document.querySelector<HTMLElement>('.df-header');
    const marquee = document.querySelector<HTMLElement>('.df-marquee');
    const offset = (header?.offsetHeight || 0) + (marquee?.offsetHeight || 0) + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  const continueToPayment = () => {
    if (!bookingGate) {
      setPaymentMessage('Select an entry gate before continuing.');
      return;
    }
    if (!termsAccepted) {
      setPaymentMessage('Accept the Terms & Conditions and Privacy Policy before continuing.');
      return;
    }
    setPaymentMessage('');
    setCheckoutOpen(false);
    setBookingConfirmed(true);
  };

  const verifyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponMessage('Enter a coupon code to verify.');
      return;
    }
    setCouponMessage('Coupon verification will activate with the payment gateway.');
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

  const changeNumber = () => {
    setCheckoutOpen(false);
    setPhoneVerified(false);
    setOtpSent(false);
    setOtp('');
    setOtpMessage('');
    window.requestAnimationFrame(() => {
      document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => document.querySelector<HTMLInputElement>('#mobile')?.focus(), 450);
    });
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(indianMobile())) nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    else if (!phoneVerified) nextErrors.phone = 'Verify your mobile number with the OTP.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setBookingName(form.name.trim());
    setBookingPhone(indianMobile());
    setBookingEmail(form.email.trim());
    setPaymentMessage('');
    setCouponMessage('');
    setCheckoutOpen(true);
  }

  const currentDay = festivalDays[activeDay] || festivalDays[0];
  const currentGates = currentDay.venue.filter((zone) => zone.gate);
  const selectedGateInfo = currentGates.find((gate) => gate.name === selectedGate) || currentGates[0];
  const currentBookingDay = festivalDays.find((day) => `${day.date} October` === bookingDate) || festivalDays[0];
  const selectedTier = ticketTiers.find((tier) => tier.id === selectedTierId) || ticketTiers[0];
  const passPrice = selectedTier.price;
  const showHeroSlide = (index: number) => setHeroSlide((index + heroSlides.length) % heroSlides.length);
  const selectPlannerDay = (index: number) => {
    const nextDay = festivalDays[index];
    setActiveDay(index);
    setSelectedGate(nextDay.venue[0].name);
    setBookingDate(`${nextDay.date} October`);
    setBookingGate(nextDay.venue[0].name);
  };
  const selectEntryGate = (gate: (typeof festivalDays)[number]['venue'][number]) => {
    setSelectedGate(gate.name);
    setBookingGate(gate.name);
  };
  const selectTicketTier = (tierId: string) => {
    setSelectedTierId(tierId);
    setTicketCount(1);
    setPaymentMessage('');
  };
  const continueWithPlan = () => {
    setBookingDate(`${currentDay.date} October`);
    setBookingGate(selectedGate);
    scrollToSection('register');
  };

  return (
    <main className="df-page" id="top">
      <a className="df-skip" href="#register">Skip to registration</a>
      <header className="df-header">
        <a className="df-brand" href="#top" aria-label="Times Internet | Dandiya Festival home" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Image src="/images/times-internet.png" alt="Times Internet" width={116} height={34} /><i aria-hidden="true" /><span><strong>Dandiya <em>Festival</em></strong><small>Pune · Navratri 2026</small></span></a>
        <button className={`df-menu-toggle ${menuOpen ? 'is-open' : ''}`} type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /><span /></button>
        <nav className={`df-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation"><a href="#festival" onClick={(event) => { event.preventDefault(); scrollToSection('festival'); }}>Festival</a><a href="#lineup" onClick={(event) => { event.preventDefault(); scrollToSection('lineup'); }}>Lineup</a><a href="#dates" onClick={(event) => { event.preventDefault(); scrollToSection('dates'); }}>Plan your night</a><a href="#venue" onClick={(event) => { event.preventDefault(); scrollToSection('venue'); }}>Venue layout</a><a href="#register" onClick={(event) => { event.preventDefault(); scrollToSection('register'); }}>Book tickets</a></nav>
        <a className="df-btn df-btn-small df-header-cta" href="#register" onClick={(event) => { event.preventDefault(); scrollToSection('register'); }}>Book festival passes</a>
      </header>

      <section className="df-hero df-hero-carousel" aria-roledescription="carousel" aria-label="Festival highlights" onFocus={() => setHeroPaused(true)} onBlur={() => setHeroPaused(false)} onTouchStart={(event) => { heroTouchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { const distance = event.changedTouches[0].clientX - heroTouchStart.current; if (Math.abs(distance) > 50) showHeroSlide(heroSlide + (distance < 0 ? 1 : -1)); }}>
        <div className="df-hero-slides">{heroSlides.map((slide, index) => <div className={`df-hero-media ${heroSlide === index ? 'is-active' : ''}`} aria-hidden={heroSlide !== index} key={slide.image}><Image src={slide.image} alt={heroSlide === index ? slide.alt : ''} fill priority={index === 0} sizes="100vw" /></div>)}</div>
        <div className="df-hero-overlay" aria-hidden="true" />
        <div className="df-hero-countdown" aria-label="Countdown to the festival"><span>Starts in</span><div>{[['Days', countdown.days], ['Hrs', countdown.hours], ['Min', countdown.minutes], ['Sec', countdown.seconds]].map(([label, value]) => <div key={String(label)}><strong>{String(value).padStart(2, '0')}</strong><small>{label}</small></div>)}</div><p>17 Oct · 6:00 PM</p></div>
        <div className="df-wrap df-hero-content">
          <p className="df-eyebrow" key={`eyebrow-${heroSlide}`}>{heroSlides[heroSlide].eyebrow}</p>
          <h1 key={`title-${heroSlide}`}>{heroSlides[heroSlide].title}</h1>
          <p className="df-hero-lede" key={`copy-${heroSlide}`}>{heroSlides[heroSlide].copy}</p>
          <div className="df-hero-facts" aria-label="Event date and venue">
            <div><span>Two festive nights</span><strong>17–18 October 2026</strong></div>
            <div><span>At the heart of Pune</span><strong>Phoenix Marketcity</strong><small>Viman Nagar, Pune</small></div>
          </div>
          <div className="df-hero-actions"><a className="df-btn" href="#dates" onClick={(event) => { event.preventDefault(); scrollToSection('dates'); }}>Choose your festival night <span>↗</span></a><a className="df-text-link" href="#festival" onClick={(event) => { event.preventDefault(); scrollToSection('festival'); }}>Discover the festival <span>↓</span></a></div>
        </div>
        <button className="df-hero-arrow df-hero-arrow-prev" type="button" aria-label="Previous festival image" onClick={() => showHeroSlide(heroSlide - 1)}>←</button>
        <div className="df-carousel-dots" role="tablist" aria-label="Choose festival image">{heroSlides.map((slide, index) => <button className={heroSlide === index ? 'is-active' : ''} type="button" role="tab" aria-selected={heroSlide === index} aria-label={`Show slide ${index + 1}: ${slide.title}`} key={slide.title} onClick={() => showHeroSlide(index)} />)}</div>
        <button className="df-hero-arrow df-hero-arrow-next" type="button" aria-label="Next festival image" onClick={() => showHeroSlide(heroSlide + 1)}>→</button>
      </section>

      <div className="df-marquee" aria-label="Festival overview"><div className="df-marquee-track"><div className="df-marquee-group">{marqueeItems.map(([icon, label]) => <span key={label}><b aria-hidden="true">{icon}</b>{label}</span>)}</div><div className="df-marquee-group" aria-hidden="true">{marqueeItems.map(([icon, label]) => <span key={`repeat-${label}`}><b aria-hidden="true">{icon}</b>{label}</span>)}</div></div></div>

      <section className="df-section df-story" id="festival"><div className="df-wrap">
        <div className="df-section-head df-reveal"><div><p className="df-eyebrow">Dandiya details</p><h2>The ritual.<br /><em>The rhythm.</em></h2></div><p>Dandiya Raas brings dancers together in paired circles, using decorated sticks in a festive expression associated with Durga and the triumph of good over evil.</p></div>
        <div className="df-story-grid df-reveal"><div className="df-story-photo"><Image src="/images/garba-circle.jpg" alt="Garba dancers moving around a glowing brass lamp" fill sizes="(max-width: 760px) 100vw, 56vw" /></div><div className="df-story-copy"><p className="df-story-kicker">Inside the circle</p><h3>Devotion, rhythm and a shared celebration</h3><p>Garba moves around a lamp or image of the Goddess. Dandiya adds paired-stick movement and faster rhythmic exchanges as the evening builds.</p><div className="df-dandiya-notes"><span><b>01</b>Beginner-friendly opening circles</span><span><b>02</b>Open community Garba sessions</span><span><b>03</b>Main-floor Dandiya Raas each night</span></div><small>Final programme and artist timings remain subject to confirmation.</small></div></div>
      </div></section>

      <section className="df-section df-night-planner" id="dates"><div className="df-wrap">
        <div className="df-planner-top df-reveal"><div><p className="df-eyebrow">Your festival plan</p><h2>Choose your night.<br /><em>Find your place in the circle.</em></h2><p>Pick 17 or 18 October. The programme, venue and entry route update together.</p></div><div className="df-night-tabs" role="tablist" aria-label="Choose festival date">{festivalDays.map((item, index) => <button className={activeDay === index ? 'is-active' : ''} type="button" role="tab" aria-selected={activeDay === index} key={item.date} onClick={() => selectPlannerDay(index)}><span>{item.day}</span><strong>{item.date}</strong><small>October</small></button>)}</div></div>
        <div className="df-night-widget df-reveal">
          <aside className="df-plan-summary"><div><span className="df-step-label">01 · Selected night</span><p>{currentDay.label}</p><h3>{currentDay.title}</h3><p>{currentDay.copy}</p></div><div className="df-plan-price"><span>{selectedTier.name}</span><strong>₹{selectedTier.price.toLocaleString('en-IN')}<small>/ person</small></strong><p>{selectedTier.availability} · {selectedTier.copy}</p></div></aside>
          <section className="df-plan-program" aria-live="polite"><div className="df-compact-title"><span className="df-step-label">02 · Programme</span><h3>Night schedule</h3></div><div>{currentDay.programme.map(([time, title, copy]) => <article key={`${currentDay.date}-${time}`}><span>{time}</span><div><h4>{title}</h4><p>{copy}</p></div></article>)}</div></section>
          <section className="df-plan-venue" id="venue">
            <div className="df-venue-heading"><div><span className="df-step-label">03 · Venue and passes</span><h3>Choose how you want to experience the night.</h3></div><p>Tap a dance ring, gallery or cabana. Your pass, price and booking summary update together.</p></div>
            <div className="df-venue-console">
              <div className="df-zone-map-card">
                <div className="df-zone-map" aria-label={`Interactive venue booking map for ${currentDay.label}`}>
                  <svg viewBox="0 0 1000 720" aria-hidden="true">
                    <defs>
                      <radialGradient id="df-stage-glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#e9a93d" stopOpacity=".42" /><stop offset="100%" stopColor="#e9a93d" stopOpacity="0" /></radialGradient>
                      <pattern id="df-map-grid" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="46" stroke="rgba(75,22,43,.09)" strokeWidth="1" /></pattern>
                    </defs>
                    <rect x="40" y="40" width="920" height="580" rx="46" className="df-map-shell" />
                    <rect x="40" y="40" width="920" height="580" rx="46" fill="url(#df-map-grid)" />
                    <text x="64" y="27" className="df-map-copy">PHOENIX MARKETCITY · FESTIVAL GROUND</text><text x="936" y="27" textAnchor="end" className="df-map-copy">N ↑</text>
                    <circle cx="500" cy="112" r="180" fill="url(#df-stage-glow)" />
                    <rect x="400" y="80" width="200" height="64" rx="12" className="df-map-stage" /><text x="500" y="106" textAnchor="middle" className="df-map-stage-title">LIVE STAGE</text><text x="500" y="125" textAnchor="middle" className="df-map-stage-sub">DJ · DHOL · ARTISTS</text>
                    <g className={`df-svg-zone df-svg-ground ${selectedTier.id === 'ground' ? 'is-selected' : ''}`}><circle className="df-zone-fill" cx="500" cy="400" r="220" /><circle className="df-zone-stroke" cx="500" cy="400" r="220" /></g>
                    <g className={`df-svg-zone df-svg-silver ${selectedTier.id === 'silver' ? 'is-selected' : ''}`}><circle className="df-zone-fill" cx="500" cy="400" r="150" /><circle className="df-zone-stroke" cx="500" cy="400" r="150" /></g>
                    <g className={`df-svg-zone df-svg-gold ${selectedTier.id === 'gold' ? 'is-selected' : ''}`}><circle className="df-zone-fill" cx="500" cy="400" r="75" /><circle className="df-zone-stroke" cx="500" cy="400" r="75" /><text x="500" y="405" textAnchor="middle">RAAS</text></g>
                    <g className={`df-svg-zone df-svg-cabana ${selectedTier.id === 'cabana' ? 'is-selected' : ''}`}><rect className="df-zone-fill" x="70" y="250" width="230" height="230" rx="22" /><rect className="df-zone-stroke" x="70" y="250" width="230" height="230" rx="22" /><text x="185" y="440" textAnchor="middle">ROYAL CABANA</text><text x="185" y="461" textAnchor="middle" className="df-zone-sub">PRIVATE PODS</text></g>
                    <g className={`df-svg-zone df-svg-gallery ${selectedTier.id === 'gallery' ? 'is-selected' : ''}`}><rect className="df-zone-fill" x="700" y="250" width="230" height="230" rx="22" /><rect className="df-zone-stroke" x="700" y="250" width="230" height="230" rx="22" /><path d="M720 460h190M730 430h170M740 400h150M750 370h130" /><text x="815" y="440" textAnchor="middle">SPECTATOR GALLERY</text><text x="815" y="461" textAnchor="middle" className="df-zone-sub">TIERED SEATING</text></g>
                    <g className="df-map-stall-row"><text x="500" y="618" textAnchor="middle">FOOD · CRAFT · GUEST SERVICES</text><path d="M110 630h780" /></g>
                    <g className="df-map-entry"><path d="M300 700l14-18 14 18M672 700l14-18 14 18" /><text x="314" y="716" textAnchor="middle">ENTRY A</text><text x="686" y="716" textAnchor="middle">ENTRY B</text></g>
                  </svg>
                  <div className="df-zone-hit-layer">
                    {[
                      ['cabana', 'rect', 'Royal Cabana'], ['gallery', 'rect', 'Spectator Gallery'], ['ground', 'circle', 'Community Ground'], ['silver', 'circle', 'Silver Circle'], ['gold', 'circle', 'Gold Circle'],
                    ].map(([id, shape, name]) => <button className={`df-zone-hit is-${id} ${shape}`} type="button" aria-label={`Select ${name}`} aria-pressed={selectedTier.id === id} key={id} onClick={() => selectTicketTier(id)} />)}
                  </div>
                </div>
                <div className="df-map-legend"><span><i style={{ background: '#146b62' }} />Plenty left</span><span><i style={{ background: '#c9791a' }} />Selling fast</span><span><i style={{ background: '#a23f63' }} />Almost full</span></div>
              </div>
              <aside className="df-ticket-console" aria-live="polite">
                <span className="df-step-label">Your selected pass</span>
                <h4><i style={{ background: selectedTier.color }} />{selectedTier.name}</h4>
                <p>{selectedTier.copy}</p>
                <div className="df-console-price"><strong>₹{selectedTier.price.toLocaleString('en-IN')}</strong><span>/ person</span></div>
                <div className="df-console-availability"><div><span>{selectedTier.availability}</span><span>{selectedTier.claimed}% claimed</span></div><i><b style={{ width: `${selectedTier.claimed}%`, background: selectedTier.color }} /></i></div>
                <div className="df-console-quantity"><span>Passes</span><div><button type="button" aria-label="Remove one pass" disabled={ticketCount <= 1} onClick={() => setTicketCount((count) => Math.max(1, count - 1))}>−</button><strong>{ticketCount}</strong><button type="button" aria-label="Add one pass" disabled={ticketCount >= 8} onClick={() => setTicketCount((count) => Math.min(8, count + 1))}>+</button></div></div>
                <div className="df-console-total"><span>Total</span><strong>₹{(selectedTier.price * ticketCount).toLocaleString('en-IN')}</strong></div>
                <button className="df-console-cta" type="button" onClick={continueWithPlan}>Continue with this pass <span>→</span></button>
                <div className="df-console-zones" aria-label="Choose pass category">{ticketTiers.map((tier) => <button className={selectedTier.id === tier.id ? 'is-selected' : ''} type="button" aria-pressed={selectedTier.id === tier.id} key={tier.id} onClick={() => selectTicketTier(tier.id)}><i style={{ background: tier.color }} /><span>{tier.name}</span><strong>₹{tier.price.toLocaleString('en-IN')}</strong></button>)}</div>
              </aside>
            </div>
            <div className="df-gate-block"><div><span className="df-step-label">Choose your entry</span><strong>{selectedGate}</strong><p>{selectedGateInfo.detail}</p></div><div className="df-gate-options" aria-label="Select entry gate">{currentGates.map((gate) => <button className={selectedGate === gate.name ? 'is-selected' : ''} type="button" aria-pressed={selectedGate === gate.name} key={gate.name} onClick={() => selectEntryGate(gate)}><span>{gate.short}</span><div><strong>{gate.name}</strong><small>{gate.detail}</small></div></button>)}</div></div>
            <small className="df-layout-note">Illustrative venue plan. Final layout, access routes and availability will be confirmed before the event.</small>
          </section>
        </div>
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

      <section className="df-section df-register" id="register"><div className="df-wrap df-register-grid">
        <div className="df-register-copy df-reveal"><p className="df-eyebrow">Your Raas night</p><h2>Step into<br /><em>the circle.</em></h2><p>Share your details to reserve the selected night, pass category and entry route.</p><div><span>2 nights</span><span>5,000+ expected</span><span>Pune</span></div></div>
        <form className="df-form df-reveal" onSubmit={handleSubmit} noValidate>
          <div className="df-form-selection"><span>Your selected plan</span><strong>{bookingDate} · {selectedTier.name} · {bookingGate}</strong><button type="button" onClick={() => scrollToSection('dates')}>Change</button></div>
          <label className="df-field df-field-wide"><span>Full name <b>*</b></span><input value={form.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} placeholder="Your name" autoComplete="name" />{errors.name && <small>{errors.name}</small>}</label>
          <div className="df-field df-field-wide"><label htmlFor="mobile">Mobile number <b>*</b></label><div className="df-phone-row"><input id="mobile" type="tel" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} placeholder="98765 43210" autoComplete="tel" disabled={phoneVerified} /><button type="button" onClick={phoneVerified ? changeNumber : requestOtp}>{phoneVerified ? 'Change number' : otpSent ? 'Resend OTP' : 'Send OTP'}</button></div>{errors.phone && <small>{errors.phone}</small>}{otpSent && !phoneVerified && <div className="df-otp"><input aria-label="Six digit OTP" inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(event) => updateOtp(event.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} /><span>{otpMessage}</span></div>}{phoneVerified && <span className="df-verified">Mobile number verified.</span>}</div>
          <label className="df-field df-field-wide"><span>Email <em>optional</em></span><input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} placeholder="you@example.com" autoComplete="email" />{errors.email && <small>{errors.email}</small>}</label>
          <button className="df-btn df-form-submit">Continue to checkout</button><p className="df-form-note">Verify your mobile number before choosing payment.</p>
        </form>
      </div></section>

      <section className="df-section df-faq" id="faqs"><div className="df-wrap df-faq-grid"><div className="df-faq-head df-reveal"><p className="df-eyebrow">Plan with confidence</p><h2>Everything you need<br />before the first beat.</h2><p>Dates, passes, artist updates and practical details in one clear place.</p></div><div className="df-faq-list df-reveal">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <footer className="df-footer"><div className="df-wrap"><div className="df-footer-cta"><a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><strong>Dandiya</strong> <em>Festival</em></a><button className="df-btn" type="button" onClick={() => scrollToSection('register')}>Book festival passes <span aria-hidden="true">→</span></button></div><div className="df-footer-bottom"><div><span>Organised by</span><Image src="/images/times-internet.png" alt="Times Internet" width={174} height={50} /></div><nav><a href="#festival" onClick={(event) => { event.preventDefault(); scrollToSection('festival'); }}>Festival</a><a href="#lineup" onClick={(event) => { event.preventDefault(); scrollToSection('lineup'); }}>Lineup</a><a href="#dates" onClick={(event) => { event.preventDefault(); scrollToSection('dates'); }}>Dates</a><a href="#venue" onClick={(event) => { event.preventDefault(); scrollToSection('venue'); }}>Venue</a><a href={staticPreview ? "#faqs" : "/privacy"}>Privacy Policy</a><a href={staticPreview ? "#faqs" : "/terms"}>Terms & Conditions</a></nav><p>© 2026 Times Internet<br />Details subject to final confirmation.</p></div></div></footer>
      {checkoutOpen && <div className="df-checkout-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCheckoutOpen(false); }}>
        <section className="df-checkout" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
          <div className="df-checkout-head"><div><p className="df-eyebrow">Secure your festival night</p><h2 id="checkout-title">Book your slots</h2><p>Select your night and number of passes.</p></div><button className="df-checkout-close" type="button" aria-label="Close booking" onClick={() => setCheckoutOpen(false)}>×</button></div>
          <div className="df-booking-summary">
            <div className="df-booking-dates" aria-label="Select festival date">{dates.map((item) => <button className={bookingDate === `${item.date} October` ? 'is-selected' : ''} type="button" key={item.date} onClick={() => { const nextDay = festivalDays.find((day) => day.date === item.date) || festivalDays[0]; setBookingDate(`${item.date} October`); setBookingGate(nextDay.venue[0].name); }}><span>{item.day}</span><strong>{item.date}</strong><small>October</small></button>)}</div>
            <div className="df-booking-tiers"><span>Pass category</span><div>{ticketTiers.map((tier) => <button className={selectedTier.id === tier.id ? 'is-selected' : ''} type="button" aria-pressed={selectedTier.id === tier.id} key={tier.id} onClick={() => selectTicketTier(tier.id)}><span>{tier.name}</span><strong>₹{tier.price.toLocaleString('en-IN')}</strong></button>)}</div></div>
            <div className="df-booking-gates"><span>Entry gate</span><div>{currentBookingDay.venue.filter((zone) => zone.gate).map((gate) => <button className={bookingGate === gate.name ? 'is-selected' : ''} type="button" key={gate.name} onClick={() => { setBookingGate(gate.name); setPaymentMessage(''); }}><strong>{gate.short}</strong><small>{gate.name}</small></button>)}</div></div>
            <div className="df-ticket-stepper"><div><span>{selectedTier.name}</span><small>₹{passPrice.toLocaleString('en-IN')} per person</small></div><div><button type="button" aria-label="Remove one pass" onClick={() => setTicketCount((count) => Math.max(1, count - 1))}>−</button><strong>{ticketCount}</strong><button type="button" aria-label="Add one pass" onClick={() => setTicketCount((count) => Math.min(8, count + 1))}>+</button></div></div>
            <div className="df-booking-total"><span>Booking total</span><strong>₹{(passPrice * ticketCount).toLocaleString('en-IN')}</strong><small>Taxes calculated by the payment provider</small></div>
          </div>
          <div className="df-booking-customer"><div><span>Booking for</span><strong>{bookingName}</strong><small>{bookingEmail || 'Email not provided'}</small></div><div><span>Verified mobile</span><strong>+91 {bookingPhone}</strong><button type="button" onClick={changeNumber}>Change number</button></div></div>
          <div className="df-coupon"><label htmlFor="coupon-code">Coupon code</label><div><input id="coupon-code" value={couponCode} onChange={(event) => { setCouponCode(event.target.value.toUpperCase().replace(/\s/g, '')); setCouponMessage(''); }} placeholder="Enter coupon code" /><button type="button" onClick={verifyCoupon}>Verify coupon</button></div><small>{couponMessage}</small></div>
          <label className="df-booking-consent"><input type="checkbox" checked={termsAccepted} onChange={(event) => { setTermsAccepted(event.target.checked); setPaymentMessage(''); }} /><span>I agree to the <a href={staticPreview ? "#faqs" : "/terms"}>Terms & Conditions</a> and <a href={staticPreview ? "#faqs" : "/privacy"}>Privacy Policy</a>.</span></label>
          <button className="df-btn df-payment-submit" type="button" onClick={continueToPayment}>Proceed to payment</button>
          <p className={`df-payment-message ${paymentMessage.startsWith('Payment preview') ? 'is-info' : ''}`} aria-live="polite">{paymentMessage || 'Payment options will be shown by the connected payment gateway.'}</p>
        </section>
      </div>}
      {bookingConfirmed && <div className="df-confirmation-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setBookingConfirmed(false); }}><section className="df-confirmation" role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><button type="button" className="df-confirmation-close" aria-label="Close booking confirmation" onClick={() => setBookingConfirmed(false)}>×</button><div className="df-confirmation-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m7 12.5 3.1 3.1L17.5 8" /></svg></div><p className="df-eyebrow">Payment received</p><h2 id="confirmation-title">Booking confirmed</h2><p>Your booking is confirmed. A receipt and final entry details will be sent to your verified mobile number after the payment gateway callback.</p><dl><div><dt>Festival night</dt><dd>{bookingDate} 2026</dd></div><div><dt>Pass category</dt><dd>{selectedTier.name}</dd></div><div><dt>Entry route</dt><dd>{bookingGate}</dd></div><div><dt>Passes</dt><dd>{ticketCount}</dd></div><div><dt>Amount paid</dt><dd>₹{(passPrice * ticketCount).toLocaleString('en-IN')}</dd></div><div><dt>Mobile</dt><dd>+91 {bookingPhone}</dd></div></dl><button className="df-btn" type="button" onClick={() => { setBookingConfirmed(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to festival</button><small>Preview confirmation. The backend must trigger this state only after verified payment success.</small></section></div>}
      <a className="df-whatsapp" href="https://wa.me/917718097101" target="_blank" rel="noreferrer" aria-label="Contact us on WhatsApp"><svg viewBox="0 0 16 16" aria-hidden="true"><path style={{ fill: '#fff', stroke: 'none' }} d="M13.601 2.326A7.854 7.854 0 0 0 1.735 12.51L.625 16.556l4.158-1.09a7.845 7.845 0 0 0 3.803.98h.003c4.338 0 7.856-3.522 7.856-7.856 0-2.099-.82-4.075-2.307-5.562l-.537-.702Zm-5.01 12.785a6.548 6.548 0 0 1-3.334-.909l-.238-.141-2.467.647.659-2.407-.156-.247a6.539 6.539 0 0 1-1.007-3.505c0-3.607 2.938-6.545 6.55-6.545a6.504 6.504 0 0 1 4.642 1.928 6.5 6.5 0 0 1 1.918 4.66c-.003 3.61-2.944 6.52-6.567 6.52Zm3.588-4.895c-.197-.098-1.165-.575-1.345-.64-.18-.065-.311-.098-.442.098-.131.197-.508.64-.623.771-.114.131-.229.148-.426.05-.197-.099-.832-.307-1.584-.98-.586-.522-.98-1.167-1.094-1.364-.114-.197-.012-.303.086-.401.088-.088.197-.23.295-.344.098-.115.131-.197.197-.328.065-.131.033-.246-.016-.344-.05-.099-.443-1.067-.607-1.462-.16-.385-.323-.332-.443-.338l-.377-.007a.724.724 0 0 0-.525.246c-.18.197-.689.673-.689 1.64 0 .968.705 1.902.803 2.034.098.131 1.387 2.116 3.36 2.968.47.202.836.323 1.12.413.471.15.9.129 1.238.078.378-.057 1.166-.476 1.33-.935.164-.459.164-.852.115-.935-.05-.082-.18-.131-.377-.23Z" /></svg></a>
      <button className={`df-back-top ${showScrollTop ? 'is-visible' : ''}`} type="button" aria-label="Scroll back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6" /></svg></button>
      <div className={`df-mobile-cta ${showMobileCta ? 'is-visible' : ''}`}><button className="df-btn" type="button" onClick={() => scrollToSection('register')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v3a3 3 0 0 0 0 6v3a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18v-3a3 3 0 0 0 0-6V6A1.5 1.5 0 0 1 5 4.5Z" /><path d="M12 7.5v9" /></svg><span>Book festival passes</span></button></div>
    </main>
  );
}
