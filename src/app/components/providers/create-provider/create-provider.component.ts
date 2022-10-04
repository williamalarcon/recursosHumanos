import { expressionType, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { __asyncDelegator } from 'tslib';
import { ProviderService } from '../../../shared/httpClient/provider.service';
import { CompanyHeadquaterService } from '../../../shared/httpClient/companyHeadquater.service';
import { CompanyBranchesService } from '../../../shared/httpClient/companyBranches.service';
import { ConsultantsService } from '../../../shared/httpClient/consultants.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';
import { ModalComponent } from '../../modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { AlertsService } from 'src/app/shared/httpClient/alerts/alerts.service';


@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.component.html',
  styleUrls: ['./create-provider.component.scss']
})
export class CreateProviderComponent implements OnInit {
  public createSubject: FormGroup;
  public createHeadquater: FormGroup;
  public createBranch: FormGroup;
  public createconsultant: FormGroup;
  public headquaters: FormGroup;
  private pages: string[] = ["tab-selectbyid1", "tab-selectbyid2", "tab-selectbyid3"];
  titles = [];
  public listHeadQuaters;
  public listBranches;
  public listConsultants;
  public providerId = null;
  submitted = false;
  submittedHeadquater = false;
  submittedBranch = false;
  submittedConsultant = false;

  constructor(private fb: FormBuilder, 
              public toaster: ToastrService, 
              private modalService: NgbModal,
              private __providerService: ProviderService,
              private __titlesService: TitlesService,
              private __companyBranchesService: CompanyBranchesService,
              private __consultantsService: ConsultantsService,
              private __companyHeadquaterService: CompanyHeadquaterService) { 

  }

