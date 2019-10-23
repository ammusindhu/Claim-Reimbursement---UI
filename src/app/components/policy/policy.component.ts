import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataServiceService } from 'src/app/data-service.service';
// import { AlertService, AuthenticationService } from '../_services';


@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  /**
       * Form Group Initialize
       */
  policyForm: FormGroup;
  /**
     * Loading Boolean Initialize
     */
  loading = false;
  /**
     * Submitted Boolean Initialize
     */
  submitted = false;
  /**
     * return string value Initialize
     */
  returnUrl: string;
  err = false;
  /**
       * Constructor Initialize
       */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private route: Router,
    private http: HttpClient
  ) {

  }
  /**
      * policy Form intialize reqobj
      */
  ngOnInit() {
    this.policyForm = this.formBuilder.group({
      // Validations for form fields
      policyId: ['', [
        Validators.required]]
    });

  }
  /**
   * goto Click function to navigate to dashboard
   * @param 
   */
  goto = () => {
    this.route.navigate(['/dashboard']);

  }
  // convenience getter for easy access to form fields
  get f() { return this.policyForm.controls; }
  // Submit Policy Form
  onSubmit() {
    // console.log("in submit")
    this.submitted = true;

    // stop here if form is invalid
    if (this.policyForm.invalid) {
      return;
    }

    this.loading = true;

    // console.log(this.policyForm);
    var policy = {
      'policyId': this.policyForm.value.policyId
    };
    /**
     * Post call to return response
     */

    // this.dataService.policyForm(policy).subscribe((response: any) => {
    this.http
      .post(environment.baseUrl + '/claimProcessing/api/v1/policy/?policyId=' + this.policyForm.value.policyId, policy)
      .subscribe((response: Response) => {
        // if response is true then navigate to submit a claim
        if (response['statusCode'] === 200) {
          alert(response['message']);
          this.route.navigate(['/claim']);
        }
        // if response is false then navigate to policy
        else {
          alert(response['message']);
          this.route.navigate(['/policy']);
        }

        // if form returns error
      }, (err) => {
        this.err = true;
        // console.log("rerror", err)
        alert(err.message);
      });

  }
}
