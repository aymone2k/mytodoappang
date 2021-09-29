import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Todo } from '../models/todo.model';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todo:any;
  api = environment.api;
  today = new Date();
  todos: Todo[] = [];
  todoSubject = new Subject<Todo[]>();
  todoName:string="";
  todoCategory:string="";
  todoDescription: string="";

  constructor(private httpClient: HttpClient,
              private categoryService : CategoryService) { }

  emitTodos(){
    this.todoSubject.next(this.todos)
  }


  addTodo(todo : Todo){
    this.todos.push(todo);
    this.emitTodos();
  }


  addTodoToServer(todo: Todo, author:string){
    return new Promise((resolve, reject)=>{
      this.httpClient
      .post(this.api+'/todo',todo)
      .subscribe(
        (data: Data)=>{
          if(data.status === 201){
            this.getTodoFromServer(author);
            resolve(data.message)
          }else{
            reject(data.message);
          }

        },
        (error)=>{
          console.log(error)
        }
      )
    })


  }

  getTodoFromServer(author:string):void{
    this.httpClient
      .get(this.api+'/todo/'+author)
      .subscribe(
        (data: Data)=>{
          if(data.status === 200){
            this.todos = data.message;
          //  console.log(this.todos)
            this.emitTodos();
          }else{
            console.log(data)
          }
        },
        (error)=>{
          console.log(error)
        }
      )

  }

  //voir pour modifier un todo et pour supprimer

  getTodoByIdFromServer(id: string){
    return new Promise((resolve, reject)=>{
      this.httpClient.get(this.api+'/todo/byid/'+id)
        .subscribe(
           (data: Data)=>{
              if(data.status === 200){

            resolve(data.message)
              }else{
                reject(data);
              }
        },
         (error)=>{
           reject(error)
         }
     )
  })
}

  onUpdateTodoToServer(id: string, todo: Todo){
    return new Promise((resolve, reject)=>{
      this.httpClient.put(this.api+'/todo/'+id, todo)

      .subscribe(
        (data: Data)=>{
          if(data.status === 200){
            //ajouter affichage du message server
            resolve(data.message);
          }else{
            reject(data);
          }
        },
        (err)=>{
          reject(err);
        })
    })
  }

  onDeleteTodoToServer(id: string, author:string){
    return new Promise((resolve, reject)=>{
      this.httpClient.delete(this.api+'/todo/'+id).subscribe(
        ()=>{
          this.getTodoFromServer(author);
          resolve(true);
        },
        (err)=>{
          reject(err);
        }
      )
    })
  }
}
