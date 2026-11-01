export const BASE = import.meta.env.BASE_URL;
export const shot = (name: string) => `${BASE}shots/${name}.webp`;
export const wallShot = (name: string) => `${BASE}wall/${name}.webp`;

export const LINKS = {
  app: 'https://schedule.doazhu.pro',
  telegram: 'https://t.me/Doazhu',
  vk: 'https://vk.com/doazhu',
  github: 'https://github.com/doazhu',
  site: 'https://doazhu.pro',
  work: 'https://doazhu.pro/work',
  email: 'me@doazhu.pro'
};

export type DeviceKind = 'ios' | 'android' | 'web';
export interface SceneDevice {
  kind: DeviceKind;
  src: string;
  alt: string;
}
export interface Scene {
  id: string;
  platform: string;
  title: string;
  text: string;
  points: string[];
  devices: SceneDevice[];
}

export const SCENES: Scene[] = [
  {
    id: 'today',
    platform: 'iOS',
    title: 'Сегодня',
    text: 'Открыл — и сразу видно, какая пара идёт, где она и сколько до конца. Следующая — ниже.',
    points: ['Числитель и знаменатель', 'Изменения — прямо на карточке пары'],
    devices: [
      { kind: 'ios', src: shot('ios-today'), alt: 'Экран «Сегодня» на iPhone: идёт пара, 58 минут до конца' }
    ]
  },
  {
    id: 'feed',
    platform: 'iOS',
    title: 'Лента группы',
    text: 'ДЗ, фото доски, файлы и опросы — у каждой записи свой тип, поэтому нужное находится фильтром, а не прокруткой чата.',
    points: ['Фильтры: ДЗ · фото · файлы · опросы', 'Реакции и комментарии'],
    devices: [
      { kind: 'ios', src: shot('ios-feed'), alt: 'Лента группы на iPhone с ДЗ и фото доски' },
      { kind: 'ios', src: shot('ios-news'), alt: 'Новости на iPhone' }
    ]
  },
  {
    id: 'media',
    platform: 'iOS',
    title: 'Фото, видео и лекции',
    text: 'Разбор задачи на видео, запись лекции с главами — смотреть и слушать прямо из ленты.',
    points: ['Видео с субтитрами', 'Аудио с главами и скоростью'],
    devices: [
      { kind: 'ios', src: shot('ios-video'), alt: 'Просмотр видео из ленты на iPhone' },
      { kind: 'ios', src: shot('ios-audio'), alt: 'Запись лекции с главами на iPhone' }
    ]
  },
  {
    id: 'tests',
    platform: 'iOS',
    title: 'ТК и экзамены',
    text: 'Ближайшая контрольная с отсчётом дней, что повторить и кнопка «в календарь».',
    points: ['Отсчёт до контрольной', 'Список тем для повторения'],
    devices: [
      { kind: 'ios', src: shot('ios-tests'), alt: 'Экран контрольных на iPhone' }
    ]
  },
  {
    id: 'android',
    platform: 'Android',
    title: 'Android',
    text: 'Та же логика в родном виде Android: крупные заголовки, плавающая панель и Material You.',
    points: ['Сборка APK', 'Material You'],
    devices: [
      { kind: 'android', src: shot('and-today'), alt: 'Экран «Сегодня» на Android' },
      { kind: 'android', src: shot('and-feed'), alt: 'Лента на Android' }
    ]
  },
  {
    id: 'web-week',
    platform: 'Веб',
    title: 'Неделя на большом экране',
    text: 'В браузере — вся неделя сеткой, текущая пара, изменения и ДЗ рядом. Работает и на телефоне.',
    points: ['schedule.doazhu.pro', 'ПК и телефон'],
    devices: [
      { kind: 'web', src: shot('web-today'), alt: 'Веб-версия: расписание недели сеткой' }
    ]
  },
  {
    id: 'web-feed',
    platform: 'Веб',
    title: 'Лента и новости в браузере',
    text: 'Лента группы слева, новости — справа. Фото и видео открываются в просмотрщике.',
    points: ['Просмотр фото, видео и аудио', 'Новая запись с вложениями'],
    devices: [
      { kind: 'web', src: shot('web-feed'), alt: 'Веб-версия: лента группы и новости' }
    ]
  },
  {
    id: 'group',
    platform: 'iOS',
    title: 'Группа и староста',
    text: 'Контакты куратора и старосты, роли помощников. Староста правит расписание и отмечает присутствующих — журнал потом заполнить легко.',
    points: ['Роли и права', 'Отметки на паре'],
    devices: [
      { kind: 'ios', src: shot('ios-group'), alt: 'Экран группы на iPhone' },
      { kind: 'ios', src: shot('ios-roles'), alt: 'Роли и права на iPhone' }
    ]
  },
  {
    id: 'lock',
    platform: 'iOS',
    title: 'Не открывая приложение',
    text: 'Утренняя сводка, отмены и текущая пара — на экране блокировки.',
    points: ['Виджеты', 'Пара сейчас и следующая'],
    devices: [
      { kind: 'ios', src: shot('ios-lock'), alt: 'Экран блокировки iPhone с виджетами Schedule' }
    ]
  }
];

export const WALL = [
  'ios-today', 'and-feed', 'ios-video', 'webc-feed', 'ios-tests', 'and-week', 'ios-news', 'and-today',
  'ios-photo', 'ios-group', 'and-audio', 'webc-news', 'ios-feed', 'and-compose', 'ios-lock', 'ios-audio',
  'and-video', 'ios-roles', 'and-main', 'ios-guest', 'ios-signup'
].map((n) => ({ image: wallShot(n) }));

export const WORKS = [
  { name: 'ProfPay', text: 'Учёт плательщиков для профкома', tags: ['FastAPI', 'React + Vite', 'Tailwind'], img: 'https://doazhu.pro/static-projects/ProfPay/images/ProfPay.png' },
  { name: 'Videla Gifts', text: 'Сайт бренда персонализированных подарков: кофе, чай и какао в авторской упаковке', tags: ['Django', 'JavaScript'], img: 'https://doazhu.pro/static-projects/vide-la/images/vide-la.png' },
  { name: 'AI Translate', text: 'Нейросетевой переводчик на базе LLaMA — превью-версия', tags: ['FastAPI', 'LLaMA'], img: 'https://doazhu.pro/static-projects/ai-translate/images/ai-translate.png' },
  { name: 'Portfolio v1', text: 'Первое портфолио: минимализм и тёмная тема', tags: ['HTML', 'CSS', 'JS'], img: 'https://doazhu.pro/static-projects/portfolio-1/images/portfolio-1.png' }
];

export const STACK = ['Go', 'Python', 'FastAPI', 'Django', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Nginx', 'Swift'];
