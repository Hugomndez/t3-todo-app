import { LoadingDots } from 'components';
import { useState } from 'react';
import { api } from 'utils/api';
import styles from './TodoList.module.css';

type Filters = 'all' | 'active' | 'completed';

const TodoList = () => {
  const ctx = api.useContext();

  const [filter, setFilter] = useState<Filters>('all');

  const { data, isLoading } = api.todo.getAll.useQuery();

  const { mutate: clearCompletedItems } = api.todo.clear.useMutation({
    onSuccess: () => ctx.todo.invalidate(),
  });

  if (isLoading) return <LoadingDots />;

  if (!data) return <div>Something went Wrong</div>;

  const activeItems = data.filter((i) => i.completed === false);
  const completedItems = data.filter((i) => i.completed === true);

  const items = {
    all: data,
    active: activeItems,
    completed: completedItems,
  }[filter];

  const itemsCount = {
    all: activeItems.length,
    active: activeItems.length,
    completed: completedItems.length,
  };

  return (
    <>
      <ul className={styles.wrapper}>
        {items.map(({ id, text, completed }) => (
          <li
            key={id}
            className={
              completed
                ? [styles.item, styles.completed].join(' ')
                : styles.item
            }
          >
            <Check completed={completed} itemID={id} />
            {text}
            <Cross itemID={id} />
          </li>
        ))}
        <li className={styles.details}>
          <Count
            isCompletedCount={filter === 'completed'}
            count={itemsCount[filter]}
          />
          <span
            className={styles.clearItems}
            onClick={() => itemsCount.completed && clearCompletedItems()}
          >
            Clear Completed
          </span>
        </li>
      </ul>
      <div className={styles.filters}>
        <span
          className={filter === 'all' ? styles.active : ''}
          onClick={() => setFilter('all')}
        >
          All
        </span>
        <span
          className={filter === 'active' ? styles.active : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </span>
        <span
          className={filter === 'completed' ? styles.active : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </span>
      </div>
    </>
  );
};

export default TodoList;

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
      {!isCompletedCount && ' left'}
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
