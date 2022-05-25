import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { getTokenFromLocalStorage } from '../../redux/ColumnSlice';
import { editProfile, getIdFromToken } from '../../redux/EditProfileSlice';
import { AppDispatch } from '../../redux/Store';

import './editProfilePage.css';

const EditProfile = (): JSX.Element => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IProfileState>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate: NavigateFunction = useNavigate();

  const backToHome = (): void => {
    return navigate('/main');
  };

  const onSubmit: SubmitHandler<IProfileState> = (data: IProfileState): void => {
    const token = getTokenFromLocalStorage();
    const id: string = getIdFromToken(token);
    dispatch(
      editProfile({ userId: id, name: data.name, login: data.login, password: data.password })
    );
    reset();
    backToHome();
  };

  return (
    <>
      <div className="edit-container">
        <div className="edit-title-container">
          <h1>{t('edit.title')}</h1>
          <button className="btn" onClick={backToHome}>
            {t('edit.cancel')}
          </button>
        </div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-element-wrapper">
            <label className="form-label">
              {t('edit.newName')}
              <input
                className={errors.name ? 'form-input input-error' : 'form-input'}
                type="text"
                placeholder={t('edit.newNamePlaceholder')}
                {...register('name', { required: true })}
              />
              {errors.name && <p className="error">{t('edit.errors.name')}</p>}
            </label>
          </div>
          <div className="form-element-wrapper">
            <label className="form-label">
              {t('edit.newLogin')}
              <input
                className={errors.login ? 'form-input input-error' : 'form-input'}
                type="text"
                placeholder={t('edit.newLoginPlaceholder')}
                {...register('login', { required: true })}
              />
              {errors.login && <p className="error">{t('edit.errors.name')}</p>}
            </label>
          </div>
          <div className="form-element-wrapper">
            <label className="form-label">
              {t('edit.newPassword')}
              <input
                className={errors.password ? 'form-input input-error' : 'form-input'}
                type="text"
                placeholder={t('edit.newPasswordPlaceholder')}
                {...register('password', { required: true })}
              />
              {errors.password && <p className="error">{t('edit.errors.name')}</p>}
            </label>
          </div>
          <div className="edit-form-buttons">
            <button className="btn">{t('edit.submit')}</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
