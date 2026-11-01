import { useEffect, useRef, useState } from 'react';
import { AndroidIcon, AppleIcon, ArrowUpRight01Icon, Globe02Icon, TelegramIcon } from '@hugeicons/core-free-icons';
import LightTunnel from '../bits/LightTunnel/LightTunnel';
import TechText from '../bits/TechText/TechText';
import StarBorder from '../bits/StarBorder/StarBorder';
import { Device, Icon, Reveal, reducedMotion } from '../ui';
import { BASE, LINKS, shot } from '../data';

const NAV = [
  ['why', 'Зачем'],
  ['features', 'Возможности'],
  ['screens', 'Экраны'],
  ['roadmap', 'Планы'],
  ['author', 'Автор'],
  ['contacts', 'Контакты']
];

export const Logo = ({ size = 32 }: { size?: number }) => (
  <img src={`${BASE}logo.png`} width={size} height={size} alt="" aria-hidden="true" className="logo-mark" />
);

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 24);
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
        let cur = '';
        for (const [id] of NAV) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = id;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);
  return (
    <header className={`nav${solid || menuOpen ? ' is-solid' : ''}`}>
      <div className="nav__progress" ref={barRef} aria-hidden="true" />
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#top" aria-label="Schedule — в начало">
          <Logo size={30} />
          <span>Schedule</span>
        </a>
        <nav className="nav__links" aria-label="Разделы">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>{label}</a>
          ))}
        </nav>
        <a className="nav__cta" href={LINKS.app} target="_blank" rel="noopener noreferrer">
          Открыть <Icon icon={ArrowUpRight01Icon} size={16} stroke={2} />
        </a>
        <button ref={menuButtonRef} className="nav__toggle" type="button" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span aria-hidden="true" className={menuOpen ? 'is-open' : ''}><i /><i /><i /></span>
        </button>
      </div>
      <nav id="mobile-navigation" className="nav__mobile" aria-label="Разделы сайта" hidden={!menuOpen}>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>{label}<span aria-hidden="true">↗</span></a>
        ))}
      </nav>
    </header>
  );
}

export function Hero() {
  const showRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion()) return;
    const el = showRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = Math.max(-1, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
        el.style.setProperty('--p', p.toFixed(3));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <LightTunnel
          cableColor="#cfe0ff"
          pulseColor="#5E9BFF"
          tunnelColor="#9ab8ff"
          tunnelOpacity={0.22}
          speed={0.07}
          pulseDensity={0.45}
          pulseLength={0.34}
          cableCount={52}
          glow={1.1}
          brightness={0.85}
          sway={0.6}
          centerY={0.08}
          mouseStrength={0.08}
          dpr={1.25}
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />

      <div className="wrap hero__inner">
        <Reveal distance={20} blur={0}>
          <p className="chip chip--glass"><span className="dot dot--live" aria-hidden="true" />Студенческий проект · iOS · Android · Веб</p>
        </Reveal>
        <div className="hero__title">
          <TechText
            text="Schedule"
            fontFamily="Onest"
            fontWeight={700}
            fontSize={230}
            letterSpacing={-0.045}
            color="#EAF0FB"
            accentColor="#5E9BFF"
            intro="assemble"
            introDuration={1.8}
            specks={18}
            reach={220}
          />
        </div>
        <Reveal delay={0.25} distance={28}>
          <h1 className="hero__h1">Расписание, ДЗ и жизнь группы — <span className="grad">в одном приложении</span></h1>
        </Reveal>
        <Reveal delay={0.35} distance={28}>
          <p className="hero__lead">
            Удобная лента вместо бесконечной переписки: ДЗ, файлы, опросы, новости, контрольные и дни рождения.
            Упор — на активную жизнь группы и удобную связь с вузом.
          </p>
        </Reveal>
        <Reveal delay={0.45} distance={24} blur={0}>
          <div className="hero__cta">
            <StarBorder as="a" href={LINKS.app} target="_blank" rel="noopener noreferrer" className="btn btn--primary" color="#cfe0ff" trailColor="#5E9BFF" backgroundColor="#5E9BFF" textColor="#0B1120" radius={999} duration={3.6} stars={2} glow={0.9} thickness={1.5}>
              Открыть веб-версию <Icon icon={ArrowUpRight01Icon} size={18} stroke={2.2} />
            </StarBorder>
            <StarBorder as="a" href={LINKS.telegram} target="_blank" rel="noopener noreferrer" className="btn" color="#F2C46D" trailColor="#F2C46D" backgroundColor="rgba(19,28,49,0.72)" textColor="#EAF0FB" radius={999} duration={5} glow={0.6}>
              <Icon icon={TelegramIcon} size={18} /> Написать автору
            </StarBorder>
          </div>
        </Reveal>
        <Reveal delay={0.55} distance={16} blur={0}>
          <ul className="platforms" aria-label="Платформы">
            <li><Icon icon={AppleIcon} size={18} />iOS</li>
            <li><Icon icon={AndroidIcon} size={18} />Android · APK</li>
            <li><Icon icon={Globe02Icon} size={18} />schedule.doazhu.pro</li>
          </ul>
        </Reveal>
      </div>

      <div className="showcase" ref={showRef}>
        <Reveal distance={80} blur={10} scale={0.94} delay={0.2} className="showcase__web">
          <Device kind="web" src={shot('web-today')} alt="Веб-версия Schedule: неделя сеткой, текущая пара и изменения" eager />
        </Reveal>
        <Reveal distance={120} blur={10} delay={0.4} className="showcase__phone showcase__phone--l">
          <Device kind="android" src={shot('and-today')} alt="Schedule на Android: экран «Сегодня»" eager />
        </Reveal>
        <Reveal distance={140} blur={10} delay={0.5} className="showcase__phone showcase__phone--r">
          <Device kind="ios" src={shot('ios-feed')} alt="Schedule на iPhone: лента группы" eager />
        </Reveal>
      </div>
    </section>
  );
}

const STRIP = [
  'ДЗ больше не тонет в чате',
  'Бэкенд на Go',
  'iOS на Swift',
  'Android · APK',
  'Веб — schedule.doazhu.pro',
  'Опросы, новости, файлы',
  'Дни рождения с вишлистами'
];

export function Marquee() {
  const row = (aria: boolean) => (
    <ul className="marquee__row" aria-hidden={aria || undefined}>
      {STRIP.map((t) => <li key={t}><span className="spark" aria-hidden="true">✦</span>{t}</li>)}
    </ul>
  );
  return (
    <div className="marquee" role="region" aria-label="Коротко о проекте">
      <div className="marquee__track">{row(false)}{row(true)}</div>
    </div>
  );
}
