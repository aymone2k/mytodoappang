import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
//revoir pour config edit profil
@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
idUser!:string;
  errorMessage!: string;
  message!:string;
  editProfilForm !: FormGroup;
  imagePreview: string ="";

  constructor(private formBuilder:FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
              }

  ngOnInit(): void {
    this.idUser = this.userService.author

    this.initProfilForm();
  }

  initProfilForm(){
    this.editProfilForm = this.formBuilder.group({
      name:["", [ Validators.minLength(6), ]],
      email:["", [ Validators.email]],
      image:null,

    }) ;


  }


 get controlForm(){
  return this.editProfilForm.controls;
}

uploadImage(event: any){
 const file: File = (event.target ).files[0];
 //modif et update de image
  this.editProfilForm.get('image')?.patchValue(file);
  this.editProfilForm.get('image')?.updateValueAndValidity();
//affichage de l'image chargée
      const reader = new FileReader();
      reader.onload =()=>{
        if(this.editProfilForm.get('image')?.valid){
          this.imagePreview = reader.result as string;
        //  console.log(this.editProfilForm.value.image)
        }else{
        this.imagePreview = "";
        }
      }
      reader.readAsDataURL(file);
}



  onEditProfil(){
  const newUser = new User();
   newUser.name = this.editProfilForm.value.name;
   newUser.email = this.editProfilForm.value.email;
   newUser.image ='';

   //save user
    this.userService.updateUserToServer(this.idUser, newUser, this.editProfilForm.value.image)
    .then(
      (data: any)=>{
       console.log(data)
        this.message = data.message
       //   this.router.navigate(["/signin"]);
      })
      .catch(
        (error)=>{
          this.errorMessage = error.message;
        }
      );

  }
}
