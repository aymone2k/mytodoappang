import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
userImage:any;
image!:string;
userEmail!:string;
userName!:string;
modifProfil : boolean=false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userEmail=this.userService.userEmail;
    this.image= this.userService.userImage;

    this.userName= this.userService.user;
  this.userService.getUserImage(this.image)
                      .then((file:any)=>{
                       // console.log(file)
                      this.userImage=file;
                      })
                      .catch((err:any)=>{console.log("err:",err)})

  }

  OnModif(){
    this.modifProfil = true
  }
}
