import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Todo } from 'src/app/models/todo.model';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  todoForm !: FormGroup;
  categorySub !: Subscription;
  todos:any;
  categories: Category[] =[];
  categoriesSub!: Subscription;
  author: string ="";
  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private todoService: TodoService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    //reccupération des catégories enregistrées depuis le serveur
        this.categoriesSub = this.categoryService.categoriesSubject
                              .subscribe(
                                (value:any[])=>{
                                  this.categories = value },
                                (error)=>{
                                  console.log("une erreur: "+error)},
                                );
        this.categoryService.emitCategories();
        this.categoryService.getCategoriesToServer(this.author);


  }

  initForm() {
    this.todoForm = this.formBuilder.group({

      todoName: ['', Validators.required],
      todoStatus: false,
      todoDescription:['', Validators.required],
      category:["", Validators.required],

    });
    this.author = this.userService.author;
  }




  onSubmitForm() {
    const formValue= this.todoForm.value;
    const newTodo = new Todo(
      formValue['todoName'],
      formValue['todoStatus'],
      formValue['todoDescription'],
      formValue['category'],
      formValue['author']= this.author,
    );
    this.todoService.addTodo(newTodo);
    this.todoService.addTodoToServer(newTodo, this.author)
      .then(
        ()=>{
          this.todoForm.reset();

               }
      )
      .catch(
        (err)=>{this.errorMessage = err.message;}
      );

  }
  onCreateCategory():void{
    this.router.navigate(["categories"]);
  }

}
