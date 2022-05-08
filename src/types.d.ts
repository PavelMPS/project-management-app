type mainState = {
  boards: IBoard[];
  status: string;
  error: string | null;
};

type boardState = {
  board: IBoard;
  columns: IColumn[];
  tasks: ITask[];
  statusColumn: string;
  statusTasks: string;
  error: string | null;
};

interface ITasksObj {
  string: ITask[];
}

interface IBoard {
  id: string;
  title: string;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
