import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../redux/hooks/redux';
import { buttonName, columnFormProps } from '../../constants/Constants';
import { createColumnFetch, updateColumnFetch } from '../../redux/ColumnSlice';
import { getBoardById } from '../../redux/GetBoardSlice';
import { AppDispatch } from '../../redux/Store';
import Confirmation from '../Confirmation/Confirmation';

const ColumnForm = (props: { boardId: string; columnInf?: IColumn; type: string }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IColumn>();

  const { idBoard } = useAppSelector((store) => store.idBoard);

  const [isValid, setIsValid] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(() => {
    if (props.columnInf) {
      return props.columnInf.title;
    } else {
      return '';
    }
  });
  const [order, setOrder] = useState<number>(() => {
    if (props.columnInf) {
      return props.columnInf.order;
    } else {
      return idBoard.columns.length + 1;
    }
  });
  const [columnInf, setColumnInf] = useState<IColumn>({} as IColumn);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmite = async (data: IColumn): Promise<void> => {
    const columnInf: IColumn = {
      title: data.title,
      order: order,
    };
    setColumnInf(columnInf);
    setIsConfirmationOpen(true);
    reset();
    clearErrors();
  };

  const confirmationSubmit = async (): Promise<void> => {
    if (props.type === 'create') {
      await dispatch(createColumnFetch({ boardId: props.boardId, column: columnInf }));
    } else {
      await dispatch(
        updateColumnFetch({
          boardId: props.boardId,
          columnId: props.columnInf!.id!,
          column: columnInf,
        })
      );
    }
    dispatch(getBoardById(props.boardId));
  };

  const handleError = (): void => {
    setIsValid(false);
  };

  const changeSubmitBTN = (): void => {
    setIsValid(true);
    setTimeout(() => {
      const values = Object.values(errors);
      values.forEach((value: FieldError | FieldError[]): void => {
        if (value) {
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      }, 100);
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite, handleError)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {columnFormProps.title}
            <br />
            <input
              className="form-input"
              value={title}
              type="text"
              {...register('title', {
                required: true,
                onChange: (e) => {
                  changeSubmitBTN();
                  setTitle(e.target.value);
                },
              })}
            />
          </label>
          {errors.title && <span className="error">{columnFormProps.error}</span>}
        </div>

        <button className="btn" type="submit" disabled={!isValid}>
          {buttonName.submit}
        </button>
      </form>
      {isConfirmationOpen && (
        <Confirmation
          onCancel={() => setIsConfirmationOpen(false)}
          onSubmit={() => confirmationSubmit()}
        />
      )}
    </>
  );
};

export default ColumnForm;
