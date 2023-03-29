import styles from './Dots.module.css';

const LoadingDots = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loaderElement}></span>
      <span className={styles.loaderElement}></span>
      <span className={styles.loaderElement}></span>
    </div>
  );
};

export default LoadingDots;
