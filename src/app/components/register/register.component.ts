import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/**
 * The Register component
 */
export class RegisterComponent implements OnInit {
  details: boolean = true;
  showAilment: boolean = false;
  selectedHospital: string = 'select';
  /**
     * Formgrup intialize
     */
  claimForm: FormGroup;
  /**
     * loading status
     */
  loading = false;
  /**
     * submitted status
     */
  submitted = false;
  /**
     * response data object
     */
  claims: any = [];
  /**
     * firstName intialize
     */
  firstName: string;
  /**
     * lastName intialize
     */
  lastName: string;
  /**
       * EmaiID intialize
       */
  emailId: string;
  /**
     * Nature of Ailment intialize
     */
  natureOfAilment: string;
  /**
     * Diagnosis intialize
     */
  diagnosis: string;
  detailsOfDischargeSummary: string;
  hospitalName: string;
  totalAmount: number;
  policyId: number;
  /**
     * The current time
     * @type {Date}
     */
  dischargeDate: Date;
  /**
     * The current time
     * @type {Date}
     */
  admitDate: Date;
  /**
     * The current time
     * @type {Date}
     */
  dob: Date;
  diagnosisId: number;
  date: string;
  /**
     * api baseurl intialize
     */
  apibaseUrl: any;
  err = false;
  response = false;
  alertMsg: string = '';
  cities: object;

  cities1: object;
  cities2: object;

  /**
     * Table intialize
     */
  settings: object = {
    columns: {
      firstName: {
        title: 'First Name'
      },
      lastName: {
        title: 'Last Name'
      },
      emailId: {
        title: 'Email Id'
      },
      claimId: {
        title: 'Claim Id'
      },
      policyNumber: {
        title: 'Policy Number'
      },

    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: "Approve",
          title: "Reject"
        }
      ]
    }
  };
  /**
       * Formgrup end
       */

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private route: Router,
    private http: HttpClient
  ) {
    this.cities1 = [];
    this.settings = Object;

  }

  ngOnInit() {
    this.getHospitals();
    this.getDiagnosis();
    /**
     * claimform intialize reqobj
     */
    this.claimForm = this.formBuilder.group({
      // Validations for form fields

      policyId: ['', Validators.required],
      totalAmount: ['', Validators.required],
      natureOfAilment: ['', Validators.required],
      diagnosis: ['', Validators.required],
      hospitalName: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      admitDate: ['', Validators.required],
      detailsOfDischargeSummary: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.claimForm.controls; }

  onSubmit = () => {
    this.submitted = true;
    // Replace all - with / in date field
    this.admitDate = this.replaceAll(this.claimForm.value.admitDate, '-', '/');
    this.dischargeDate = this.replaceAll(this.claimForm.value.dischargeDate, '-', '/');
    // console.log(this.admitDate, this.dischargeDate);

    // this.date = new Date().toDateString();

    // stop here if form is invalid
    if (this.claimForm.invalid) {
      return;
    }
    // console.log(this.claimForm);
    /**
     * request Object to pass data to post call
     */
    var reqObj = {

      'policyId': parseInt(this.claimForm.value.policyId, 10),
      'natureOfAilment': this.claimForm.value.natureOfAilment,
      'diagnosis': this.claimForm.value.diagnosis.diagnosisType,
      'hospitalName': this.claimForm.value.hospitalName,
      'detailsOfDischargeSummary': this.claimForm.value.detailsOfDischargeSummary,
      'totalAmount': parseInt(this.claimForm.value.totalAmount, 10),
      'mobileNumber': this.claimForm.value.mobileNumber,
      'dischargeDate': this.admitDate,
      'admitDate': this.dischargeDate
    };
    /**
     * Post call to return response
     */
    this.dataService.register(reqObj).subscribe((response: any) => {
      // this.http.post(environment.baseUrl + '/claimProcessing/api/v1/claims/', reqObj).subscribe((response) => {
      if (response) {
        this.response = true;
        this.claims = response;
        console.log(this.claims);
        this.alertMsg = '';
        this.alertMsg = this.claims.message;
        alert(response['message']);
        this.policyId = this.claims.policyId;
        this.natureOfAilment = this.claims.natureOfAilment;
        this.diagnosis = this.claims.diagnosis;
        this.hospitalName = this.claims.hospitalName;
        this.totalAmount = this.claims.totalAmount;
        this.detailsOfDischargeSummary = this.claims.detailsOfDischargeSummary;
        this.dischargeDate = this.claims.dischargeDate;
        this.admitDate = this.claims.admitDate;
        this.dob = this.claims.dob;
        // Navigate to login page if form is submitted successfully
        if (response.statusCode == 200) {
          this.details = false;
          // this.route.navigate(['/policy']);
        } else if (response.statusCode == 404) {
          this.route.navigate(['/policy']);
          // this.details = false;
        } else {
          this.route.navigate(['/policy']);
        }

      }

    }, (err) => {
      // if form returns error
      this.err = true;
      console.log("rerror", err)
      alert(err.message);
    });

  }
  // For Date Field regular expression
  replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
  }
  // Dropdown for diagnosis and aliment
  getHospitals = () => {

    this.dataService.getcall('/claimProcessing/api/v1/hospitals/', '').subscribe((response: any) => {
      if (response) {
        this.cities2 = response;
        console.log(this.cities2);
      }
    });
  }

  // Dropdown for diagnosis
  getDiagnosis = () => {
    this.dataService.getcall('/claimProcessing/api/v1/diagnosis/', '').subscribe((response: any) => {
      if (response) {
        this.cities = response;
        console.log(this.cities);
      }
    });
  }

  // Dropdown for Ailments
  getAilments = (diagnosisId) => {
    this.dataService.getcall('/claimProcessing/api/v1/ailments/' + diagnosisId, '').subscribe((response: any) => {
      if (response) {
        this.cities1 = response;
        this.showAilment = true;
        console.log(this.cities1);
      }
    });
  }

  // Dropdown for diagnosis and aliment
  onChange = (city) => {

    if (city != undefined) {
      this.getAilments(city.diagnosisId);
    }

  }
}