// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { RegisterComponent } from './register.component';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// describe('Component: Register', () => {

//     let component: RegisterComponent;
//     let fixture: ComponentFixture<RegisterComponent>;

//     beforeEach(() => {

//         // refine the test module by declaring the test component
//         TestBed.configureTestingModule({
//             imports: [ReactiveFormsModule, FormsModule],
//             declarations: [RegisterComponent]
//         });

//         // create component and test fixture
//         fixture = TestBed.createComponent(RegisterComponent);

//         // get test component from the fixture
//         component = fixture.componentInstance;
//         component.ngOnInit();
//     });

//     it('should create new object', () => {
//         // @ts-ignore
//         const comp = new RegisterComponent();
//         comp.ngOnInit();
//         expect(comp).toBeTruthy();
//     });

//     it('claimForm invalid when empty', () => {
//         expect(component.claimForm.valid).toBeFalsy();
//     });

//     it('claimForm valid when empty', () => {
//         expect(component.claimForm.valid).toBeTruthy();
//     });

//     // it('should call "replaceAll()"', () => {
//     //     console.log(component)
//     //     expect(component.replaceAll).toHaveBeenCalled();
//     // });

//     // it('should call "onChange()"', () => {
//     //     console.log(component)
//     //     expect(component.onChange).toHaveBeenCalled();
//     // });
// });
