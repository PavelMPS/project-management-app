type mainState = {
  boards: board;
  status: string;
  error: string | null;
};

interface IBoard {
  id: string;
  title: string;
}
