import { Component, OnInit, ViewChild ,Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CompanyHeadquaterService } from '../../shared/httpClient/companyHeadquater.service';
import { CompanyBranchesService } from '../../shared/httpClient/companyBranches.service';
import { ConsultantsService } from '../../shared/httpClient/consultants.service';
import { TitlesService } from '../../shared/httpClient/titles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() data;
  @Input() title;
  @Input() option;
  @Output() action: EventEmitter<any> = new EventEmitter();
  public editHeadquater: FormGroup;
  public editBranch: FormGroup;
  public editConsultant: FormGroup;
  public listBranches;
  public listHeadQuaters;
  public titles;
  submittedHeadquater = false;
  submittedBranch = false;
  submittedConsultant = false;

  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              public toaster: ToastrService, 
              private __titlesService: TitlesService,
              private __companyBranchesService: CompanyBranchesService,
              private __consultantsService: ConsultantsService,
              private __companyHeadquaterService: CompanyHeadquaterService ) { }

  ngOnInit() {
    this.editHeadquater = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required]
    });

    this.editBranch = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      headquater: ['', Validators.required],
    });

    this.editConsultant = this.fb.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [ Validators.required, Validators.min(1)]],
      branch: ['', Validators.required]
    });


    if(this.option == 1){
      this.editHeadquater.controls['name'].setValue(this.data.name);
      this.editHeadquater.controls['id'].setValue(this.data.id);
    }else if(this.option == 2){
      this.getBranch(this.data.id);
      this.getHeadQuaters(data => {
        this.listHeadQuaters = [...data];  
      });
       
    }else if(this.option == 3){
      this.getConsultant(this.data.id);

      this.getBranches(data => {
        this.listBranches = [...data];  
      });
      this.getTitles(data => {this.titles = data;});
    }

  
  }


  getBranch(id){
    this.__companyBranchesService.getDataById(id).subscribe(results => {
      this.editBranch.controls['name'].setValue(results['name']);
      this.editBranch.controls['headquater'].setValue(results['id_headquater']);
      this.editBranch.controls['id'].setValue(id);
    })
  }

  
  getBranches(dataComp){
    this.__companyBranchesService.getAllData(this.data.provider).subscribe(results => {
      dataComp(results);
      this.listBranches.sort(function(obj1, obj2) {
        return obj2.f - obj1.f;
      });

    })
  }

  getTitles(dataComp){
    this.__titlesService.getAllData().subscribe(data  => {  dataComp(data);});   
  }
  
  getConsultant(id){
    this.__consultantsService.getDataById(id).subscribe(results => {
      this.editConsultant.controls['id'].setValue(results['id']);
      this.editConsultant.controls['firstName'].setValue(results['first_name']);
      this.editConsultant.controls['lastName'].setValue(results['last_name']);
      this.editConsultant.controls['title'].setValue(results['title']);
      this.editConsultant.controls['email'].setValue(results['email']);
      this.editConsultant.controls['phone'].setValue(results['phone']);
      this.editConsultant.controls['branch'].setValue(results['branch']);
    })
  }


  getHeadQuaters(dataComp){
    this.__companyHeadquaterService.getAllData(this.data.provider).subscribe(results => {
      dataComp(results);
      this.listHeadQuaters.sort(function(obj1, obj2) {
        return obj2.f - obj1.f;
      });

    })
  }



  get fh() { return this.editHeadquater.controls; }

  get fbr() { return this.editBranch.controls; }

  get fc() { return this.editConsultant.controls; }

  updateInfo(){
    
    if(this.option == 1 ){
      this.submittedHeadquater = true;
      if (this.editHeadquater.invalid) {
        return;
      }
      this.__companyHeadquaterService.updateObject(this.editHeadquater.value).subscribe(
        data  => {
          this.close();
          
          this.action.emit("updated")
          this.toaster.success(data['message']);
           },
          error  => {
            this.toaster.error(error.error.message);});
    }else if(this.option == 2 ){
      this.submittedBranch = true;
      if (this.editBranch.invalid) {
        return;
      }
      this.__companyBranchesService.updateObject(this.editBranch.value).subscribe(
        data  => {
          this.close();
          this.action.emit("updated")
          this.toaster.success(data['message']);
           },
          error  => {
            this.toaster.error(error.error.message);});
    }else if(this.option == 3){
      this.submittedConsultant = true;
      if (this.editConsultant.invalid) {
        return;
      }
      this.__consultantsService.updateObject(this.editConsultant.value).subscribe(
        data  => {
          this.close();
          this.action.emit("updated")
          this.toaster.success(data['message']);
           },
          error  => {
            this.toaster.error(error.error.message);});
    }
  }

  close(){
    this.modalService.dismissAll();
  }

}
