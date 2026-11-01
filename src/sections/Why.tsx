import { File01Icon, Task01Icon, Tick02Icon, Calendar03Icon, Message01Icon } from '@hugeicons/core-free-icons';
import { Icon, Reveal, SectionHead, useInView } from '../ui';

type Msg = { who: string; text?: string; tag?: string; sticker?: boolean };
const CHAT: Msg[] = [
  { who: 'Иван', text: 'кто идёт в субботу?' },
  { who: 'Лиза', text: 'я 🙋‍♀️' },
  { who: 'Эллен', text: 'ДЗ по статистике: задачи 3–7, сдать в пятницу', tag: 'ДЗ' },
  { who: 'Саша', text: '😂😂😂' },
  { who: 'Иван', sticker: true },
  { who: 'Лиза', text: 'а во сколько?' },
  { who: 'Саша', text: 'Методичка.pdf', tag: 'файл' },
  { who: 'Иван', text: 'го в 12' },
  { who: 'Эллен', text: 'в среду 2-й пары не будет', tag: 'отмена' },
  { who: 'Лиза', text: 'кто-нибудь записал, что задали?' },
  { who: 'Саша', text: 'листай выше 🙃' },
  { who: 'Иван', text: 'голосуем: 12 или 15?', tag: 'опрос' },
  { who: 'Лиза', text: 'а где методичка была?' },
  { who: 'Саша', text: 'контрольная 13-го, кстати', tag: 'ТК' }
];

function ChatColumn() {
  const list = (hidden: boolean) => (
    <ul className="chat__list" aria-hidden={hidden || undefined}>
      {CHAT.map((m, i) => (
        <li key={i} className={`bubble${m.tag ? ' bubble--lost' : ''}`}>
          <span className="bubble__who">{m.who}</span>
          {m.sticker ? (
            <svg className="bubble__sticker" viewBox="0 0 100 100" role="img" aria-label="Улыбающаяся звёздочка машет рукой">
              <path d="M49 8c4 0 8 16 12 18 4 3 20-3 23 1 3 5-7 16-6 21 1 5 14 14 12 19-2 5-18 4-22 7-4 3-6 18-12 19-5 1-12-13-17-14-5-1-18 8-22 5-4-3 1-18-1-23-2-5-16-11-15-17 1-5 17-7 20-11C25 29 23 14 28 12c5-2 16 8 21 8z" fill="#f2c46d" stroke="#fff2d0" strokeWidth="3" strokeLinejoin="round" />
              <path d="M40 49v2m19-2v2" stroke="#263250" strokeWidth="5" strokeLinecap="round" />
              <path d="M42 61c4 5 11 5 15 0" fill="none" stroke="#263250" strokeWidth="3" strokeLinecap="round" />
              <circle cx="33" cy="57" r="4" fill="#ef9c95" opacity=".8" /><circle cx="66" cy="57" r="4" fill="#ef9c95" opacity=".8" />
              <path d="M78 35c6-8 10-9 12-6 2 2 0 5-2 7 5-3 8-1 7 2-1 4-7 7-13 9" fill="#f2c46d" stroke="#fff2d0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : <span className="bubble__text">{m.text}</span>}
          {m.tag && <span className="bubble__tag">{m.tag}</span>}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="chat" role="img" aria-label="Пример чата группы: ДЗ, файлы и даты контрольных теряются среди сообщений">
      <div className="chat__head" aria-hidden="true">
        <span className="chat__ava"><Icon icon={Message01Icon} size={18} /></span>
        <span><b>Чат группы</b><small>1 248 непрочитанных</small></span>
      </div>
      <div className="chat__viewport" aria-hidden="true">
        <div className="chat__track">{list(false)}{list(true)}</div>
      </div>
    </div>
  );
}

function FeedColumn() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`neat${seen ? ' is-in' : ''}`}>
      <article className="neat__card">
        <p className="label label--blue"><Icon icon={Calendar03Icon} size={14} /> ДЗ · Прикладная статистика</p>
        <p className="neat__title">Задачи 3–7 к практике</p>
        <p className="neat__meta">Сдать в пятницу, ко 2-й паре</p>
        <span className="neat__check" aria-hidden="true"><Icon icon={Tick02Icon} size={14} stroke={2.6} /></span>
      </article>
      <article className="neat__card">
        <p className="label label--coral">Изменение · среда</p>
        <p className="neat__title">2-я пара отменена</p>
        <p className="neat__meta">Информационные системы</p>
      </article>
      <article className="neat__card">
        <p className="label"><Icon icon={File01Icon} size={14} /> Файл</p>
        <p className="neat__file"><span className="pdf">PDF</span>Методичка по статистике.pdf <small>2,4 МБ</small></p>
      </article>
      <article className="neat__card">
        <p className="label">Опрос · до субботы</p>
        <p className="neat__title">Во сколько собираемся?</p>
        <div className="poll">
          <div className="poll__row"><span className="poll__fill" style={{ ['--w' as string]: '64%' }} /><span>В 12:00</span><b>64%</b></div>
          <div className="poll__row"><span className="poll__fill" style={{ ['--w' as string]: '36%' }} /><span>В 15:00</span><b>36%</b></div>
        </div>
      </article>
      <article className="neat__card">
        <p className="label label--amber"><Icon icon={Task01Icon} size={14} /> Контрольная № 1</p>
        <p className="neat__title">через 7 дней · 13 октября</p>
        <p className="neat__meta">Теория систем и системный анализ</p>
      </article>
    </div>
  );
}

export function Why() {
  return (
    <section className="section" id="why">
      <div className="wrap">
        <SectionHead
          num="01"
          kicker="Зачем, если есть Telegram"
          title={<>В переписке всё тонет.<br />Здесь у каждой вещи своё место</>}
          lead="Telegram хорош для общения, но искать в нём ДЗ, файлы и даты контрольных — отдельный квест: всё теряется в переписке. В Schedule это разложено по полочкам."
        />
        <div className="why">
          <Reveal className="why__col" distance={50}>
            <p className="why__cap"><span className="dot dot--coral" aria-hidden="true" />Было: чат группы</p>
            <ChatColumn />
          </Reveal>
          <div className="why__arrow" aria-hidden="true">
            <svg viewBox="0 0 120 40" width="120" height="40"><path className="flow" d="M4 20 H108" /><path d="M100 10 L112 20 L100 30" fill="none" stroke="#5E9BFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <Reveal className="why__col" distance={50} delay={0.15}>
            <p className="why__cap"><span className="dot dot--blue" aria-hidden="true" />Стало: лента Schedule</p>
            <FeedColumn />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
