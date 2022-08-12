import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  
  private REST_API_SERVER = environment.urlApis+"/estadisticas";

  constructor(private httpClient: HttpClient, 
    public toaster: ToastrService, 
    public router: Router) { }

  /**
   * Tra info de la grafica 1
   * @param fechaD 
   * @param fechaH 
   */
  public getChart1Data(fechaD =null, fechaH = null){
    return this.httpClient.post(this.REST_API_SERVER+"/chart1", { fechaD: fechaD, fechaH: fechaH});
  }
  
  /**
   * Tra info de la grafica 1
   * @param fechaD 
   * @param fechaH 
   */
  public getChart2Data(fechaD =null, fechaH = null){
    return this.httpClient.post(this.REST_API_SERVER+"/chart2", { fechaD: fechaD, fechaH: fechaH});
  }

  /**
   * Tra info de la grafica 1
   * @param fechaD 
   * @param fechaH 
   */
  public getChart3Data(fechaD =null, fechaH = null){
    return this.httpClient.post(this.REST_API_SERVER+"/chart3", { fechaD: fechaD, fechaH: fechaH});
  }

}
