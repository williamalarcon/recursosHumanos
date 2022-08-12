import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  
  private REST_API_SERVER = environment.urlApis+"/";

  constructor(private httpClient: HttpClient, 
    public toaster: ToastrService, 
    public router: Router) { }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public sendCreateRequest(data){
    this.httpClient.post(this.REST_API_SERVER+"/materias/cMaterias", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
          return this.router.navigateByUrl('/subjects/subject-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public sendUpdateRequest(data){    
    this.httpClient.post(this.REST_API_SERVER+"/materias/uMaterias",data).subscribe(
        data  => {
          this.toaster.success(data['message']);  
          return this.router.navigateByUrl('/subjects/subject-list');
         },
        error  => {this.toaster.error(error.error.message);});
  }

  

  /**
   * Trae el listado de materias
   */
  public getListMaterias(){
    return this.httpClient.get(this.REST_API_SERVER+"/materias/lMaterias");
  }



   /**
   * Trae el listado de materias
   */
  public getEstadisticas(){
    return this.httpClient.get(this.REST_API_SERVER+"/materias/lGuiasEstadisticas");
  }

  /**
   * Eliminar Materia
   */
  public sendDeleteRequest(id, estado){
    console.log("estado", estado);
    return this.httpClient.put(this.REST_API_SERVER+"/materias/dMaterias",{"id": id, "estado": estado});
  }


  /**
   * HttpRequest para obtener las materias por area 
   * @param idArea 
   */
  public sendGetSubjectsByArea(idArea){
    return this.httpClient.get(this.REST_API_SERVER+"/materias/lMateriasByArea/"+idArea);
  }

  /**
   * Trae el listado de materias
   */
  public sendGetInfoRequest(data){
    return this.httpClient.get(this.REST_API_SERVER+"/materias/rMateria/"+data);
  }

  

}
