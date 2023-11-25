export interface Task {
  taskId: number | null;
  userId: number | null;
  groupName: string | null;
  name: string;
  detail: string | null;
  deadline: string | null;
  status: string;
  docUrl: string | null;
}
