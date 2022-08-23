import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { ProviderService } from '../../../shared/httpClient/provider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4>Confirmación</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="text-align: center">
      <label>Do Yo you want desactivate the Provider  <strong> {{name}} </strong></label>
      <br><br>
      <button class="btn btn-primary" type="submit"  (click)="delete(id, 0)" style="margin-right: 10px">Aceptar</button>  
      
      <button class="btn btn-danger" type="submit"   (click)="activeModal.dismiss('Cross click')">Cancelar</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;
  @Input() name;
  @Input() parent;
  constructor(public activeModal: NgbActiveModal) {}


  delete(e,i){
    this.parent.deleteSubject(e,i);
    
  }
}


@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.scss']
})
export class ProvidersListComponent implements OnInit {

  rows = [];
  temp = [];
  hidePrice  = false;

  columns = [{ label: 'Provider Company' , name: 'providerCompany' }, { label: 'ABN' , name: 'abn' }, { label: 'Address' , name: 'address' }, { label: 'Unit' , name: 'unit' }, { label: 'Suburb' , name: 'suburb' }, { label: 'Email' , name: 'email' }, { label: 'PostCode' , name: 'postcode' } ];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private __providerService: ProviderService, 
              public toaster: ToastrService, 
              private modalService: NgbModal,
              public router: Router) {  
    this.hidePrice = true;
    this.getMaterias(data => {
      this.temp = [...data];  
      this.rows = data;
    });
    
  }

  getMaterias(dataComp){
    this.__providerService.getAllData().subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }

  editProvider(e){
    this.router.navigate(['/providers/edit-provider'], { queryParams: { id: e.id } });
  }



  openConfirmation(e){
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.id = e.id;
    modalRef.componentInstance.name = e.providerCompany;
    modalRef.componentInstance.parent = this;
  }

  deleteSubject(id, update){
    this.__providerService.inactivateItem(id).subscribe(
      data  => {
          this.toaster.success(data['message']);
          this.modalService.dismissAll();
          this.getMaterias(data => {
            this.temp = [...data];  
            this.rows = data;
          });
         },
        error  => {this.toaster.error(error.error.message);});
  }

  activateItem(e){
    this.__providerService.activateItem(e).subscribe(
      data  => {
        this.toaster.success(data['message']);
        this.modalService.dismissAll();
        this.getMaterias(data => {
          this.temp = [...data];  
          this.rows = data;
        });
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
      return (d.nombre.toLowerCase().indexOf(val) !== -1 ||
       d.descripcion.toLowerCase().indexOf(val) !== -1 ||
       d.area.toLowerCase().indexOf(val) !== -1 ||
       d.clasificacion.toLowerCase().indexOf(val) !== -1 ||
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
