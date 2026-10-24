import { useEffect, useRef, useState } from 'react';
import {
  Utensils, Sparkles, Wand2, Crown, CalendarCheck, Camera, X, MapPin,
  CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight, Send, Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const WA = '919037159997';
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const galleryImages = Array.from({ length: 13 }, (_, i) => `/gallery/${i + 1}.jpeg`);

const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

const InstagramIcon = ({ size = 24, className = '' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const services = [
  {
    image: '/first.png', icon: <Crown size={22} />, title: 'Planning & Hospitality',
    short: 'A–Z event planning, VIP hospitality and flawless coordination.',
    tone: 'bg-gradient-to-br from-[#fff2cc] to-[#f6d98a] text-[#1f1a14]',
    details: [
      'Complete A–Z event planning & personalized concepts',
      'Luxury and budget-friendly destination wedding packages',
      '3D venue preview & dedicated event coordination',
      'Emergency backup plans for weather & technical issues',
      'VIP hospitality, bridal lounge & guest accommodation',
      'Cleaning staff, parking security & service management',
      'Customized wedding branding & return gift curation',
      'College functions, convocations & corporate events',
    ],
  },
  {
    image: '/second.png', icon: <Sparkles size={22} />, title: 'Theme & Décor',
    short: 'Custom stages, floral designs and premium venue transformations.',
    tone: 'bg-gradient-to-br from-[#ffffff] to-[#efebe0] text-[#1f1a14]',
    details: [
      'Theme-based wedding & premium stage decorations',
      'Custom floral designs tailored to client preferences',
      'Complete dining area decor (buffet, seating, dishware)',
      'Seasonal themes (Christmas, Onam, etc.) & party services',
    ],
  },
  {
    image: '/third.png', icon: <Utensils size={22} />, title: 'Premium Catering',
    short: 'Customized menus, diverse counters and efficient catering staff.',
    tone: 'bg-gradient-to-br from-[#f3d57e] to-[#d9a93a] text-[#1f1a14]',
    details: [
      'Premium catering with custom-tailored delicious menus',
      'Specialty juice, tea, and unique dessert counters',
      'Custom-packed dates & nuts for Nikkah programs',
      'Complete Iftar party packages (food, decor & managing)',
    ],
  },
  {
    image: '/fourth.png', icon: <Wand2 size={22} />, title: 'Grand Entries & VFX',
    short: 'Pyrotechnics, LED walls and spectacular bride & groom entries.',
    tone: 'bg-gradient-to-br from-[#fbf7ee] to-[#e2dac6] text-[#1f1a14]',
    details: [
      'Spectacular bride & groom entry concepts with VFX',
      'Cold pyrotechnics, fireworks, and special effects',
      'Immersive LED walls and synchronized lighting',
      'Luxury car rentals, live music, DJs & celebrity bookings',
    ],
  },
  {
    image: '/fifth.png', icon: <Camera size={22} />, title: 'Cinematic Media',
    short: 'Professional photography, drone coverage and highlight reels.',
    tone: 'bg-gradient-to-br from-[#ffe9b0] to-[#e8b84f] text-[#1f1a14]',
    details: [
      'Cinematic videography & professional photography',
      'Live streaming and comprehensive drone coverage',
      'Post-event highlight reels delivered within 24–48 hours',
      'Real-time social media content creation',
    ],
  },
  {
    image: '/sixth.png', icon: <CalendarCheck size={22} />, title: 'Scope & Future',
    short: 'Meeting the growing demand for professional event organizers.',
    tone: 'bg-gradient-to-br from-[#ffffff] to-[#f9e8bd] text-[#1f1a14]',
    details: [
      'Expanding industry scope due to increasing demand',
      'Focus on customized catering and destination weddings',
      'Growth in themed events and specialized corporate functions',
    ],
  },
];

const steps = [
  [
    'Share the idea',
    'Tell us the occasion, the guest count and the mood you have in mind. We study the venue layout and build a clear plan that fits your budget.',
    ['Venue layout', 'Guest flow', 'Mood & theme', 'Budget plan'],
    'bg-gradient-to-br from-[#fff9e8] to-[#f4e8c8] text-[#1f1a14]',
    'bg-white/70 text-[#1f1a14]',
  ],
  [
    'Shape the plan',
    'Before anything is built on site, you see a 3D preview of the stage and decor alongside a tailored menu and live counter selection.',
    ['Custom concepts', '3D venue preview', 'Stage & florals', 'Menu selection'],
    'bg-gradient-to-br from-[#fdeaa9] to-[#f1cd70] text-[#1f1a14]',
    'bg-white/60 text-[#1f1a14]',
  ],
  [
    'Run the day',
    'One team looks after the entire floor. Stage setup, catering counters, guest parking, VIP hospitality and grand entries run together smoothly.',
    ['Stage & decor', 'Full catering', 'Grand entries', 'Guest care'],
    'bg-gradient-to-br from-[#e9bd55] to-[#bf8c22] text-[#1f1a14]',
    'bg-white/50 text-[#1f1a14]',
  ],
  [
    'Relive it all',
    'While you spend time with family and guests, our photo and drone crew capture the celebration and put together your highlight film.',
    ['Photography', 'Cinema film', 'Drone coverage', 'Highlight edit'],
    'bg-gradient-to-br from-[#9a6f10] to-[#4a300a] text-white',
    'bg-white/15 text-[#ffe08a]',
  ],
];

const navItems = [['top', 'Home'], ['services', 'What we do'], ['how', 'How it works'], ['gallery', 'Our work'], ['plan', 'Plan your event']];
const eventTypes = ['Wedding', 'Nikkah', 'Reception', 'Corporate', 'Birthday', 'Other'];
const marquee = ['Weddings', 'Nikkah', 'Receptions', 'Corporate events', 'Birthdays', 'Convocations', 'Iftar parties', 'Destination weddings'];

export default function App() {
  const [light, setLight] = useState(null);
  const [active, setActive] = useState('top');
  const [step, setStep] = useState(0);
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({ type: 'Wedding', name: '', date: '', guests: '' });

  const root = useRef(null);
  const lenisRef = useRef(null);

  const go = (id) => lenisRef.current?.scrollTo(id, { offset: -80, duration: 1.2 });

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const lock = light !== null;
    document.body.style.overflow = lock ? 'hidden' : '';
    if (lock) lenisRef.current?.stop(); else lenisRef.current?.start();
  }, [light]);

  useEffect(() => {
    if (light !== null) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % galleryImages.length), 4000);
    return () => clearInterval(id);
  }, [light]);

  useEffect(() => {
    if (light === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLight(null);
      if (e.key === 'ArrowRight') setLight((i) => (i + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setLight((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [light]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const desktop = window.matchMedia('(min-width: 768px)').matches;

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-word', { yPercent: 110, duration: 0.9, stagger: 0.05 })
        .from('.hero-fade', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
        .from('.hero-cols', { y: 50, opacity: 0, duration: 1 }, 0.1);

      const cards = gsap.utils.toArray('.stack-card');
      if (!reduce) {
        cards.slice(0, -1).forEach((c, i) => {
          gsap.to(c, { scale: desktop ? 0.96 : 0.94, ease: 'none', scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 15%', scrub: true } });
        });
      }

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 28, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });

      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

      navItems.forEach(([id]) => {
        ScrollTrigger.create({ trigger: `#${id}`, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => self.isActive && setActive(id) });
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const parts = [`Hi Zelaris Events! ${form.name ? `I'm ${form.name}. ` : ''}I'm planning a ${form.type.toLowerCase()}`];
    if (form.date) parts.push(`on ${form.date}`);
    if (form.guests) parts.push(`for around ${form.guests} guests`);
    window.open(wa(`${parts.join(' ')}. Can we talk?`), '_blank', 'noopener');
  };

  const field = 'w-full rounded-lg border border-[#1f1a14]/15 bg-white px-3.5 py-2.5 text-sm text-[#1f1a14] outline-none transition focus:border-[#c8992b] focus:ring-4 focus:ring-[#c8992b]/20';

  return (
    <div ref={root} className="page-bg relative text-[#1f1a14] selection:bg-[#f6e7bd] selection:text-[#1f1a14]" style={{ fontFamily: "'Montserrat', system-ui, sans-serif", overflowX: 'clip' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; letter-spacing: -0.01em; }
        .page-bg { background: linear-gradient(180deg,#fff4d9 0%,#fffaf0 6%,#ffffff 12%,#fff0f4 20%,#fffaf0 28%,#ffffff 36%,#eef4ff 45%,#fff8e6 54%,#ffffff 62%,#fdf0e0 71%,#fffdf6 80%,#fff4d9 90%,#f8e6b5 100%); }
        @media (min-width: 768px) { .page-bg { background: linear-gradient(180deg,#fdebb8 0%,#fff6dc 12%,#ffffff 25%,#f6f3ec 37%,#fbecc4 50%,#fffaf0 63%,#f4f1ea 75%,#f8e2a6 90%,#f3dc9a 100%); } }
        @keyframes drift { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(30px,-20px) scale(1.1) } }
        @keyframes marquee { to { transform: translateX(-50%) } }
        @keyframes colup { to { transform: translateY(-50%) } }
        @keyframes coldown { from { transform: translateY(-50%) } to { transform: translateY(0) } }
        @keyframes ping2 { 75%,100% { transform: scale(1.8); opacity: 0 } }
        .col-up { animation: colup 45s linear infinite }
        .col-down { animation: coldown 52s linear infinite }
        .hero-cols:hover .col-up, .hero-cols:hover .col-down { animation-play-state: paused }
        .drift { animation: drift 14s ease-in-out infinite }
        .marquee { animation: marquee 45s linear infinite }
        .ping2 { animation: ping2 2.2s cubic-bezier(0,0,.2,1) infinite }
        html, body { overflow-anchor: none; }
        a:focus-visible, button:focus-visible, [role="button"]:focus-visible { outline: 2px solid #9a6f10; outline-offset: 2px }
        @media (prefers-reduced-motion: reduce) { .drift,.marquee,.ping2,.col-up,.col-down { animation: none } }
      `}</style>

      {/* scroll progress */}
      <div className="progress fixed left-0 top-0 z-[90] h-[3px] w-full origin-left scale-x-0 bg-gradient-to-r from-[#e6c36a] via-[#c8992b] to-[#9a6f10]" />

      {/* nav */}
      <header className="fixed left-0 top-3 z-[80] flex w-full justify-center px-3 md:top-4">
        <nav className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border border-white/30 bg-gradient-to-r from-[#2b1d0a] via-[#6b4a10] to-[#b88a22] py-2.5 pl-5 pr-2.5 text-white shadow-[0_12px_40px_-12px_rgba(60,35,5,0.55)] md:pl-7">
          <button onClick={() => go('#top')} aria-label="Back to top" className="shrink-0">
            <img src="/logo.png" alt="Zelaris Events" className="h-10 w-auto md:h-11" />
          </button>
          <div className="hidden items-center gap-7 text-[13px] uppercase tracking-widest font-medium lg:flex">
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => go(`#${id}`)} className={`relative py-1 transition ${active === id ? 'text-[#ffe08a]' : 'text-white/80 hover:text-white'}`}>
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#ffe08a] transition-all duration-300 ${active === id ? 'w-full' : 'w-0'}`} />
              </button>
            ))}
          </div>
          <span className="truncate text-xs tracking-wider uppercase font-medium text-[#ffe08a] lg:hidden">{navItems.find(([id]) => id === active)?.[1]}</span>
          <a href={wa("Hi Zelaris Events! I'd like to inquire about booking an event.")} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#fff1c9] to-[#ffd9b0] px-4 py-2.5 text-sm font-medium transition hover:scale-105">
            <WhatsAppIcon size={16} className="text-[#2b1d0a]" /> <span className="hidden text-[#2b1d0a] sm:inline">Chat with us</span><span className="sm:hidden text-[#2b1d0a]">Chat</span>
          </a>
        </nav>
      </header>

      {/* floating whatsapp */}
      <a href={wa('Hi Zelaris Events!')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-[80] grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105">
        <span className="ping2 absolute inset-0 rounded-full bg-[#25d366]/50" />
        <WhatsAppIcon size={24} className="relative" />
      </a>

      {/* hero */}
      <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[5.25rem] text-[#1f1a14] md:pt-28">
        <div className="drift absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#f3d57e]/50 blur-[100px]" />
        <div className="drift absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-[#e8c25a]/30 blur-[110px]" style={{ animationDelay: '-6s' }} />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-4 px-5 py-4 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-8 md:py-8">
          <div className="hero-copy text-center md:text-left">
            <h1 className="font-display text-[1.9rem] font-medium leading-[1.12] tracking-tight sm:text-5xl xl:text-[3.5rem]">
              {'Your celebration, planned down to the last detail.'.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <span className="hero-word inline-block">{w}&nbsp;</span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mx-auto mt-3 max-w-lg text-sm font-light leading-relaxed md:mt-5 md:text-[17px] text-[#1f1a14]/70 md:mx-0">
              Weddings, receptions and corporate events anywhere in India. Décor, catering, grand entries and cinematic coverage, all handled by one friendly team.
            </p>
            <div className="hero-fade mt-4 flex flex-row items-center justify-center gap-2.5 md:mt-7 md:justify-start md:gap-3">
              <a href={wa("Hi Zelaris Events! I'd like to inquire about booking an event.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#c8992b] px-5 py-2.5 text-[14px] font-medium tracking-wide text-[#1f1a14] shadow-md md:px-6 md:py-3 md:text-[15px] transition hover:bg-[#b8891f]">
                Book your event <ArrowUpRight size={18} />
              </a>
              <button onClick={() => go('#services')} className="rounded-full border border-[#1f1a14]/25 px-5 py-2.5 text-[14px] font-medium tracking-wide md:px-6 md:py-3 md:text-[15px] text-[#1f1a14] transition hover:bg-[#faf6ec]">
                See what we do
              </button>
            </div>
          </div>

          <div className="hero-cols grid h-[26svh] grid-cols-2 gap-3 md:h-[58vh]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)' }}>
            {[0, 1].map((col) => {
              const order = col ? [3, 4, 5, 0, 1, 2] : [0, 1, 2, 3, 4, 5];
              return (
                <div key={col} className="overflow-hidden">
                  <div className={col ? 'col-down' : 'col-up'}>
                    {[...order, ...order].map((n, i) => (
                      <img key={i} src={services[n].image} alt={i < 6 ? services[n].title : ''} aria-hidden={i >= 6} className="mb-3 aspect-[3/4] w-full rounded-2xl object-cover shadow-md" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* gold ticker */}
        <div className="hero-fade relative z-10 overflow-hidden bg-gradient-to-r from-[#e6c36a] via-[#c8992b] to-[#e6c36a] py-2.5 text-[#1f1a14] md:py-3">
          <div className="marquee flex w-max gap-8 whitespace-nowrap font-display text-lg font-medium md:text-xl">
            {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-8">{m}<Sparkles size={18} /></span>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-20 pt-20 md:px-8 md:pt-28">
        <div className="reveal mb-10 max-w-2xl md:mb-14">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">Everything your day needs, under one roof.</h2>
          <p className="mt-3 text-base font-light text-[#1f1a14]/70 md:text-lg">From the first idea to the last dance. Scroll through what we take care of.</p>
        </div>

        {services.map((s, i) => (
          <article key={s.title} className="stack-card sticky mb-[8vh] md:mb-[12vh]" style={{ top: `calc(5.5rem + ${i * 0.4}rem)` }}>
            <div className={`flex h-[clamp(540px,calc(100svh-8.5rem),700px)] flex-col overflow-hidden rounded-3xl border border-[#eadfc4] shadow-[0_20px_50px_-20px_rgba(31,26,20,0.35)] md:grid md:h-[clamp(560px,calc(100svh-8rem),680px)] md:grid-cols-2 ${s.tone}`}>
              <div className="flex shrink-0 flex-col justify-center gap-2 p-4 md:shrink md:gap-4 md:p-10">
                <span className="hidden h-11 w-11 place-items-center rounded-xl bg-black/10 md:grid">{s.icon}</span>
                <h3 className="font-display text-3xl font-medium tracking-tight md:text-4xl">{s.title}</h3>
                <p className="text-sm font-light opacity-80 md:text-lg">{s.short}</p>
                <ul className="space-y-1 md:space-y-2 mt-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-[13px] font-light leading-snug md:gap-2.5 md:text-base">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 opacity-80" /> <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative order-first min-h-[110px] flex-1 md:order-last md:min-h-full md:flex-none">
                <img src={s.image} alt={s.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* how it works */}
      <section id="how" className="mx-auto flex min-h-[100svh] max-w-7xl scroll-mt-24 flex-col justify-center px-4 pb-6 pt-[5.5rem] md:block md:min-h-0 md:px-8 md:pb-28 md:pt-8">
        <div>
          <div className="reveal mb-4 flex flex-col justify-between gap-1.5 md:mb-12 md:flex-row md:items-end">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">
              From “hello” to the last dance.
            </h2>
            <p className="max-w-md text-sm font-light text-[#1f1a14]/70 md:text-lg">
              Tap or hover through how we bring your celebration together.
            </p>
          </div>

          <div className="reveal flex h-[clamp(380px,calc(100svh-13.5rem),620px)] flex-col gap-2.5 md:h-[330px] md:flex-row">
            {steps.map(([title, desc, tags, tone, pillTone], i) => {
              const open = step === i;
              return (
                <div
                  key={title}
                  onClick={() => setStep(i)}
                  onMouseEnter={() => setStep(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setStep(i))}
                  className={`relative cursor-pointer overflow-hidden rounded-3xl shadow-[0_14px_36px_-20px_rgba(31,26,20,0.35)] transition-[flex] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${tone} ${
                    open ? 'flex-[3.4] md:flex-[3.6]' : 'flex-[0.5] md:flex-[0.7]'
                  }`}
                >
                  <div
                    className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-200 md:justify-center md:px-0 ${
                      open ? 'pointer-events-none opacity-0' : 'opacity-100 delay-100'
                    }`}
                  >
                    <span className="font-display whitespace-nowrap text-xl font-medium tracking-tight md:rotate-180 md:text-2xl md:[writing-mode:vertical-rl]">
                      {title}
                    </span>
                    <span className="text-xs font-light opacity-50 md:hidden">Open</span>
                  </div>

                  <div
                    className={`absolute inset-0 flex flex-col justify-between gap-3 p-4 transition-opacity duration-300 md:right-auto md:w-[34rem] md:p-8 ${
                      open ? 'opacity-100 delay-150' : 'pointer-events-none opacity-0'
                    }`}
                  >
                    <div className="max-w-lg">
                      <h3 className="font-display text-2xl font-medium tracking-tight md:text-4xl">{title}</h3>
                      <p className="mt-2 text-sm font-light leading-relaxed opacity-85 md:mt-3 md:text-base">{desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <span key={t} className={`rounded-full px-3 py-1.5 text-xs font-medium md:px-3.5 md:py-1.5 md:text-[0.8rem] ${pillTone}`}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section id="gallery" className="flex min-h-[100svh] scroll-mt-24 flex-col justify-center px-4 pb-6 pt-[5.5rem] md:block md:min-h-0 md:px-8 md:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="reveal mb-3 flex items-end justify-between gap-3 md:mb-6">
            <div>
              <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">
                Events we’ve brought to life.
              </h2>
              <p className="mt-2 hidden text-sm font-light text-[#1f1a14]/70 md:block md:text-base">
                Pick any photo below or tap the stage to view it full screen.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSlide((s) => (s - 1 + galleryImages.length) % galleryImages.length)}
                aria-label="Previous photo"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#1f1a14]/20 bg-white text-[#1f1a14] transition hover:bg-[#c8992b]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => setSlide((s) => (s + 1) % galleryImages.length)}
                aria-label="Next photo"
                className="grid h-10 w-10 place-items-center rounded-full border border-[#1f1a14]/20 bg-white text-[#1f1a14] transition hover:bg-[#c8992b]"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            onClick={() => setLight(slide)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLight(slide)}
            className="reveal group relative mb-3 h-[36svh] w-full cursor-pointer overflow-hidden rounded-3xl border border-[#eadfc4] bg-[#faf6ec] shadow-xl md:h-[44vh] md:min-h-[300px]"
          >
            {galleryImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Zelaris event"
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  slide === i ? 'scale-100 opacity-100' : 'pointer-events-none scale-105 opacity-0'
                }`}
              />
            ))}
            <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-[#1f1a14] backdrop-blur-md transition group-hover:bg-[#c8992b]">
              <Maximize2 size={16} />
            </span>
          </div>

          <div className="reveal grid grid-cols-5 gap-2 sm:grid-cols-7 lg:grid-cols-[repeat(13,minmax(0,1fr))]">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setSlide(i)}
                onDoubleClick={() => setLight(i)}
                aria-label={`Select photo ${i + 1}`}
                className={`relative aspect-[3/2] overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                  slide === i
                    ? 'border-[#c8992b] opacity-100 shadow-md'
                    : 'border-transparent opacity-50 hover:opacity-90'
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* plan your event */}
      <section id="plan" className="flex min-h-[100svh] scroll-mt-24 flex-col justify-center px-4 pb-6 pt-[5.5rem] md:block md:min-h-0 md:px-5 md:py-28">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-5 md:grid-cols-2 md:gap-12">
          <div className="reveal">
            <h2 className="font-display text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-[2.75rem]">Tell us the date. We’ll take it from there.</h2>
            <p className="mt-4 hidden max-w-md text-base font-light text-[#1f1a14]/80 md:block md:text-lg">Fill in a few details and we’ll open WhatsApp with your message ready to send. A real person replies, usually the same day.</p>
          </div>
          <form onSubmit={submit} className="reveal space-y-3 rounded-3xl border border-[#eadfc4] bg-white p-4 shadow-xl md:space-y-4 md:p-7">
            <div>
              <p className="mb-2 text-sm font-medium">What are you planning?</p>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((t) => (
                  <button type="button" key={t} onClick={() => setForm({ ...form, type: t })} className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${form.type === t ? 'border-[#c8992b] bg-[#c8992b] text-[#1f1a14]' : 'border-[#1f1a14]/15 bg-white hover:border-[#c8992b]'}`}>{t}</button>
                ))}
              </div>
            </div>
            <label className="block text-sm font-medium">Your name
              <input className={`${field} mt-1.5 font-light`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" autoComplete="name" />
            </label>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <label className="block text-sm font-medium">Event date
                <input type="date" className={`${field} mt-1.5 font-light`} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <label className="block text-sm font-medium">Guests
                <input type="number" min="1" inputMode="numeric" className={`${field} mt-1.5 font-light`} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} placeholder="About how many?" />
              </label>
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f1a14] py-3 text-sm font-medium text-white transition hover:bg-[#9a6f10]">
              <Send size={16} /> Send on WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer className="bg-[#2b1d0a] px-6 pb-8 pt-16 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <div className="max-w-md">
              <img src="/logo.png" alt="Zelaris Events" className="mb-5 w-40 md:w-48" />
              <p className="mb-6 text-sm font-light leading-relaxed text-white/70 md:text-base">
                Events for a brighter tomorrow. Providing budget-friendly and luxury services anywhere in India.
              </p>
              <div className="flex items-center gap-4 text-white/85">
                <a href="https://www.instagram.com/zelarisevents/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:text-[#ffe08a]">
                  <InstagramIcon size={22} />
                </a>
                <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition hover:text-[#ffe08a]">
                  <WhatsAppIcon size={22} />
                </a>
              </div>
            </div>

            <div className="md:text-right">
              <h4 className="mb-4 text-base font-medium">Contact Info</h4>
              <ul className="space-y-3 text-sm font-light text-white/70 md:text-base">
                <li className="flex items-center gap-2 md:justify-end">
                  <span>Services Anywhere in India</span>
                  <MapPin size={18} className="shrink-0 text-[#ffe08a]" />
                </li>
                <li><a href="tel:+919037090810" className="transition hover:text-[#ffe08a]">Riswan: +91 90370 90810</a></li>
                <li><a href="tel:+919037159997" className="transition hover:text-[#ffe08a]">Ansif: +91 90371 59997</a></li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-4 border-t border-white/15 pt-6 text-sm font-light text-white/55 md:grid-cols-3">
            <p className="order-2 text-center md:order-1 md:text-left">
              &copy; {new Date().getFullYear()} Zelaris Events. All rights reserved.
            </p>

            <p
              className="order-1 text-center text-xs font-medium uppercase tracking-[0.3em] text-[#ffe08a] md:order-2 md:text-sm"
              style={{ paddingLeft: '0.3em' }}
            >
              A ZAC VENTURE
            </p>

            <div className="order-3 flex justify-center md:justify-end">
              <a href="https://wa.me/917558957246" target="_blank" rel="noopener noreferrer" title="Contact Developer" className="font-display text-lg italic text-white/65 transition hover:text-[#ffe08a]">
                R.
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* lightbox */}
      {light !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1f1a14]/90 p-4 backdrop-blur-md" onClick={() => setLight(null)} role="dialog" aria-modal="true">
          <button onClick={() => setLight(null)} aria-label="Close" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"><X size={20} /></button>
          <button onClick={(e) => { e.stopPropagation(); setLight((light - 1 + galleryImages.length) % galleryImages.length); }} aria-label="Previous photo" className="absolute left-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:left-8"><ChevronLeft size={22} /></button>
          <img src={galleryImages[light]} alt="Zelaris event" onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl" />
          <button onClick={(e) => { e.stopPropagation(); setLight((light + 1) % galleryImages.length); }} aria-label="Next photo" className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25 md:right-8"><ChevronRight size={22} /></button>
        </div>
      )}
    </div>
  );
}