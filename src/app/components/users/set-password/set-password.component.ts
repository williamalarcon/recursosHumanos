import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';
import { ProfileService } from '../../../shared/httpClient/profile.service';
import { ChargesService } from '../../../shared/httpClient/charges/charges.service';
import { MustMatch } from 'src/app/shared/validators/passwordMatch';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  public myProfile: FormGroup;
  public setPassword: FormGroup;
  private userId =  null;
  sub;
  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute,
              private chargesService: ChargesService,
              private router: Router,
              public toaster: ToastrService,
              private profileService: ProfileService) {
                this.sub = this.route
                .queryParams
                .subscribe(params => {
                  this.userId = params.id;
                });
   }

  ngOnInit(): void {
    this.setPassword = this.fb.group({
      id: [''],
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required],
      
    },
    {
      validator: MustMatch('password', 'cnfPassword')
    })
  }


  updateObject(data){
    data.id = this.userId;
    this.profileService.setPassword(data);
  }

}
