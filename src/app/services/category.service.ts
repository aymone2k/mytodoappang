import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api = environment.api;

  categories : Category[]=[];
  categoriesSubject = new Subject<Category[]>();
  categorySubject = new Subject<Category>();
  category:any = new Category();

  constructor(private httpClient: HttpClient) {//injection du service httpClient
    }

  emitCategories():void{//met les données dans notre observable à chaq changement de données
      this.categoriesSubject.next(this.categories);
      }



  addCategoryToServer(categoryName: string, categoryColor:string, author: string){
   return new Promise((resolve, reject)=>{
    const category ={
       categoryName: "",
       categoryColor: "white",
       author:"",
       };
    category.categoryName = categoryName;
    category.categoryColor = categoryColor;
    category.author = author;


    this.httpClient
      .post(this.api+'/categoryTodo', category)
      .subscribe(
        (data:Data)=>{
          if(data.status === 201){
            this.getCategoriesToServer(author);
            resolve(data)
          }else{
            reject(data)
          }
         },
        (error)=>{
          reject(error.error);

        }
      )
    this.emitCategories();
     })
    }

  getCategoriesToServer(author:string):void{
    this.httpClient
      .get(this.api+'/categoryTodo/'+author)
      .subscribe(
        (data: Data)=>{
          if(data.status ===200){
            this.categories = data.message;
            this.emitCategories();
          }else{
            console.log(data);
          }},
        (error)=>{
          console.log('Erreur:'+error.status, error.message)

          },
      )
   }


  getCategoryByIdToServer(id: string){
    return new Promise((resolve, reject)=>{
     this.httpClient
     .get(this.api+'/categoryTodo/cat/'+id)
     .subscribe(
        (data: Data)=>{
            resolve(data.message)
        },
         (error)=>{
          reject(error.error);
         } )
        })
  }

  onUpdateCatgToServer(id: string, categoryName: string, categoryColor:string, author: string){
    return new Promise((resolve, reject)=>{
     const category ={
        categoryName: "",
        categoryColor: "white",
        author:"",
        };
     category.categoryName = categoryName;
     category.categoryColor = categoryColor;
     category.author = author;
    this.httpClient
    .put(this.api+'/categoryTodo/'+id, category)
    .subscribe(
      (data: Data)=>{
        if(data.status === 200){
          //ajouter affichage du message server
          resolve(data)
        }else{
          reject(data)
        }},
      (error)=>{
         reject(error.error);}
    )
  })
  //this.emitCategories();
  }

}
