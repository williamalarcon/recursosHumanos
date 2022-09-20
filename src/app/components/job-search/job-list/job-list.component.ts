import { Component, OnInit } from '@angular/core';
import { JobDB } from '../../../shared/data/job-search/job-search';
import { OffersService } from '../../../shared/httpClient/offers.service';



@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  public jobs: any;
  public temp = [];
  private name: String =  "";
  private location: String= "";

  constructor(private __offersService: OffersService,) {
    this.getAllData(data => {
      this.temp = [...data];  
      this.jobs = data;
    });


    //this.jobs = JobDB.Job_Category
  }

  ngOnInit() { }


  searchData(search: string) {
    this.name = search['name'];
    this.location = search['location'];
    this.getAllData(data => {
      this.temp = [...data];  
      this.jobs = data;
    });

  }

  filterData(filter){
    
    if(filter['categories'].length != 0 && filter['jobTypes'].length != 0) {
      console.log("IF 1 ");
      const temp = this.temp.filter(function(d) {
        return (filter.categories.includes(d.jobCategory ) && filter.jobTypes.includes(d.jobType ));
      });
      this.jobs = temp;
    }else if(filter['categories'].length != 0 || filter['jobTypes'].length != 0) {
      console.log("IF 2 ");
      const temp = this.temp.filter(function(d) {
        return (filter.categories.includes(d.jobCategory ) || filter.jobTypes.includes(d.jobType ));
      });
      this.jobs = temp;
    }else{
      this.jobs = this.temp;
    }
  }

  filterData1(filter){
    if(filter['jobTypes'].length != 0){
      const temp = this.temp.filter(function(d) {
        return filter.categories.includes(d.jobType );
      });

      this.jobs = temp;
    }else{
      this.jobs = this.temp;
    }
  }



  getAllData(dataComp){
    this.__offersService.searchData(this.name, this.location).subscribe(
      data  => {
          dataComp(data);
         }
       );   
  }


  

}
