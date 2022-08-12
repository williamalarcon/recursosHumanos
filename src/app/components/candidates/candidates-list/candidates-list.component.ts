import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { SubjectsService } from '../../../shared/httpClient/subjects/subjects.service';
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
      <label>Desea inactivar el curso  <strong> {{nombre}} </strong></label>
      <br><br>
      <button class="btn btn-primary" type="submit"  (click)="delete(id, 0)" style="margin-right: 10px">Aceptar</button>  
      
      <button class="btn btn-danger" type="submit"   (click)="activeModal.dismiss('Cross click')">Cancelar</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() id;
  @Input() nombre;
  @Input() parent;
  constructor(public activeModal: NgbActiveModal) {}


  delete(e,i){
    console.log(e,i);
    this.parent.deleteSubject(e,i);
    
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

  columns = [{ label: 'Provider Company' , name: 'providerCompany' }, { label: 'ABN' , name: 'abn' }, { label: 'Address' , name: 'address' }, { label: 'Unit' , name: 'unit' }, { label: 'Active' , name: 'active' } ];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  constructor(private subjectsService: SubjectsService, 
              public toaster: ToastrService, 
              private modalService: NgbModal,
              public router: Router) {  
    this.hidePrice = true;
    this.getMaterias(data => {
      this.temp = [...data];  
      this.rows = data;
      console.log(this.rows);
    });

    console.log(this.rows);

    
  }

  getMaterias(dataComp){
    this.subjectsService.getListMaterias().subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }

  editProfile(e){
    this.router.navigate(['/subjects/edit-subject'], { queryParams: { id: e.id } });
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
    modalRef.componentInstance.nombre = e.nombre;
    modalRef.componentInstance.parent = this;
  }

  deleteSubject(id, update){
  
    this.subjectsService.sendDeleteRequest(id,update).subscribe(
      data  => {
          this.toaster.success(data['message']);
          this.modalService.dismissAll();
          this.getMaterias(data => {
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
