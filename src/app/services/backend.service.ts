import {Injectable} from '@angular/core';
import {Todo} from "../modules/task";

const URL = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() {
  }

  async login(userData: object) {
    let authToken = localStorage.getItem('authToken');
    const resp = await fetch(URL + '/login/', {method: 'POST', body: JSON.stringify(userData)});
    const token = await resp.json();
    localStorage.setItem('authToken', token.token);
  }

  async register(userData: object) {
    await fetch(URL + '/register/', {method: 'POST', body: JSON.stringify(userData)});
  }

  async checkToken() {
    let authToken = localStorage.getItem('authToken');
    return await fetch(URL + '/checkToken/', {method: 'GET', headers: {'Authorization': `Token ${authToken}`}});
  }

  async getTodos() {
    let authToken = localStorage.getItem('authToken');
    return await fetch(URL + '/todos/', {method: 'GET', headers: {'Authorization': `Token ${authToken}`}});
  }

  async updateTodos(todos: Todo[]) {
    let authToken = localStorage.getItem('authToken');
    return await fetch(URL + '/todos/', {
      method: 'PUT',
      headers: {'Authorization': `Token ${authToken}`},
      body: JSON.stringify(todos)
    });
  }

}
