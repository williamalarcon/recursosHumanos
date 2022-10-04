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
export class CandidatesService {
  
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
    data.append('userCreated', user['id']);
    let random =  (Math.random() + 1).toString(36).substring(8);
    const md5 = new Md5();
    let encrypt =  md5.appendStr(random).end();
    data.append('password', encrypt);
    this.httpClient.post(this.REST_API_SERVER+"candidates/cCandidate",data).subscribe(
      data  => {
        this.toaster.success(data['message']);
         return this.router.navigateByUrl('/candidates/candidates-list');
         },
        error  => {
          this.toaster.error(error.error.message);});
  }


    /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
     public updateObject(data){

      let user = this.storageService.getCurrentSession();
      data.append('userModified', user['id']);
      this.httpClient.post(this.REST_API_SERVER+"/candidates/uCandidate",data).subscribe(
        data  => {
            this.toaster.success(data['message']);
            let currentUser = JSON.parse(localStorage.currentUser);
            if(currentUser.role != "CANDIDATE"){
              return this.router.navigateByUrl('/candidates/candidates-list');
            }
            
           },
          error  => {this.toaster.error(error.error.message);});
    }


  

  /**
   * Trae el listado de funcionarios
   */
  public getAllData(){
    return this.httpClient.get(this.REST_API_SERVER+"/candidates/lCandidates");
  }


  
  /**
   * Inactivate Item 
   */
   public inactivateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/candidates/iCandidate",{"id": data});
  }

    
  /**
   * Activate Item 
   */
   public activateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/candidates/aCandidate",{"id": data});
  }


  /**
   * Trae el listado de funcionarios
   */
   public getDataById(data){
    return this.httpClient.get(this.REST_API_SERVER+"candidates/rCandidate/"+data);
  }


  
  /**
   * Trae el listado de funcionarios
   */
   public getDataByIdUser(){
    let user = this.storageService.getCurrentSession();

    return this.httpClient.get(this.REST_API_SERVER+"candidates/rCandidateByUser/"+user['id']);
  }


  public getCandidates(candidate){
      return this.httpClient.get(this.REST_API_SERVER+"candidates/lCategoriesFromCandidate/"+candidate);
  }

  
    


  


  

}
