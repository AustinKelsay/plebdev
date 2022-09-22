import styles from "./styles.module.css";
import Spinner from "./Spinner/Spinner";

const Loading = () => {
  return (
    <div className={styles.loadContainer}>
      <Spinner />
      <p className={styles.loadText}>Loading ...</p>
    </div>
  );
};

export default Loading;
