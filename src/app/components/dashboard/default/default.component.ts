import { NgbDateStruct, NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as chartData from './../../../shared/data/dashboard/default';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { StorageService } from '../../../shared/services/storage.service';
import { CandidatesService } from '../../../shared/httpClient/candidates.service';
import { OffersService } from '../../../shared/httpClient/offers.service';
import { DataService } from '../../../shared/httpClient/data.service';
import { Data, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {
  ChartComponent
} from "ng-apexcharts";

declare let require: any;
@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4>Confirmation</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="text-align: center">
    <label>Do Yo you want desactivate the User:  <strong> {{firstName}} </strong></label>
      <br><br>
      <button class="btn btn-primary" type="submit"  (click)="delete(id, 0)" style="margin-right: 10px">Accept</button>  
      
      <button class="btn btn-danger" type="submit"   (click)="activeModal.dismiss('Cross click')">Cancel</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;
  @Input() firstName;
  @Input() parent;
  constructor(public activeModal: NgbActiveModal) {}


  delete(e,i){
    this.parent.inactivateItem(e,i);
    
  }
}



@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {

  public totalData: any = [ {"totals":{"Application":"0","Pre-Screen":"0","Filtering":"0","Phone Interview":"0","Internal Interview":"0","Employer Interview":"0","Pending Ticket or License":"0","Offer":"0","Noi Suitable":"0","Placement":"0"},"offers":{"active":"0","total":"0"}}];
  public role =  "";

  // Chart Data
  public chart1 = chartData.chartBox1;
  public chart2 = chartData.chartBox2;
  public chart3 = chartData.chartBox3;
  public mapChart = chartData.mapChart.options;
  public smallChart = chartData.smallChart;

  estadisticasGuias = {creadas: "", actualizadas: "", guiasCreadas: []};
  estadisticasSolicitudes = {};
  categoriasSolicitudes;

  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  month: String;

  totalGuias = 1;
  rows = [];
  temp = [];

  rows1 = [];
  temp1 = [];


  actualizaciones = 0;
  capacitaciones = 0;
  inquietudes = 0;


  @ViewChild("chart") chart: ChartComponent;

  @ViewChild('actual', { static: false }) public divActual: ElementRef;
  @ViewChild('capac', { static: false }) public divCapaci: ElementRef;
  @ViewChild('inqu', { static: false }) public divInquie: ElementRef;
  
  


  public exportForm1: FormGroup;
  public exportForm2: FormGroup;
  public exportForm3: FormGroup;
  model1D     : NgbDateStruct;
  model1H     : NgbDateStruct;
  model2D     : NgbDateStruct;
  model2H     : NgbDateStruct;
  model3D     : NgbDateStruct;
  model3H     : NgbDateStruct;

  columns = [{ label: 'First Name' , name: 'firstName' }, { label: 'Last Name' , name: 'lastName' }, { label: 'Address' , name: 'address' }, { label: 'Unit' , name: 'unit' }, { label: 'Suburb' , name: 'suburb' }, { label: 'Email' , name: 'email' }];
  
  columns2 = [{ name : 'employer',  label: 'Employer' },{ name : 'jobTitle',  label: 'Job Title' },{ name : 'jobDescription',  label: 'Job Description' }];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor( public subjectsService: SubjectsService,
               private __dataService: DataService,
               public toaster: ToastrService, 
               private __offersService: OffersService,
               private storageService: StorageService,
               private modalService: NgbModal,
               private __candidatesService: CandidatesService,
               private fb: FormBuilder, 
               public router: Router, ) {   
                
    let user = this.storageService.getCurrentSession();
    this.role =  user['role'];
    this.getTotals();
  }

  ngOnInit(): void {

    this.getData(data => {
      this.temp = [...data];  
      this.rows = data;
    });


    this.getAllOffers(data => {
      this.temp1 = [...data];  
      this.rows1 = data;
    });

    this.exportForm1 = this.fb.group({
      fDesde: [''],
      fHasta: [''],
    });
    this.exportForm2 = this.fb.group({
      fDesde: [''],
      fHasta: [''],
    });
    this.exportForm3 = this.fb.group({
      fDesde: [''],
      fHasta: [''],
    });
  }


  getData(dataComp){
    this.__candidatesService.getAllData().subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }


  editProfile(e){
    this.router.navigate(['/candidates/edit-candidate'], { queryParams: { id: e.id } });
  }



  getTotals(){
    this.__dataService.getTotals().subscribe(result => {
        this.totalData = result;
      }
       );   
  }

  
  openConfirmation(e){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = e.id;
    modalRef.componentInstance.firstName = e.firstName + " " +  e.lastName;
    modalRef.componentInstance.parent = this;
  }

  inactivateItem(e){
    this.__candidatesService.inactivateItem(e).subscribe(
      data  => {
        this.getData(data => {
          this.temp = [...data];  
          this.rows = data;
        });
        this.modalService.dismissAll();
        this.toaster.success(data['message']);
         },
        error  => {this.toaster.error(error.error.message);});
  }

  getAllOffers(dataComp){
    this.__offersService.getAllActive().subscribe(
      data  => {
          dataComp(data);
        }
      );   
  }
  
  
  activateItem(e){
    this.__candidatesService.activateItem(e).subscribe(
      data  => {
        this.getData(data => {
          this.temp = [...data];  
          this.rows = data;
        });
        this.toaster.success(data['message']);
         },
        error  => {this.toaster.error(error.error.message);});
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      if(d.descripcion == null){
        d.descripcion = '';
      }
      return (d.firstName.toLowerCase().indexOf(val) !== -1 ||
       d.lastName.toLowerCase().indexOf(val) !== -1 ||
       d.address.toLowerCase().indexOf(val) !== -1 ||
       d.email.toLowerCase().indexOf(val) !== -1 ||
       !val);
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }


}
