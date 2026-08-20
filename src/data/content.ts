export type Program = { title: string; description: string; icon: string }
export type LearningItem = { title: string; description: string; icon: string }
export type Speaker = { name: string; role: string; image: string }
export type Review = { name: string; text: string; avatar: string }

export const programs: Program[] = [
  { title: 'Спортивна психологія', description: 'Психологічна підготовка спортсменів та команд до високих результатів.', icon: '/assets/icons/programs/program-sport-psychology.png' },
  { title: 'Психологія мистецтва', description: 'Дослідження творчості, естетики та впливу мистецтва на психіку людини.', icon: '/assets/icons/programs/program-art-psychology.png' },
  { title: 'Нейропсихологія', description: 'Діагностика та корекція когнітивних процесів у дітей та дорослих.', icon: '/assets/icons/programs/program-neuropsychology.png' },
  { title: 'Тілесно-орієнтована терапія', description: 'Робота з емоціями та травматичним досвідом через тіло.', icon: '/assets/icons/programs/program-body-therapy.png' },
]

export const learningItems: LearningItem[] = [
  { title: 'Живі онлайн-лекції', description: 'Інтерактивні заняття з експертами у реальному часі та живий зворотний зв’язок.', icon: '/assets/icons/learning/learning-live-online.png' },
  { title: 'Записи всіх модулів', description: 'Доступ до записів занять у будь-який час у зручному для вас темпі.', icon: '/assets/icons/learning/learning-recordings.png' },
  { title: 'Довічний доступ', description: 'Матеріали залишаються з вами назавжди після завершення навчання.', icon: '/assets/icons/learning/learning-lifetime-access.png' },
  { title: 'Сертифікат', description: 'Отримайте іменний сертифікат після успішного завершення програми.', icon: '/assets/icons/learning/learning-certificate.png' },
]

export const speakers: Speaker[] = [
  { name: 'Світлана Мозган', role: 'Психолог, психотерапевт, спеціаліст у сфері тілесно-орієнтованої терапії та травматерапії.', image: '/assets/speakers/speaker-1.png' },
  { name: 'Катерина Кругляк', role: 'Психолог, соматолог, експерт з нейрокогнітивної діагностики та корекції.', image: '/assets/speakers/speaker-2.png' },
  { name: 'Наталія Твердохліб', role: 'Психолог, арт-терапевт, спеціаліст з психології мистецтва та креативного розвитку.', image: '/assets/speakers/speaker-3.png' },
]

export const reviews: Review[] = [
  { name: 'Марія С.', text: 'Змістовно, цікаво та практично! Отримала багато нових інструментів, які одразу допомагають у роботі. Рекомендую всім колегам.', avatar: '/assets/reviews/review-avatar-1.png' },
  { name: 'Роман К.', text: 'Програма перевершила всі очікування. Глибокі знання, підтримка кураторів та неймовірна атмосфера.', avatar: '/assets/reviews/review-avatar-2.png' },
  { name: 'Олена К.', text: 'Навчання в UNIMIND змінило мій підхід до роботи. Дякую за якісний контент та практичні завдання!', avatar: '/assets/reviews/review-avatar-3.png' },
  { name: 'Ірина М.', text: 'Дуже ціную поєднання ґрунтовної теорії з практикою. Кожен модуль давав інструменти, які можна застосувати одразу після заняття.', avatar: '/assets/reviews/review-avatar-1.png' },
  { name: 'Андрій Т.', text: 'Спікери пояснюють складні теми зрозуміло й структуровано. Окремо вдячний за живі розбори та уважний зворотний зв’язок.', avatar: '/assets/reviews/review-avatar-2.png' },
  { name: 'Наталія В.', text: 'Навчання допомогло систематизувати досвід і впевненіше працювати з клієнтами. Матеріали залишаються корисними й після курсу.', avatar: '/assets/reviews/review-avatar-3.png' },
  { name: 'Катерина Л.', text: 'Комфортний темп, сильна спільнота та багато практики. Відчула професійне зростання вже під час перших модулів.', avatar: '/assets/reviews/review-avatar-1.png' },
  { name: 'Максим Р.', text: 'Якісна програма без зайвої води. Особливо сподобалися кейси з реальної практики та можливість ставити питання експертам.', avatar: '/assets/reviews/review-avatar-2.png' },
  { name: 'Софія Д.', text: 'Отримала саме ті знання, яких бракувало для подальшого розвитку. Повертаюся до записів і матеріалів навіть після завершення навчання.', avatar: '/assets/reviews/review-avatar-3.png' },
]
