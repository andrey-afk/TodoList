import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Todo} from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/todo`);
  }

  getById(id): Observable<any> {
    return this.http.get(`${environment.apiUrl}/todo/${id}`);
  }

  create(todo: Todo): Observable<any> {
    return this.http.post(`${environment.apiUrl}/todo`, todo);
  }

  update(todo: Todo): Observable<any> {
    return this.http.put(`${environment.apiUrl}/todo`, todo);
  }
  complete({id, isCompleted}): Observable<any> {
    return this.http.put(`${environment.apiUrl}/todo/complete`, {_id: id, isCompleted: !!isCompleted});
  }
  delete(id): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/todo/${id}`);
  }
}
