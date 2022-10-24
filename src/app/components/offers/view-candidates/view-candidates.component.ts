import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { OffersService } from '../../../shared/httpClient/offers.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { CandidatesService } from '../../../shared/httpClient/candidates.service';
import { NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.scss']
})
export class ViewCandidatesComponent implements OnInit {
  public model1: NgbDateStruct;
  public model2: NgbDateStruct;
  public myProfile: FormGroup;
  public addNote: FormGroup;
  public editProfile: FormGroup;
  public totalCandidates = 0;
  public candidates;
  public notes ;
  public candidateInfo;
  public idCandidate = null;
  private offerCandidate = null;
  public statusCandidate;
  public visibleCV = null;
  public visiblePT = null;
  public status;
  public idOffer = null;


  sub;
  submitted = false;


  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              public toaster: ToastrService,
              private __candidatesService: CandidatesService,
              private __offerService: OffersService,
              private __categoriesService: CategoriesService) {
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.idOffer = params.id;
                  this.getInfoDetail(params.id);
                });
   }

  ngOnInit(): void {
    this.addNote = this.fb.group({
      status: ['', Validators.required],
      nota: ['', Validators.required],
      date1: ['', ],
      date2: ['', ],
      time: ['', ],
      name: ['', ],
      address: ['', ],
      license: ['', ],
    });


    this.editProfile = this.fb.group({
      id: [''],
      jobCategory: ['', [Validators.required]],
      employer: ['', []],
      jobTitle: ['', [Validators.required]],
      jobLocation: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      jobPaying: ['', [Validators.required]],
      jobTime: ['', [Validators.required]],
      JobAdderLink: ['', []],
      jobVacancy: ['', []],
      jobDescription: ['', [Validators.required]],
      skills: ['', []],
      about: ['', []],
      questions: ['', []],
      publish: ['', [Validators.required]]
    });
  }



  getInfoDetail(id){
    this.candidates = [];

    this.__offerService.getCandidatesByOffer(id).subscribe(
      data  => {
        this.candidates = data;
        this.totalCandidates = this.candidates.length;
         },
          error  => {}
        );
  }

  getStatus(){
    this.__offerService.getStatus().subscribe(
      data  => {
        this.status = data;
         },
          error  => {}
        );
  }

  addStatus(data){
    data.idOfferCandidate = this.offerCandidate;
    this.statusCandidate = data.status;
    this.__offerService.addNote(data).subscribe(
      data  => {
          this.getInfoDetail(this.idOffer);
          this.toaster.success(data['message']);
          this.getNotes(this.offerCandidate);
          this.addNote.controls['status'].setValue("");
          this.addNote.controls['nota'].setValue("");
          this.addNote.controls['date1'].setValue("");
          this.addNote.controls['date2'].setValue("");
          this.addNote.controls['time'].setValue("");
          this.addNote.controls['name'].setValue("");
          this.addNote.controls['address'].setValue("");
         },
        error  => {this.toaster.error(error.error.message);});
  }


  selectCandidate(item){

    this.offerCandidate = item.idOfferCandidate;
    this.statusCandidate = item.status;
    this.getStatus();
    this.getNotes(this.offerCandidate);
    this.__candidatesService.getDataById(item.id).subscribe(
      data  => {  
        
        this.candidateInfo = data;
        
        if(data['gender']=="F"){
          this.candidateInfo.gender = 'Female';
        }else if(data['gender']=="M"){
          this.candidateInfo.gender = 'Male';
        }else if(data['gender']=="O"){
          this.candidateInfo.gender = 'Other';
        }
        
        this.visiblePT = (data['pt']== null)?false: data['pt'];
        this.visibleCV = (data['cv']== null)?false: data['cv'];
        this.idCandidate = item.id;
        this.__candidatesService.getCandidates(this.idCandidate).subscribe(result => {
          this.candidateInfo.categories = result;
        });
        
         },
          error  => {this.toaster.error(error.error.message);}
        );
  }

  getNotes(idOfferCandidate){
    this.notes = [];
    this.__offerService.getNotes(idOfferCandidate).subscribe(
      data  => {
        this.notes = data;

         },
        error  => {this.toaster.error(error.error.message);});
  }


  changeStatus(event){
    if(event.target.value == 5 ){
      this.addNote.controls.date1.setValidators([Validators.required]);
      this.addNote.controls.date2.setValidators([Validators.required]);
      this.addNote.controls.time.setValidators([Validators.required]);
      this.addNote.controls.name.setValidators([Validators.required]);
      this.addNote.controls.date1.updateValueAndValidity();
      this.addNote.controls.date2.updateValueAndValidity();
      this.addNote.controls.time.updateValueAndValidity();
      this.addNote.controls.name.updateValueAndValidity();
    }else if(event.target.value == 6 ){
      this.addNote.controls.date1.setValidators([Validators.required]);
      this.addNote.controls.date2.setValidators([Validators.required]);
      this.addNote.controls.time.setValidators([Validators.required]);
      this.addNote.controls.name.setValidators([Validators.required]);
      this.addNote.controls.address.setValidators([Validators.required]);
      this.addNote.controls.date1.updateValueAndValidity();
      this.addNote.controls.date2.updateValueAndValidity();
      this.addNote.controls.time.updateValueAndValidity();
      this.addNote.controls.name.updateValueAndValidity();
      this.addNote.controls.address.updateValueAndValidity();
    }else if(event.target.value == 7){
      this.addNote.controls.license.setValidators([Validators.required]);
      this.addNote.controls.license.updateValueAndValidity();
    }
    else {
      this.addNote.controls.date1.setValidators([]);
      this.addNote.controls.date2.setValidators([]);
      this.addNote.controls.time.setValidators([]);
      this.addNote.controls.name.setValidators([]);
      this.addNote.controls.address.setValidators([]);
      this.addNote.controls.date1.updateValueAndValidity();
      this.addNote.controls.date2.updateValueAndValidity();
      this.addNote.controls.time.updateValueAndValidity();
      this.addNote.controls.name.updateValueAndValidity();
      this.addNote.controls.address.updateValueAndValidity();
    }

  }


  openFile(file){
    if(file == "cv"){
      window.open("/api/private/files/cv/"+this.visibleCV, "_blank");
    }else if(file = "pt"){
      window.open("/api/private/files/pt/"+this.visiblePT, "_blank");
    }
  }
  
  get f() { return this.editProfile.controls; }

}
