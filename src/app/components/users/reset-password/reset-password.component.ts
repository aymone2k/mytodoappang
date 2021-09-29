import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isLoading:boolean= false;


  constructor(private userService : UserService,

    private router :Router) { }

  ngOnInit(): void {

  }

onReset(form: NgForm):void{
  this.isLoading=true;
  const email = form.value['email'];
  this.userService.sendResetPassword(email)
  .then(
    (data:any)=>{
      window.alert(data.message);
      this.isLoading=false;
      this.router.navigate(['/signin'])
    })
 .catch(
   (err)=>{
   this.isLoading= false;
   window.alert(err.message);
 })
}
}
