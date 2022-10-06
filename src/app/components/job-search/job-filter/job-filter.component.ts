import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { CategoriesService } from '../../../shared/httpClient/categories.service';
import { FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {

  public searchForm: FormGroup;

  @Output() newItemEvent = new EventEmitter<string>();
  @Output() newFilterData = new EventEmitter<string>();
  @Output() newFilterData1 = new EventEmitter<string>();
  
  public isFilter: boolean = false;
  public isLocation: boolean = false;
  public isJob_Title: boolean = false;
  public isIndustry: boolean = false;
  public isSpecific_skills: boolean = false;

  public categories; 

  

  constructor(private fb: FormBuilder, 
              private __categoriesService: CategoriesService,) {

    this.getCategories(data => {this.categories = data;});

   }

  ngOnInit() {

    this.searchForm = this.fb.group({
      name: ['', []],
      location: ['', []],
      categories: this.fb.array([]),
      jobTypes: this.fb.array([])
    });

   }

  getCategories(dataComp){
    this.__categoriesService.getAllData().subscribe(data => {
        dataComp(data);
    })
  }


  search() {
    this.newItemEvent.emit(this.searchForm.value);
  }


  clear(){
    this.searchForm.controls['name'].setValue("");
    this.searchForm.controls['location'].setValue("");  
    this.search();
  }


  onChange(name: string, isChecked: boolean) {
    const categoriesFormArray = <FormArray>this.searchForm.controls.categories;

    if (isChecked) {
      categoriesFormArray.push(new FormControl(name));
    } else {
      let index = categoriesFormArray.controls.findIndex(x => x.value == name)
      categoriesFormArray.removeAt(index);
    }
    

    this.newFilterData.emit(this.searchForm.value);
  }



  
  onChangeJobTypes(name: string, isChecked: boolean) {
    const jobTypesFormArray = <FormArray>this.searchForm.controls.jobTypes;

    if (isChecked) {
      jobTypesFormArray.push(new FormControl(name));
    } else {
      let index = jobTypesFormArray.controls.findIndex(x => x.value == name)
      jobTypesFormArray.removeAt(index);
    }
    

    this.newFilterData.emit(this.searchForm.value);
  }



  



}
