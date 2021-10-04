import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/categories/list-category/list-category.component';
import { AddTodoComponent } from './components/todolist/add-todo/add-todo.component';

import { DetailTodoComponent } from './components/todolist/detail-todo/detail-todo.component';
import { EditTodoComponent } from './components/todolist/edit-todo/edit-todo.component';
import { TodolistComponent } from './components/todolist/todolist.component';
import { TodosComponent } from './components/todolist/todos/todos.component';
import { EditProfilComponent } from './components/users/edit-profil/edit-profil.component';
import { ProfilComponent } from './components/users/profil/profil.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { UpdatePasswordComponent } from './components/users/update-password/update-password.component';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent } from './view/home/home.component';
import { NotFoundComponent } from './view/not-found/not-found.component';

import { WelcomeComponent } from './view/welcome/welcome.component';

const routes: Routes = [

  {path:'home', component: HomeComponent},
  {path:'', component: HomeComponent},
  {path:'welcome', component: WelcomeComponent},
  {path:'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'add-todo', component: AddTodoComponent, canActivate: [AuthGuard]},
  {path: 'profil/:id', component: ProfilComponent, canActivate: [AuthGuard]},
  {path: 'edit-profil/:id', component: EditProfilComponent, canActivate: [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'update-password/:id', component: UpdatePasswordComponent},
  {path: 'todolist', component: TodolistComponent, canActivate: [AuthGuard]},
  {path: 'todos', component: TodosComponent, canActivate: [AuthGuard]},
  {path: 'edit-todo/:id', component: EditTodoComponent, canActivate: [AuthGuard]},
  {path: 'detail-todo/:id', component: DetailTodoComponent, canActivate: [AuthGuard]},
  {path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard]},
  {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
  {path:'edit-category/:id', component: EditCategoryComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component:NotFoundComponent },

  {path: '**', pathMatch:'full', redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
