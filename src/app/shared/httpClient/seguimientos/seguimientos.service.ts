import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeguimientosService {
  
  private REST_API_SERVER = environment.urlApis+"/seguimientos";

  constructor(private httpClient: HttpClient, 
    public toaster: ToastrService, 
    public router: Router) { }


    /**
   * HttpRequest trae los estados de seguimiento
   */
  public getEstadosSeguimiento(tipo){
    return this.httpClient.get(this.REST_API_SERVER+"/lEstadosSeguimiento/"+tipo);
  }


   /**
   * HttpRequest crear un seguimiento
   */
  public createSeguimiento(data){
    let id = data['id'],
        tipo = data['tipo'];

    
    return this.httpClient.post(this.REST_API_SERVER+"/cSeguimiento", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          if(tipo == "S"){
            this.router.navigate(['/request/view-request'], { queryParams: { id: id } });
          }else if(tipo == "M"){
            this.router.navigate(['/subjects/view-subject'], { queryParams: { id: id } });
          }
          
         },
        error  => {this.toaster.error(error.error.message);});;
  }



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
   * Eliminar Materia
   */
  public sendDeleteRequest(id){
    
    return this.httpClient.put(this.REST_API_SERVER+"/materias/dMaterias",{"id": id});
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
