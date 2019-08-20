import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';
import { of } from 'rxjs';

/**
* Mock Data for App service
*/
const testMemberObj: any = {
  id: 1, firstName: 'test', lastName: 'test1', jobTitle: 'test',
  team: 'test', status: 'Inactive'
};
const testMembersObj: any = [{
  id: 1, firstName: 'test', lastName: 'test', jobTitle: 'test',
  team: 'test', status: 'Inactive'
}];

const testTeamsObj: any = [{
  id: 1, teamName: 'test'
}];

/**
* Mock App service
*/
class MockAppService {
  getTeams() {
    return of(testTeamsObj);
  }

  getMembers() {
    return of(testMembersObj);
  }

  getMember(id) {
    return of(testMemberObj);
  }

  editMember(id) {
    return of(testMemberObj);
  }

  addMember() {
    return of(testMemberObj);
  }

  deleteMember(id) {
    return of({});
  }

};

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        HttpClient,
        FormBuilder
      ]
    }).overrideComponent(MemberDetailsComponent, {
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
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel: should be redirect to members when click on cancel', () => {
    component.cancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/members']);
  });

  it('getAllMembers: should get members on invoke on getAllMembers', () => {
    component.getAllMembers();
    expect(component.members.length).toBe(1);
  });

  it('getMember: should set value on memberfrom formgroup on invoke of getMember on edit mode', () => {
    component.getMember(1);
    expect(component.memberForm.get('firstName').value).toBe('test');
    expect(component.memberForm.get('lastName').value).toBe('test1');
    expect(component.memberForm.get('jobTitle').value).toBe('test');
    expect(component.memberForm.get('status').value).toBe('Inactive');
    expect(component.memberForm.get('team').value).toBe('test');
  });

  it('getTeams: should get teams on invoke on getTeams', () => {
    component.getTeams();
    expect(component.teams.length).toBe(1);
  });

  it('checkExists: should return null when no match found with firstName and lastname on check exists method', () => {
    expect(component.checkExists({ firstName: '', lastName: '' })).toBe(undefined);
  });

  it('checkExists: should return record when match found with firstName and lastname on check exists method', () => {
    component.checkExists({ firstName: 'test', lastName: 'test' });
    expect(component.checkExists({ firstName: 'test', lastName: 'test' })).not.toBeNull();
  });

  it('onSubmit: should return if member form is not valid', () => {
    expect(component.onSubmit(component.memberForm)).toBe(undefined);
  });

  it('onSubmit: should save member when form is valid', () => {
    component.memberId = 1;
    component.getMember(1);
    component.onSubmit(component.memberForm);
    expect(component.alertType).toBe('success');
    expect(component.submitted).toBe(true);
  });

});
