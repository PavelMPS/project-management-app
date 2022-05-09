import { useState, useEffect } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { createColumnFetch, fetchColumns, updateColumnFetch } from '../../redux/ColumnSlice';
import { AppDispatch } from '../../redux/Store';

import './ColumnForm.css';

export function ColumnForm(props: {
  boardId: string;
  columnInf?: IColumn;
  type: string;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IColumn>();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [order, setOrder] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmite = async (data: IColumn) => {
    if (props.columnInf && props.columnInf.id) {
      if (props.type === 'create') {
        await dispatch(createColumnFetch({ boardId: props.boardId, column: data }));
      } else {
        await dispatch(
          updateColumnFetch({ boardId: props.boardId, columnId: props.columnInf.id, column: data })
        );
      }
    }

    dispatch(fetchColumns(props.boardId));
    reset();
    clearErrors();
  };

  const handleError = () => {
    setIsValid(false);
  };

  function changeSubmitBTN() {
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
  }

  useEffect((): void => {
    if (props.columnInf) {
      setTitle(props.columnInf.title);
      setOrder(props.columnInf.order);
    }
  }, [props.columnInf]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite, handleError)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            Column Title
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
          {errors.title && <span className="error">ErrorErrorError</span>}
        </div>

        <div className="form-element-wrapper">
          <label className="form-label">
            Column Order
            <br />
            <input
              className="form-input"
              value={order}
              type="number"
              {...register('order', {
                required: true,
                onChange: (e) => {
                  changeSubmitBTN();
                  setOrder(e.target.value);
                },
              })}
            />
          </label>
          {errors.order && <span className="error">ErrorErrorError</span>}
        </div>

        <button className="form-btn" type="submit" disabled={!isValid}>
          SUBMITE
        </button>
      </form>
    </>
  );
}
