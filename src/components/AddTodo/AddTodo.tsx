import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(Schema),
    defaultValues: initValues,
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
