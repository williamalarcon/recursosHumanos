import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private REST_API_SERVER = environment.urlApis+"/temas";

  constructor(private httpClient: HttpClient, 
              public toaster: ToastrService, 
              public router: Router) { }

  /**
   * Trae todas los temas
   */
  public sendGetAllThemes(){
    return this.httpClient.get(this.REST_API_SERVER+"/lTemas");
  }

}
