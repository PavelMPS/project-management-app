import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Confirmation from '../Confirmation/Confirmation';
import { deleteTaskFetch, selectTasksError } from '../../redux/TaskSlice';
import { selectUsers } from '../../redux/UsersSlice';
import { AppDispatch } from '../../redux/Store';
import ModalWindow from '../ModalWindow/ModalWindow';
import TaskForm from './TaskForm';
import { getBoardById, TaskState } from '../../redux/GetBoardSlice';
import { useAppSelector } from '../../redux/hooks/redux';

import './task.css';

const Task = (props: { taskInf: TaskState; columnId: string; index: number }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const users: IUser[] = useSelector(selectUsers);
  const taskError: string | null = useSelector(selectTasksError);
  const { idBoard } = useAppSelector((state) => state.idBoard);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isTaskOpen, setTaskOpen] = useState<boolean>(false);
  const [user, setUser] = useState<string>('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const handleModalClose = (): void => {
    setModalOpen(false);
  };

  const confirmationSubmit = async (): Promise<void> => {
    await dispatch(
      deleteTaskFetch({
        boardId: idBoard.id,
        columnId: props.columnId,
        taskId: props.taskInf.id!,
      })
    );
    if (!taskError) {
      dispatch(getBoardById(idBoard.id));
    }
  };

  useEffect((): void => {
    const user: IUser = users.find((user: IUser) => user.id === props.taskInf.userId) as IUser;
    const userIndex = users.indexOf(user);
    if (userIndex !== -1) {
      setUser(users[userIndex].name);
    }
  }, [props.taskInf.userId, users]);

  return (
    <>
      <Draggable draggableId={props.taskInf.id} index={props.index}>
        {(provided) => (
          <div
            className="task-container"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            onClick={() => setTaskOpen(!isTaskOpen)}
          >
            <div className="task-wrapper">
              <div className="task-title">{props.taskInf.title}</div>
              <div className="task-wrapper">
                <div
                  className="small-btn task-update"
                  onClick={async () => {
                    setModalOpen(true);
                  }}
                ></div>
                <div
                  className="small-btn task-trash"
                  onClick={() => setIsConfirmationOpen(true)}
                ></div>
              </div>
            </div>
            {isTaskOpen && (
              <>
                <div className="task-description">{props.taskInf.description}</div>
                <div className="task-responsible-user">{user}</div>
              </>
            )}
          </div>
        )}
      </Draggable>

      {isModalOpen && (
        <ModalWindow onClick={handleModalClose}>
          {
            <TaskForm
              boardId={idBoard.id}
              columnId={props.columnId}
              taskInf={props.taskInf}
              type="update"
            />
          }
        </ModalWindow>
      )}
      {isConfirmationOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationOpen(false)}
          onSubmit={() => confirmationSubmit()}
        />
      )}
    </>
  );
};

export default Task;
