import { useEffect, useRef, useState } from 'react';
import {
  Utensils, Sparkles, Wand2, Crown, CalendarCheck, Camera, X, MapPin,
  CheckCircle2, ArrowUpRight, ChevronLeft, ChevronRight, Send, Maximize2,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

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
    image: '/first.png', icon: <Crown size={26} />, title: 'Planning & Hospitality',
    short: 'A–Z event planning, VIP hospitality and flawless coordination.',
    tone: 'bg-[#ffb627] text-[#2a1500]',
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
    image: '/second.png', icon: <Sparkles size={26} />, title: 'Theme & Décor',
    short: 'Custom stages, floral designs and premium venue transformations.',
    tone: 'bg-[#d12f6a] text-white',
    details: [
      'Theme-based wedding & premium stage decorations',
      'Custom floral designs tailored to client preferences',
      'Complete dining area decor (buffet, seating, dishware)',
      'Seasonal themes (Christmas, Onam, etc.) & party services',
    ],
  },
  {
    image: '/third.png', icon: <Utensils size={26} />, title: 'Premium Catering',
    short: 'Customized menus, diverse counters and efficient catering staff.',
    tone: 'bg-[#0e5a55] text-[#fdf3e3]',
    details: [
      'Premium catering with custom-tailored delicious menus',
      'Specialty juice, tea, and unique dessert counters',
      'Custom-packed dates & nuts for Nikkah programs',
      'Complete Iftar party packages (food, decor & managing)',
    ],
  },
  {
    image: '/fourth.png', icon: <Wand2 size={26} />, title: 'Grand Entries & VFX',
    short: 'Pyrotechnics, LED walls and spectacular bride & groom entries.',
    tone: 'bg-[#4a1d7c] text-white',
    details: [
      'Spectacular bride & groom entry concepts with VFX',
      'Cold pyrotechnics, fireworks, and special effects',
      'Immersive LED walls and synchronized lighting',
      'Luxury car rentals, live music, DJs & celebrity bookings',
    ],
  },
  {
    image: '/fifth.png', icon: <Camera size={26} />, title: 'Cinematic Media',
    short: 'Professional photography, drone coverage and highlight reels.',
    tone: 'bg-[#ff7a59] text-[#2a0f08]',
    details: [
      'Cinematic videography & professional photography',
      'Live streaming and comprehensive drone coverage',
      'Post-event highlight reels delivered within 24–48 hours',
      'Real-time social media content creation',
    ],
  },
  {
    image: '/sixth.png', icon: <CalendarCheck size={26} />, title: 'Scope & Future',
    short: 'Meeting the growing demand for professional event organizers.',
    tone: 'bg-[#fff1dc] text-[#2a1500]',
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
    'bg-[#fff1dc] text-[#2a1500]',
    'bg-[#2a1500]/10 text-[#2a1500]',
  ],
  [
    'Shape the plan',
    'Before anything is built on site, you see a 3D preview of the stage and decor alongside a tailored menu and live counter selection.',
    ['Custom concepts', '3D venue preview', 'Stage & florals', 'Menu selection'],
    'bg-[#ffb627] text-[#2a1500]',
    'bg-[#2a1500]/12 text-[#2a1500]',
  ],
  [
    'Run the day',
    'One team looks after the entire floor. Stage setup, catering counters, guest parking, VIP hospitality and grand entries run together smoothly.',
    ['Stage & decor', 'Full catering', 'Grand entries', 'Guest care'],
    'bg-[#d12f6a] text-white',
    'bg-white/15 text-white',
  ],
  [
    'Relive it all',
    'While you spend time with family and guests, our photo and drone crew capture the celebration and put together your highlight film.',
    ['Photography', 'Cinema film', 'Drone coverage', 'Highlight edit'],
    'bg-[#14061f] text-white',
    'bg-white/10 text-[#ffb627]',
  ],
];

