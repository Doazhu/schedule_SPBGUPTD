import type { ReactNode } from 'react';
import {
  Attachment01Icon, BirthdayCakeIcon, Calendar03Icon, CheckmarkCircle02Icon, ChartColumnIcon,
  Megaphone01Icon, Notification03Icon, PlayCircleIcon, Task01Icon, UserCheck01Icon, GiftIcon
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';
import { Device, Icon, Reveal, SectionHead, spot, useInView } from '../ui';
import { shot } from '../data';

const Card = ({ icon, title, text, className = '', children }: { icon: IconSvgElement; title: string; text: ReactNode; className?: string; children?: ReactNode }) => (
  <article className={`feat ${className}`} onPointerMove={spot}>
    <span className="feat__icon"><Icon icon={icon} size={22} /></span>
    <h3 className="feat__title">{title}</h3>
    <p className="feat__text">{text}</p>
    {children && <div className="feat__visual">{children}</div>}
  </article>
);

function HwDemo() {
  const [ref, seen] = useInView<HTMLUListElement>(0.5);
  return (
    <ul ref={ref} className={`hw${seen ? ' is-in' : ''}`} aria-label="Пример списка ДЗ">
      <li><span className="hw__box" aria-hidden="true"><Icon icon={CheckmarkCircle02Icon} size={16} stroke={2.2} /></span><span><b>Иностранный язык</b><small>Эссе про путешествия, 200 слов</small></span><em>завтра</em></li>
      <li><span className="hw__box" aria-hidden="true" /><span><b>Прикладная статистика</b><small>Задачи 3–7, ко 2-й паре</small></span><em>пятница</em></li>
      <li className="hw__remind"><Icon icon={Notification03Icon} size={16} />На iOS — сразу в «Напоминания»</li>
    </ul>
  );
}

function PollDemo() {
  const [ref, seen] = useInView<HTMLDivElement>(0.5);
  return (
    <div ref={ref} className={`poll poll--big${seen ? ' is-in' : ''}`} aria-label="Пример опроса: 64% за 12:00, 36% за 15:00">
      <div className="poll__row"><span className="poll__fill" style={{ ['--w' as string]: '64%' }} /><span>В 12:00 ✓</span><b>64% · 7</b></div>
      <div className="poll__row"><span className="poll__fill" style={{ ['--w' as string]: '36%' }} /><span>В 15:00</span><b>36% · 4</b></div>
      <p className="poll__foot">11 голосов · до субботы</p>
    </div>
  );
}

function WeekDemo() {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const cells = [
    [1, 0, 1, 0, 3, 1], [1, 2, 4, 0, 1, 0], [1, 1, 0, 1, 0, 0], [0, 1, 0, 1, 0, 0]
  ];
  return (
    <div className="week" aria-label="Пример недели: пары по дням, текущая подсвечена, отмена и смена кабинета отмечены">
      {days.map((d, i) => <span key={d} className={`week__d${i === 1 ? ' is-today' : ''}`}>{d}</span>)}
      {cells.flat().map((c, i) => <span key={i} className={`week__c week__c--${c}`} style={{ ['--i' as string]: i }} />)}
    </div>
  );
}

export function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <SectionHead
          num="02"
          kicker="Возможности"
          title={<>Всё, что нужно группе, —<br />без «листай выше»</>}
          lead="Расписание, задания и важные материалы группы собраны в одном месте."
        />
        <Reveal className="bento" stagger={0.07} distance={36} blur={4}>
          <Card icon={Attachment01Icon} title="Лента группы" className="feat--wide feat--feed" text="Записи с файлами, фото доски, видео разборов и записями лекций. У каждой записи свой тип — нужное находится фильтром.">
            <div className="feat__phones" aria-hidden="true">
              <Device kind="ios" src={shot('ios-feed')} alt="" />
              <Device kind="ios" src={shot('ios-photo')} alt="" />
            </div>
          </Card>
          <Card icon={Task01Icon} title="ДЗ с напоминаниями" text="ДЗ со сроком сдачи — отдельной записью, а не сообщением, которое уедет вверх.">
            <HwDemo />
          </Card>
          <Card icon={ChartColumnIcon} title="Голосования" text="Во сколько собираемся, кто едет, какую тему берём — решается в пару касаний.">
            <PollDemo />
          </Card>
          <Card icon={Calendar03Icon} title="Расписание" text="Неделя целиком, числитель и знаменатель, отмены и смена кабинета видны сразу.">
            <WeekDemo />
          </Card>
          <Card icon={Megaphone01Icon} title="Новости" text="Новости и объявления живут отдельно от болтовни, важное помечено." />
          <Card icon={PlayCircleIcon} title="ТК и экзамены" text="Даты, кабинеты и отсчёт до ближайшей контрольной. Ничего не всплывает внезапно.">
            <div className="countdown" aria-label="7 дней до контрольной"><span className="countdown__n">7</span><span>дней до<br />контрольной № 1</span></div>
          </Card>
          <Card icon={UserCheck01Icon} title="Инструменты старосты" text="Правит расписание и отмечает присутствующих на паре — журнал потом заполняется легко." />
          <Card icon={BirthdayCakeIcon} title="Дни рождения с вишлистами" className="feat--bday" text="Чей праздник скоро — видно заранее, а вишлист подскажет, что подарить.">
            <div className="bday" aria-hidden="true">
              <span className="bday__ava">ЛИ</span>
              <span><b>У Лизы в пятницу ДР</b><small><Icon icon={GiftIcon} size={14} /> вишлист · 3 идеи</small></span>
              <span className="confetti"><i /><i /><i /><i /><i /><i /></span>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
