import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataServiceService } from 'src/app/data-service.service';
/**
 * An interface for user intialization
 */
export class User {
    constructor(public emailId: string,
        public password: string) {
    }
}
/**
 * The Login component
 */
@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    /**
     * Formgroup intialize
     */
    loginForm: FormGroup;
    /**
     * loading boolean value intialize
     */
    loading = false;
    /**
     * submitted boolean value intialize
     */
    submitted = false;
    /**
     * account Number intialize
     */
    accountNumber: number;
    /**
     * return Url intialize
     */
    returnUrl: string;

    /**
     * login Id intialize
     */
    loginId: number;
    /**
     * password intialize
     */
    password: string;
    err = false;

    /**
     * Constructor intialize
     */

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private dataService: DataServiceService,
        private route: Router,
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        /**
     * claimform intialize reqobj
     */
        this.loginForm = this.formBuilder.group({
            // Validations for form fields
            emailId: ['', [
                Validators.required,
                Validators.pattern("[^ @]*@[^ @]*")]],
            passCode: ['', [
                Validators.required,]],
        });

    }

    /**
   * goto Click function
   * @param route to dashboard
   */

    goto = () => {
        this.route.navigate(['/dashboard']);

    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit = () => {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        // start here if form is valid
        this.loading = true;

        /**
     * request Object to pass data to post call
     */
        var login = {
            'emailId': this.loginForm.value.emailId,
            'passCode': this.loginForm.value.passCode
        };
        /**
     * request Object to pass data to post call
     */
        this.dataService.logFrom(login).subscribe((response: any) => {

            if (response.statusCode == 200) {
                // if response is true, store userId and roleId to sessionStorage
                sessionStorage.setItem("userId", response['userId']);
                sessionStorage.setItem("roleId", response['roleId']);
                // route to dashboard if reponse is true
                this.route.navigate(['/dashboard']);
            }


        }, (err) => {
            this.err = true;
            console.log("rerror", err)
            alert(err.message);
        });

    }
}
