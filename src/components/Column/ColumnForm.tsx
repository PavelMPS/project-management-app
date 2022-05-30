import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { formType } from '../../constants/Constants';
import { createColumnFetch, updateColumnFetch, selectColumnsError } from '../../redux/ColumnSlice';
import { getBoardById } from '../../redux/GetBoardSlice';
import { AppDispatch } from '../../redux/Store';
import Confirmation from '../Confirmation/Confirmation';

const ColumnForm = (props: { boardId: string; columnInf?: IColumn; type: string }): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IColumn>();

  const columnError: string | null = useSelector(selectColumnsError);

  const [title, setTitle] = useState<string>(() => {
    if (props.columnInf) {
      return props.columnInf.title;
    } else {
      return '';
    }
  });

  const [columnInf, setColumnInf] = useState<IColumn>({} as IColumn);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmite = async (data: IColumn): Promise<void> => {
    const columnInf: IColumn = {
      title: data.title,
    };
    setColumnInf(columnInf);
    setIsConfirmationOpen(true);
    reset();
    clearErrors();
  };

  const confirmationSubmit = async (): Promise<void> => {
    if (props.type === formType.create) {
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
    if (!columnError) {
      dispatch(getBoardById(props.boardId));
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(handleSubmite)}>
        <div className="form-element-wrapper">
          <label className="form-label">
            {t('column.title')}
            <br />
            <input
              className="form-input"
              value={title}
              type="text"
              placeholder={t('column.placeholder')}
              {...register('title', {
                required: true,
                onChange: (e) => {
                  setTitle(e.target.value);
                },
              })}
            />
            {errors.title && <p className="error">{t('column.errors.title')}</p>}
          </label>
        </div>

        <button className="btn" type="submit">
          {t('column.submit')}
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
