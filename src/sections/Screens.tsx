import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft01Icon, ArrowRight01Icon, PauseIcon, PlayIcon } from '@hugeicons/core-free-icons';
import { Device, Icon, Reveal, SectionHead, reducedMotion, useOnScreen } from '../ui';
import { SCENES, type Scene } from '../data';

const AUTOPLAY = 5200;
const GAP = 28;

function layoutOf(s: Scene) {
  if (s.devices[0].kind === 'web') return 'web';
  return s.devices.length > 1 ? 'pair' : 'single';
}

function SceneCard({ s, i, n }: { s: Scene; i: number; n: number }) {
  const lay = layoutOf(s);
  return (
    <div className={`scene scene--${lay}`}>
      <div className="scene__text">
        <p className="scene__num"><span>{String(i + 1).padStart(2, '0')}</span> / {String(n).padStart(2, '0')}<span className="scene__plat">{s.platform}</span></p>
        <h3 className="scene__title">{s.title}</h3>
        <p className="scene__lead">{s.text}</p>
        <ul className="scene__points">
          {s.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>
      <div className="scene__stage">
        <div className="scene__glow" aria-hidden="true" />
        {s.devices.map((d, k) => (
          <Device key={d.src} kind={d.kind} src={d.src} alt={d.alt} className={`scene__dev scene__dev--${k}`} />
        ))}
      </div>
    </div>
  );
}

export function Screens() {
  const n = SCENES.length;
  const [cur, setCur] = useState(0);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [slideW, setSlideW] = useState(1000);
  const [rootRef, onScreen] = useOnScreen<HTMLDivElement>('-15% 0px');
  const stageRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ x: number; y: number; id: number; moved: boolean; axis: '' | 'x' | 'y' } | null>(null);
  const [reduced, setReduced] = useState(false);
  const dragEnd = useRef(0);

  useEffect(() => setReduced(reducedMotion()), []);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const measure = () => {
      const cw = el.clientWidth;
      const w = cw < 720 ? cw - 40 : cw < 900 ? Math.min(620, cw - 140) : Math.min(1060, cw - 220);
      setSlideW(Math.max(260, w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const go = useCallback((i: number) => setCur(((i % n) + n) % n), [n]);
  const running = onScreen && !hover && !dragging && !userPaused && !reduced;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => go(cur + 1), AUTOPLAY);
    return () => window.clearTimeout(t);
  }, [running, cur, go]);

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: false, axis: '' };
  };
  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s || s.id !== e.pointerId) return;
    const mx = e.clientX - s.x, my = e.clientY - s.y;
    if (!s.axis) {
      if (Math.abs(mx) < 6 && Math.abs(my) < 6) return;
      s.axis = Math.abs(mx) > Math.abs(my) ? 'x' : 'y';
      if (s.axis === 'x') { (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId); setDragging(true); }
    }
    if (s.axis !== 'x') return;
    s.moved = true;
    setDx(mx);
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s || s.id !== e.pointerId) return;
    if (s.axis === 'x') {
      dragEnd.current = performance.now();
      const mx = e.clientX - s.x;
      const step = slideW + GAP;
      const shift = Math.abs(mx) > 60 ? Math.max(1, Math.round(Math.abs(mx) / step)) * (mx < 0 ? 1 : -1) : 0;
      if (shift) go(cur + shift);
    }
    setDx(0);
    setDragging(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); }
  };

  const chipsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const box = chipsRef.current;
    const chip = box?.children[cur] as HTMLElement | undefined;
    if (!box || !chip) return;
    const left = chip.offsetLeft - (box.clientWidth - chip.offsetWidth) / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: reduced ? 'auto' : 'smooth' });
  }, [cur, reduced]);

  const step = slideW + GAP;

  return (
    <section className="section section--screens" id="screens">
      <div className="wrap">
        <SectionHead
          num="03"
          kicker="Экраны"
          title={<>Тур по приложению</>}
          lead="iPhone, Android и браузер — одна логика и одни данные. Листается свайпом, стрелками на клавиатуре или кнопками."
        />
      </div>

      <div
        ref={rootRef}
        className="slider"
        role="region"
        aria-roledescription="карусель"
        aria-label="Экраны Schedule"
        tabIndex={0}
        onKeyDown={onKey}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false); }}
      >
        <div
          ref={stageRef}
          className={`slider__stage${dragging ? ' is-dragging' : ''}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{ ['--sw' as string]: `${slideW}px` } as CSSProperties}
        >
          {SCENES.map((s, i) => {
            let off = i - cur;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const x = off * step + dx;
            const k = x / step;
            const a = Math.min(Math.abs(k), 2.4);
            const style: CSSProperties = {
              width: slideW,
              transform: `translate3d(calc(-50% + ${x.toFixed(1)}px), -50%, 0) rotateY(${(-k * 9).toFixed(2)}deg) scale(${(1 - Math.min(a, 2) * 0.09).toFixed(3)})`,
              opacity: a > 2.1 ? 0 : 1 - Math.min(a, 1) * 0.42,
              zIndex: 20 - Math.round(a * 4),
              filter: `brightness(${(1 - Math.min(a, 1) * 0.3).toFixed(3)})`
            };
            const isCur = off === 0;
            return (
              <div
                key={s.id}
                className={`slide${isCur ? ' is-current' : ''}`}
                style={style}
                role="group"
                aria-roledescription="слайд"
                aria-label={`${i + 1} из ${n}: ${s.title}`}
                aria-hidden={!isCur}
                onClick={() => { if (performance.now() - dragEnd.current < 300) return; if (!isCur && Math.abs(off) <= 2) go(i); }}
              >
                <SceneCard s={s} i={i} n={n} />
              </div>
            );
          })}
        </div>

        <div className="wrap slider__ui">
          <div className="slider__chips" role="tablist" aria-label="Выбор экрана" ref={chipsRef}>
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === cur}
                className={`chipbtn${i === cur ? ' is-active' : ''}`}
                onClick={() => go(i)}
              >
                <span className="chipbtn__n">{String(i + 1).padStart(2, '0')}</span>{s.title}
                {i === cur && <span key={`${cur}-${running}`} className={`chipbtn__bar${running ? ' is-running' : ''}`} style={{ animationDuration: `${AUTOPLAY}ms` }} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div className="slider__ctrls">
            <button type="button" className="round" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? 'Включить автопрокрутку' : 'Пауза автопрокрутки'}>
              <Icon icon={userPaused || reduced ? PlayIcon : PauseIcon} size={18} />
            </button>
            <button type="button" className="round" onClick={() => go(cur - 1)} aria-label="Предыдущий экран"><Icon icon={ArrowLeft01Icon} size={20} stroke={2} /></button>
            <button type="button" className="round round--accent" onClick={() => go(cur + 1)} aria-label="Следующий экран"><Icon icon={ArrowRight01Icon} size={20} stroke={2} /></button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">{`Экран ${cur + 1} из ${n}: ${SCENES[cur].title}`}</p>
      </div>
    </section>
  );
}
