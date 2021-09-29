import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  today:number = Date.now();
  author: string ="";
  user: string ="";
  userId: string ="";
  todos:Todo[] = [];
  todoFilter:any[] = [];
  todoNumber: number =0;
  todoNumberTodo: number =0;//nbr de todo à réaliser
  todoNumberDone: number =0;//nbr de todo déjà réaliser

  kocxyImage: any = "../assets/images/kocxy.png";

  todoSub !: Subscription;

  constructor(private userService: UserService,
              private todoService: TodoService) { }

  ngOnInit(): void {
    this.today;
    this.user = this.userService.user
    this.userId = this.userService.author
    this.isLoading = true;
  this.todoSub = this.todoService.todoSubject
                              .subscribe(
                                (todos: Todo[]) => {
                                  this.isLoading=false;
                                    this.todos = todos;
                                   // console.log(todos)
                                    this.todoNumber = this.todos.length

                                    this.todoNumberTodo = this.todos.filter(todo=>todo.todoStatus==false).length
                                    this.todoNumberDone = this.todos.filter(todo=>todo.todoStatus==true).length
                                    //console.log(this.todoNumberTodo)
                              },
                              (error)=> {
                                this.isLoading = false;
                                console.log(error)}

                              );
    this.todoService.getTodoFromServer(this.userId)


}
ngOnDestroy(): void {
  this.todoSub.unsubscribe();
}

}
