import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type Id } from 'react-toastify/dist/types';
import { api } from 'utils/api';
import * as z from 'zod';
import styles from './addInput.module.css';

const Schema = z.object({
  text: z
    .string()
    .min(1, { message: 'Ups!, add your todo!' })
    .max(50, { message: 'Text to long' }),
});

type ValidationSchema = z.infer<typeof Schema>;

const initValues: ValidationSchema = {
  text: '',
};

const AddInput = () => {
  const ctx = api.useContext();

  const toastId = useRef<Id>();

  const { mutate, isLoading } = api.todo.add.useMutation({
    onSuccess: () => ctx.todo.invalidate(),
  });

  const {
    register,
    handleSubmit,
    reset,
    resetField,
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

  useEffect(() => {
    const notify = () =>
      (toastId.current = toast.error(errors?.text?.message, {
        delay: 800,
      }));

    const dismiss = () => toast.dismiss(toastId.current);

    if (errors.text) {
      notify(), resetField('text');
    }

    return () => {
      dismiss();
    };
  }, [errors.text, resetField]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Create a new todo..."
        {...register('text')}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Add
      </button>
    </form>
  );
};

export default AddInput;
