import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDB } from '../../../shared/data/job-search/job-search';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { OffersService } from '../../../shared/httpClient/offers.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4>Thank You</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style="text-align: center">
      <label>Thank you for applying to the Gapsonline job offer</label>
      <br><br>
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
  selector: 'app-job-desc',
  templateUrl: './job-desc.component.html',
  styleUrls: ['./job-desc.component.scss']
})
export class JobDescComponent implements OnInit {

  private id;
  public jobs: any
  public arr: any

  constructor(private route: ActivatedRoute, private router: Router,private __offersService: OffersService, public toaster: ToastrService, private modalService: NgbModal) {
    this.jobs = JobDB.Job_Category;
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      
      /*this.jobs.filter((items) => {
        if (items.Id === id) {
          this.arr = items;
        }
      })*/
      this.getDataById(this.id);
    })
  }


  getDataById(id){
    this.__offersService.getDataById(id).subscribe(
      data  => {
        this.jobs = data;
         },
          error  => {this.toaster.error(error.error.message);}
        );
  }


  applyClick() {
    console.log(this.id);
    this.__offersService.applyOffer(this.id).subscribe(
      data  => {
        const modalRef = this.modalService.open(NgbdModalContent);
          },
        error  => {this.toaster.error(error.error.message);});
  
    
    
  }

  ngOnInit() { }

}
