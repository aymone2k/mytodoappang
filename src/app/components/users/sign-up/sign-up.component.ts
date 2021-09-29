import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validators';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm !: FormGroup;
  imagePreview: string ="";
  isLoading :boolean = false;
  fieldTextType1:boolean = false;
  fieldTextType2:boolean = false;


  constructor(private formBuilder:FormBuilder,
              private userService: UserService,
              private router: Router) {
              }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(){
    this.signUpForm = this.formBuilder.group({
      name:["", [Validators.required, Validators.minLength(6), ]],
      email:["", [Validators.required, Validators.email]],
      image:null,
      password:["", [Validators.required, Validators.pattern('[a-zA-Z ]{6,}')]],//6min
      confirmPassword:["", Validators.required],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    }) ;


  }


 get controlForm(){
  return this.signUpForm.controls; //reccup les champs saisies du form pour control
}

uploadImage(event: any){
 const file: File = (event.target ).files[0];
 //modif et update de image
  this.signUpForm.get('image')?.patchValue(file);
  this.signUpForm.get('image')?.updateValueAndValidity();
//affichage de l'image chargée
      const reader = new FileReader();
      reader.onload =()=>{
        if(this.signUpForm.get('image')?.valid){
          this.imagePreview = reader.result as string;
         // console.log(this.signUpForm.value.image)
        }else{
        this.imagePreview = "";
        }
      }
      reader.readAsDataURL(file);
}



  onSignUp(){
    this.isLoading = true;

  const newUser = new User();
   newUser.name = this.signUpForm.get('name')?.value;
   newUser.email = this.signUpForm.get('email')?.value;
   newUser.password = this.signUpForm.get('password')?.value;
   newUser.confirmPassword = this.signUpForm.get('confirmPassword')?.value;
   newUser.image ='';

   //save user
    this.userService.addUserToServer(newUser, this.signUpForm.value.image)
    .then(
      (data: any)=>{
        this.isLoading = false;
        //console.log(data)
        window.alert(data.message);
         this.router.navigate(["/signin"]);
      })
      .catch(
        (error)=>{
          this.isLoading =false;
          window.alert(error.message);
        }
      );

  }

  onResetForm(){

    this.signUpForm.reset();
  }

  toogleFieldText1(){
    this.fieldTextType1 =!this.fieldTextType1;
  }
  toogleFieldText2(){
    this.fieldTextType2 =!this.fieldTextType2;
  }
}
