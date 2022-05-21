import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          header: {
            title: 'Project managemen application',
          },
          welcome: {
            title: 'Welcome',
            login: 'Log In',
            signup: 'Sign up',
            toMain: 'Go to main page',
          },
          main: {
            title: 'Main',
            open: 'Open',
          },
          board: {
            close: 'Close',
            addTask: 'Add task',
            addColumn: 'Add column',
            create: 'Create board',
            title: 'Board title',
            description: 'Board description',
            titlePlaceholder: 'Enter board title',
            descriptionPlaceholder: 'Enter board description',
            createButton: 'Create board',
          },
          column: {
            submit: 'Submit',
            title: 'Column title:',
          },
          task: {
            title: 'Task Title:',
            description: 'Task Description:',
            error: 'ErrorErrorError',
            selectUser: 'Select User:',
            submit: 'Submit',
          },
          modal: {
            agree: 'Are you sure?',
            yes: 'Yes',
            cancel: 'Cancel',
          },
          notFound: {
            title: 'This page does not exist. ...or does it? Try the homepage.',
            tryThe: 'Try the',
            homepage: 'homepage.',
          },
          profile: {
            name: 'Name',
            surname: 'Surname',
            age: 'Age',
            about: 'About',
            pavelName: 'Pavel',
            pavelSurname: 'Mazhaiski',
            veronikaName: 'Veronika',
            veronikaSurname: 'Yaschenkova',
            vitaliyName: 'Vitaly',
            vitaliySurname: 'Soroko',
          },
          edit: {
            title: 'Edit profile',
            newName: 'New name:',
            newLogin: 'New login:',
            newPassword: 'New password:',
            newNamePlaceholder: 'Edit your name',
            newLoginPlaceholder: 'Edit your login',
            newPasswordPlaceholder: 'Edit your password',
            submit: 'Submit',
            cancel: 'Cancel',
            errors: {
              name: 'Enter correct name!',
              login: 'Enter correct login!',
              password: 'Enter correct password!',
            },
          },
          footer: {
            veronika: 'Veronika Yaschenkova',
            pavel: 'Pavel Mazhaiski',
            vitaliy: 'Vitaliy Soroko',
          },
        },
      },
      ru: {
        translation: {
          header: {
            title: 'Приложение для управления проектами',
          },
          welcome: {
            title: 'Добро пожаловать',
            login: 'Авторизоваться',
            signup: 'Зарегистрироваться',
            toMain: 'Перейти на главную страницу',
          },
          main: {
            title: 'Главная',
            open: 'Открыть',
          },
          board: {
            close: 'Закрыть',
            addTask: 'Добавить задачу',
            addColumn: 'Добавить колонку',
            title: 'Название доски: ',
            create: 'Создать доску',
            description: 'Описание доски: ',
            titlePlaceholder: 'Введите имя доски: ',
            descriptionPlaceholder: 'Введите описание доски',
            createButton: 'Создать доску',
          },
          column: {
            submit: 'Подтвердить',
            title: 'Название колонки: ',
          },
          task: {
            title: 'Имя задачи:',
            description: 'Описание задачи:',
            error: 'ОшибкаОшибкаОшибка!!',
            selectUser: 'Выбрать пользователя:',
            submit: 'Подтвердить',
          },
          modal: {
            agree: 'Вы уверены?',
            yes: 'Да',
            cancel: 'Отмена',
          },
          notFound: {
            title:
              'Эта страница не существует. ...или нет? Попробуйте перейти на домашнюю страницу.',
            tryThe: 'Перейти на ',
            homepage: 'домашнюю страницу.',
          },
          profile: {
            name: 'Имя',
            surname: 'Фамилия',
            age: 'Возраст',
            about: 'О себе',
            pavelName: 'Павел',
            pavelSurname: 'Можайский',
            veronikaName: 'Вероника',
            veronikaSurname: 'Ященкова',
            vitaliyName: 'Виталий',
            vitaliySurname: 'Сороко',
          },
          edit: {
            title: 'Редактирование профиля',
            newName: 'Новое имя: ',
            newLogin: 'Новый логин: ',
            newPassword: 'Новый пароль: ',
            newNamePlaceholder: 'Отредактируйте имя',
            newLoginPlaceholder: 'Отредактируйте логин',
            newPasswordPlaceholder: 'Отредактируйте пароль',
            submit: 'Отправить',
            cancel: 'Отменить',
            errors: {
              name: 'Введите корректное имя!',
              login: 'Введите корректный логин!',
              password: 'Введите корректный пароль!',
            },
          },
          footer: {
            veronika: 'Вероника Ященкова',
            pavel: 'Павел Можайский',
            vitaliy: 'Виталий Сороко',
          },
        },
      },
    },
  });

export default i18n;
