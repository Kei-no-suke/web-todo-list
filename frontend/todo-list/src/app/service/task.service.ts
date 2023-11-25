import { Injectable } from '@angular/core';
import { TaskListDto } from '../interface/dto/response/task-list-dto';
import axios from 'axios';
import { Task } from '../interface/task';
import { TaskCreateDto } from '../interface/dto/response/task-create-dto';
import { SendTaskFrontDto } from '../interface/dto/request/send-task-front-dto';
import { TaskReqDto } from '../interface/dto/request/task-req-dto';
import { AllTaskStatus, TaskStatus } from '../task-status';
import { RegisterStatusDto } from '../interface/dto/request/register-status-dto';
import { RegisterGroupDto } from '../interface/dto/request/register-group-dto';
import { TaskDetailDto } from '../interface/dto/response/task-detail-dto';
import { TaskEditDto } from '../interface/dto/response/task-edit-dto';
import { FilterTaskDto } from '../interface/dto/request/filter-task-dto';
import { Group } from '../interface/group';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl: string = 'http://localhost:8080';
  sessionIdKey: string = 'x-auth-id';

  private httpOptions: any = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  constructor() {}

  getRequestConfig(sessionId: string): any {
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': sessionId,
      },
      withCredentials: true,
    };
  }

  // task-create
  async getTaskCreateDto(): Promise<TaskCreateDto | null> {
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.get<TaskCreateDto>(
        this.baseUrl + '/task-create/',
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async saveTask(task: Task): Promise<boolean> {
    var sendTaskFrontDto: SendTaskFrontDto = {
      taskFront: task,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/task-create/create',
        sendTaskFrontDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  // task-detail
  async getTaskDetailDto(taskId: number): Promise<TaskDetailDto | null> {
    var taskReqDto: TaskReqDto = {
      taskId: taskId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.post<TaskDetailDto>(
        this.baseUrl + '/task-detail/',
        taskReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async changeTaskStatus(taskId: number, status: TaskStatus): Promise<boolean> {
    var registerStatusDto: RegisterStatusDto = {
      taskId: taskId,
      status: status,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/task-detail/change-status',
        registerStatusDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  async registerTaskToGroup(
    taskId: number,
    groupName: string | null
  ): Promise<boolean> {
    var registerGroupDto: RegisterGroupDto = {
      taskId: taskId,
      groupName: groupName,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/task-detail/register',
        registerGroupDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  async deleteTask(taskId: number): Promise<boolean | null> {
    var taskReqDto: TaskReqDto = {
      taskId: taskId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/task-detail/delete',
        taskReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  // task-edit
  async getTaskEditDto(taskId: number): Promise<TaskEditDto | null> {
    var taskReqDto: TaskReqDto = {
      taskId: taskId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.post<TaskEditDto>(
        this.baseUrl + '/task-edit/',
        taskReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async updateTask(task: Task): Promise<boolean> {
    var sendTaskFrontDto: SendTaskFrontDto = {
      taskFront: task,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/task-edit/update',
        sendTaskFrontDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  // task-list
  async getTaskListDto(): Promise<TaskListDto | null> {
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.get<TaskListDto>(
        this.baseUrl + '/tasks/',
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async getFilteredTaskListDto(
    groupName: string | null,
    startDate: string | null,
    endDate: string | null
  ): Promise<TaskListDto | null> {
    var filterTaskDto: FilterTaskDto = {
      groupName: groupName,
      startDate: startDate,
      endDate: endDate,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.post<TaskListDto>(
        this.baseUrl + '/tasks/filtered',
        filterTaskDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async changeTaskStatusOnList(
    taskId: number,
    status: string
  ): Promise<boolean> {
    var registerStatusDto: RegisterStatusDto = {
      taskId: taskId,
      status: status,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/tasks/change-status',
        registerStatusDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  async deleteTaskOnList(taskId: number): Promise<boolean> {
    var taskReqDto: TaskReqDto = {
      taskId: taskId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/tasks/delete',
        taskReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  // util
  validateStatus(status: string) {
    for (let taskStatus of AllTaskStatus) {
      if (taskStatus == status) {
        return true;
      }
    }
    return false;
  }

  validateGroupIndex(groupIndex: string, groups: Group[] | null): boolean {
    if (groupIndex === '0') {
      return true;
    }
    if (groups == null) {
      return false;
    }
    for (let group of groups) {
      if (group.groupId?.toString() == groupIndex) {
        return true;
      }
    }
    return false;
  }

  indexToNameOnGroup(
    groupIndex: string,
    groups: Group[] | null
  ): string | null {
    var groupName: string | null = null;
    if (groupIndex != '0') {
      for (let group of groups!) {
        if (group.groupId?.toString() == groupIndex) {
          groupName = group.name;
        }
      }
    }
    return groupName;
  }

  nameToIndexOnGroup(groupName: string | null, groups: Group[] | null): string {
    var groupIndex: string = '0';
    if (groupName != null && groups != null) {
      for (let group of groups) {
        if (groupName == group.name) {
          groupIndex = group.groupId!.toString();
        }
      }
    }
    return groupIndex;
  }

  formatDate(date: Date): string {
    var month: string = '';
    var day: string = '';
    if (date.getMonth() + 1 < 10) {
      month = '0' + (date.getMonth() + 1).toString();
    } else {
      month = (date.getMonth() + 1).toString();
    }

    if (date.getDate() < 10) {
      day = '0' + date.getDate().toString();
    } else {
      day = date.getDate().toString();
    }
    return date.getFullYear().toString() + '/' + month + '/' + day;
  }

  convertReturnToBr(text: string) {
    var convertedText: string = text.replace(/\n/g, '<br>');
    return convertedText;
  }
}
