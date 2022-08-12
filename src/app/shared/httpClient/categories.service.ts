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
export class CategoriesService {
  
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
  public createObject(data){
    let user = this.storageService.getCurrentSession();
    data.userCreated = user['id'];

    this.httpClient.post(this.REST_API_SERVER+"categories/cCategory",data).subscribe(
      data  => {
        this.toaster.success(data['message']);
         return this.router.navigateByUrl('/categories/categories-list');
         },
        error  => {
          this.toaster.error(error.error.message);});
  }


    /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
     public updateObject(data){
      this.httpClient.post(this.REST_API_SERVER+"/categories/uCategory",{"id" : data.id, "name" : data.name}).subscribe(
        data  => {
            this.toaster.success(data['message']);
            
            return this.router.navigateByUrl('/categories/categories-list');
           },
          error  => {this.toaster.error(error.error.message);});
    }


  

  /**
   * Trae el listado de funcionarios
   */
  public getAllData(){
    return this.httpClient.get(this.REST_API_SERVER+"/categories/lCategories");
  }


  
  /**
   * Inactivate Item 
   */
   public inactivateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/categories/iCategory",{"id": data});
  }

    
  /**
   * Activate Item 
   */
   public activateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/categories/aCategory",{"id": data});
  }


  /**
   * Trae el listado de funcionarios
   */
   public getDataById(data){
    return this.httpClient.get(this.REST_API_SERVER+"categories/rCategory/"+data);
  }


  


  

}
