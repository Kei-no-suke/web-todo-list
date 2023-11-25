const TaskStatus = {
  UNTOUCHED: '未着手',
  WORKING: '作業中',
  HOLD: '保留',
  DONE: '完了',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const AllTaskStatus = Object.values(TaskStatus);
