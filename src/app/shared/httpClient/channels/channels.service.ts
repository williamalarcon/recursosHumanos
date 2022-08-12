import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private REST_API_SERVER = environment.urlApis+"/canales";

  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }

  /**
   * Trae listado de canales de peticion
   */
  public sentGetAllChannels(){
    return this.httpClient.get(this.REST_API_SERVER+"/lCanales");
  }

    
  /**
   * 
   * @param data Request para crear una nuevo canal  
   */  
  public sendCreateRequest(data){
    this.httpClient.post(this.REST_API_SERVER+"/cCanal", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
          return this.router.navigateByUrl('/channels/channel-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }


  
  /**
   * 
   * @param data Request para actualizar un canal 
   */  
  public sendUpdateRequest(data){    
    this.httpClient.post(this.REST_API_SERVER+"/uCanal",data).subscribe(
        data  => {
          this.toaster.success(data['message']);  
          return this.router.navigateByUrl('/channels/channel-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }



    /**
   * Http Request para eliminar un canal
   */
  public sendDeleteRequest(id){
    return this.httpClient.put(this.REST_API_SERVER+"/dCanal",{"id": id});
  }

  /**
   * Http Request para traer detalle de un canal
   */
  public sendGetInfoRequest(data){
    return this.httpClient.get(this.REST_API_SERVER+"/rCanal/"+data);
  }



}
