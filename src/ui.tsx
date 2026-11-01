import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import AnimatedContent from './bits/AnimatedContent/AnimatedContent';
import type { DeviceKind } from './data';

export const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** true once the element has scrolled into view (stays true) */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

/** whether the element is on screen right now */
export function useOnScreen<T extends Element>(margin = '0px') {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, on] as const;
}

export const Icon = ({ icon, size = 20, stroke = 1.8, className }: { icon: IconSvgElement; size?: number; stroke?: number; className?: string }) => (
  <HugeiconsIcon icon={icon} size={size} strokeWidth={stroke} className={className} aria-hidden="true" />
);

export const Reveal = ({ children, delay = 0, distance = 40, stagger = 0, className, style, blur = 6, scale = 0.98 }: {
  children: ReactNode; delay?: number; distance?: number; stagger?: number; className?: string; style?: CSSProperties; blur?: number; scale?: number;
}) => (
  <AnimatedContent distance={distance} duration={0.9} ease="power3.out" blur={blur} scale={scale} delay={delay} stagger={stagger} threshold={0.12} className={className} style={style}>
    {children}
  </AnimatedContent>
);

export const SectionHead = ({ num, kicker, title, lead, center }: { num: string; kicker: string; title: ReactNode; lead?: ReactNode; center?: boolean }) => (
  <Reveal className={`sec-head${center ? ' is-center' : ''}`}>
    <p className="kicker"><span className="kicker__num">{num}</span><span className="kicker__line" aria-hidden="true" />{kicker}</p>
    <h2 className="h2">{title}</h2>
    {lead && <p className="lead">{lead}</p>}
  </Reveal>
);

export const Device = ({ kind, src, alt, className, style, eager }: { kind: DeviceKind; src: string; alt: string; className?: string; style?: CSSProperties; eager?: boolean }) => {
  if (kind === 'web') {
    return (
      <figure className={`browser ${className ?? ''}`} style={style}>
        <div className="browser__bar" aria-hidden="true">
          <span className="browser__dots"><i /><i /><i /></span>
          <span className="browser__url">schedule.doazhu.pro</span>
        </div>
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width={1600} height={1000} draggable={false} />
      </figure>
    );
  }
  return (
    <figure className={`phone phone--${kind} ${className ?? ''}`} style={style}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" width={kind === 'ios' ? 780 : 824} height={kind === 'ios' ? 1688 : 1834} draggable={false} />
    </figure>
  );
};

/** count-up number, starts when visible */
export const CountUp = ({ to, suffix = '', duration = 1400 }: { to: number; suffix?: string; duration?: number }) => {
  const [ref, seen] = useInView<HTMLSpanElement>(0.6);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (reducedMotion()) { setN(to); return; }
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return <span ref={ref} className="num">{n}{suffix}</span>;
};

/** pointer-follow spotlight on cards */
export const spot = (e: React.PointerEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
};