const navItems = [['top', 'Home'], ['services', 'What we do'], ['how', 'How it works'], ['gallery', 'Our work'], ['plan', 'Plan your event']];
const eventTypes = ['Wedding', 'Nikkah', 'Reception', 'Corporate', 'Birthday', 'Other'];
const marquee = ['Weddings', 'Nikkah', 'Receptions', 'Corporate events', 'Birthdays', 'Convocations', 'Iftar parties', 'Destination weddings'];

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [light, setLight] = useState(null);
  const [active, setActive] = useState('top');
  const [step, setStep] = useState(0);
  const [slide, setSlide] = useState(0);
  const [form, setForm] = useState({ type: 'Wedding', name: '', date: '', guests: '' });

  const root = useRef(null);
  const lenisRef = useRef(null);
  const touchX = useRef(0);

  const go = (id) => lenisRef.current?.scrollTo(id, { offset: -80, duration: 1.4 });

  // preload initial assets
  useEffect(() => {
    const urls = ['/logo.png', ...services.map((s) => s.image)];
    let done = 0;
    const start = performance.now();
    const tick = () => {
      done++;
      setLoadProgress(Math.round((done / urls.length) * 100));
      if (done === urls.length) setTimeout(() => setIsLoaded(true), Math.max(0, 1000 - (performance.now() - start)));
    };
    urls.forEach((u) => { const i = new Image(); i.onload = tick; i.onerror = tick; i.src = u; });
  }, []);

  // smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  // lock scroll when loader or lightbox is active
  useEffect(() => {
    const lock = !isLoaded || light !== null;
    document.body.style.overflow = lock ? 'hidden' : '';
    if (lock) lenisRef.current?.stop(); else lenisRef.current?.start();
  }, [isLoaded, light]);

  // auto-advance gallery slideshow
  useEffect(() => {
    if (!isLoaded || light !== null) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % galleryImages.length), 4000);
    return () => clearInterval(id);
  }, [isLoaded, light]);

  // lightbox keyboard navigation
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

  // page animations (enabled on both mobile and desktop)
  useEffect(() => {
    if (!isLoaded) return;
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const desktop = window.matchMedia('(min-width: 768px)').matches;

      gsap.timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero-word', { yPercent: 115, duration: 1.1, stagger: 0.06 })
        .from('.hero-fade', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.6')
        .from('.hero-cols', { y: 80, opacity: 0, duration: 1.3 }, 0.2);

      if (!reduce) {
        gsap.to('.hero-copy', {
          yPercent: -14, opacity: 0.2, ease: 'none',
          scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true },
        });
      }

      // What we do: sticky stack depth + image zoom animation on both mobile & desktop
      const cards = gsap.utils.toArray('.stack-card');
      if (!reduce) {
        cards.forEach((c, i) => {
          const img = c.querySelector('.service-img');
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.14 },
              {
                scale: 1,
                ease: 'none',
                scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 25%', scrub: true },
              }
            );
          }
          if (i < cards.length - 1) {
            gsap.to(c, {
              scale: desktop ? 0.94 : 0.93,
              opacity: desktop ? 0.55 : 0.45,
              ease: 'none',
              scrollTrigger: {
                trigger: cards[i + 1],
                start: desktop ? 'top 85%' : 'top 88%',
                end: desktop ? 'top 15%' : 'top 20%',
                scrub: true,
              },
            });
          }
        });
      }

      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });

      gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

      navItems.forEach(([id]) => {
        ScrollTrigger.create({ trigger: `#${id}`, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => self.isActive && setActive(id) });
      });
    }, root);

    return () => ctx.revert();
  }, [isLoaded]);

  const submit = (e) => {
    e.preventDefault();
    const parts = [`Hi Zelaris Events! ${form.name ? `I'm ${form.name}. ` : ''}I'm planning a ${form.type.toLowerCase()}`];
    if (form.date) parts.push(`on ${form.date}`);
    if (form.guests) parts.push(`for around ${form.guests} guests`);
    window.open(wa(`${parts.join(' ')}. Can we talk?`), '_blank', 'noopener');
  };

  const field = 'w-full min-w-0 appearance-none rounded-xl border border-[#2a1500]/15 bg-white px-4 py-3 text-[15px] text-[#2a1500] outline-none transition focus:border-[#d12f6a] focus:ring-4 focus:ring-[#d12f6a]/15';

  return (
    <div ref={root} className="relative bg-[#fff6ea] text-[#2a1500] selection:bg-[#ffb627] selection:text-[#2a1500]" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflowX: 'clip' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', Georgia, serif; }
        @keyframes drift { 0%,100% { transform: translate(0,0) scale(1) } 50% { transform: translate(40px,-30px) scale(1.15) } }
        @keyframes marquee { to { transform: translateX(-50%) } }
        @keyframes marquee-rev { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes colup { to { transform: translateY(-50%) } }
        @keyframes coldown { from { transform: translateY(-50%) } to { transform: translateY(0) } }
        @keyframes ping2 { 75%,100% { transform: scale(1.9); opacity: 0 } }
        html { font-size: clamp(16px, 0.95vw + 6px, 24px); }
        .col-up { animation: colup 45s linear infinite }
        .col-down { animation: coldown 52s linear infinite }
        .hero-cols:hover .col-up, .hero-cols:hover .col-down { animation-play-state: paused }
        .drift { animation: drift 14s ease-in-out infinite }
        .marquee { animation: marquee 40s linear infinite }
        .marquee-rev { animation: marquee-rev 52s linear infinite }
        .ping2 { animation: ping2 2.2s cubic-bezier(0,0,.2,1) infinite }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) { .drift,.marquee,.marquee-rev,.ping2,.col-up,.col-down { animation: none } }
      `}</style>

      {/* scroll progress */}
      <div className="progress fixed left-0 top-0 z-[90] h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#ffb627] via-[#ff7a59] to-[#d12f6a]" />

      {/* loader */}
      <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#14061f] transition-opacity duration-700 ${isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <img src="/logo.png" alt="Zelaris Events" className="mb-8 w-44 animate-pulse md:w-52" />
        <div className="h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-gradient-to-r from-[#ffb627] to-[#d12f6a] transition-all duration-300" style={{ width: `${loadProgress}%` }} />
        </div>
      </div>

      {/* nav */}
      <header className="fixed left-0 top-3 z-[80] flex w-full justify-center px-3 md:top-4">
        <nav className="flex w-full max-w-6xl items-center justify-between gap-3 rounded-full border border-white/20 bg-[#14061f]/85 py-2 pl-4 pr-2 text-white shadow-2xl backdrop-blur-xl md:py-2.5 md:pl-7 md:pr-2.5">
          <button onClick={() => go('#top')} aria-label="Back to top" className="shrink-0"><img src="/logo.png" alt="Zelaris Events" className="h-9 md:h-12" /></button>
          <div className="hidden items-center gap-8 text-[17px] font-semibold lg:flex">
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => go(`#${id}`)} className={`relative py-1 transition ${active === id ? 'text-[#ffb627]' : 'text-white/75 hover:text-white'}`}>
                {label}
                <span className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-[#ffb627] transition-all duration-300 ${active === id ? 'w-full' : 'w-0'}`} />
              </button>
            ))}
          </div>
          <span className="truncate text-sm font-semibold text-[#ffb627] sm:text-base lg:hidden">{navItems.find(([id]) => id === active)?.[1]}</span>
          <a href={wa("Hi Zelaris Events! I'd like to inquire about booking an event.")} target="_blank" rel="noopener noreferrer" className="flex shrink-0 items-center gap-2 rounded-full bg-[#ffb627] px-4 py-2.5 text-sm font-semibold text-[#2a1500] transition hover:scale-105 md:px-5 md:py-3 md:text-base">
            <WhatsAppIcon size={18} /> <span className="hidden sm:inline">Chat with us</span><span className="sm:hidden">Chat</span>
          </a>
        </nav>
      </header>

      {/* floating whatsapp */}
      <a href={wa('Hi Zelaris Events!')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-4 right-4 z-[80] grid h-13 w-13 place-items-center rounded-full bg-[#25d366] text-white shadow-xl transition hover:scale-110 md:bottom-5 md:right-5 md:h-14 md:w-14">
        <span className="ping2 absolute inset-0 rounded-full bg-[#25d366]/60" />
        <WhatsAppIcon size={26} className="relative md:scale-105" />
      </a>

      {/* hero */}
      <section id="top" className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#14061f] text-white">
        <div className="drift absolute -left-24 top-10 h-96 w-96 rounded-full bg-[#d12f6a]/40 blur-[110px]" />
        <div className="drift absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#ffb627]/25 blur-[120px]" style={{ animationDelay: '-5s' }} />
        <div className="drift absolute left-1/3 top-1/2 h-80 w-80 rounded-full bg-[#4a1d7c]/60 blur-[100px]" style={{ animationDelay: '-9s' }} />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 px-5 pb-2 pt-24 md:grid-cols-[1.05fr_1fr] md:gap-12 md:px-8 md:pb-4 md:pt-32">
          <div className="hero-copy text-center md:text-left">
            <h1 className="font-display tracking-tight text-[2.35rem] font-bold leading-[1.05] sm:text-6xl xl:text-[4.8rem]">
              {'Your celebration, planned down to the last detail.'.split(' ').map((w, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <span className="hero-word inline-block">{w}&nbsp;</span>
                </span>
              ))}
            </h1>
            <p className="hero-fade mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/75 md:mx-0 md:mt-6 md:text-lg">
              Weddings, receptions and corporate events anywhere in India. Décor, catering, grand entries and cinematic coverage, all handled by one friendly team.
            </p>
            <div className="hero-fade mt-6 flex flex-col items-center gap-3 sm:flex-row md:mt-8 md:justify-start">
              <a href={wa("Hi Zelaris Events! I'd like to inquire about booking an event.")} target="_blank" rel="noopener noreferrer" className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#ffb627] px-8 py-3.5 text-base font-semibold text-[#2a1500] shadow-[0_0_40px_rgba(255,182,39,0.35)] transition hover:scale-105 sm:w-auto md:py-4 md:text-lg">
                Book your event <ArrowUpRight size={20} />
              </a>
              <button onClick={() => go('#services')} className="w-full max-w-xs rounded-full border border-white/25 px-8 py-3.5 text-base font-medium text-white transition hover:bg-white/10 sm:w-auto md:py-4 md:text-lg">
                See what we do
              </button>
            </div>
          </div>

          <div className="hero-cols grid h-[32vh] grid-cols-2 gap-3 md:h-[66vh] md:gap-4" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)' }}>
            {[0, 1].map((col) => {
              const order = col ? [3, 4, 5, 0, 1, 2] : [0, 1, 2, 3, 4, 5];
              return (
                <div key={col} className="overflow-hidden">
                  <div className={col ? 'col-down' : 'col-up'}>
                    {[...order, ...order].map((n, i) => (
                      <img key={i} src={services[n].image} alt={i < 6 ? services[n].title : ''} aria-hidden={i >= 6} className="mb-3 aspect-[3/4] w-full rounded-2xl object-cover shadow-xl md:mb-4 md:rounded-3xl" />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* crossed ribbons — separated & steeper on mobile so rose band is clearly visible; untouched on md: */}
        <div className="hero-fade relative z-10 mb-5 mt-2 h-28 w-full md:mb-10 md:mt-0 md:h-32">
          <div className="absolute inset-x-0 top-[30%] -translate-y-1/2 rotate-[6deg] scale-110 overflow-hidden bg-[#d12f6a] py-2.5 text-white/95 shadow-lg md:top-1/2 md:rotate-[2deg] md:shadow-none">
            <div className="marquee-rev flex w-max gap-6 whitespace-nowrap font-display tracking-tight text-base font-bold md:gap-8 md:text-xl">
              {[...marquee, ...marquee, ...marquee, ...marquee].reverse().map((m, i) => (
                <span key={i} className="flex items-center gap-6 md:gap-8">{m}<Sparkles size={16} /></span>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 top-[68%] z-10 -translate-y-1/2 -rotate-[5deg] scale-110 overflow-hidden bg-[#ffb627] py-3 text-[#2a1500] shadow-xl md:top-1/2 md:-rotate-2 md:py-4">
            <div className="marquee flex w-max gap-8 whitespace-nowrap font-display tracking-tight text-xl font-bold md:gap-10 md:text-3xl">
              {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
                <span key={i} className="flex items-center gap-8 md:gap-10">{m}<Sparkles size={20} /></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* services — sticky stacking & scroll animation active on both mobile and desktop */}
      <section id="services" className="mx-auto max-w-[1600px] px-3.5 pb-20 pt-20 md:px-6 md:pb-24 md:pt-32">
        <div className="reveal mb-10 max-w-2xl px-1 md:mb-16 md:px-0">
          <h2 className="font-display tracking-tight text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">Everything your day needs, under one roof.</h2>
          <p className="mt-3 text-base text-[#2a1500]/70 md:mt-4 md:text-lg">From the first idea to the last dance. Scroll through what we take care of.</p>
        </div>

        {services.map((s, i) => (
          <article
            key={s.title}
            className="stack-card sticky mb-[8vh] md:mb-[14vh]"
            style={{ top: `calc(4.75rem + ${i * 0.55}rem)` }}
          >
            <div className={`grid overflow-hidden rounded-[1.75rem] shadow-[0_22px_55px_-18px_rgba(42,21,0,0.48)] md:min-h-[calc(100dvh-9.5rem)] md:grid-cols-2 md:rounded-[2rem] ${s.tone}`}>
              <div className="flex flex-col justify-center gap-3 p-5 sm:p-7 md:gap-5 md:p-14">
                <div className="flex items-center gap-3 md:block">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black/10 md:h-12 md:w-12 md:rounded-2xl">{s.icon}</span>
                  <h3 className="font-display tracking-tight text-2xl font-bold sm:text-3xl md:mt-5 md:text-6xl">{s.title}</h3>
                </div>
                <p className="text-sm opacity-85 sm:text-base md:text-xl">{s.short}</p>
                <ul className="mt-0.5 space-y-1.5 md:mt-1 md:space-y-2.5">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[13.5px] leading-snug sm:text-[15px] md:gap-3 md:text-[17px]">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 md:h-[18px] md:w-[18px]" /> <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-first relative h-44 overflow-hidden sm:h-56 md:order-none md:h-auto md:min-h-full">
                <img src={s.image} alt={s.title} loading="lazy" className="service-img absolute inset-0 h-full w-full object-cover" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* how it works — Option 1: fixed-dimension color pillars */}
      <section id="how" className="mx-auto max-w-[1600px] px-4 pb-24 pt-6 md:px-6 md:pb-36 md:pt-8">
        <div className="reveal mb-8 flex flex-col justify-between gap-3 md:mb-14 md:flex-row md:items-end">
          <h2 className="font-display tracking-tight text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            From “hello” to the last dance.
          </h2>
          <p className="max-w-md text-sm text-[#2a1500]/70 sm:text-base md:text-lg">
            Tap or hover through how we bring your celebration together.
          </p>
        </div>

        <div className="reveal flex h-[520px] flex-col gap-2.5 md:h-[430px] md:flex-row md:gap-4">
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
                className={`relative cursor-pointer overflow-hidden rounded-[1.6rem] shadow-[0_20px_50px_-20px_rgba(42,21,0,0.3)] transition-[flex] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:rounded-[2rem] ${tone} ${
                  open ? 'flex-[3.5] md:flex-[3.6]' : 'flex-[0.65] md:flex-[0.75]'
                }`}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity duration-200 md:justify-center md:px-0 ${
                    open ? 'pointer-events-none opacity-0' : 'opacity-100 delay-100'
                  }`}
                >
                  <span className="font-display tracking-tight whitespace-nowrap text-lg font-bold sm:text-xl md:text-2xl md:[writing-mode:vertical-rl] md:rotate-180">
                    {title}
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider md:hidden ${pillTone}`}>
                    View
                  </span>
                </div>

                <div
                  className={`absolute inset-0 flex flex-col justify-between p-5 transition-opacity duration-300 sm:p-8 md:p-12 ${
                    open ? 'opacity-100 delay-150' : 'pointer-events-none opacity-0'
                  }`}
                >
                  <div className="max-w-xl">
                    <h3 className="font-display tracking-tight text-2xl font-bold sm:text-3xl md:text-5xl">
                      {title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed opacity-85 sm:text-base md:mt-5 md:text-lg">
                      {desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold sm:px-3.5 sm:text-sm ${pillTone}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* gallery — touch-swipe stage on mobile + ribbon thumbnails on mobile / 13-col grid on desktop */}
      <section id="gallery" className="bg-[#14061f] px-4 py-20 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mb-8 flex items-end justify-between gap-4 md:mb-12">
            <div>
              <h2 className="font-display tracking-tight text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
                Events we’ve brought to life.
              </h2>
              <p className="mt-2 text-sm text-white/65 sm:text-base md:mt-3 md:text-lg">
                Swipe or pick any photo below, or tap the stage to view it full screen.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setSlide((s) => (s - 1 + galleryImages.length) % galleryImages.length)}
                aria-label="Previous photo"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-[#ffb627] hover:text-[#2a1500] md:h-11 md:w-11"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => setSlide((s) => (s + 1) % galleryImages.length)}
                aria-label="Next photo"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-[#ffb627] hover:text-[#2a1500] md:h-11 md:w-11"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div
            onClick={() => setLight(slide)}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(delta) > 40) {
                setSlide((s) => (delta < 0 ? (s + 1) % galleryImages.length : (s - 1 + galleryImages.length) % galleryImages.length));
              }
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setLight(slide)}
            className="reveal group relative mb-4 h-[320px] w-full cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/40 shadow-2xl sm:h-[400px] md:mb-5 md:h-[480px] md:rounded-[2rem]"
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
            <span className="absolute bottom-3.5 right-3.5 grid h-10 w-10 place-items-center rounded-full bg-[#14061f]/75 text-white backdrop-blur-md transition group-hover:bg-[#ffb627] group-hover:text-[#2a1500] md:bottom-4 md:right-4 md:h-11 md:w-11">
              <Maximize2 size={18} />
            </span>
          </div>

          {/* smooth horizontal thumbnail strip on mobile; 13-col full grid on desktop */}
          <div className="reveal no-scrollbar flex gap-2.5 overflow-x-auto py-1 md:grid md:grid-cols-13 md:gap-2.5 md:overflow-visible md:py-0">
            {galleryImages.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setSlide(i)}
                onDoubleClick={() => setLight(i)}
                aria-label="Select photo"
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 md:h-auto md:w-auto md:aspect-square ${
                  slide === i
                    ? 'scale-105 border-[#ffb627] opacity-100 shadow-lg'
                    : 'border-transparent opacity-45 hover:opacity-85'
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* plan your event */}
      <section id="plan" className="bg-gradient-to-br from-[#d12f6a] via-[#ff7a59] to-[#ffb627] px-4 py-20 md:px-5 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="reveal text-center text-white md:text-left">
            <h2 className="font-display tracking-tight text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">Tell us the date. We’ll take it from there.</h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/90 md:mx-0 md:mt-5 md:text-lg">Fill in a few details and we’ll open WhatsApp with your message ready to send. A real person replies, usually the same day.</p>
          </div>
          <form onSubmit={submit} className="reveal space-y-4 rounded-[1.75rem] bg-[#fff6ea] p-5 shadow-2xl md:space-y-5 md:rounded-[2rem] md:p-8">
            <div>
              <p className="mb-2 text-sm font-semibold">What are you planning?</p>
              <div className="flex flex-wrap gap-2">
                {eventTypes.map((t) => (
                  <button type="button" key={t} onClick={() => setForm({ ...form, type: t })} className={`rounded-full border px-3.5 py-2 text-sm font-medium transition md:px-4 ${form.type === t ? 'border-[#2a1500] bg-[#2a1500] text-white' : 'border-[#2a1500]/15 bg-white hover:border-[#2a1500]/40'}`}>{t}</button>
                ))}
              </div>
            </div>
            <label className="block text-sm font-semibold">Your name
              <input className={`${field} mt-2 font-normal`} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" autoComplete="name" />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Event date
                <input type="date" className={`${field} mt-2 font-normal`} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <label className="block text-sm font-semibold">Guests
                <input type="number" min="1" inputMode="numeric" className={`${field} mt-2 font-normal`} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} placeholder="About how many?" />
              </label>
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2a1500] py-4 font-semibold text-white transition hover:bg-[#d12f6a]">
              <Send size={18} /> Send on WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer
        className="px-6 pb-14 pt-16 text-white sm:px-10 md:px-16 md:pb-16 md:pt-28"
        style={{
          backgroundColor: '#080402',
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(110, 62, 18, 0.28) 0%, rgba(8, 4, 2, 1) 72%)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-center justify-between gap-10 text-center md:mb-24 md:flex-row md:items-start md:gap-12 md:text-left">
            <div className="flex max-w-lg flex-col items-center md:items-start">
              <img src="/logo.png" alt="Zelaris Events" className="mb-5 w-44 md:mb-7 md:w-56" />
              <p className="mb-6 text-base leading-relaxed text-white/65 md:mb-8 md:text-lg">
                Events for a brighter tomorrow. Providing budget-friendly and luxury services anywhere in India.
              </p>
              <div className="flex items-center gap-5 text-white/85">
                <a
                  href="https://www.instagram.com/zelarisevents/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition hover:scale-110 hover:text-[#d4a843]"
                >
                  <InstagramIcon size={26} />
                </a>
                <a
                  href={`https://wa.me/${WA}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="transition hover:scale-110 hover:text-[#d4a843]"
                >
                  <WhatsAppIcon size={26} />
                </a>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="mb-4 text-lg font-bold text-white md:mb-5 md:text-xl">
                Contact Info
              </h4>
              <ul className="space-y-3 text-base text-white/65 md:space-y-3.5 md:text-lg">
                <li className="flex items-center justify-center gap-2.5 md:justify-end">
                  <span>Services Anywhere in India</span>
                  <MapPin size={20} className="shrink-0 text-[#d4a843]" />
                </li>
                <li>
                  <a href="tel:+919037090810" className="transition hover:text-[#d4a843]">
                    Riswan: +91 90370 90810
                  </a>
                </li>
                <li>
                  <a href="tel:+919037159997" className="transition hover:text-[#d4a843]">
                    Ansif: +91 90371 59997
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-5 border-t border-white/10 pt-8 text-sm text-white/45 md:grid-cols-3 md:gap-6 md:pt-10">
            <p className="order-2 flex flex-wrap items-center justify-center gap-2 text-center md:order-1 md:justify-start md:text-left">
              <span>&copy; {new Date().getFullYear()} Zelaris Events. All rights reserved.</span>
              <span className="text-white/25">|</span>
              <a
                href="https://wa.me/917558957246"
                target="_blank"
                rel="noopener noreferrer"
                title="Contact Developer"
                className="font-display text-base italic text-white/75 transition hover:text-[#d4a843] md:text-lg"
              >
                R.
              </a>
            </p>

            <p
              className="font-display order-1 text-center text-sm font-bold uppercase text-[#d4a843] md:order-2 md:text-base"
              style={{ letterSpacing: '0.38em', paddingLeft: '0.38em' }}
            >
              A ZAC VENTURE
            </p>

            <div className="order-3 hidden md:block" />
          </div>
        </div>
      </footer>

      {/* lightbox */}
      {light !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#14061f]/95 p-4 backdrop-blur-md"
          onClick={() => setLight(null)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const delta = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(delta) > 40) {
              setLight((i) => (delta < 0 ? (i + 1) % galleryImages.length : (i - 1 + galleryImages.length) % galleryImages.length));
            }
          }}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={() => setLight(null)} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><X size={22} /></button>
          <button onClick={(e) => { e.stopPropagation(); setLight((light - 1 + galleryImages.length) % galleryImages.length); }} aria-label="Previous photo" className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-8"><ChevronLeft size={24} /></button>
          <img src={galleryImages[light]} alt="Zelaris event" onClick={(e) => e.stopPropagation()} className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl" />
          <button onClick={(e) => { e.stopPropagation(); setLight((light + 1) % galleryImages.length); }} aria-label="Next photo" className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-8"><ChevronRight size={24} /></button>
        </div>
      )}
    </div>
  );
}