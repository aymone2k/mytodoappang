import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
file:string='';
  api = environment.api;
  token: string = '';
  user :string = '';
  userEmail :string = '';
  userImage :string = '';
  author:string = '';
  isAuth$ = new BehaviorSubject<boolean>(false);


  constructor(private httpClient: HttpClient,
              private router: Router) {
    this.initAuth();
  }
//verif si on a des données en local
initAuth(){
  if(typeof localStorage !== "undefined"){
    const data = JSON.parse(localStorage.getItem('userLogin')||'{}');
    if(data){
     // console.log('data:', data);
      if(data.id && data.token){
        this.userEmail = data.email;
        this.userImage = data.image;
        this.author = data.id;
        this.user = data.name;
        this.token = data.token;
        this.isAuth$.next(true);
      }
    }
  }
}
//création d'un user: Signup
  addUserToServer(user: User, image: File){
    //creation de l'objet userData contenant l'image
        return new Promise((resolve, reject)=>{
        let userData: FormData = new FormData();
        userData.append('user', JSON.stringify(user));
        userData.append('image', image);

    //gestion de la requete http
        this.httpClient
          .post(this.api+'/user/signup', userData)
          .subscribe(

            (signupData:Data)=>{
             // console.log(signupData)
              if(signupData.status === 201){
                resolve(signupData)

            }
              },
            (error)=>{
              reject(error.error)
            }
          )
      })
    }

//reccup de l'avatar
getUserImage(fileName:string){
  return new Promise((resolve, reject)=>{
    this.httpClient.get(this.api+'/user/image/'+fileName)
    .subscribe(
      (data:any)=>{
     //console.log(data)

      },
      (err: any)=>{//console.log(err)
      resolve(err.url)},
  )

})}
//mise à jour d'un user
  updateUserToServer(id: string, user: User, image: File|string){
    return new Promise((resolve, reject)=>{
      let userData: FormData = new FormData();
      if(typeof image === 'string'){
        user.image = image;
      }else{
        userData.append('image', image);
      }
      userData.append('user', JSON.stringify(user))


      this.httpClient.put(this.api+'/user/updateuser/' +id, userData).subscribe(
        (data:Data)=>{
          if(data.status === 200){
            this.userEmail = data.email;
             this.author = data.id;
        this.userImage = data.image;
        //console.log('dataUpdate:', data);
        window.alert(data.message);
            this.isAuth$.next(false);
          }else{
            reject(data);
          }

        },
        (err)=>{
          reject(err)
        }
      )
    })

  }

//connection d'un user: signin

getUserToServer(email:string, password: string){
  return new Promise((resolve, reject)=>{
    this.httpClient.post(this.api+'/user/signin', {email: email, password: password}).subscribe(
      (authData:Data)=>{
        this.userEmail = authData.email;
        this.user = authData.name;
        this.token = authData.token;
        this.author = authData.id;
        this.userImage = authData.image;
       // console.log('authdata:', authData);
        this.isAuth$.next(true);
        //save authData in localStorage
          if(typeof localStorage !== "undefined"){
            localStorage.setItem('userLogin', JSON.stringify(authData))
          }
        resolve(true);
      },
      (error)=>{
        reject(error)
      })
  })

}

//deconnexion
logout(){
  this.isAuth$.next(false);
  this.author = "";
  this.token = "";
  if(typeof localStorage !== "undefined"){
    localStorage.setItem('userLogin', '')
  }
  this.router.navigate(['/home'])
};

//envoie du formulaire pour reset password
sendResetPassword(email: string){
  return new Promise((resolve, reject)=>{
    const user = {
      email:"",
    }
    user.email= email;
   this.httpClient
   .post(this.api+'/user/forgotpassword', user)
   .subscribe(
     (data)=>{
      resolve(data)
     // console.log(data)
     },
     (error)=>{
       console.log(error.message)
     }

   )

  })
};

// mise à jour du password
updatePassword(password:string, token:string){
  return new Promise((resolve, reject)=>{
    this.httpClient.put(this.api+'/user/resetpassword/'+token, {password: password, token:token}).subscribe(
      (data:Data)=>{

        if (data.status === 200){
          resolve(data.message);

        }else{
          reject(data);

        }
      },
      (err)=>{
        reject(err.error);
        console.log(err.error);

      }
    )
  })

  }




}
