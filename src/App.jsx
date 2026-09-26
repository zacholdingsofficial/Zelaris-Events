import { useEffect, useRef, useState } from 'react';
import {
  Utensils, Sparkles, Wand2, Crown, CalendarCheck, Camera, X, MapPin,
  CheckCircle2, MessageCircle, PenTool, PartyPopper
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import ScrollVideo from './ScrollVideo';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [];

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

// A single glowing point on a hairline — echoes the string lights in the
// venue footage. Used between sections instead of a flat divider.
const SectionDivider = () => (
  <div className="relative z-10 flex items-center justify-center py-3 px-6">
    <span className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    <span className="absolute w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_12px_4px_rgba(212,175,55,0.45)] animate-thread-glow" />
  </div>
);

const serviceCategories = [
  {
    id: 1,
    icon: <Crown size={26} />,
    title: "Planning & Hospitality",
    shortDesc: "A–Z event planning, VIP hospitality, and flawless coordination.",
    details: [
      "Complete A–Z event planning & personalized concepts",
      "Luxury and budget-friendly destination wedding packages",
      "3D venue preview & dedicated event coordination",
      "Emergency backup plans for weather & technical issues",
      "VIP hospitality, bridal lounge & guest accommodation",
      "Cleaning staff, parking security & service management",
      "Customized wedding branding & return gift curation",
      "College functions, convocations & corporate events"
    ]
  },
  {
    id: 2,
    icon: <Sparkles size={26} />,
    title: "Theme & Décor",
    shortDesc: "Custom stages, floral designs, and premium venue transformations.",
    details: [
      "Theme-based wedding & premium stage decorations",
      "Custom floral designs tailored to client preferences",
      "Complete dining area decor (buffet, seating, dishware)",
      "Seasonal themes (Christmas, Onam, etc.) & party services"
    ]
  },
  {
    id: 3,
    icon: <Utensils size={26} />,
    title: "Premium Catering",
    shortDesc: "Customized menus, diverse counters, and efficient catering staff.",
    details: [
      "Premium catering with custom-tailored delicious menus",
      "Specialty juice, tea, and unique dessert counters",
      "Custom-packed dates & nuts for Nikkah programs",
      "Complete Iftar party packages (food, decor & managing)"
    ]
  },
  {
    id: 4,
    icon: <Wand2 size={26} />,
    title: "Grand Entries & VFX",
    shortDesc: "Pyrotechnics, LED walls, and spectacular bride & groom entries.",
    details: [
      "Spectacular bride & groom entry concepts with VFX",
      "Cold pyrotechnics, fireworks, and special effects",
      "Immersive LED walls and synchronized lighting",
      "Luxury car rentals, live music, DJs & celebrity bookings"
    ]
  },
  {
    id: 5,
    icon: <Camera size={26} />,
    title: "Cinematic Media",
    shortDesc: "Professional photography, drone coverage, and highlight reels.",
    details: [
      "Cinematic videography & professional photography",
      "Live streaming and comprehensive drone coverage",
      "Post-event highlight reels delivered within 24–48 hours",
      "Real-time social media content creation"
    ]
  },
  {
    id: 6,
    icon: <CalendarCheck size={26} />,
    title: "Scope & Future",
    shortDesc: "Meeting the increasing demand for professional event organizers.",
    details: [
      "Expanding industry scope due to increasing demand",
      "Focus on customized catering and destination weddings",
      "Growth in themed events and specialized corporate functions"
    ]
  }
];

const processSteps = [
  { icon: <MessageCircle size={22} />, title: "Consultation", desc: "We talk through your date, guest count, budget and the kind of event you're picturing." },
  { icon: <PenTool size={22} />, title: "Concept & Design", desc: "A full layout, décor direction and vendor plan, agreed before anything is booked." },
  { icon: <Wand2 size={22} />, title: "Execution", desc: "Our team runs the timeline and manages every vendor on the day itself." },
  { icon: <PartyPopper size={22} />, title: "Celebration", desc: "You and your guests enjoy the event. We handle what's happening behind it." }
];

export default function App() {
  const [activeModal, setActiveModal] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const lenisRef = useRef(null);

  // 1. Lenis & GSAP Master Sync Setup
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, []);

  // 2. Handle Scroll Locking
  useEffect(() => {
    if (!isLoaded || activeModal !== null) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [isLoaded, activeModal]);

  // 3. Trigger Content Reveal (Only runs once when fully loaded)
  useEffect(() => {
    if (isLoaded) {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.1 }
        );
      }

      if (servicesRef.current) {
        const cards = gsap.utils.toArray('.service-card');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
              scrollTrigger: {
                trigger: servicesRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            });
        }
      }

      if (processRef.current) {
        const steps = gsap.utils.toArray('.process-step');
        if (steps.length > 0) {
          gsap.fromTo(steps,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power2.out",
              scrollTrigger: {
                trigger: processRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            });
        }
      }

      ScrollTrigger.refresh();
    }
  }, [isLoaded]);

  return (
    <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-amber-500 selection:text-white overflow-hidden">

      <style>{`
        @keyframes golden-shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-golden-shine {
          background-size: 200% auto;
          animation: golden-shine 4s linear infinite;
        }
        @keyframes thread-glow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        .animate-thread-glow {
          animation: thread-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-2xl transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <img
          src="/logo.png"
          alt="Zelaris Events Logo"
          className="w-48 md:w-56 mb-10 animate-pulse drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]"
        />
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <div
            className="h-full bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#aa7c11] transition-all duration-300 ease-out"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      </div>

      <div className="fixed inset-0 z-0">
        <ScrollVideo
          onProgress={setLoadProgress}
          onComplete={() => setIsLoaded(true)}
        />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 flex flex-col justify-center items-center min-h-[100dvh] px-6 text-center">
        <div ref={contentRef} className="relative z-10 max-w-2xl flex flex-col items-center">

          <img
            src="/logo.png"
            alt="Zelaris Events Logo"
            className="w-56 md:w-72 lg:w-80 mb-6 opacity-0 drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] filter brightness-110"
          />
          <p className="text-neutral-100 text-sm md:text-lg mb-6 max-w-lg mx-auto opacity-0 leading-snug font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Personalized wedding concepts, A–Z event planning, and luxury hospitality across India.
          </p>

          <p className="opacity-0 font-serif italic text-neutral-300 text-sm md:text-base tracking-wide mb-9 drop-shadow-md">
            Weddings &middot; Corporate Events &middot; Destination Events &middot; VIP Hospitality
          </p>

          <a
            href="https://wa.me/919037159997?text=Hi%20Zelaris%20Events!%20I'd%20like%20to%20inquire%20about%20booking%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#d4af37] to-[#aa7c11] hover:from-[#e5c558] hover:to-[#c49215] opacity-0 text-black px-8 py-3.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(212,175,55,0.4)] inline-block text-sm tracking-wide"
          >
            Book Your Event
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="w-px h-10 bg-gradient-to-b from-transparent via-white/40 to-[#d4af37]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_10px_3px_rgba(212,175,55,0.5)] animate-thread-glow" />
        </div>
      </section>

      <SectionDivider />

      {/* Services Section — editorial list, not a card grid */}
      <section ref={servicesRef} className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16 max-w-xl">
          <h2 className="font-serif italic text-4xl md:text-5xl font-medium tracking-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">Our Expertise</h2>
          <p className="text-neutral-300 text-sm md:text-base leading-relaxed drop-shadow-md">
            Six areas of focus, each handled down to the smallest detail. Tap through any of them to see exactly what's included.
          </p>
        </div>

        <div className="flex flex-col">
          {serviceCategories.map((service, index) => (
            <div
              key={service.id}
              onClick={() => setActiveModal(index)}
              className="service-card opacity-0 group cursor-pointer flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 py-8 border-b border-white/10 hover:bg-white/[0.03] transition-colors duration-300 px-3 -mx-3 rounded-xl"
            >
              <div className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] group-hover:bg-[#d4af37]/15 group-hover:border-[#d4af37]/60 transition-all duration-300">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-1.5 tracking-wide drop-shadow-md">{service.title}</h3>
                <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-lg drop-shadow-md">{service.shortDesc}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold tracking-wider text-[#d4af37] uppercase underline-offset-4 group-hover:underline drop-shadow-sm self-start sm:self-center">
                View Details
              </span>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Process Section — steps sit on a connecting line, no numbering */}
      <section ref={processRef} className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
        <div className="mb-16 max-w-xl">
          <h2 className="font-serif italic text-4xl md:text-5xl font-medium tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">How It Comes Together</h2>
        </div>

        <div className="relative">
          <span className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {processSteps.map((step) => (
              <div key={step.title} className="process-step opacity-0 relative flex md:flex-col items-start md:items-center gap-5 md:gap-4 md:text-center">
                <div className="relative shrink-0 w-14 h-14 rounded-full flex items-center justify-center border border-[#d4af37]/40 bg-black/40 backdrop-blur-md text-[#d4af37] z-10">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1.5 drop-shadow-md">{step.title}</h3>
                  <p className="text-neutral-300 text-xs md:text-sm leading-relaxed md:max-w-[180px] md:mx-auto drop-shadow-md">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="relative z-10 py-20 px-6 max-w-6xl mx-auto border-t border-white/20 mt-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">Past Events</h2>
            <p className="text-neutral-200 max-w-xl mx-auto text-sm font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">A glimpse into our luxurious setups and unforgettable moments.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, idx) => (
                  <div key={idx} className="aspect-square bg-black/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                      <img src={img} alt={`Event ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
              ))}
          </div>
        </section>
      )}

      <SectionDivider />

      {/* Closing CTA */}
      <section className="relative z-10 py-24 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif italic text-4xl md:text-6xl font-medium tracking-tight mb-6 bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#d4af37] bg-clip-text text-transparent animate-golden-shine drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Every Detail, Beautifully Arranged
          </h2>
          <p className="text-neutral-300 text-sm md:text-base mb-9 max-w-md mx-auto drop-shadow-md">
            Share your date and vision on WhatsApp — we'll take it from there.
          </p>
          <a
            href="https://wa.me/919037159997?text=Hi%20Zelaris%20Events!%20I'd%20like%20to%20inquire%20about%20booking%20an%20event."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#aa7c11] hover:from-[#e5c558] hover:to-[#c49215] text-black px-8 py-3.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-[0_0_25px_rgba(212,175,55,0.4)] text-sm tracking-wide"
          >
            <WhatsAppIcon size={16} /> Start Planning Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-2xl border-t border-white/15 pt-16 pb-8 px-6 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 mb-10">

            <div className="max-w-sm">
                <img src="/logo.png" alt="Zelaris Events" className="w-40 mb-5 opacity-90 drop-shadow-md" />
                <p className="text-neutral-300 text-sm leading-relaxed mb-5 font-light drop-shadow-md">
                    Events for a brighter tomorrow. Providing budget-friendly and luxury services anywhere in India.
                </p>
                <div className="flex gap-4">
                    <a href="#" className="text-neutral-300 hover:text-[#d4af37] transition-colors drop-shadow-md">
                        <InstagramIcon size={20} />
                    </a>
                    <a href="https://wa.me/919037159997" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-[#d4af37] transition-colors drop-shadow-md">
                        <WhatsAppIcon size={20} />
                    </a>
                </div>
            </div>

            <div className="md:text-right w-full md:w-auto md:self-end">
                <h4 className="text-base font-semibold mb-5 text-white tracking-wide text-left md:text-right drop-shadow-md">Contact Info</h4>
                <ul className="space-y-3 text-neutral-300 text-sm font-light flex flex-col items-start md:items-end">
                    <li className="flex items-center gap-2 justify-start md:justify-end w-full">
                        <MapPin size={16} className="text-[#d4af37] shrink-0 md:order-last" />
                        <span className="text-left md:text-right">Services Anywhere in India</span>
                    </li>
                    <li className="flex flex-col gap-1.5 items-start md:items-end mt-2">
                        <a href="tel:+919037090810" className="hover:text-[#d4af37] transition-colors">Riswan: +91 90370 90810</a>
                        <a href="tel:+919037159997" className="hover:text-[#d4af37] transition-colors">Ansif: +91 90371 59997</a>
                    </li>
                </ul>
            </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-400 font-light">
            <p>&copy; {new Date().getFullYear()} Zelaris Events. All rights reserved.</p>

            <p className="hidden md:block font-serif tracking-[0.25em] uppercase bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#d4af37] bg-clip-text text-transparent animate-golden-shine font-semibold">
              A ZAC Product
            </p>

            <a
                href="https://wa.me/917558957246"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block font-serif italic text-base text-neutral-400 hover:text-[#d4af37] transition-colors"
                title="Contact Developer"
            >
                R.
            </a>

            <div className="flex md:hidden items-center gap-3 mt-2">
                <p className="font-serif tracking-[0.25em] uppercase bg-gradient-to-r from-[#d4af37] via-[#fff3cc] to-[#d4af37] bg-clip-text text-transparent animate-golden-shine font-semibold">
                  A ZAC Product
                </p>
                <span className="text-white/20">|</span>
                <a
                    href="https://wa.me/917558957246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif italic text-base text-neutral-400 hover:text-[#d4af37] transition-colors"
                    title="Contact Developer"
                >
                    R.
                </a>
            </div>
        </div>
      </footer>

      {/* True Glassmorphism Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setActiveModal(null)}
            />
            <div className="relative bg-black/50 backdrop-blur-2xl border border-white/20 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-300">

                <div className="p-6 border-b border-white/15 flex justify-between items-center rounded-t-3xl bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/5 text-[#d4af37] drop-shadow-md">
                            {serviceCategories[activeModal].icon}
                        </div>
                        <h3 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">{serviceCategories[activeModal].title}</h3>
                    </div>
                    <button
                        onClick={() => setActiveModal(null)}
                        className="text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar" data-lenis-prevent="true">
                    <ul className="space-y-5">
                        {serviceCategories[activeModal].details.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4 text-white">
                                <CheckCircle2 className="text-[#d4af37] shrink-0 mt-0.5 drop-shadow-md" size={20} strokeWidth={2.5} />
                                <span className="text-base font-normal leading-relaxed drop-shadow-md">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}