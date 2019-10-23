// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { PolicyComponent } from './policy.component';

// describe('PolicyComponent', () => {
//     let component: PolicyComponent;
//     let fixture: ComponentFixture<PolicyComponent>;
//     let router = {
//         navigate: jasmine.createSpy('navigate')
//     }

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [PolicyComponent]
//         })
//             .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(PolicyComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });


//     it('should create new object', () => {
//         // @ts-ignore
//         const comp = new PolicyComponent();
//         comp.ngOnInit();
//         expect(comp).toBeTruthy();
//     });

//     it('policyId field validity', () => {
//         let errors = {};
//         let policyId = component.policyForm.controls['policyId'];

//         // policyId field is required
//         errors = policyId.errors || {};
//         expect(errors['required']).toBeTruthy();

//         // Set policyId to something
//         policyId.setValue("123456");
//         errors = policyId.errors || {};
//         expect(errors['required']).toBeFalsy();
//         expect(errors['minlength']).toBeTruthy();

//         // Set policyId to something correct
//         policyId.setValue("123456789");
//         errors = policyId.errors || {};
//         expect(errors['required']).toBeFalsy();
//         expect(errors['minlength']).toBeFalsy();
//     });

//     it('submitting a policyForm', () => {
//         expect(component.policyForm.valid).toBeFalsy();
//         component.policyForm.controls['policyId'].setValue("1002");
//         expect(component.policyForm.valid).toBeTruthy();

//     });

//     it('policyForm invalid when empty', () => {
//         expect(component.policyForm.valid).toBeFalsy();
//         it("should call alert", () => {
//             spyOn(window, "alert");
//             //your code
//             expect(window.alert).toHaveBeenCalledWith("Policy number doesnot exist");
//         });
//     });

//     it('policyForm valid when not empty', () => {
//         expect(component.policyForm.invalid).toBeFalsy();
//         it("should call alert", () => {
//             spyOn(window, "alert");
//             //your code
//             expect(window.alert).toHaveBeenCalledWith("Policy Id exists and success");
//         });
//     });

//     it('if policyForm is invalid navigate to policy', () => {
//         expect(router.navigate).toHaveBeenCalledWith(['/policy']);
//     });

// });
