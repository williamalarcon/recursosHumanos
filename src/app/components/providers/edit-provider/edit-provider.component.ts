import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { ProviderService } from '../../../shared/httpClient/provider.service';
import { CompanyHeadquaterService } from '../../../shared/httpClient/companyHeadquater.service';
import { CompanyBranchesService } from '../../../shared/httpClient/companyBranches.service';
import { ConsultantsService } from '../../../shared/httpClient/consultants.service';
import { TitlesService } from '../../../shared/httpClient/titles.service';
import { ModalComponent } from '../../modal/modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss']
})
export class EditProviderComponent implements OnInit {
  public editProvider: FormGroup;
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
  sub;

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              public toaster: ToastrService,
              private modalService: NgbModal,
              private __providerService: ProviderService,
              private __titlesService: TitlesService,
              private __companyBranchesService: CompanyBranchesService,
              private __consultantsService: ConsultantsService,
              private __companyHeadquaterService: CompanyHeadquaterService
              
              
              ) {
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.providerId = params.id;
                  this.getInfoDetail(this.providerId);
                });
   }

  ngOnInit(): void {

    
    this.getTitles(data => {this.titles = data;});

    this.getHeadQuaters(data => {
      this.listHeadQuaters = [...data];  
    });

    this.getBranches(data => {
      this.listBranches = [...data];  
    });  

    this.getConsultants(data => {
      this.listConsultants = [...data];  
    });  

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
      phone: ['', [ Validators.required,Validators.maxLength(10), Validators.min(1)]],
      branch: ['', Validators.required]
    });


    this.editProvider = this.fb.group({
      id: ['',[Validators.required]],
      providerCompany: ['',[Validators.required]],
      abn: ['', [Validators.required]],
      address: ['', [Validators.required]],
      unit: ['', []],
      suburb: ['', [Validators.required]],
      state: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      providerRegion: ['', [Validators.required]],
      providerSite: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })

  }

  getInfoDetail(id){
    
    this.__providerService.getDataById(id).subscribe(
      data  => {
        this.editProvider.controls['id'].setValue(data['id']);
        this.editProvider.controls['providerCompany'].setValue(data['providerCompany']);
        this.editProvider.controls['abn'].setValue(data['abn']);
        this.editProvider.controls['address'].setValue(data['address']);
        this.editProvider.controls['unit'].setValue(data['unit']);
        this.editProvider.controls['suburb'].setValue(data['suburb']);
        this.editProvider.controls['state'].setValue(data['state']);
        this.editProvider.controls['postcode'].setValue(data['postcode']);
        this.editProvider.controls['providerRegion'].setValue(data['providerRegion']);
        this.editProvider.controls['providerSite'].setValue(data['providerSite']);
        this.editProvider.controls['phone'].setValue(data['phone']);
        this.editProvider.controls['email'].setValue(data['email']);
         },
          error  => {this.toaster.error(error.error.message);}
        )
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

  

  updateProvider(data, tabSet){
    this.submitted = true;
    if (this.editProvider.invalid) {
      return;
    }

    this.__providerService.updateObject(data).subscribe(
      data  => {
        this.toaster.success(data['message']);
         },
        error  => {
          this.toaster.error(error.error.message);});

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

  refreshHeadQuaters(){
    this.getHeadQuaters(data => {
      this.listHeadQuaters = [...data];  
    });
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

  get f() { return this.editProvider.controls; }

}
