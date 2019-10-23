import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Route } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataServiceService } from 'src/app/data-service.service';

interface Data2 {
  accountNumber: number;
  accountBalance: number;
  customerName: string;
  statusCode: number;
  message: string;
}
@Component({
  selector: 'app-accsummary',
  templateUrl: './accsummary.component.html',
  styleUrls: ['./accsummary.component.css']
})
/**
 * The Register component
 */
export class AccsummaryComponent implements OnInit {
  /**
    * claimId intialize
    */
  claimId: number;
  /**
     * userId intialize
     */
  userId: number;
  /**
     * roleId intialize
     */
  roleId: number;
  /**
     * claim_Id intialize
     */
  claim_id: number;
  /**
     * data array intialize
     */
  listClaim: object[];
  /**
     * request Object intialize
     */
  reasonData: object;
  /**
     * display intialize boolean value
     */
  display: boolean = false;
  /**
     * Table intialize
     */

  settings: object = {
    columns: {
      claimId: {
        title: 'Claim #'
      },
      juniorApproverClaimStatus: {
        title: 'Status'
      },
      policyId: {
        title: 'Policy #'
      },
      admitDate: {
        title: 'Admitted Date'
      },
      dischargeDate: {
        title: 'Discharged Date'
      },
      claimAmount: {
        title: 'Claimed Amount'
      },
      eligiblityAmount: {
        title: 'Eligibile Amount'
      },
      detailsOfDischargeSummary: {
        title: 'Discharge Summary'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: "Reason to Approve/Reject",
          title: "Reason to Approve/Reject &nbsp;"
        }
      ]
    }
  };
  /**
     * Table End
     */
  /**
   * Reason Form intialize
   */
  reasonForm: FormGroup;
  submitted = false;
  loading = false;
  claimStatus: any;
  // formBuilder: any;

  /**
     * Constructor intialize
     */
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: Router,
    private dataService: DataServiceService,
    private http: HttpClient) {
    this.claimStatus = [
      { name: 'Rejected', code: 'Rejected' },
      { name: 'Approved', code: 'Approved' }
    ];

  }

  ngOnInit() {
    /**
     * Retriving userId and roleId from session storage 
     */
    this.userId = parseInt(sessionStorage.getItem("userId"));
    this.roleId = parseInt(sessionStorage.getItem("roleId"));
    // Validations for form fields
    this.reasonForm = this.formBuilder.group({
      reason: ['', Validators.required],
      claimStatus: ['', Validators.required]
    });

  }
  /**
  * Paginate Click function to send response
  * @param {Event} event - Event to get response
  */
  paginate = (event) => {
    console.log(event)
    this.dataService.getNews(event.page, this.roleId).subscribe((response: any) => {
      if (response) {
        this.listClaim = response;
        console.log(this.listClaim);
        sessionStorage.setItem("claimId", response[0].claimId);
      }
    });

  }

  /**
     * Row Click function to emit an event
     * @param {Event} event - Event to get data
     */

  rowClicked = (event: Event) => {
    this.claimId = Number(localStorage.getItem("claimId"));
    this.claim_id = Number(localStorage.getItem("claimId"));
    // console.log(event)
    this.display = true;

  }
  /**
   * Approve Click function 
   * @param {Event} event
   */
  approve = () => {

  }
  /**
   * Reject Click function
   * @param {Event} event
   */
  reject = () => {

  }
  /**
   * show dilogue Click function
   * @param {Event} event
   */
  showDialog = () => {
    this.display = true;

  }
  /**
   * cancel Click function to route to dashboard
   * @param {Event} event
   */
  cancel = () => {
    this.display = false;
    this.route.navigate(['/dashboard']);
  }

  //Form to change approve/Reject Status

  get f() { return this.reasonForm.controls; }

  /**
   * confirm Click function
   * @param 
   */

  confirm = () => {

    this.submitted = true;

    // stop here if form is invalid
    if (this.reasonForm.invalid) {
      return;
    }

    // start here if form is valid
    this.loading = true;

    // data to pass to post api call
    this.reasonData = {
      'reason': this.reasonForm.value.reason,
      'roleId': Number(sessionStorage.getItem('roleId')),
      'claimId': Number(sessionStorage.getItem('claimId')),
      'claimStatus': this.reasonForm.value.claimStatus.name
    };

    this.dataService.respForm(this.reasonData).subscribe((res: any) => {

      alert(res['message']);
      this.display = false;
      // route to dashboard if reponse is true
      this.route.navigate(['/dashboard']);

    }, (err) => {
      alert(err.message);
    });

  }
}
