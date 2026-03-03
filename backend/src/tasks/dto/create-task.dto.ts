export class CreateTaskDto {
  title!: string;
  description?: string | null;
  completed?: boolean;
}
