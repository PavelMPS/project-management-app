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
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}
