import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { expressionType } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  private REST_API_SERVER = environment.urlApis+"/";

  constructor(
    private storageService: StorageService,
    private httpClient: HttpClient, 
    public toaster: ToastrService, 
    public router: Router) { }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public sendCreateRequest(data, random){
    const md5 = new Md5();
    let encrypt =  md5.appendStr(random).end();

    let user = this.storageService.getCurrentSession();
    this.httpClient.post(this.REST_API_SERVER+"users/cUser",
    {"data" : data , 
     "userCreated": user['id'],
    "password" :  encrypt}).subscribe(
      data  => {
        this.toaster.success(data['message']);
         return this.router.navigateByUrl('/user/team-details');
         },
        error  => {
          this.toaster.error(error.error.message);});
  }



    /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
     public createObject(data, random){
      const md5 = new Md5();
      let encrypt =  md5.appendStr(random).end();
  
      let user = this.storageService.getCurrentSession();
      this.httpClient.post(this.REST_API_SERVER+"users/cAdmin",
      {"data" : data , 
       "userCreated": user['id'],
      "password" :  encrypt}).subscribe(
        data  => {
          this.toaster.success(data['message']);
           return this.router.navigateByUrl('/admins/admin-list');
           },
          error  => {
            this.toaster.error(error.error.message);});
    }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public updateAdmin(data){
    let encrypt
    console.log(data.password)
    if(data.password != null ){
      const md5 = new Md5();
      encrypt =  md5.appendStr(data.password).end();
    }
    
    this.httpClient.post(this.REST_API_SERVER+"/users/uAdmin",{"id" : data.id, "first_name" : data.firstName, "last_name" : data.lastName , "password" :  encrypt, "email" : data.email}).subscribe(
      data  => {
          this.toaster.success(data['message']);
          
          return this.router.navigateByUrl('/admins/admin-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }



    /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public setPassword(data){
      let encrypt;
      if(data.password != null ){
        const md5 = new Md5();
        encrypt =  md5.appendStr(data.password).end();
      }
      
      this.httpClient.post(this.REST_API_SERVER+"/users/setPassword",{"id" : data.id, "password" :  encrypt}).subscribe(
        data  => {
            this.toaster.success(data['message']);
            let currentUser = JSON.parse(localStorage.currentUser);
            currentUser.activatePw = 1;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location.href = '/dashboard/default';
            
            
            

            
           },
          error  => {this.toaster.error(error.error.message);});
    }


    /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
     public updateUser(data){
      let encrypt
      console.log(data.password)
      if(data.password != null ){
        const md5 = new Md5();
        encrypt =  md5.appendStr(data.password).end();
      }
      
      this.httpClient.post(this.REST_API_SERVER+"/users/uUser",{"id" : data.id, "first_name" : data.firstName, "last_name" : data.lastName , "password" :  encrypt, "title" : data.title, "division" : data.division, "company_mobile" : data.companyMobile, "email" : data.email}).subscribe(
        data  => {
            this.toaster.success(data['message']);
            
            return this.router.navigateByUrl('/user/team-details');
           },
          error  => {this.toaster.error(error.error.message);});
    }


  

  /**
   * Trae el listado de funcionarios
   */
  public getAllData(){
    return this.httpClient.get(this.REST_API_SERVER+"/users/lUsers/ADMIN");
  }

  /**
   * Trae el listado de funcionarios
   */
   public getAllUsers(){
    return this.httpClient.get(this.REST_API_SERVER+"/users/lUsers/AGENCY");
  }

  
  /**
   * Inactivate Item 
   */
   public inactivateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/users/iUser",{"id": data});
  }

    
  /**
   * Activate Item 
   */
   public activateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/users/aUser",{"id": data});
  }


  /**
   * Trae el listado de funcionarios
   */
   public getDataById(data){
    return this.httpClient.get(this.REST_API_SERVER+"users/rUser/"+data);
  }


  


  

}
