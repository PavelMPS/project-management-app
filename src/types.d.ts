type mainState = {
  boards: IBoard[];
  status: string;
  error: string | null;
  openBoard: IBoard;
};

type columnState = {
  columns: IColumn[];
  statusColumn: string;
  error: string | null;
  column: IColumn;
};

type taskState = {
  tasks: ITask[];
  statusTasks: string;
  error: string | null;
  task: ITask;
};

type usersState = {
  users: IUser[];
  statusUsers: string;
  error: string | null;
};

interface IBoard {
  id: string;
  title: string;
}

interface IColumn {
  id?: string;
  title: string;
  order: number;
}

interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId?: string;
  columnId?: string;
}

interface IUser {
  id: string;
  name: string;
  login: string;
}

interface IFetchStatus {
  idle: string;
  loading: string;
  succeeded: string;
  failed: string;
}

interface IPath {
  url: string;
  bords: string;
  columns: string;
  tasks: string;
  users: string;
}

interface IUserState {
  name: string;
  login: string;
  password: string;
}

interface ICreateBoardState {
  title: string;
  isLoading: boolean;
  error: string;
}

interface IDeleteUserState {
  status: string;
  error: string | null;
  isLoading: boolean;
}

interface IProfileState {
  name: string;
  login: string;
  password: string;
}

interface IDecodeParams {
  iat: number;
  login: string;
  userId: string;
}

interface IUserSlice {
  name: string;
  login: string;
  password: string;
  error: string;
  token: string;
  isAuth: boolean;
  authLogin: string;
  authPass: string;
}
