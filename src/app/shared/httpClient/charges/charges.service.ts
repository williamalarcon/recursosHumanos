import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {

  private REST_API_SERVER = environment.urlApis+"/cargos";

  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }

  /**
   * Http Request para traer el listado de ciudades del sistema
   */
  public sentGetAllCharges(){
    return this.httpClient.get(this.REST_API_SERVER+"/lCargos");
  }

      
  /**
   * Http Request para agregar una nueva ciudad al sistema
   * @param data 
   */  
  public sendCreateRequest(data){
    this.httpClient.post(this.REST_API_SERVER+"/cCargo", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
          return this.router.navigateByUrl('/charges/charges-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }


  
  /**
   * Http Request para actualizar una ciudad
   * @param data 
   */  
  public sendUpdateRequest(data){    
    this.httpClient.post(this.REST_API_SERVER+"/uCargo",data).subscribe(
        data  => {
          this.toaster.success(data['message']);  
          return this.router.navigateByUrl('/charges/charges-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }



  /**
   * Http Request para eliminar una ciudad
   * @param id 
   */
  public sendDeleteRequest(id){
    return this.httpClient.put(this.REST_API_SERVER+"/dCargo",{"id": id});
  }

  /**
   * Http Request para traer detalle de una ciudad
   */
  public sendGetInfoRequest(data){
    return this.httpClient.get(this.REST_API_SERVER+"/rCargo/"+data);
  }



}
