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
export class ProviderService {
  
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
  public sendCreateRequest(data){
    let random =  (Math.random() + 1).toString(36).substring(8);
    const md5 = new Md5();
    let encrypt =  md5.appendStr(random).end();

    let user = this.storageService.getCurrentSession();
    return this.httpClient.post(this.REST_API_SERVER+"providers/cProvider",
    {"data" : data , 
     "userCreated": user['id'],
    "password" :  encrypt});
  }




    /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
     public updateObject(data){
      let user = this.storageService.getCurrentSession();
      data.userModified =  user['id'];
      return this.httpClient.post(this.REST_API_SERVER+"/providers/uProvider",data);
    }


  

  /**
   * Trae el listado de funcionarios
   */
  public getAllData(){
    return this.httpClient.get(this.REST_API_SERVER+"/providers/lProviders");
  }


  /**
   * Inactivate Item 
   */
   public inactivateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/providers/iProvider",{"id": data});
  }

    
  /**
   * Activate Item 
   */
   public activateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/providers/aProvider",{"id": data});
  }


  /**
   * Trae el listado de funcionarios
   */
   public getDataById(id){
    return this.httpClient.get(this.REST_API_SERVER+"/providers/rProvider/"+id);
  }


  


  

}
