import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { COLORS } from 'src/assets/data/color-data';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit ,OnDestroy{


isLoading:boolean=false;
  colors: Color[] = COLORS;
  categories: Category[] =[];
  author: string ="";
  categoriesSub!: Subscription;


  constructor(private categoryService: CategoryService , private router: Router, private userService: UserService) { }

  ngOnInit(): void {
this.isLoading=true;
      this.categoriesSub = this.categoryService.categoriesSubject
                            .subscribe(
                              (value:any[])=>{
                                this.isLoading=false;
                                 this.categories = value
                                },
                              (error)=>{
                                this.isLoading=true;
                                console.log("une erreur: "+error)},
                             );
  this.author = this.userService.author;
      this.categoryService.emitCategories();
      this.categoryService.getCategoriesToServer(this.author);
    }

  ngOnDestroy(){
      this.categoriesSub.unsubscribe();
    }



   onUpdateCatg(id:string){

    this.router.navigate(['edit-category/'+id])
  }

 /*  onUpdateCatgToServer(i:number, category:Category){
    this.categoryService.onUpdateCatgToServer(i,category);
  } */

  onCreateTodo():void{
    this.router.navigate(["todolist"])
  }
}
