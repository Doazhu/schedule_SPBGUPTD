import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight01Icon, ArrowUp01Icon, Copy01Icon, Github01Icon, Globe02Icon, Mail01Icon, TelegramIcon, Tick02Icon, VkIcon
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import PeekRating from '../bits/PeekRating/PeekRating';
import ReflectiveCard from '../bits/ReflectiveCard/ReflectiveCard';
import StarBorder from '../bits/StarBorder/StarBorder';
import { CountUp, Icon, Reveal, SectionHead, reducedMotion, spot } from '../ui';
import { BASE, LINKS, STACK, WORKS } from '../data';
import { Logo } from './Top';

const REFLECT = (() => {
  try {
    const v = document.createElement('video');
    if (v.canPlayType('video/mp4; codecs="avc1.42E01E"')) return `${BASE}reflect.mp4`;
  } catch { /* ignore */ }
  return `${BASE}reflect.webm`;
})();

const QUOTE = 'Хочу сделать студенческую жизнь легче: чтобы ДЗ, расписание и новости не терялись, а связь с вузом была удобной для всех.';

export function Idea() {
  const ref = useRef<HTMLQuoteElement>(null);
  const words = QUOTE.split(' ');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) { el.style.setProperty('--q', '1'); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = (window.innerHeight * 0.8 - r.top) / (r.height + window.innerHeight * 0.3);
        const q = Math.max(0, Math.min(1, p));
        el.querySelectorAll<HTMLSpanElement>('.q-word').forEach((w, i) => {
          const t = Math.max(0, Math.min(1, q * (words.length + 4) - i));
          w.style.opacity = String(0.16 + t * 0.84);
        });
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [words.length]);

  return (
    <section className="section section--idea" id="idea">
      <div className="wrap">
        <SectionHead num="06" kicker="Философия" title={<>Зачем это всё</>} />
        <blockquote className="quote" ref={ref}>
          <p>{words.map((w, i) => <span key={i} className="q-word">{w} </span>)}</p>
          <footer>— Александр, автор Schedule</footer>
        </blockquote>
        <Reveal className="principles" stagger={0.1} distance={30}>
          <article className="principle" onPointerMove={spot}>
            <span className="principle__n">01</span>
            <h3>Из реальных просьб</h3>
            <p>Функции появляются из того, на что жалуются и о чём просят одногруппники и друзья из других групп.</p>
          </article>
          <article className="principle" onPointerMove={spot}>
            <span className="principle__n">02</span>
            <h3>По собственной инициативе</h3>
            <p>Не задание и не курсовая: проект делается и улучшается, потому что он действительно нужен.</p>
          </article>
          <article className="principle" onPointerMove={spot}>
            <span className="principle__n">03</span>
            <h3>Важное под рукой</h3>
            <p>Расписание, задания и материалы собраны вместе, чтобы к ним было проще вернуться.</p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const RATE_LABELS = ['Не моё', 'Так себе', 'Неплохо', 'Полезно', 'Хочу себе!'];
const RATE_REPLY = [
  'Спасибо за честность. Идеи, что сделало бы приложение полезнее, всегда можно прислать в Telegram.',
  'Понял. Чего не хватает — можно написать в Telegram, это поможет.',
  'Спасибо! Идеи, что добавить, всегда кстати.',
  'Спасибо! Значит, всё не зря.',
  'Ура! Веб-версия работает прямо в браузере — попробовать можно уже сейчас.'
];
const RATE_KEY = 'schedule-preview-rating';

export function Rate() {
  const [v, setV] = useState(0);
  useEffect(() => {
    try { const s = Number(window.localStorage.getItem(RATE_KEY) || 0); if (s >= 1 && s <= 5) setV(s); } catch { /* storage may be unavailable */ }
  }, []);
  const change = (n: number) => {
    setV(n);
    try { if (n) window.localStorage.setItem(RATE_KEY, String(n)); else window.localStorage.removeItem(RATE_KEY); } catch { /* ignore */ }
  };
  return (
    <section className="section section--rate" aria-labelledby="rate-title">
      <div className="wrap">
        <Reveal className="rate" distance={30}>
          <div className="rate__text">
            <p className="kicker"><span className="kicker__num">★</span><span className="kicker__line" aria-hidden="true" />Мнение</p>
            <h2 className="h2 h2--sm" id="rate-title">Насколько полезна идея?</h2>
            <p className="rate__reply" aria-live="polite">{v ? RATE_REPLY[v - 1] : 'Звёзды выглядывают при наведении. Оценка сохраняется только в этом браузере.'}</p>
          </div>
          <div className="rate__stars">
            <PeekRating value={v} onChange={change} count={5} shape="star" labels={RATE_LABELS} activeColor="#F2C46D" idleColor="#3A4766" tipColor="#1D2944" tipTextColor="#EAF0FB" size={44} lift={10} magnify={1.2} ariaLabel="Оценка идеи Schedule" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Work({ w }: { w: (typeof WORKS)[number] }) {
  const [ok, setOk] = useState(true);
  return (
    <a className="work" href={LINKS.work} target="_blank" rel="noopener noreferrer" onPointerMove={spot}>
      <span className="work__img">
        {ok ? <img src={w.img} alt="" loading="lazy" decoding="async" onError={() => setOk(false)} /> : <span className="work__ph" aria-hidden="true">{w.name.slice(0, 1)}</span>}
      </span>
      <span className="work__body">
        <b>{w.name} <Icon icon={ArrowUpRight01Icon} size={14} stroke={2} /></b>
        <small>{w.text}</small>
        <span className="work__tags">{w.tags.map((t) => <i key={t}>{t}</i>)}</span>
      </span>
    </a>
  );
}

export function Author() {
  return (
    <section className="section" id="author">
      <div className="wrap">
        <SectionHead num="07" kicker="Автор" title={<>Привет, я Александр</>} />
        <div className="author">
          <Reveal className="author__card" distance={50} blur={8}>
            <ReflectiveCard
              name="Александр"
              role="Backend-разработчик · автор Schedule"
              badge="doazhu.pro"
              status=""
              portraitSrc={`${BASE}author-portrait.png`}
              portraitAlt="Портрет Александра"
              statusColor="#7BE0A8"
              idLabel="Telegram"
              idValue="@Doazhu"
              videoSrc={REFLECT}
              tint="#b9d0ff"
              grayscale={0.25}
              metalness={0.9}
              roughness={0.35}
              blurStrength={7}
              width={320}
              height={480}
              radius={28}
            />
          </Reveal>
          <div className="author__info">
            <Reveal distance={30}>
              <p className="author__lead">Проектирую серверную архитектуру, API и базы данных — от концепта до продакшена. Schedule — мой проект для своей группы и для всех, кому неудобно искать важное в переписках.</p>
            </Reveal>
            <Reveal className="stats" stagger={0.08} distance={24} blur={0}>
              <div className="stat"><CountUp to={5} /><span>лет в разработке</span></div>
              <div className="stat"><CountUp to={89} suffix="+" /><span>проектов</span></div>
            </Reveal>
            <Reveal distance={20} blur={0}>
              <ul className="stack" aria-label="Стек">{STACK.map((s) => <li key={s}>{s}</li>)}</ul>
            </Reveal>
            <Reveal distance={24}>
              <div className="works__head">
                <h3 className="h3">Другие работы</h3>
                <a href={LINKS.work} target="_blank" rel="noopener noreferrer" className="link">Портфолио на doazhu.pro <Icon icon={ArrowUpRight01Icon} size={14} stroke={2} /></a>
              </div>
            </Reveal>
            <Reveal className="works" stagger={0.07} distance={24} blur={0}>
              {WORKS.map((w) => <Work key={w.name} w={w} />)}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, value, href, note, accent }: { icon: IconSvgElement; title: string; value: string; href: string; note?: string; accent?: boolean }) {
  return (
    <a className={`contact${accent ? ' contact--accent' : ''}`} href={href} target="_blank" rel="noopener noreferrer" onPointerMove={spot}>
      <span className="contact__icon"><Icon icon={icon} size={24} /></span>
      <span className="contact__body"><small>{title}</small><b>{value}</b>{note && <em>{note}</em>}</span>
      <span className="contact__go" aria-hidden="true"><Icon icon={ArrowUpRight01Icon} size={20} stroke={2} /></span>
    </a>
  );
}

function EmailCard() {
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const addrRef = useRef<HTMLElement>(null);
  const copy = async () => {
    let ok = false;
    try { await navigator.clipboard.writeText(LINKS.email); ok = true; } catch { /* fall back below */ }
    if (!ok) {
      try {
        const ta = document.createElement('textarea');
        ta.value = LINKS.email; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); ok = document.execCommand('copy'); ta.remove();
      } catch { ok = false; }
    }
    if (ok) { setCopied(true); setManual(false); window.setTimeout(() => setCopied(false), 2000); return; }
    // clipboard is blocked here: select the address so it can be copied by hand
    setManual(true);
    try { const el = addrRef.current; const sel = window.getSelection(); if (el && sel) { const r = document.createRange(); r.selectNodeContents(el); sel.removeAllRanges(); sel.addRange(r); } } catch { /* ignore */ }
  };
  return (
    <div className="contact contact--mail" onPointerMove={spot}>
      <span className="contact__icon"><Icon icon={Mail01Icon} size={24} /></span>
      <span className="contact__body"><small>Почта</small><b className="selectable" ref={addrRef}>{LINKS.email}</b><em aria-live="polite">{manual ? 'Адрес выделен — можно скопировать вручную' : 'Для писем и документов'}</em></span>
      <button type="button" className={`copy${copied ? ' is-done' : ''}`} onClick={copy} aria-label="Скопировать адрес почты">
        <Icon icon={copied ? Tick02Icon : Copy01Icon} size={18} stroke={2} />
        <span>{copied ? 'Скопировано' : 'Скопировать'}</span>
      </button>
    </div>
  );
}

export function Contacts() {
  return (
    <section className="section section--contacts" id="contacts">
      <div className="wrap">
        <SectionHead num="08" kicker="Контакты" title={<>На связи</>} lead="Есть вопросы или идеи для приложения? Напиши мне удобным способом." center />
        <Reveal className="contacts" stagger={0.07} distance={30} blur={4}>
          <StarBorder as="div" className="contacts__main" color="#cfe0ff" trailColor="#5E9BFF" backgroundColor="transparent" radius={28} duration={6} stars={2} glow={0.8} thickness={1.5} hover="brighten" clickPulse={false}>
            <ContactCard icon={TelegramIcon} title="Telegram" value="@Doazhu" href={LINKS.telegram} accent />
          </StarBorder>
          <EmailCard />
          <ContactCard icon={Github01Icon} title="GitHub" value="github.com/doazhu" href={LINKS.github} />
          <ContactCard icon={VkIcon} title="ВКонтакте" value="vk.com/doazhu" href={LINKS.vk} />
          <ContactCard icon={Globe02Icon} title="Сайт" value="doazhu.pro" href={LINKS.site} />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="nav__brand" href="#top" aria-label="Schedule — в начало"><Logo size={28} /><span>Schedule</span></a>
        <p className="footer__text">© 2026 · Александр (Doazhu). Сделано для студентов — с заботой и большим количеством кофе.</p>
        <nav className="footer__links" aria-label="Ссылки">
          <a href={LINKS.app} target="_blank" rel="noopener noreferrer">schedule.doazhu.pro</a>
          <a href={LINKS.site} target="_blank" rel="noopener noreferrer">doazhu.pro</a>
          <a href="#top" className="footer__top"><Icon icon={ArrowUp01Icon} size={16} stroke={2} /> Наверх</a>
        </nav>
      </div>
    </footer>
  );
}
