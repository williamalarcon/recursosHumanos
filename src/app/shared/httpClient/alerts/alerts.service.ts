import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  
  private REST_API_SERVER = environment.urlApis+"/alertas";

  constructor(private httpClient: HttpClient, 
    public toaster: ToastrService, 
    public router: Router) { }

  /**
   * 
   * @param data Request para crear usuario encryptando la clave
   */  
  public sendCreateRequest(data, nombre){
    let name = nombre;
    let idMateria = data['idMateria'];
    this.httpClient.post(this.REST_API_SERVER+"/cAlerta", data).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/subjects/view-alerts'], { queryParams: { id: idMateria, name: name} });
         },
        error  => {this.toaster.error(error.error.message);});
  }



  

  /**
   * Trae el listado de alertas por materias
   */
  public getListAlerts(idMateria){
    return this.httpClient.get(this.REST_API_SERVER+"/lAlertas/"+idMateria);
  }

   /**
   * Trae el listado de materias
   */
  public getListAlertsToday(){
    return this.httpClient.get(this.REST_API_SERVER+"/lAlertasToday");
  }


  
  /**
   * Eliminar Alerta
   */
  public sendDeleteRequest(idMateria, idAlerta, nombre){
    let materia = idMateria, name = nombre;
    return this.httpClient.put(this.REST_API_SERVER+"/dAlerta",{"id": idAlerta}).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/subjects/view-alerts'], { queryParams: { id: materia , name: name} });
         },
        error  => {this.toaster.error(error.error.message);});
  }

  

}
