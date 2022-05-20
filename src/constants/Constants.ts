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
  addTask: 'ADD TASK',
  goToMainPage: 'Go to main page',
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
export const loading = 'Loading...';
export const confirmation = 'Are you sure?';
export const submitBTNText = 'Yes';
export const cancelBTNText = 'Cancel';

export const formType = {
  create: 'create',
  update: 'update',
};

export const serverErrorText = {
  400: 'Oops, the server does not understand the request... Try it differently!',
  401: 'Oops, you need authentication to get the requested response... Try it!',
  403: 'Oops, the client does not have permission to access the content, so the server refuses to respond... You need to login to your account!',
  404: 'Oops, the server can not find the requested resource...Try it differently!',
  500: 'Oops something went wrong and the server does not know what... Try it differently!',
  default: 'Oops, something went wrong... Try it differently!',
};