  ngOnInit(): void {

    this.getTitles(data => {this.titles = data;});

    this.headquaters = this.fb.group({
      adittionalItems: this.fb.array([
        this.fb.group({
         name: [""]
       })
     ])
    });


    this.createHeadquater = this.fb.group({
      name: ['', Validators.required]
    });

    this.createBranch = this.fb.group({
      name: ['', Validators.required],
      headQuater: ['', Validators.required]
    });


    this.createconsultant = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [ Validators.required, Validators.maxLength(10)]],
      branch: ['', Validators.required]
    });


    this.createSubject = this.fb.group({
      providerCompany: ['',[Validators.required]],
      abn: ['', [Validators.required]],
      address: ['', [Validators.required]],
      unit: ['', []],
      suburb: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required,Validators.maxLength(4)],],
      providerRegion: ['', [Validators.required]],
      providerSite: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }


  addConsultant(data){;
    this.submittedConsultant = true;
    if (this.createconsultant.invalid) {
      return;
    }

    this.__consultantsService.createObject(data).subscribe(
      data  => {
          this.getConsultants(data => {
            this.listConsultants = [...data];  
          });  
          this.createconsultant.controls['firstName'].setValue("");
          this.createconsultant.controls['lastName'].setValue("");
          this.createconsultant.controls['title'].setValue("");
          this.createconsultant.controls['email'].setValue("");
          this.createconsultant.controls['phone'].setValue("");
          this.createconsultant.controls['branch'].setValue("");
          this.submittedConsultant = false;
          this.toaster.success(data['message']);
         },
        error  => {
          this.toaster.error(error.error.message);
        });
  
  }

  addHeadQuater(data){;
    this.submittedHeadquater = true;
    if (this.createHeadquater.invalid) {
      return;
    }
    data.providerId = this.providerId;
    this.__companyHeadquaterService.createObject(data).subscribe(
      data  => {
          this.listHeadQuaters = [];
          this.getHeadQuaters(data => {
            this.listHeadQuaters = [...data];  
          }); 
          this.createHeadquater.controls['name'].setValue("");
          this.submittedHeadquater = false;
          this.toaster.success(data['message']);
         },
        error  => {
          this.toaster.error(error.error.message);
        });
  }

  addBranch(data){;
    this.submittedBranch = true;
    if (this.createBranch.invalid) {
      return;
    }
    this.__companyBranchesService.createObject(data).subscribe(
      data  => { 
          this.createBranch.controls['name'].setValue("");
          this.createBranch.controls['headQuater'].setValue("");
          this.getBranches(data => {
            this.listBranches = [...data];  
          });  
          this.submittedBranch = false;
          this.toaster.success(data['message']);
         },
        error  => {
          this.toaster.error(error.error.message);
        });    
  }

  editItem(id){
    console.log(this.listHeadQuaters);
  }

  activateHeadquater(id){
    this.__companyHeadquaterService.activateItem(id).subscribe(result => {
      this.toaster.success(result['message']);
      this.getHeadQuaters(data => {
        this.listHeadQuaters = [...data];  
      });        
    })
  }

  inactiveHeadquater(id){
    this.__companyHeadquaterService.inactivateItem(id).subscribe(result => {
      this.toaster.success(result['message']);
      this.getHeadQuaters(data => {
        this.listHeadQuaters = [...data];  
      });        
    })
  }


  activateBranch(id){
    this.__companyBranchesService.activateItem(id).subscribe(result => {
      this.toaster.success(result['message']);
      this.getBranches(data => { this.listBranches = [...data];  });  
      
    })
  }

  inactiveBranch(id){
    this.__companyBranchesService.inactivateItem(id).subscribe(result => {
      this.toaster.success(result['message']);
      this.getBranches(data => {this.listBranches = [...data];  });  
    })
  }

  activateConsultant(id){
    this.__consultantsService.activateItem(id).subscribe(result => {
      this.toaster.success(result['message']);
      this.getConsultants(data => {this.listConsultants = [...data];  });  
      
    })
  }

  inactiveConsultant(id){
    this.__consultantsService.inactivateItem(id).subscribe(result => {
      this.toaster.success(result['message']);
      this.getConsultants(data => {this.listConsultants = [...data];  });  
    })
  }


  changeTabset(event){
    
  }

  
  getTitles(dataComp){
    this.__titlesService.getAllData().subscribe(data  => {  dataComp(data);});   
  }

  getBranches(dataComp){
    this.__companyBranchesService.getAllData(this.providerId).subscribe(results => {
      dataComp(results);
      this.listBranches.sort(function(obj1, obj2) {
        return obj2.f - obj1.f;
      });

    })
  }


  getConsultants(dataComp){
    this.__consultantsService.getAllData(this.providerId).subscribe(results => {
      dataComp(results);
      this.listBranches.sort(function(obj1, obj2) {
        return obj2.f - obj1.f;
      });

    })
  }

  

  getHeadQuaters(dataComp){
    this.__companyHeadquaterService.getAllData(this.providerId).subscribe(results => {
      dataComp(results);
      this.listHeadQuaters.sort(function(obj1, obj2) {
        return obj2.f - obj1.f;
      });

    })
  }


  cSubject(data, tabSet){
    this.submitted = true;
    if (this.createSubject.invalid) {
      this.getFormValidationErrors();
      return;
    }
    var that = this;
    console.log(this.providerId);
    if(this.providerId == null){
      this.__providerService.sendCreateRequest(data).subscribe(
        data  => {
          this.providerId = data['id'];
          
          tabSet.activeId = that.pages[1];
          tabSet.select(that.pages[1]);
          
          this.toaster.success(data['message']);
          },
          error  => {
            this.toaster.error(error.error.message);});
    }else{
      tabSet.activeId = that.pages[1];
      tabSet.select(that.pages[1]);
    }

  }


  getFormValidationErrors() {
    Object.keys(this.createSubject.controls).forEach(key => {
    const controlErrors: ValidationErrors = this.createSubject.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }

    /**
   * Create form unit
   */
 private getadittionalItems() {
  return this.fb.group({
    name: ["", Validators.required],
  });
}


  /**
 * Add new unit row into form
 */
addUnit() {
  const control = <FormArray>this.headquaters.controls["adittionalItems"];
  control.push(this.getadittionalItems());
  if(control.controls.length ==2 ){
    control.controls[0]['controls'].name.setValidators([Validators.required]);
    control.controls[0]['controls'].name.updateValueAndValidity();
  }
}


  /**
   * Remove unit row from form on click delete button
   */
   removeUnit(i: number) {
    const control = <FormArray>this.headquaters.controls["adittionalItems"];
    control.removeAt(i);
    if(control.controls.length == 1){
      control.controls[0]['controls'].name.clearValidators();
      control.controls[0]['controls'].name.updateValueAndValidity();
    }
  }

  editBranch(data){
    data.provider = this.providerId;
    const dialogRef = this.modalService.open(ModalComponent, { })
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.title = "Edit Company Branch";
    dialogRef.componentInstance.option = 2;
    dialogRef.componentInstance.action.subscribe((action) => {
      this.getBranches(data => {
        this.listBranches = [...data];  
      });
    });
  }

  editConsultant(data){
    data.provider = this.providerId;
    const dialogRef = this.modalService.open(ModalComponent, { })
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.title = "Edit Consultant";
    dialogRef.componentInstance.option = 3;
    dialogRef.componentInstance.action.subscribe((action) => {
      this.getConsultants(data => {
        this.listConsultants = [...data];  
      });  
    });
  }


  editHeadquater(data){
    const dialogRef = this.modalService.open(ModalComponent, { })
    dialogRef.componentInstance.data = data;
    dialogRef.componentInstance.title = "Edit Company Headquater";
    dialogRef.componentInstance.option = 1;
    dialogRef.componentInstance.action.subscribe((action) => {
      this.getHeadQuaters(data => {
        this.listHeadQuaters = [...data];  
      });
    });
  }

  get fconsultant() { return this.createconsultant.controls; }

  get fbranch() { return this.createBranch.controls; }

  get fh() { return this.createHeadquater.controls; }

  get f() { return this.createSubject.controls; }
}
