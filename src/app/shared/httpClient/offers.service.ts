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
export class OffersService {
  
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

    this.httpClient.post(this.REST_API_SERVER+"offers/cOffer",data).subscribe(
      data  => {
        this.toaster.success(data['message']);
         return this.router.navigateByUrl('/offers/offers-list');
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
      data.userModified =  user['id'];
      this.httpClient.post(this.REST_API_SERVER+"/offers/uOffer", data).subscribe(
        data  => {
            this.toaster.success(data['message']);
            
            return this.router.navigateByUrl('/offers/offers-list');
           },
          error  => {this.toaster.error(error.error.message);});
    }




    public addNote(data){
      let user = this.storageService.getCurrentSession();
      data.userCrea =  user['id'];
      return this.httpClient.post(this.REST_API_SERVER+"/offers/addNote", data);
    }



    


       
    public applyOffer(idOffer){      
      let user = this.storageService.getCurrentSession();
      return this.httpClient.post(this.REST_API_SERVER+"/offers/applyOffer", {"offer" : idOffer, "candidate": user['id'] });
    }

  

  /**
   * Trae el listado de funcionarios
   */
  public getAllData(){
    return this.httpClient.get(this.REST_API_SERVER+"/offers/lOffers");
  }

  
     public getAllActive(){
      return this.httpClient.get(this.REST_API_SERVER+"/offers/lOffersActive");
    }


    /**
   * Trae el listado de funcionarios
   */
     public searchData(name, location){
      return this.httpClient.get(this.REST_API_SERVER+"/offers/lSearch",  { params: {"name": name, "location": location}});
    }


  
  /**
   * Inactivate Item 
   */
   public inactivateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/offers/iOffer",{"id": data});
  }

    
  /**
   * Activate Item 
   */
   public activateItem(data){
    return this.httpClient.put(this.REST_API_SERVER+"/offers/aOffer",{"id": data});
  }


  /**
   * Trae el listado de funcionarios
   */
   public getDataById(data){
    return this.httpClient.get(this.REST_API_SERVER+"offers/rOffer/"+data);
  }


    /**
   * Trae el listado de funcionarios
   */
     public getCandidatesByOffer(data){
      return this.httpClient.get(this.REST_API_SERVER+"offers/lCandidatesByOffer/"+ data);
    }

      /**
   * Trae el listado de funcionarios
   */
    public getStatus(){
      return this.httpClient.get(this.REST_API_SERVER+"offers/lStatus");
    } 


    public getNotes(id){
      return this.httpClient.get(this.REST_API_SERVER+"offers/getNotes/"+id);
    }
  
  


  


  

}
