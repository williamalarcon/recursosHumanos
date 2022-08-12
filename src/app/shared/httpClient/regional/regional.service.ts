import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {

  private REST_API_SERVER = environment.urlApis+"/regionales";

  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }


  /**
   * Trae todas las regionales
   */
  public sendGetAllRegionales(){
    return this.httpClient.get(this.REST_API_SERVER+"/lRegionales");
  }

        
  /**
   * Http Request para agregar una nueva regional al sistema
   * @param data 
   */  
  public sendCreateRequest(data){
    this.httpClient.post(this.REST_API_SERVER+"/cRegional", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
          return this.router.navigateByUrl('/regional/regional-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }


  
  /**
   * Http Request para actualizar una regional
   * @param data 
   */  
  public sendUpdateRequest(data){    
    this.httpClient.post(this.REST_API_SERVER+"/uRegional",data).subscribe(
        data  => {
          this.toaster.success(data['message']);  
          return this.router.navigateByUrl('/regional/regional-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }



  /**
   * Http Request para eliminar una regional
   * @param id 
   */
  public sendDeleteRequest(id){
    return this.httpClient.put(this.REST_API_SERVER+"/dRegional",{"id": id});
  }

  /**
   * Http Request para traer detalle de una Regional
   */
  public sendGetInfoRequest(data){
    return this.httpClient.get(this.REST_API_SERVER+"/rRegional/"+data);
  }




}
