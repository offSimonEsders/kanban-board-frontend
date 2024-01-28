import {Injectable} from '@angular/core';
import {Todo} from "../modules/task";
const URL = 'http://127.0.0.1:8000';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() {
  }

  async getTodos() {
    return await fetch(URL + '/todos/', {method: 'GET'});
  }

  async updateTodos(todos: Todo[]) {
    return await fetch(URL + '/todos/', {method: 'PUT', body: JSON.stringify(todos)});
  }

}
