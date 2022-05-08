import './BoardPage.css';

const BoardPage = (props: { boardInf: IBoard }): JSX.Element => {
  return (
    <>
      <div className="board-container">
        <h1>Board {props.boardInf.title}</h1>
      </div>
    </>
  );
};

export default BoardPage;
