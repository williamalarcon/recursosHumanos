import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeguidesService {
  
  private REST_API_SERVER = environment.urlApis+"/tipoguias";

  constructor(private httpClient: HttpClient, 
    public toaster: ToastrService, 
    public router: Router) { }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public sendCreateRequest(data){
    this.httpClient.post(this.REST_API_SERVER+"/cTipoGuia", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
          return this.router.navigateByUrl('/typeguide/typeguide-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public sendUpdateRequest(data){    
    this.httpClient.post(this.REST_API_SERVER+"/uTipoGuia",data).subscribe(
        data  => {
          this.toaster.success(data['message']);  
          return this.router.navigateByUrl('/typeguide/typeguide-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }

  

  /**
   * Trae el listado de funcionarios
   */
  public getListTipos(){
    return this.httpClient.get(this.REST_API_SERVER+"/lTiposGuia");
  }

  /**
   * Eliminar clasificacion
   */
  public sendDeleteRequest(id){
    return this.httpClient.put(this.REST_API_SERVER+"/dTipoGuia",{"id": id});
  }

  /**
   * Trae el listado de funcionarios
   */
  public sendGetInfoRequest(data){
    return this.httpClient.get(this.REST_API_SERVER+"/rTipoGuia/"+data);
  }

  

}
