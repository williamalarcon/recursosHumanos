import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../shared/httpClient/profile.service';
import { ChannelsService } from '../shared/httpClient/channels/channels.service';
import { AreaService } from '../shared/httpClient/areas/area.service';
import { SubjectsService } from '../shared/httpClient/subjects/subjects.service';
import { RegionalService } from '../shared/httpClient/regional/regional.service';
import { CitiesService } from '../shared/httpClient/cities/cities.service';
import { SolicitudesService } from '../shared/httpClient/solicitudes.service';
import { NgbDateCustomParserFormatter} from '../shared/filter/dateformat';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { removeSpaces} from '../shared/validators/removeSpaces';



@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4>Su solicitud fue enviada con éxito</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <label>El número de radicado es: <strong>{{idRadicado}}</strong></label>
    </div>
  `
})
export class NgbdModalContent {
  @Input() idRadicado;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-petitions',
  templateUrl: './petitions.component.html',
  styleUrls: ['./petitions.component.scss']
})

export class PetitionsComponent implements OnInit {
  public myProfile: FormGroup;
  public petitionsForm: FormGroup;
  model;
  private idRegional;
  public tipoSolicitud = "";

  closeResult: string;
  idRadicado: String;
  filesInput = [{ "id":"file-Input-1","value": "" }];
  files = [];
  funcionarios = [];
  canales = [];
  temas = [];
  areas = [];
  ciudades = [];
  regionales = [];
  cargoFuncionario =  "";
  selectedFiles: FileList;
  buttonEnabled = true;
  submitted = false;
  validFiles = false;
  
  public category=[
    {id:1 , name:"Life Style"},
    {id:2 , name:"Travel"},
  ];
  public selectedCategory:string[]=[];
  
  constructor(private fb: FormBuilder, 
              private profileService:  ProfileService,
              private channelsService: ChannelsService,
              private subjectsService: SubjectsService,
              private citiesService: CitiesService,
              private areaService:     AreaService,
              private modalService: NgbModal,
              private regionalService: RegionalService,
              private solicitudesService: SolicitudesService,
              public toaster: ToastrService,
              public router: Router
              ) { 

                
    this.getProfiles(data => {this.funcionarios = data;});
    this.getChannels(data => {this.canales = data;});
    this.getAreas(data => {this.areas = data;});
    this.getRegional(data => {this.regionales = data;});
  }

  ngOnInit(): void {

    const now = new Date();

    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};

    this.petitionsForm = this.fb.group({
      fecha: ['', [Validators.required]],
      persona: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-z A-Z]+$'), removeSpaces]],
      selectAprobador: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, removeSpaces]],
      telefono: ['', [Validators.required,Validators.min(3)]],
      idRegional: ['', [Validators.required]],
      idPrueba: [''],
      tipo: ['',[Validators.required]],
      idMateria: [''],
      idCanal: [''],
      ciudades: [''],
      novedades: [''],
      directrices: [''],
      colaborador: [''],
      fcapacitacion: [''],
      pregunta: [''],
      descripcion: [''],
      idArea: [''],
      idTema: [''],
      anexo: [''],
    })
  }

  getProfiles(dataComp){
    //this.profileService.sendGetUsersForm().subscribe(data  => {dataComp(data);});   
  }

  getCiudades(dataComp){
    this.citiesService.sendGetCitiesByRegional(this.idRegional).subscribe(data  => {dataComp(data);});   
  }
  
  getChannels(dataComp){
    this.channelsService.sentGetAllChannels().subscribe(data  => {dataComp(data);});   
  }

  getAreas(dataComp){
    this.areaService.sentGetAllAreas().subscribe(data  => {dataComp(data);});   
  }

  getMaterias(dataComp){
    let idArea = this.petitionsForm.controls['idArea'].value;
    this.subjectsService.sendGetSubjectsByArea(idArea).subscribe(data  => {dataComp(data);});   
  }

  getRegional(dataComp){
    this.regionalService.sendGetAllRegionales().subscribe(data  => {dataComp(data);});   
  }

  selectAprobador(index){
    if(index != ''){
      this.cargoFuncionario = this.funcionarios[index].cargo;
      this.petitionsForm.controls['idPrueba'].setValue(this.funcionarios[index].id);
    }
    else{
      this.cargoFuncionario = "";
    }
  }

  selectRegional(id){
    this.idRegional = id;
    this.getCiudades(data => {this.ciudades = data;});
  }


  selectArea(idArea){
    this.getMaterias(data => {this.temas = data;});
  }

  // convenience getter for easy access to form fields
  get f() { return this.petitionsForm.controls; }


  selectSolicitud(e){
    this.submitted = false;
    this.tipoSolicitud = e.target.value;
    if(this.tipoSolicitud == 'Inquietudes'){
      this.setRequiredFieldsQuestions();
    }else if(this.tipoSolicitud == 'Actualizacion'){
      this.setRequiredFieldsActualizacion();
    }else if(this.tipoSolicitud == 'Capacitacion'){
      this.setRequiredFieldsTraining();
    }
  }

  setRequiredFieldsActualizacion(){
    
    this.petitionsForm.get('idCanal').setValidators([Validators.required]);
    this.petitionsForm.get('idArea').setValidators([Validators.required]);
    this.petitionsForm.get('idTema').setValidators([Validators.required]);
    this.petitionsForm.get('ciudades').setValidators([Validators.required]);
    this.petitionsForm.get('novedades').setValidators([Validators.required, Validators.min(3), removeSpaces]);
    this.petitionsForm.get('directrices').setValidators([Validators.required, Validators.min(3), removeSpaces]);
    this.petitionsForm.get('idCanal').updateValueAndValidity();
    this.petitionsForm.get('idArea').updateValueAndValidity();
    this.petitionsForm.get('idTema').updateValueAndValidity();
    this.petitionsForm.get('ciudades').updateValueAndValidity();
    this.petitionsForm.get('novedades').updateValueAndValidity();
    this.petitionsForm.get('directrices').updateValueAndValidity();
  }


  setRequiredFieldsQuestions(){
    this.petitionsForm.get('idCanal').setValidators([Validators.required]);
    this.petitionsForm.get('idArea').setValidators([Validators.required]);
    this.petitionsForm.get('idTema').setValidators([Validators.required]);
    this.petitionsForm.get('descripcion').setValidators([Validators.required, Validators.min(3), removeSpaces]);
    this.petitionsForm.get('idCanal').updateValueAndValidity();
    this.petitionsForm.get('idArea').updateValueAndValidity();
    this.petitionsForm.get('idTema').updateValueAndValidity();
    this.petitionsForm.get('descripcion').updateValueAndValidity();
  }

  setRequiredFieldsTraining(){
    this.petitionsForm.get('colaborador').setValidators([Validators.required]);
    this.petitionsForm.get('idCanal').setValidators([Validators.required]);
    this.petitionsForm.get('idArea').setValidators([Validators.required]);
    this.petitionsForm.get('idTema').setValidators([Validators.required]);
    this.petitionsForm.get('fcapacitacion').setValidators([Validators.required]);
    this.petitionsForm.get('ciudades').setValidators([Validators.required]);
    this.petitionsForm.get('colaborador').updateValueAndValidity();
    this.petitionsForm.get('idCanal').updateValueAndValidity();
    this.petitionsForm.get('idArea').updateValueAndValidity();
    this.petitionsForm.get('idTema').updateValueAndValidity();
    this.petitionsForm.get('fcapacitacion').updateValueAndValidity();
    this.petitionsForm.get('ciudades').updateValueAndValidity();

  }

  addInputFile(){
    let count = this.filesInput.length+1;
    this.filesInput.push({"id":"file-input-"+count, "value": ""});
  }
  
  removeInputFile(i){
    this.files.splice( i, 1 );
    this.filesInput.splice( i, 1 );
  }

  selectFiles(event): void {
    
    if (event.srcElement.files[0].size/1024/1024 > 4) {
      event.srcElement.value = "";
      this.toaster.error("El archivo supera los 4MB");
      return;
    }
    this.selectedFiles = event.target.files;
    this.files.push(event.target.files);
  }

  /**
   * Enviar solicitud a guardar informacion
   * @param data 
   */
  sendForm(data){
    this.submitted = true;

    Object.keys(this.petitionsForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.petitionsForm.get(key).errors;
      if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });


    if (this.petitionsForm.invalid) {
      return;
    }

    this.buttonEnabled = false;

    const formData = new  FormData();
    for (let index = 0; index < this.files.length; index++){
      formData.append('file[]', this.files[index][0]);
    }  
  
    formData.append("data",JSON.stringify(data));

    

    
    this.solicitudesService.createSolicitud(formData).subscribe(
      event  => {
        if (event.type === HttpEventType.UploadProgress) {
            
        } else if (event instanceof HttpResponse) {
          this.idRadicado = event['body']['idRadicado'];
          this.buttonEnabled = true;
          this.open(event['body']['idRadicado']);
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/form/request']);
        }
        },
      error  => {this.toaster.error(error.error.message);
                 this.buttonEnabled = true;
                }
    );

  }

  open(idRadicado) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.idRadicado = idRadicado;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
