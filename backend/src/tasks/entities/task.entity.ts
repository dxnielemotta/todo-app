export class Task {
  id!: number; //! significa que será inicializado pelo ORM
  title!: string;
  description?: string | null;
  completed!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
