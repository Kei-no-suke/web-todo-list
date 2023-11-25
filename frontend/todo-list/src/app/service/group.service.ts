import { Injectable } from '@angular/core';
import axios from 'axios';
import { Group } from '../interface/group';
import { SendGroupFrontDto } from '../interface/dto/request/send-group-front-dto';
import { GroupListDto } from '../interface/dto/response/group-list-dto';
import { GroupReqDto } from '../interface/dto/request/group-req-dto';
import { TaskReqDto } from '../interface/dto/request/task-req-dto';
import { GroupDetailDto } from '../interface/dto/response/group-detail-dto';
import { GroupEditDto } from '../interface/dto/response/group-edit-dto';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
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

  // group-create
  async saveGroup(group: Group): Promise<boolean> {
    var sendGroupFrontDto: SendGroupFrontDto = {
      groupFront: group,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/group-create/save',
        sendGroupFrontDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  // group-detail
  async getGroupDetailDto(groupId: number): Promise<GroupDetailDto | null> {
    var groupReqDto: GroupReqDto = {
      groupId: groupId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.post<GroupDetailDto>(
        this.baseUrl + '/group-detail/',
        groupReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async removeTask(taskId: number): Promise<boolean> {
    var taskReqDto: TaskReqDto = {
      taskId: taskId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/group-detail/remove',
        taskReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  async deleteGroup(groupId: number): Promise<boolean> {
    var groupReqDto: GroupReqDto = {
      groupId: groupId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/group-detail/delete',
        groupReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  // group-edit
  async getGroupEditDto(groupId: number): Promise<GroupEditDto | null> {
    var groupReqDto: GroupReqDto = {
      groupId: groupId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.post<GroupEditDto>(
        this.baseUrl + '/group-edit/',
        groupReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async updateGroup(group: Group): Promise<boolean> {
    var sendGroupFrontDto: SendGroupFrontDto = {
      groupFront: group,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/group-edit/update',
        sendGroupFrontDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  // group-list
  async getGroupListDto(): Promise<GroupListDto | null> {
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return null;
      }
      var response = await axios.get<GroupListDto>(
        this.baseUrl + '/groups/',
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return null;
    }
  }

  async deleteGroupOnList(groupId: number): Promise<boolean> {
    var groupReqDto: GroupReqDto = {
      groupId: groupId,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/groups/delete',
        groupReqDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      return false;
    }
  }

  async createGroup(group: Group) {
    var sendGroupFrontDto: SendGroupFrontDto = {
      groupFront: group,
    };
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/tasks/',
        sendGroupFrontDto,
        this.getRequestConfig(sessionId)
      );
      return response.data;
    } catch {
      console.log('error');
      return false;
    }
  }

  convertReturnToBr(text: string) {
    var convertedText: string = text.replace(/\n/g, '<br>');
    return convertedText;
  }
}
