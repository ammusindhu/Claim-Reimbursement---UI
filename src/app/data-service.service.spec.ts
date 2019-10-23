import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';

describe('DataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataServiceService = TestBed.get(DataServiceService);
    expect(service).toBeTruthy();
  });

  it('should create new object', () => {
    // @ts-ignore
    const comp = new PolicyComponent();
    comp.ngOnInit();
    expect(comp).toBeTruthy();
  });

});
