import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
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
      <label>Yo you want desactivate the category:  <strong> {{name}} </strong></label>
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
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  rows = [];
  temp = [];
  hidePrice  = false;

  columns = [{ name : 'name',  label: 'Name' }];

  
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private __categoriesService: CategoriesService, public router: Router, public toaster: ToastrService, private modalService: NgbModal, ) {  
    this.getprofiles(data => {
      this.temp = [...data];  
      this.rows = data;
    });

    
  }

  getprofiles(dataComp){
    this.__categoriesService.getAllData().subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }

  editObject(e){
    this.router.navigate(['/categories/edit-category'], { queryParams: { id: e.id } });
  }

    
  openConfirmation(e){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = e.id;
    modalRef.componentInstance.name = e.name;
    modalRef.componentInstance.parent = this;
  }

  deleteProfile(e){
    this.__categoriesService.inactivateItem(e).subscribe(
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
    this.__categoriesService.activateItem(e).subscribe(
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
