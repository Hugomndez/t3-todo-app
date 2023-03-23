import styles from './Todos.module.css';

const Todos = () => {
  return (
    <>
      <ul className={styles.wrapper}>
        {Items.map((item) => (
          <li
            key={item.id}
            className={
              item.completed
                ? [styles.item, styles.completed].join(' ')
                : styles.item
            }
          >
            <Check completed={item.completed} />
            {item.todo}
            <Cross />
          </li>
        ))}
        <li className={styles.details}>
          <p>3 Item left</p> <p>Clear Completed</p>
        </li>
      </ul>
      <div className={styles.moreDetails}>
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>
    </>
  );
};

export default Todos;

const Items = [
  { id: 1, todo: 'Buy something', completed: false },
  { id: 2, todo: 'Sell something', completed: true },
  { id: 3, todo: 'Buy Another thing', completed: true },
  { id: 4, todo: 'Sell Another thing', completed: false },
  { id: 5, todo: 'Sell Yet Another thing', completed: false },
  { id: 6, todo: 'Buy Yet Another thing', completed: true },
];

const Check = ({ completed }: { completed: boolean }) => {
  return (
    <div
      className={
        completed ? [styles.check, styles.completed].join(' ') : styles.check
      }
    >
      {completed ? <IconCheck /> : null}
    </div>
  );
};

const Cross = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.cross}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.7851 0.471404L11.3137 0L5.89256 5.42115L0.471404 0L0 0.471404L5.42115 5.89256L0 11.3137L0.471404 11.7851L5.89256 6.36396L11.3137 11.7851L11.7851 11.3137L6.36396 5.89256L11.7851 0.471404Z"
        fill="#494C6B"
      />
    </svg>
  );
};

const IconCheck = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  );
};
