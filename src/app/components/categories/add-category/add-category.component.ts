import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { COLORS } from 'src/assets/data/color-data';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  isLoading:boolean = false;
  category = new Category();
  colors: Color[] = COLORS;
  author: string ="";
  errorMessage: string = "";
my: string = "";

  constructor(private categoryService: CategoryService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.author = this.userService.author;
  }

  getColor(color:any){
    return color    }


  onSubmit(form: NgForm): void{
    const categoryName = form.value['categoryName'];
    const categoryColor = form.value['categoryColor'];
    const author = this.author;
   this.isLoading=true;
    this.categoryService.addCategoryToServer(categoryName, categoryColor, author)
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

}
