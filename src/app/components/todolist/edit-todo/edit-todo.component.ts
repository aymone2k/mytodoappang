import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Todo } from 'src/app/models/todo.model';
import { CategoryService } from 'src/app/services/category.service';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit{
  todo!:Todo ;
  todoForm !: FormGroup;
  categorySub !: Subscription;
  todos:any;
  categories: Category[] =[];
  categoriesSub!: Subscription;
  author: string ="";
  errorMessage: string = "";
isLoading:boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private todoService: TodoService,
    private categoryService: CategoryService,
    private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.author = this.userService.author;
    this.isLoading = true;
      this.route.params.subscribe(
        (params: Params)=>{
          const idTodo = params.id;
          this.todoService.getTodoByIdFromServer(idTodo)
          .then((todo: any)=>{
            this.todo = todo;
            if(this.todo.author !== this.author){

              this.router.navigate(['/not-found'])
            }

              this.todoForm = this.formBuilder.group({

                todoName: [todo.todoName, Validators.required],
                todoStatus: [todo.todoStatus, Validators.required],
                todoDescription:[todo.todoDescription, Validators.required],
                category:[todo.category, Validators.required],

              });
              this.isLoading = false;

          })
          .catch((err)=>{console.log(err);
                          return this.router.navigate(['/todolist'])})
        }
      )

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


  onSubmitForm() {
    this.isLoading = true;
    const formValue= this.todoForm.value;
    const newTodo = new Todo(
      formValue['todoName'],
      formValue['todoStatus'],
      formValue['todoDescription'],
      formValue['category'],
      formValue['author']= this.author,
      formValue['_id']= this.todo._id,
    );

    this.todoService.onUpdateTodoToServer(this.todo._id!, newTodo)
      .then(
        ()=>{
          this.todoForm.reset();
          this.isLoading = false;
          this.router.navigate(["todolist"]);
        }
      )
      .catch(
        (err)=>{
          this.isLoading = false;
          this.errorMessage = err.message;}
      );

  }
  onCreateCategory():void{
    this.router.navigate(["categories"]);
  }

}
