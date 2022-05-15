import { loading } from '../../constants/Constants';
import './Loader.css';

export const Loader = (): JSX.Element => {
  return (
    <>
      <div className="loader">
        <div className="ball" />
        <div className="ball" />
        <div className="ball" />
        <span>{loading}</span>
      </div>
    </>
  );
};
