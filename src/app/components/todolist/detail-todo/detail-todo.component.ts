import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Todo } from 'src/app/models/todo.model';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.css']
})
export class DetailTodoComponent implements OnInit {
todo!:Todo ;
categories!:Category ;
category!:Category ;
isLoading:boolean = false;
categoriesSub!: Subscription
author: string ="";

idCategory : string ="";
  constructor(private todoService: TodoService,
              private userService: UserService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router) { }



  ngOnInit(): void {
        this.isLoading = true;
        this.route.params.subscribe(
            (params: Params)=>{
              const idTodo = params.id;
              this.todoService.getTodoByIdFromServer(idTodo)
                .then((todo: any)=>{
                  this.isLoading = false;
                  this.todo = todo;
                  this.idCategory = todo.category;
                  this.categoryService.getCategoryByIdToServer(this.idCategory)
                    .then((category: any)=>{
                      this.isLoading = false;
                      this.category=category
                    })
                    .catch((err)=>{console.log(err)})
                            })
                  .catch((err)=>{console.log(err)})

            }
     )


    }

  onDeleteTodo(){
    this.isLoading=true;
    const idGet = this.route.snapshot.params['id']
    this.author=this.userService.author;
this.todoService.onDeleteTodoToServer(idGet, this.author)
  .then((data:any)=>{
    window.alert(data.message);
    this.isLoading=false;
    this.router.navigate(["todoList"])
  })
  .catch((err)=>{
    this.isLoading= false;
    window.alert(err.message);
  })

  }

}
