import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() {
  }

  async getTodos() {
    const URL = 'http://127.0.0.1:8000/todos/';
    return await fetch(URL, {method: 'GET'});
  }

}
