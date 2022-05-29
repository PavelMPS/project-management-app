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
          aboutProject: {
            title: 'About the project:',
            project:
              'A project management system is an application that helps an individual in a team or group of developers accomplish their tasks.',
            functionality: {
              title: 'In this project were implemented:',
              func_1: 'welcome page',
              func_2: 'user login',
              func_3: 'project management page (main page)',
              func_4: 'board page',
              func_5: 'additional functionality(change day and night theme)',
            },
            develop: {
              title: 'Development process',
              description:
                'The GitHub Flow model was chosen as the main path for the development of the project. To implement the various requirements of the application, functional branches were created, after the implementation of the functionality, a PR was opened in the develop branch, the code was reviewed by the rest of the team members, which helped to monitor the quality of the code and fix various kinds of errors and bugs in time. After the review, if there were no comments, the working branch was merged with the develop one.',
              work: 'Trello was used to control the development process and meet deadlines, where the main tasks and deadlines for their implementation were highlighted.',
            },
          },
          aboutCourses: {
            title: 'About the course:',
            promo: 'Online course "Development with React"',
            promo_2: 'Free course from the community',
            rs: ' The Rolling Scopes.',
            pay_it_forward:
              ' The principle of "Pay it forward" works at RS School: "We share our knowledge with students for free now, hoping that in the future they will return to us as mentors and pass on their knowledge to the next generation of students in the same way."',
            description:
              ' Everyone can study at RS School, regardless of age, professional employment and place of residence. However, for successful learning it is necessary to have a solid knowledge of HTML, CSS and Javascript.',
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
            all: 'All',
            show: 'Show tasks',
            close: 'Close',
            addTask: 'Add task',
            addColumn: 'Add column',
            create: 'Create board',
            update: 'Update board',
            title: 'Board title',
            description: 'Board description',
            titlePlaceholder: 'Enter board title',
            descriptionPlaceholder: 'Enter board description',
            errors: {
              title: 'Enter correct title!',
              description: 'Enter correct description!',
            },
          },
          column: {
            submit: 'Submit',
            title: 'Column title:',
            errors: {
              title: 'Enter correct title!',
            },
            placeholder: 'Enter title',
          },
          task: {
            title: 'Task Title:',
            description: 'Task Description:',
            error: {
              title: 'Enter correct title!',
              description: 'Enter correct description!',
              user: 'Choose user!',
            },
            placeholder: {
              title: 'Enter title',
              description: 'Enter description',
              user: 'Choose user',
            },
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
          serverErrorText: {
            201: 'You have successfully created a new account !',
            400: 'Oops, the server does not understand the request... Try it differently!',
            401: 'Oops, you need authentication to get the requested response... Try it!',
            403: 'Oops, the client does not have permission to access the content, so the server refuses to respond... You need to login to your account!',
            404: 'Oops, the server can not find the requested resource...Try it differently!',
            409: 'Oops, User login already exists! Try it differently!',
            500: 'Oops, something went wrong and the server does not know what... Try it differently!',
            default: 'Oops, something went wrong... Try it differently!',
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
            signup: 'Регистрация',
            toMain: 'На главную',
          },
          aboutProject: {
            title: 'О проекте:',
            project:
              'Система управления проектами – приложение, помогающее достичь поставленные задачи отдельному человеку в команде или группе разработчиков.',
            functionality: {
              title: 'В данном проекты были реализованы:',
              func_1: 'приветственная страница',
              func_2: 'пользовательский логин',
              func_3: 'страница управления проектами',
              func_4: 'страница управления проектом',
              func_5: 'дополнительный функционал(смена дневной и ночной темы)',
            },
            develop: {
              title: 'Процесс разработки',
              description:
                'В качестве оcновного пути развития проекта была выбрана модель GitHub Flow. Для реализации различных требований приложения создавлись функциональные ветки, после реализации функционала открывался PR в ветку develop, код проходил ревью от остальных участников команды, что помогало следить за качеством кода и вовремя устранять различного рода ошибки и баги. После ревью, если замечаний нет, происходило слияние рабочей ветки с основной.',
              work: 'Для контроля процесса разработки и соблюдения сроков использовалось Trello, где выделялись основные задачи и сроки их реализации.',
            },
          },
          aboutCourses: {
            title: 'О курсе:',
            promo: 'Онлайн курс «Разработка на React»',
            promo_2: 'Бесплатный курс от сообщества',
            rs: ' The Rolling Scopes.',
            pay_it_forward:
              ' В RS School работает принцип "Pay it forward": "Мы бесплатно делимся с учащимися своими знаниями сейчас, надеясь, что в будущем они вернутся к нам в качестве менторов и точно так же передадут свои знания следующему поколению студентов."',
            description:
              ' В RS School может учиться каждый, независимо от возраста, профессиональной занятости и места жительства. Однако для успешного обучения необходимо иметь увереные знания HTML, CSS и Javascript.',
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
            all: 'Все',
            show: 'Показать таски',
            close: 'Закрыть',
            addTask: 'Добавить задачу',
            addColumn: 'Добавить колонку',
            title: 'Название доски: ',
            create: 'Создать доску',
            update: 'Обновить доску',
            description: 'Описание доски: ',
            titlePlaceholder: 'Введите имя доски: ',
            descriptionPlaceholder: 'Введите описание доски',
            errors: {
              title: 'Введите корректное имя!',
              description: 'Введите корректное описание!',
            },
          },
          column: {
            submit: 'Подтвердить',
            title: 'Название колонки: ',
            errors: {
              title: 'Введите корректный заголовок!',
            },
            placeholder: 'Введите название',
          },
          task: {
            title: 'Имя задачи:',
            description: 'Описание задачи:',
            selectUser: 'Выбрать пользователя:',
            submit: 'Подтвердить',
            error: {
              title: 'Введите корректный заголовок!',
              description: 'Введите корректное описание!',
              user: 'Выберете пользователя!',
            },
            placeholder: {
              title: 'Введите заголовок',
              description: 'Введите описание',
              user: 'Выберете пользователя',
            },
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
          serverErrorText: {
            201: 'Вы успешно создали аккаунт!',
            400: 'Ой! Сервер не понял Ваш запрос... Попробуйте по-другому!',
            401: 'К сожалению, Вам нужно авторизоваться, чтобы работать дальше... Попробуйте!',
            403: 'К сожалению, у Вас нет разрешения на доступ к контенту... Вам необходимо войти в свою учетную запись!',
            404: 'К сожалению, сервер не может найти запрошенный ресурс... Попробуйте по-другому!',
            409: 'К сожалению, логин пользователя уже существует! Попробуйте по-другому!',
            500: 'Ой, что-то пошло не так и сервер не знает что происходит... Попробуйте по-другому!',
            default: 'Ой, что-то пошло не так... Попробуйте по-другому!',
          },
        },
      },
    },
  });

export default i18n;
