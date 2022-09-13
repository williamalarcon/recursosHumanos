import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
import { CandidatesService } from '../../../shared/httpClient/candidates.service';
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
  selector: 'app-candidates-list',
  templateUrl: './candidates-list.component.html',
  styleUrls: ['./candidates-list.component.scss']
})
export class CandidatesListComponent implements OnInit {

  rows = [];
  temp = [];
  hidePrice  = false;

  columns = [{ label: 'First Name' , name: 'firstName' }, { label: 'Last Name' , name: 'lastName' }, { label: 'Address' , name: 'address' }, { label: 'Unit' , name: 'unit' }, { label: 'Suburb' , name: 'suburb' }, { label: 'Email' , name: 'email' }];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private subjectsService: SubjectsService, 
              private __candidatesService: CandidatesService,
              public toaster: ToastrService, 
              private modalService: NgbModal,
              public router: Router) {  
    this.hidePrice = true;
    this.getData(data => {
      this.temp = [...data];  
      this.rows = data;
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

  viewSubject(e){
    this.router.navigate(['/subjects/view-subject'], { queryParams: { id: e.id } });
  }

  viewAlerts(e){
    this.router.navigate(['/subjects/view-alerts'], { queryParams: { id: e.id, name: e.nombre } });
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

  
  ngOnInit(): void {
  
  }


}
