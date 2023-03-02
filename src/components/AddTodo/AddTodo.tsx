import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import styles from './AddTodo.module.css';

const Schema = z.object({
  newTodo: z.string().min(1, { message: 'Required' }),
});

type ValidationSchema = z.infer<typeof Schema>;

const initValues: ValidationSchema = {
  newTodo: '',
};

const AddTodo = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(Schema),
    defaultValues: initValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ newTodo: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Create a new todo..."
        {...register('newTodo')}
      />

      {errors.newTodo && <span>This field is required</span>}

      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
