import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ProfileService } from '../../../shared/httpClient/profile.service';
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
      <label>Yo you want desactivate the admin:  <strong> {{firstName}} </strong></label>
      <br><br>
      <button class="btn btn-primary" type="submit"  (click)="delete(id)" style="margin-right: 10px">Ok</button>  
      
      <button class="btn btn-danger" type="submit"   (click)="activeModal.dismiss('Cross click')">Cancel</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;
  @Input() firstName;
  @Input() parent;
  constructor(public activeModal: NgbActiveModal) {}


  delete(e){
    this.parent.deleteProfile(e);
    
  }
}


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  rows = [];
  temp = [];
  hidePrice  = false;

  columns = [{ name : 'firstName',  label: 'First Name' }, { name: 'lastName', label: 'Last Name' }, { label: 'Email', name: 'Email' }];

  
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private profileService: ProfileService, public router: Router, public toaster: ToastrService, private modalService: NgbModal, ) {  
    this.getprofiles(data => {
      this.temp = [...data];  
      this.rows = data;
    });

    
  }

  getprofiles(dataComp){
    this.profileService.getAllData().subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }

  editObject(e){
    this.router.navigate(['/admins/edit-admin'], { queryParams: { id: e.id } });
  }

    
  openConfirmation(e){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = e.id;
    modalRef.componentInstance.firstName = e.firstName;
    modalRef.componentInstance.parent = this;
  }

  deleteProfile(e){
    this.profileService.inactivateItem(e).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.modalService.dismissAll();
        this.getprofiles(data => {
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
    this.profileService.activateItem(e).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.modalService.dismissAll();
        this.getprofiles(data => {
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
