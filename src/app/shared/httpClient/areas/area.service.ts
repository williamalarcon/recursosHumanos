import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private REST_API_SERVER = environment.urlApis+"/areas";

  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }


  /**
   * Trae todas las areas
   */
  public sentGetAllAreas(){
    return this.httpClient.get(this.REST_API_SERVER+"/lAreas");
  }


  
  /**
   * 
   * @param data Request para crear una area 
   */  
  public sendCreateRequest(data){
    this.httpClient.post(this.REST_API_SERVER+"/cArea", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
          return this.router.navigateByUrl('/area/area-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }


  
  /**
   * 
   * @param data Request para actualizar area
   */  
  public sendUpdateRequest(data){    
    this.httpClient.post(this.REST_API_SERVER+"/uArea",data).subscribe(
        data  => {
          this.toaster.success(data['message']);  
          return this.router.navigateByUrl('/area/area-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }



    /**
   * Eliminar area
   */
  public sendDeleteRequest(id){
    return this.httpClient.put(this.REST_API_SERVER+"/dArea",{"id": id});
  }

  /**
   * Trae el listado de areas
   */
  public sendGetInfoRequest(data){
    return this.httpClient.get(this.REST_API_SERVER+"/rArea/"+data);
  }



}
