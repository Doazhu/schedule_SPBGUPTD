import { useEffect, useRef, useState } from 'react';
import {
  AndroidIcon, AppleIcon, ArrowUpRight01Icon, Globe02Icon, ServerStack01Icon, Shield01Icon,
  UniversityIcon, BubbleChatIcon
} from '@hugeicons/core-free-icons';
import DriftWall from '../bits/DriftWall/DriftWall';
import StarBorder from '../bits/StarBorder/StarBorder';
import { Icon, Reveal, SectionHead, reducedMotion, spot, useInView, useOnScreen } from '../ui';
import { LINKS, WALL } from '../data';

export function Wall() {
  const [ref, on] = useOnScreen<HTMLDivElement>('200px 0px');
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)');
    const f = () => setNarrow(mq.matches);
    f();
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return (
    <section className="wall" aria-labelledby="wall-title" ref={ref}>
      <div className="wall__bg" aria-hidden="true">
        {on && (
          <DriftWall
            items={WALL}
            columns={narrow ? 5 : 8}
            tileWidth={narrow ? 104 : 150}
            tileHeight={narrow ? 225 : 325}
            gap={narrow ? 12 : 18}
            radius={narrow ? 14 : 22}
            tilt={18}
            turn={-16}
            roll={4}
            speed={26}
            depth={140}
            dim={0.62}
            fade={0.5}
            overlayColor="#0B1120"
          />
        )}
      </div>
      <div className="wall__veil" aria-hidden="true" />
      <div className="wall__content wrap">
        <Reveal distance={30}>
          <p className="kicker kicker--center"><span className="kicker__num">∞</span><span className="kicker__line" aria-hidden="true" />Все экраны</p>
          <h2 className="h2 h2--xl" id="wall-title">Одна логика —<br />три платформы</h2>
          <p className="lead lead--center">Десятки экранов — от расписания на сегодня до просмотра видео из ленты. Одни данные на iPhone, Android и в браузере.</p>
          <div className="wall__cta">
            <StarBorder as="a" href={LINKS.app} target="_blank" rel="noopener noreferrer" className="btn btn--primary" color="#cfe0ff" trailColor="#5E9BFF" backgroundColor="#5E9BFF" textColor="#0B1120" radius={999} duration={3.6} stars={2} glow={0.9}>
              Попробовать в браузере <Icon icon={ArrowUpRight01Icon} size={18} stroke={2.2} />
            </StarBorder>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const TECH = [
  { icon: ServerStack01Icon, k: 'backend', name: 'Go', sub: 'Микросервисы', text: 'Свой бэкенд с микросервисной архитектурой — один API для всех трёх клиентов.' },
  { icon: AppleIcon, k: 'ios', name: 'Swift', sub: 'iOS', text: 'Нативное приложение. ДЗ интегрировано с «Напоминаниями».' },
  { icon: AndroidIcon, k: 'android', name: 'C++', sub: 'Android · APK', text: 'Стартовал как экспорт со Swift через Skip, дальше — своя сборка.' },
  { icon: Globe02Icon, k: 'web', name: 'Web', sub: 'schedule.doazhu.pro', text: 'Работает в браузере на компьютере и телефоне — без установки.' }
];

function Diagram() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  return (
    <div ref={ref} className={`diagram${seen ? ' is-in' : ''}`} role="img" aria-label="Схема: iOS, Android и веб обращаются к бэкенду на Go с микросервисами">
      <svg viewBox="0 0 640 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="dg" x1="0" x2="1"><stop offset="0" stopColor="#5E9BFF" stopOpacity="0.15" /><stop offset="1" stopColor="#5E9BFF" stopOpacity="0.9" /></linearGradient>
        </defs>
        {[50, 130, 210].map((y, i) => (
          <g key={y}>
            <path className="diagram__wire" pathLength={100} d={`M150 ${y} C 260 ${y}, 300 130, 400 130`} />
            <path className="diagram__pulse" pathLength={100} style={{ animationDelay: `${i * 0.6}s` }} d={`M150 ${y} C 260 ${y}, 300 130, 400 130`} />
          </g>
        ))}
        {[['iOS', 50], ['Android', 130], ['Веб', 210]].map(([t, y]) => (
          <g key={t as string} className="diagram__node">
            <rect x="20" y={(y as number) - 22} width="130" height="44" rx="14" />
            <text x="85" y={(y as number) + 5} textAnchor="middle">{t}</text>
          </g>
        ))}
        <g className="diagram__core">
          <rect x="400" y="70" width="220" height="120" rx="22" />
          <text x="510" y="118" textAnchor="middle" className="diagram__big">Go</text>
          <text x="510" y="146" textAnchor="middle" className="diagram__small">микросервисы · API</text>
          {[0, 1, 2, 3].map((i) => <circle key={i} cx={452 + i * 38} cy="168" r="5" className="diagram__led" style={{ animationDelay: `${i * 0.35}s` }} />)}
        </g>
      </svg>
    </div>
  );
}

export function Tech() {
  return (
    <section className="section" id="tech">
      <div className="wrap">
        <SectionHead
          num="04"
          kicker="Как устроено"
          title={<>Три клиента,<br />один бэкенд</>}
          lead="Делаю по собственной инициативе — от серверной части до приложений. Это и практика, и инструмент для учебной группы."
        />
        <div className="tech">
          <Reveal className="tech__diagram" distance={40}><Diagram /></Reveal>
          <Reveal className="tech__grid" stagger={0.08} distance={30} blur={4}>
            {TECH.map((t) => (
              <article key={t.k} className="stack-card" onPointerMove={spot}>
                <span className="stack-card__icon"><Icon icon={t.icon} size={22} /></span>
                <p className="stack-card__sub">{t.sub}</p>
                <h3 className="stack-card__name">{t.name}</h3>
                <p className="stack-card__text">{t.text}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: Shield01Icon, when: 'Сейчас', title: 'Защита', text: 'Главный фокус — безопасность аккаунтов и данных группы.' },
  { icon: UniversityIcon, when: 'Следующий шаг', title: 'Портал вуза — в приложении', text: 'Подтянуть данные с вузовского портала, чтобы всё важное было рядом с расписанием — легко и доступно для всех.' },
  { icon: BubbleChatIcon, when: 'Дальше', title: 'Чаты', text: 'Для начала — в режиме чтения, чтобы студенты были в курсе и ничего не пропускали.' }
];

export function Roadmap() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    if (reducedMotion()) { el.style.setProperty('--fill', '1'); return; }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.35);
        el.style.setProperty('--fill', Math.max(0, Math.min(1, p)).toFixed(3));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="section" id="roadmap">
      <div className="wrap">
        <SectionHead num="05" kicker="Что дальше" title={<>Планы</>} lead="Приложение уже работает, но идей больше, чем готовых экранов." />
        <div className="road" ref={lineRef}>
          <div className="road__line" aria-hidden="true"><span /></div>
          <ol className="road__list">
            {STEPS.map((s, i) => (
              <li key={s.title} className="road__item">
                <span className="road__dot" aria-hidden="true"><Icon icon={s.icon} size={20} /></span>
                <Reveal delay={i * 0.12} distance={30}>
                  <p className="road__when">{s.when}</p>
                  <h3 className="road__title">{s.title}</h3>
                  <p className="road__text">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
