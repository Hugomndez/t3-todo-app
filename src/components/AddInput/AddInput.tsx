import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { api } from 'utils/api';
import * as z from 'zod';
import styles from './addInput.module.css';

const Schema = z.object({
  text: z
    .string()
    .min(1, { message: 'Required' })
    .max(50, { message: 'Text to long' }),
});

type ValidationSchema = z.infer<typeof Schema>;

const initValues: ValidationSchema = {
  text: '',
};

const AddInput = () => {
  const ctx = api.useContext();

  const { mutate, isLoading } = api.todo.add.useMutation({
    onSuccess: () => ctx.todo.invalidate(),
  });

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
      reset({ text: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<ValidationSchema> = ({ text }) => {
    mutate({
      newText: text,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Create a new todo..."
        {...register('text')}
        disabled={isLoading}
      />

      {errors.text && <span>{errors.text.message}</span>}

      <button type="submit" disabled={isLoading}>
        Add
      </button>
    </form>
  );
};

export default AddInput;
