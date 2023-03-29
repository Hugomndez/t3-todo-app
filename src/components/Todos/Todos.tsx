import { LoadingDots } from 'components';
import { useState } from 'react';
import { api } from 'utils/api';
import styles from './Todos.module.css';

type SelectOptions = 'all' | 'active' | 'completed';

const Todos = () => {
  const ctx = api.useContext();

  const [select, setSelect] = useState<SelectOptions>('all');

  const { data, isLoading } = api.todo.getAll.useQuery();

  const { mutate: clear } = api.todo.clear.useMutation({
    onSuccess: () => ctx.todo.invalidate(),
  });

  if (isLoading) return <LoadingDots />;

  if (!data) return <div>Something went Wrong</div>;

  const activeItems = data.filter((i) => i.completed === false);

  const items =
    {
      all: data,
      active: activeItems,
      completed: data.filter((i) => i.completed === true),
    }[select] || data;

  return (
    <>
      <ul className={styles.wrapper}>
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.completed
                ? [styles.item, styles.completed].join(' ')
                : styles.item
            }
          >
            <Check completed={item.completed} itemID={item.id} />
            {item.text}
            <Cross itemID={item.id} />
          </li>
        ))}
        <li className={styles.details}>
          <Count
            isCompletedCount={select === 'completed' ? true : false}
            count={select === 'all' ? activeItems.length : items.length}
          />
          <span className={styles.clearItems} onClick={() => clear()}>
            Clear Completed
          </span>
        </li>
      </ul>
      <div className={styles.moreDetails}>
        <span
          className={select === 'all' ? styles.active : ''}
          onClick={() => setSelect('all')}
        >
          All
        </span>
        <span
          className={select === 'active' ? styles.active : ''}
          onClick={() => setSelect('active')}
        >
          Active
        </span>
        <span
          className={select === 'completed' ? styles.active : ''}
          onClick={() => setSelect('completed')}
        >
          Completed
        </span>
      </div>
    </>
  );
};

export default Todos;

const Count = ({
  isCompletedCount,
  count,
}: {
  isCompletedCount: boolean;
  count: number;
}) => {
  return (
    <span>
      {count} {count === 1 ? ' item' : ' items'}
      {isCompletedCount ? null : ' left'}
    </span>
  );
};

const Check = ({
  completed,
  itemID,
}: {
  completed: boolean;
  itemID: string;
}) => {
  const ctx = api.useContext();

  const { mutate: toggleTodo } = api.todo.toggle.useMutation({
    onSuccess: () => ctx.todo.invalidate(),
  });

  return (
    <div
      className={
        completed ? [styles.check, styles.completed].join(' ') : styles.check
      }
      onClick={() => toggleTodo({ id: itemID, completed: !completed })}
    >
      {completed ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      ) : null}
    </div>
  );
};

const Cross = ({ itemID }: { itemID: string }) => {
  const ctx = api.useContext();

  const { mutate: deleteTodo } = api.todo.delete.useMutation({
    onSuccess: () => ctx.todo.invalidate(),
  });

  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.cross}
      onClick={() => deleteTodo({ id: itemID })}
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
