import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DragDropContext, DraggableLocation, Droppable, DropResult } from 'react-beautiful-dnd';

import ModalWindow from '../ModalWindow/ModalWindow';
import ColumnForm from '../Column/ColumnForm';
import { selectStatusColumn, closeBoardColumn, updateColumnFetch } from '../../redux/ColumnSlice';
import {
  closeBoardTask,
  selectStatusTasks,
  updateTaskChangeColumn,
  updateTaskFetch,
} from '../../redux/TaskSlice';
import { selectBoard } from '../../redux/MainSlice';
import { AppDispatch } from '../../redux/Store';
import { fetchUsers, selectUsers, selectUsersStatus } from '../../redux/UsersSlice';
import Column from '../Column/Column';
import { ColumnState, getBoardById, selectBoardStatus } from '../../redux/GetBoardSlice';
import { setChoosenUser, selectChoosenUser } from '../../redux/ChooseUserSlice';
import { useAppSelector } from '../../redux/hooks/redux';
import { column, fetchStatus, formType } from '../../constants/Constants';
import { Loader } from '../Loader/Loader';

import './boardPage.css';

const BoardPage = (): JSX.Element => {
  const { t } = useTranslation();
  const board = useSelector(selectBoard);
  const statusColumn: string = useSelector(selectStatusColumn);
  const statusTasks: string = useSelector(selectStatusTasks);
  const statusUsers: string = useSelector(selectUsersStatus);
  const statusBoard: string = useSelector(selectBoardStatus);
  const users: IUser[] = useSelector(selectUsers);
  const choosenUser: string = useSelector(selectChoosenUser);

  const { idBoard } = useAppSelector((store) => store.idBoard);
  const [dragState, updateDragState] = useState(idBoard.columns);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect((): void => {
    updateDragState(idBoard.columns);
    if (statusUsers === fetchStatus.idle) {
      dispatch(fetchUsers());
    }
  }, [statusUsers, idBoard.columns, dispatch]);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const boardCloseHadler = (): void => {
    dispatch(closeBoardColumn());
    dispatch(closeBoardTask());
  };

  const reorderColumns = async (
    source: DraggableLocation,
    destination: DraggableLocation
  ): Promise<void> => {
    await dispatch(
      updateColumnFetch({
        boardId: board.id,
        columnId: idBoard.columns[source.index].id,
        column: {
          title: idBoard.columns[source.index].title,
          order: idBoard.columns[destination.index].order,
        },
      })
    );
  };

  const reorderTasks = async (
    source: DraggableLocation,
    destination: DraggableLocation,
    result: DropResult
  ): Promise<void> => {
    if (source.droppableId !== destination.droppableId) {
      const columnSource = idBoard.columns.find(
        (column: ColumnState) => column.id === source.droppableId
      ) as ColumnState;
      const taskDrag = columnSource!.tasks[source.index];
      const taskinfDrag = {
        id: result.draggableId,
        title: taskDrag.title,
        order: destination.index + 1,
        description: taskDrag.description,
        userId: taskDrag.userId,
        boardId: board.id,
        columnId: source.droppableId,
        columnChange: destination!.droppableId,
      };
      await dispatch(updateTaskChangeColumn(taskinfDrag));
    }
    if (source.droppableId === destination.droppableId) {
      const column = idBoard.columns.find((column) => column.id === destination.droppableId);
      if (column) {
        const newTasks = Array.from(column.tasks);
        const [reorderedTask] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, reorderedTask);
        const taskDrag = column.tasks[source.index];
        const taskDrop = column.tasks[destination.index];
        const taskInfDrag = {
          id: taskDrag.id,
          title: taskDrag.title,
          order: taskDrop.order,
          description: taskDrag.description,
          userId: taskDrag.userId,
          boardId: board.id,
          columnId: column.id,
        };
        await dispatch(updateTaskFetch(taskInfDrag));
      }
    }
  };

  const onDragEnd = async (result: DropResult): Promise<void> => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if (type === column) {
      await reorderColumns(source, destination);
    } else {
      await reorderTasks(source, destination, result);
    }

    await dispatch(getBoardById(board.id));
  };

  const chooseUserHandler = (choosingUser: string): void => {
    let newState: ColumnState[] = [];
    if (choosingUser === t('board.all')) {
      newState = idBoard.columns;
    } else {
      newState = idBoard.columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.filter((task) => {
            return task.userId === choosingUser;
          }),
        };
      });
    }
    updateDragState(newState);
    dispatch(setChoosenUser(choosingUser));
  };

  // TODO попробовать сделать так, чтобы после рендеринга оставалась сортировка, или удалить ChooseUserSlice

  return (
    <>
      <div className="board-container">
        <div className="board-title-container">
          <h1>{board.title}</h1>
          <label className="form-label">
            {t('task.selectUser')}
            <br />
            <select
              className="form-input"
              value={t('board.all')}
              onChange={(e) => {
                chooseUserHandler(e.currentTarget.value);
              }}
            >
              <option>{t('board.all')}</option>
              {users.map((user: IUser) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <Link className="link" to="/main">
            <div className="btn" onClick={boardCloseHadler}>
              {t('board.close')}
            </div>
          </Link>
        </div>
        {statusBoard === fetchStatus.loading ||
        statusColumn === fetchStatus.loading ||
        statusTasks === fetchStatus.loading ? (
          <Loader />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="column">
              {(provided) => (
                <div
                  className="columns-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dragState.map((column: ColumnState, index: number) => {
                    return <Column key={column.id} columnInf={column} index={index} />;
                  })}
                  <div
                    className="opacity-btn add-column-btn "
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    <div className="small-btn add"></div>
                    <div>{t('board.addColumn')}</div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
      {!board.id && <Navigate to={'/main'} />}
      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {<ColumnForm boardId={board.id} type={formType.create} />}
        </ModalWindow>
      )}
    </>
  );
};

export default BoardPage;
