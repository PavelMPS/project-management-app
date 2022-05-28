export const fetchStatus: IFetchStatus = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};

export const path: IPath = {
  url: 'https://glacial-bastion-21464.herokuapp.com',
  bords: '/boards',
  columns: '/columns',
  tasks: '/tasks',
  users: '/users',
  signUp: '/signup',
  signIn: '/signin',
};

export const editProfileProps = {
  newName: 'New name:',
  newLogin: 'New login:',
  newPassword: 'New password:',
};

export const loginSettings = {
  noAccaunt: 'No accaunt?',
  haveAccaunt: 'Have an account?',
};

export const createBoardSettings = {
  title: 'Board title:',
  description: 'Board description',
  createBoard: 'Create board',
};

export const notFoundSettings = {
  tryThe: 'Try the',
  homepage: 'homepage.',
};

export const taskFormSettings = {
  title: 'Task Title',
  description: 'Task Description',
  error: 'ErrorErrorError',
  selectUser: 'Select User',
};

export const year = '2022';
export const loading = 'Loading...';
export const column = 'column';

export const formType = {
  create: 'create',
  update: 'update',
};

export const serverErrorText = {
  400: 'Oops, the server does not understand the request... Try it differently!',
  401: 'Oops, you need authentication to get the requested response... Try it!',
  403: 'Oops, the client does not have permission to access the content, so the server refuses to respond... You need to login to your account!',
  404: 'Oops, the server can not find the requested resource...Try it differently!',
  409: 'Oops, User login already exists! Try it differently!',
  500: 'Oops, something went wrong and the server does not know what... Try it differently!',
  default: 'Oops, something went wrong... Try it differently!',
};

export const lngs: ILangs = {
  en: 'en',
  ru: 'ru',
};

export const themes: IThemes = {
  light: 'light',
  dark: 'dark',
};
