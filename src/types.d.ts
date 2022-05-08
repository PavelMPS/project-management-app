type mainState = {
  boards: board;
  status: string;
  error: string | null;
  openBoard: IBoard;
};

interface IBoard {
  id: string;
  title: string;
}
