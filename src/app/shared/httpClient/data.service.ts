import { Injectable, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CookieService } from 'ngx-cookie-service';
import {Md5} from 'ts-md5/dist/md5';
import { StorageService } from '../services/storage.service';
import { environment } from '../../../environments/environment';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  
  private REST_API_SERVER = environment.urlApis+"/";

  constructor(public toster: ToastrService, 
              public httpClient: HttpClient, 
              private storageService: StorageService,
              public router: Router, 
              public ngZone: NgZone,
              private cookies: CookieService,
              public afAuth: AngularFireAuth,) { }


  ngOnInit(): void { }


  public sendLoginRequest(user, password){
    const md5 = new Md5();
    let encrypt =  md5.appendStr(password).end();
    return this.httpClient.post(this.REST_API_SERVER+"/users/acceso",{"user" : user , "password" :  encrypt});
    
  }


  setToken(token) {
    this.cookies.set("token", token);
  }

  getToken() {
    return this.cookies.get("token");
  }

  deleteToken(){
    this.cookies.delete("token");
  }

  public getAllData(from, to, role, idUser ){
    return this.httpClient.post(this.REST_API_SERVER+"/reports/all", { "role": role, "idUser": idUser , "from": from, "to": to});
  }


  public getTotals(){
    let user = this.storageService.getCurrentSession();


    return this.httpClient.get(this.REST_API_SERVER+"reports/totals/"+ user['role'] +"/"+user['id']);
  }
  


  
}
