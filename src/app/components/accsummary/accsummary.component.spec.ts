import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccsummaryComponent } from './accsummary.component';

describe('AccsummaryComponent', () => {
  let component: AccsummaryComponent;
  let fixture: ComponentFixture<AccsummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccsummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new object', () => {
    // @ts-ignore
    const comp = new AccsummaryComponent();
    comp.ngOnInit();
    expect(comp).toBeTruthy();
  });

  describe("when file is selected and triggered change event", () => {
    beforeEach(() => {

      fixture = TestBed.createComponent(AccsummaryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

    });

    it('should call "rowClicked()"', () => {
      console.log(component)
      expect(component.rowClicked).toHaveBeenCalled();
    });

    it('should call "paginate()"', () => {
      console.log(component)
      expect(component.paginate).toHaveBeenCalled();
    });

    it('should call "approve()"', () => {
      console.log(component)
      expect(component.approve).toBeFalsy();
    });

    it('should call "reject()"', () => {
      console.log(component)
      expect(component.reject).toBeFalsy();
    });

    it('should call "showDialog()"', () => {
      console.log(component)
      expect(component.showDialog).toHaveBeenCalled();
    });

    it('should call "cancel()"', () => {
      console.log(component)
      expect(component.cancel).toBeTruthy();
    });

  })


});
