export const fetchStatus: IFetchStatus = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};

export const path: IPath = {
  url: 'https://immense-coast-63189.herokuapp.com',
  bords: '/boards',
  columns: '/columns',
  tasks: '/tasks',
  users: '/users',
  signUp: '/signup',
  signIn: '/signin',
};

export const buttonName = {
  open: 'OPEN',
  close: 'CLOSE',
  submit: 'SUBMITE',
  cancel: 'CANCEL',
  register: 'Register',
  logIn: 'Log In',
  signUp: 'Sign up',
  create: 'CREATE',
  enter: 'Enter',
  addColumn: 'ADD COLUMN',
};

export const appName = 'Project managment application';

export const pageName = {
  board: 'Board',
  editProfile: 'Edit profile',
  main: 'Main',
  notFound: 'This page does not exist. ...or does it? Try the homepage.',
  signUp: 'Sign-up page',
  welcome: 'Welcome',
};

export const columnFormProps = {
  title: 'Column Title',
  order: 'Column Order',
  error: 'ErrorErrorError',
};

export const editProfileProps = {
  newName: 'New name:',
  newLogin: 'New login:',
  newPassword: 'New password:',
};

export const authorsName = {
  veronika: 'Veronika Yaschenkova',
  vitaliy: 'Vitaliy Soroko',
  pavel: 'Pavel Mazhaiski',
};

export const loginSettings = {
  noAccaunt: 'No accaunt?',
  haveAccaunt: 'Have an account?',
};

export const createBoardSettings = {
  title: 'Board title:',
  createBoard: 'Create board',
};

export const notFoundSettings = {
  tryThe: 'Try the',
  homepage: 'homepage.',
};

export const taskFormSettings = {
  title: 'Task Title',
  description: 'Task Description',
  order: 'Task Order',
  error: 'ErrorErrorError',
  selectUser: 'Select User',
};

export const year = '2022';
