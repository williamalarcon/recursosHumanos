import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private REST_API_SERVER = environment.urlApis+"/solicitudes";


  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }



  /**
   * HttpRequest para crear la solicitud
   * @param files 
   */
  createSolicitud(files: FormData): Observable<HttpEvent<any>> {
    const request = new HttpRequest('POST', this.REST_API_SERVER+"/cSolicitudes", files);
    return this.httpClient.request(request);
  }

  /**
   * HttpRequest para listar todas las solicitudes
   */
  public getListSolicitudes(area =null,tipo = null, fdesde = null, fhasta =null, estado = null){
    return this.httpClient.post(this.REST_API_SERVER+"/lSolicitudes",{"area": area, "tipo": tipo,  "fdesde": fdesde, "fhasta": fhasta, "estado" : estado});
  }

 /**
   * HttpRequest para listar todas las solicitudes para exportar los datos
   */
  public getListSolicitudesExport(area =null,tipo = null, fdesde = null, fhasta =null, estado = null){
    return this.httpClient.post(this.REST_API_SERVER+"/lSolicitudesExport",{"area": area, "tipo": tipo,  "fdesde": fdesde, "fhasta": fhasta, "estado" : estado});
  }

  /**
   * HttpRequest Trae informacion detallada de una solicitud
   */
  public sendGetSolicitudById(id){
    return this.httpClient.get(this.REST_API_SERVER+"/rSolicitud/"+id);
  }

   /**
   * Trae estadisticas de las guias
   */
  public getEstadisticas(){
    return this.httpClient.get(this.REST_API_SERVER+"/lEstadisticas");
  }







}
