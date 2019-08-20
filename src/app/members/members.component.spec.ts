import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppService } from '../app.service';


/**
* Mock Data for App service
*/

const testMembersObj: any = [{
  id: 1, firstName: 'test', lastName: 'test', jobTitle: 'test',
  team: 'test', status: 'Inactive'
}];


/**
* Mock App service
*/
class MockAppService {

  getMembers() {
    return of(testMembersObj);
  }

  deleteMember(id) {
    return of({});
  }

};


describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).overrideComponent(MembersComponent, {
      set: {
        providers: [
          {
            provide: Router,
            useValue: mockRouter
          },
          { provide: AppService, useClass: MockAppService }
        ]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editMemberByID: should be redirect to member/1 when click on edit button', () => {
    component.editMemberByID(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/member/1']);
  });

  it('goToAddMemberForm: should be redirect to member when click on add button', () => {
    component.goToAddMemberForm();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/member']);
  });

  it('ngOnInit: should get members on invoke on ngOnInit', () => {
    component.ngOnInit();
    expect(component.members.length).toBe(1);
  });

  it('deleteMemberById: should remove member from members list when deleteMemberById method invoked', () => {
    let confirmAlert = () => {
      return true;
    }
    spyOn(window, 'confirm').and.callFake(confirmAlert);

    component.deleteMemberById(1);
    fixture.detectChanges();
    expect(component.members.length).toBe(0);
    expect(component.alertType).toBe('success');
  });
});
