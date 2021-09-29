import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Color } from 'src/app/models/color.model';
import { CategoryService } from 'src/app/services/category.service';
import { COLORS } from 'src/assets/data/color-data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {



  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

  }

}
