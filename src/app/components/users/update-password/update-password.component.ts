import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validators';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  errorMessage!: string;
  message!:string;
  updatePasswordForm !: FormGroup;
  isLoading :boolean = false;
  fieldTextType1:boolean = false;
  fieldTextType2:boolean = false;
  token:string = '';
  infoToken:any = '';

  constructor(private formBuilder:FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {

    this.updatePasswordForm = this.formBuilder.group({
      password:["", [Validators.required, Validators.pattern('[a-zA-Z ]{6,}')]],//6min
      confirmPassword:["", Validators.required],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }) ;

    this.route.params.subscribe(
      (params:Params) =>{
        this.token = params.id;
      } )
  }

  get controlForm(){
    return this.updatePasswordForm.controls;
  }

  onUpdatePassword(){
    this.isLoading = true;
    const newUser = new User();
    newUser.password = this.updatePasswordForm.get('password')?.value;
   newUser.confirmPassword = this.updatePasswordForm.get('confirmPassword')?.value;

   this.userService.updatePassword(newUser.password, this.token)
        .then(
          (data:any)=>{
            window.alert(data);
            this.isLoading=false;
            this.router.navigate(['/signin'])
          })
      .catch(
        (error)=>{
        this.isLoading= false;
        window.alert(error.message);
        this.router.navigate(['/reset-password']);
      })
  }
  toogleFieldText1(){
    this.fieldTextType1 =!this.fieldTextType1;
  }
  toogleFieldText2(){
    this.fieldTextType2 =!this.fieldTextType2;
  }

}
