import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /**
 * The Dashboard component
 */
  constructor(private router: Router,
    private route: Router, private dataService: DataServiceService) { }

  ngOnInit() {
  }
  /**
      * logout Click function to clear all data in local and session storage
      * @param 
      */
  logout = () => {
    if (this.dataService.clearStorage()) {
      this.router.navigate(['/login']);
    }
  }
}
