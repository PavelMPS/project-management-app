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
            edit: 'Edit profile',
            logout: 'Logout',
            delete: 'Delete profile',
            create: 'Create board',
          },
          welcome: {
            title: 'Welcome',
            login: 'Log In',
            signup: 'Sign up',
            toMain: 'Go to main page',
          },
          login: {
            title: 'Log in page',
            noAccaunt: 'No accaunt?',
            registerBtn: 'Register',
            enterBtn: 'Enter',
            errors: {
              minLogin: 'Your login must be at least 3 characters',
              maxLogin: 'Your login must be less than 15 characters',
              minPassword: 'Your password must be at least 3 characters',
              maxPassword: 'Your password must be less than 15 characters',
            },
            placeholder: {
              login: 'Enter your login',
              password: 'Enter your password',
            },
            require: {
              login: 'Login is required field',
              password: 'Password is required field',
            },
          },
          signup: {
            title: 'Sign up page',
            haveAccaunt: 'Have an accaunt?',
            registerBtn: 'Registration',
            enterBtn: 'Enter',
            placeholder: {
              name: 'Enter your name',
              login: 'Enter your login',
              password: 'Enter your password',
            },
            require: {
              name: 'Name is required field',
              login: 'Login is required field',
              password: 'Password is required field',
            },
            errors: {
              maxName: 'Your name must be less than 15 characters',
              minName: 'Your name must be at least 3 characters',
              minLogin: 'Your login must be at least 3 characters',
              maxLogin: 'Your login must be less than 15 characters',
              minPassword: 'Your password must be at least 3 characters',
              maxPassword: 'Your password must be less than 15 characters',
            },
          },
          main: {
            title: 'Main page',
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
            errors: {
              title: 'Enter correct title!',
              description: 'Enter correct description!',
            },
          },
          column: {
            submit: 'Submit',
            title: 'Column title:',
            errors: {
              error: 'ErrorError',
            },
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
            edit: 'Редактировать профиль',
            logout: 'Выйти',
            delete: 'Удалить профиль',
            create: 'Создать доску',
          },
          welcome: {
            title: 'Добро пожаловать',
            login: 'Авторизоваться',
            signup: 'Зарегистрироваться',
            toMain: 'Перейти на главную страницу',
          },
          login: {
            title: 'Страница авторизации',
            noAccaunt: 'Нет аккаунта?',
            registerBtn: 'К регистрации',
            enterBtn: 'Войти',
            errors: {
              minLogin: 'Ваш логин должен быть более 3 символов',
              maxLogin: 'Ваш логин должен быть менее 15 символов',
              minPassword: 'Ваш пароль должен быть более 3 символов',
              maxPassword: 'Ваш пароль должен быть менее 15 символов',
            },
            placeholder: {
              login: 'Введите логин',
              password: 'Введите пароль',
            },
            require: {
              login: 'Логин обязателен',
              password: 'Пароль обязателен',
            },
          },
          signup: {
            title: 'Страница регистрации',
            haveAccaunt: 'Уже есть аккаунт?',
            registerBtn: 'Зарегистрироваться',
            enterBtn: 'Войти',
            placeholder: {
              name: 'Введите имя',
              login: 'Введите логин',
              password: 'Введите пароль',
            },
            require: {
              name: 'Имя обязательно',
              login: 'Логин обязателен',
              password: 'Пароль обязателен',
            },
            errors: {
              maxName: 'Ваше имя должно состоять не более чем из 15 символов',
              minName: 'Ваше имя должно состоять из более чем 3 символов',
              minLogin: 'Ваш логин должен быть более 3 символов',
              maxLogin: 'Ваш логин должен быть менее 15 символов',
              minPassword: 'Ваш пароль должен быть более 3 символов',
              maxPassword: 'Ваш пароль должен быть менее 15 символов',
            },
          },
          main: {
            title: 'Главная страница',
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
            errors: {
              title: 'Введите корректное имя!',
              description: 'Введите корректное описание!',
            },
          },
          column: {
            submit: 'Подтвердить',
            title: 'Название колонки: ',
            errors: {
              error: 'У Вас ошибка в ДНК',
            },
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
