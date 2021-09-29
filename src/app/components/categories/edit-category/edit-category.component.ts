import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { COLORS } from 'src/assets/data/color-data';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
id:string="";
  author:string="";
  colors: Color[] = COLORS;
  categoryGet:any = new Category();
  category:any = new Category();
categorySub !: Subscription;
isLoading:boolean = false;

  constructor(private categoryService: CategoryService ,
              private userService: UserService,
              private router: Router,
              private routeId: ActivatedRoute) { }

  ngOnInit() {
    this.author = this.userService.author;
    this.isLoading = true;
    this.routeId.params.subscribe(
      (params: Params)=>{
        const id = params.id;
        this.categoryService.getCategoryByIdToServer(id)
        .then((category: any)=>{
          this.isLoading=false;
          this.category = category;
          if(this.category.author !== this.author){
            this.router.navigate(['/not-found'])
          }
        })
        .catch((err)=>{
          this.isLoading= false;
          window.alert(err.message);
          this.router.navigate(["categories"])
        })

      }
    )
    this.categorySub = this.categoryService.categorySubject
                      .subscribe(
                        (value:any )=>{
                          this.category = value
                         // console.log(this.category)
                        },
                        (error)=>{
                          console.log("une erreur: "+error)},
                        )

    }



    onSubmit(form: NgForm): void{
    const categoryName = form.value['categoryName'];
    const categoryColor = form.value['categoryColor'];
    const author = this.author;
    this.id = this.category._id;
   this.isLoading=true;
    this.categoryService.onUpdateCatgToServer(this.id, categoryName, categoryColor, author)
    .then((data:any)=>{
      window.alert(data.message);
      this.isLoading=false;
      this.router.navigate(["categories"])
    })
    .catch((err)=>{
      this.isLoading= false;
      window.alert(err.message);
      this.router.navigate(["categories"])
    })

  }
ngOnDestroy(): void {
  this.categorySub.unsubscribe();

}

}
