import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/httpClient/categories.service';

@Component({
  selector: 'app-job-filter',
  templateUrl: './job-filter.component.html',
  styleUrls: ['./job-filter.component.scss']
})
export class JobFilterComponent implements OnInit {

  public isFilter: boolean = false;
  public isLocation: boolean = false;
  public isJob_Title: boolean = false;
  public isIndustry: boolean = false;
  public isSpecific_skills: boolean = false;

  public categories; 

  

  constructor(private __categoriesService: CategoriesService,) {

    this.getCategories(data => {this.categories = data;});

   }

  ngOnInit() { }

  getCategories(dataComp){
    this.__categoriesService.getAllData().subscribe(data => {
        dataComp(data);
    })
  }


}
