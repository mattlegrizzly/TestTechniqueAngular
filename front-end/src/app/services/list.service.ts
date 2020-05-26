import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {List} from "../models/list.model";
import { HttpClient } from '@angular/common/http';
import {Object} from "../models/object.model";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) {}

  private list: List[] = []  ;
  public list$ = new Subject<List[]>();

  getList() {
    this.http.get('http://localhost:3000/lists').subscribe(
      (lists: List[]) => {
        if (lists) {
          this.list = lists;
          this.emitList();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  emitList() {
    this.list$.next(this.list);
  }

  getListById(id: string) {
    return new Promise((resolve, reject) => {

      this.http.get('http://localhost:3000/lists/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  modifyThing(id: string, list: List) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/lists/' + id, list).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createNewList(list: List) {
    return new Promise((resolve, reject) => {

      this.http.post('http://localhost:3000/lists', list).subscribe(
        (response) => {

          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  addCourses(courses: Object){
    return new Promise((resolve, reject) => {

      this.http.post('http://localhost:3000/courses', courses).subscribe(
        (response) => {

          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deleteList(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/lists/' + id).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
