import { Injectable } from '@angular/core';
import { SendPUserDto } from '../interface/dto/request/send-p-user-dto';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:8080';
  sessionIdKey: string = 'x-auth-id';
  isAuthenticated: boolean = false;
  isStarted: boolean = false;

  constructor() {}

  private httpOptions: any = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  private configWithTimeout: any = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
  };

  getRequestConfig(sessionId: string): any {
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Id': sessionId,
      },
      withCredentials: true,
    };
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getIsStarted(): boolean {
    return this.isStarted;
  }

  async start(): Promise<boolean> {
    try {
      var response = await axios.get(this.baseUrl + '/auth/', this.httpOptions);
      var result = response.data;
      this.isStarted = result;
      return result;
    } catch {
      return false;
    }
  }

  async startWithTimeout(): Promise<boolean> {
    try {
      var response = await axios.get(
        this.baseUrl + '/auth/',
        this.configWithTimeout
      );
      var result = response.data;
      this.isStarted = result;
      return result;
    } catch {
      return false;
    }
  }

  async checkSession(): Promise<boolean> {
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.get(
        this.baseUrl + '/auth/session',
        this.getRequestConfig(sessionId)
      );
      var result = response.data;
      this.isAuthenticated = result;
      return result;
    } catch {
      return false;
    }
  }

  async pUserSignup(
    email: string,
    password: string
  ): Promise<boolean | undefined> {
    try {
      var sendPUserDto: SendPUserDto = {
        email: email,
        password: password,
      };
      var response = await axios.post<boolean>(
        this.baseUrl + '/auth/p-sign-up',
        sendPUserDto,
        this.httpOptions
      );
      this.isAuthenticated = response.data;

      if (response.data) {
        var sessionId: string;
        sessionId = response.headers['x-auth-id'];
        localStorage.setItem('x-auth-id', sessionId);
      }

      return response.data;
    } catch {
      console.log('error');
      return undefined;
    }
  }

  async pUserLogin(
    email: string,
    password: string
  ): Promise<boolean | undefined> {
    try {
      var sendPUserDto: SendPUserDto = {
        email: email,
        password: password,
      };
      var response = await axios.post<boolean>(
        this.baseUrl + '/auth/p-login',
        sendPUserDto,
        this.httpOptions
      );

      this.isAuthenticated = response.data;

      if (response.data) {
        var sessionId: string;
        sessionId = response.headers['x-auth-id'];
        localStorage.setItem('x-auth-id', sessionId);
      }

      return response.data;
    } catch {
      console.log('error');
      return undefined;
    }
  }

  async logout(): Promise<boolean> {
    try {
      var sessionId = localStorage.getItem(this.sessionIdKey);
      if (sessionId == null) {
        return false;
      }
      var response = await axios.post<boolean>(
        this.baseUrl + '/auth/logout',
        this.httpOptions,
        this.getRequestConfig(sessionId)
      );
      this.isAuthenticated = !response.data;
      if (response.data) {
        localStorage.removeItem(this.sessionIdKey);
      }
      return response.data;
    } catch {
      return false;
    }
  }
}
