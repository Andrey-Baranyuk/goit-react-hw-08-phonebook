import { Bars } from 'react-loader-spinner';
// import styles from './Loader.module.css';

const Loader = () => {
  return (
    <Bars
      heigth="25"
      width="25"
      ariaLabel="loading-indicator"
      color="#BF5E30"
    />
  );
};

export default Loader;
