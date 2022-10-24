import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from '../../../shared/services/excelService/excel.service';
import { DataService } from '../../../shared/httpClient/data.service';
import { StorageService } from '../../../shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { IfStmt, THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {

  
  typeReports = [{ value: '', label: 'Seleccione' },
                { value: 'Clientes', label: 'Clientes' },
                { value: 'Proveedores', label: 'Proveedores' },
                { value: 'Pedidos', label: 'Pedidos' },
               ];
               object = [];
  public submitted: Boolean = false;
  public createForm: FormGroup;
  public modelD     : NgbDateStruct;
  public modelH     : NgbDateStruct;
  public from: Date;
  public to: Date;
  public hideSpinner:Boolean = true;
  minDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };

  maxDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  };






  constructor(private fb: FormBuilder, 
              public toaster: ToastrService, 
              public router: Router,
              private storageService: StorageService,
              private __dataService: DataService,
              private __excelService: ExcelService) {  
    //Se crea el form
    this.createForm = this.fb.group({
      desde: ['', [Validators.required]],
      hasta: ['', [Validators.required]],
    });
  }



  ngOnInit() {


  }

  generateReport(data){
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    let user = this.storageService.getCurrentSession();
    if(user['role'] == 'ADMIN' || user['role'] == 'AGENCY' ){
      this.exportClientesReport(data.desde, data.hasta, user['role'], user['id']);
    }else if(user['role'] == 'PROVIDER'){
      this.exportClientesReportProvider(data.desde, data.hasta, user['role'], user['id']);
    }else if(user['role'] == 'CANDIDATE'){
      this.exportClientesReportCandidate(data.desde, data.hasta, user['role'], user['id']);
    }
  }

  exportClientesReport(from, to, role, idUser){
    this.hideSpinner = false;
    this.__dataService.getAllData(from, to, role, idUser).subscribe(result => {
    Object.keys(result).forEach(function (key){
      result[key].publish =  result[key].publish == 1 ? 'Active': 'Inactive'; 
    });
    let objectTemp = result;
      var Heading = [
        ["Agency Staff Division",	"Agency Staff First Name","Agency Staff Last Name","Agency Staff Title","Job Adder ID","Job Vacancy","Provider Company","Provider Region","Provider Site Location","Provider Consultant First Name","Provider Consultant Last Name"," Consultant Title","Candidate First Name","Candidate Last Name","Candidate Profile","Job Category","Employer","Job Title","Job Location","Job Type","Job Status","Interview Attendance"],
      ];
      this.hideSpinner = true;
      this.__excelService.exportAsExcelFile(objectTemp, "export", Heading);
    }, error => {
      this.hideSpinner = true;
      this.toaster.info("No data");
    });
  }

  
  exportClientesReportProvider(from, to, role, idUser){
    this.hideSpinner = false;
    this.__dataService.getAllData(from, to, role, idUser).subscribe(result => {
    Object.keys(result).forEach(function (key){
      result[key].publish =  result[key].publish == 1 ? 'Active': 'Inactive'; 
    });
    let objectTemp = result;
      var Heading = [
        ["Provider Region","Provider Site Location","Provider Consultant First Name","Provider Consultant Last Name"," Consultant Title","Candidate First Name","Candidate Last Name","Candidate Profile","Job Category","Employer","Job Title","Job Location","Job Type","Job Status","Interview Attendance"],
      ];
      this.hideSpinner = true;
      this.__excelService.exportAsExcelFile(objectTemp, "export", Heading);
    }, error => {
      this.hideSpinner = true;
      this.toaster.info("No data");
    });
  }


  
  exportClientesReportCandidate(from, to, role, idUser){
    this.hideSpinner = false;
    this.__dataService.getAllData(from, to, role, idUser).subscribe(result => {
    Object.keys(result).forEach(function (key){
      result[key].publish =  result[key].publish == 1 ? 'Active': 'Inactive'; 
    });
    let objectTemp = result;
      var Heading = [
        ["Candidate First Name","Candidate Last Name","Candidate Profile","Job Category","Employer","Job Title","Job Location","Job Type","Job Status","Interview Attendance"],
      ];
      this.hideSpinner = true;
      this.__excelService.exportAsExcelFile(objectTemp, "export", Heading);
    }, error => {
      this.hideSpinner = true;
      this.toaster.info("No data");
    });

  }


  /**
   * Evento para capturar la fecha desde
   * @param e 
   */
  changeDesde(e){
    this.minDate = e;
  }

  /**
   * Evento para capturar la fecha hasta
   * @param e 
   */
  changeHasta(e){
    this.maxDate = e;
  }




  get f() { return this.createForm.controls; }


}
