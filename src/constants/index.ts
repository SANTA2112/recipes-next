import type { ComponentType, SVGProps } from 'react';

import HeartIcon from '@/assets/icons/heart.svg';
import PeopleIcon from '@/assets/icons/people.svg';
import BookIcon from '@/assets/icons/book.svg';
import QualityIcon from '@/assets/icons/quality.svg';

export interface Achievement {
  title: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export type FormType = Extract<keyof typeof ROUTES, 'login' | 'register'>;

interface FormOptionsByType {
  text: string;
  linkText: string;
  link: string;
  title: string;
  description: string;
}

export type FormInfoByPath = Record<FormType, FormOptionsByType>;

export const ROUTES = {
  recipes: '/recipes',
  myrecipes: '/my-recipes',
  about: '/about',
  login: '/login',
  register: '/register',
  recipe: (slug: string) => `/recipes/${slug}`,
} as const;

export const infoCards = [
  {
    title: 'Наша миссия',
    descriptions: [
      'Мы создали этот сайт, чтобы сохранить и передать традиции русской кухни. Здесь собраны проверенные рецепты, которые передавались из поколения в поколение, а также современные интерпретации классических блюд.',
      'Русская кухня - это не просто еда, это часть нашей культуры и истории. Каждое блюдо имеет свою историю, свои особенности приготовления и неповторимый вкус.',
    ],
  },
  {
    title: 'Наша история',
    descriptions: [
      'Проект был создан группой энтузиастов, которые влюблены в русскую кухню. Мы начали с небольшой коллекции семейных рецептов, и за годы работы наша база выросла до сотен блюд.',
      'Сегодня мы продолжаем развиваться, добавляя новые рецепты, улучшая функциональность сайта и создавая сообщество людей, которые ценят настоящую домашнюю кухню.',
    ],
  },
];

export const achievements: Achievement[] = [
  {
    title: 'С любовью к традициям',
    description: 'Мы бережно собираем и сохраняем рецепты, проверенные временем и любимые многими поколениями.',
    icon: HeartIcon,
  },
  {
    title: 'Сообщество поваров',
    description: 'Присоединяйтесь к нашему сообществу, делитесь своими рецептами и семейными секретами приготовления.',
    icon: PeopleIcon,
  },
  {
    title: 'Обучение и практика',
    description: 'Подробные инструкции и советы помогут вам освоить даже самые сложные блюда русской кухни.',
    icon: BookIcon,
  },
  {
    title: 'Качество рецептов',
    description: 'Все рецепты проверены и протестированы, чтобы гарантировать отличный результат.',
    icon: QualityIcon,
  },
];

export const menu = [
  {
    title: 'Рецепты',
    link: ROUTES.recipes,
  },
  {
    title: 'Мои рецепты',
    link: ROUTES.myrecipes,
  },
  {
    title: 'О нас',
    link: ROUTES.about,
  },
];

export const formOptionsByType: FormInfoByPath = {
  login: {
    link: ROUTES.register,
    linkText: 'Зарегистрируйтесь',
    text: 'Нет аккаунта?',
    title: 'Вход в систему',
    description: 'Войдите, чтобы получить доступ к вашим рецептам',
  },
  register: {
    link: ROUTES.login,
    linkText: 'Войти',
    text: 'Уже есть аккаунт?',
    title: 'Регистрация',
    description: 'Создайте аккаунт, чтобы начать делиться рецептами',
  },
};
