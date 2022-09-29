import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { OffersService } from '../../../shared/httpClient/offers.service';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { ToastrService } from 'ngx-toastr';



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
      <label>Yo you want un unpublish offer:  <strong> {{name}} </strong></label>
      <br><br>
      <button class="btn btn-primary" type="submit"  (click)="delete(id)" style="margin-right: 10px">Ok</button>  
      
      <button class="btn btn-danger" type="submit"   (click)="activeModal.dismiss('Cross click')">Cancel</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;
  @Input() name;
  @Input() parent;
  constructor(public activeModal: NgbActiveModal) {}


  delete(e){
    this.parent.deleteProfile(e);
    
  }
}


@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss']
})
export class OffersListComponent implements OnInit {

  rows = [];
  temp = [];
  hidePrice  = false;

  columns = [{ name : 'employer',  label: 'Employer' },{ name : 'jobTitle',  label: 'Job Title' },{ name : 'jobDescription',  label: 'Job Description' }];

  
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private __offersService: OffersService,
             public router: Router,
             public toaster: ToastrService,
             private modalService: NgbModal,
             ) {  
    this.getAllData(data => {
      this.temp = [...data];  
      this.rows = data;
    });
    
  }

  getAllData(dataComp){
    this.__offersService.getAllData().subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }

  editObject(e){
    this.router.navigate(['/offers/edit-offer'], { queryParams: { id: e.id } });
  }


  viewCandidates(row){
    this.router.navigate(['/offers/view-candidates'], { queryParams: { id: row.id } });
  }

    
  openConfirmation(e){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = e.id;
    modalRef.componentInstance.name = e.jobTitle;
    modalRef.componentInstance.parent = this;
  }

  deleteProfile(e){
    this.__offersService.inactivateItem(e).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.modalService.dismissAll();
        this.getAllData(data => {
          this.temp = [...data];  
          this.rows = data;
          this.table.offset = 0;
        });
         },
        error  => {this.toaster.error(error.error.message);});
  }


  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      return (d.usuario.toLowerCase().indexOf(val) !== -1 || d.cargo.toLowerCase().indexOf(val) !== -1 || d.nombre.toLowerCase().indexOf(val) !== -1 || !val);
    });
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  activateItem(e){
    this.__offersService.activateItem(e).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.getAllData(data => {
          this.temp = [...data];  
          this.rows = data;
          this.table.offset = 0;
        });
         },
        error  => {this.toaster.error(error.error.message);});
  }
  
  ngOnInit(): void {
  
  }


}
