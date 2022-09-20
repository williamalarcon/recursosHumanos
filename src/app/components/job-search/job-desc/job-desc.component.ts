import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDB } from '../../../shared/data/job-search/job-search';
import { OffersService } from '../../../shared/httpClient/offers.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-job-desc',
  templateUrl: './job-desc.component.html',
  styleUrls: ['./job-desc.component.scss']
})
export class JobDescComponent implements OnInit {

  public jobs: any
  public arr: any

  constructor(private route: ActivatedRoute, private router: Router,private __offersService: OffersService, public toaster: ToastrService,) {
    this.jobs = JobDB.Job_Category;
    this.route.params.subscribe(params => {
      const id = +params['id'];
      /*this.jobs.filter((items) => {
        if (items.Id === id) {
          this.arr = items;
        }
      })*/
      this.getDataById(id);
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


  applyClick(arr) {
    this.router.navigate(['/job/apply', arr.Id]);
  }

  ngOnInit() { }

}
