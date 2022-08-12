import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitlesService {

  private REST_API_SERVER = environment.urlApis+"/titles";

  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }

  /**
   * Http obtiene la data 
   */
  public getAllData(){
    return this.httpClient.get(this.REST_API_SERVER+"/lTitles");
  }



}
