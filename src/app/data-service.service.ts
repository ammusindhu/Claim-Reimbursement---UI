import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  /**
   * Pagination get method to fetch all the list of Claims in approver
   */
  getNews(page, roleId) {
    // console.log(page, roleId);
    return this.http.get(environment.baseUrl + '/claimProcessing/api/v1/?roleId=' + roleId + '&pageNumber=' + page)

  }
  /**
   * A Claim Request service to process claim
   */
  respForm(reasonData) {
    return this.http.put(environment.baseUrl + '/claimProcessing/api/v1/', reasonData);
  }
  /**
   * Register service to submit a claim to approver level user
   */

  register(reqObj) {
    // console.log(reqObj);
    return this.http.post(environment.baseUrl + '/claimProcessing/api/v1/claims/', reqObj)
  }
  /**
     * Login service to submit login details and route to dashboard
     */

  logFrom(login) {
    // console.log(login);
    return this.http.post(environment.baseUrl + '/claimProcessing/api/v1/user/', login)
  }

  /**
     * get calls for all dropdowns to submit a claim
     */

  getcall(url: string, param: string) {
    return this.http.get(environment.baseUrl + url + param);
  }
  /**
   * For logout to clear all data from local and session storage
   */
  clearStorage() {
    localStorage.clear();
    sessionStorage.clear();
    return true;
  }

}
