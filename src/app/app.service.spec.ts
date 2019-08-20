import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Member } from './core/interfaces/member.interface';
import { Team } from './core/interfaces/team.interface';

describe('AppService', () => {
  let service: AppService;
  let http: HttpClient;
  let spy: any;
  const testObj: any = {
    id: 1, firstName: 'test', lastName: 'test', jobTitle: 'test',
    team: 'test', status: 'Inactive'
  };
  const testMembersObj: any = [{
    id: 1, firstName: 'test', lastName: 'test', jobTitle: 'test',
    team: 'test', status: 'Inactive'
  }];

  const testTeamsObj: any = [{
    id: 1, teamName: 'test'
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  beforeEach(() => {
    service = new AppService(http);
  });

  it('Should create the service successfully', () => {
    expect(service).toBeDefined();
  });

  // Mock these methods until we can connect to the actual (or mocked) service

  // Call to getMembers should return data
  it('getTeams: Should return an array of teams', () => {
    spy = spyOn(service, "getTeams").and.returnValue(testTeamsObj);
    expect(service.getTeams()).toBe(testTeamsObj);
  })

  // Call to getMembers should return data
  it('getMembers: Should return an array of members', () => {
    spy = spyOn(service, "getMembers").and.returnValue(testMembersObj);
    expect(service.getMembers()).toBe(testMembersObj);
  })

  // getMember(id): Member
  it('getMember: should return member instance.', () => {
    spy = spyOn(service, 'getMember').and.returnValue(testObj);
    expect(service.getMember(1)).toBe(testObj);
  })

  // addMember(payload): Member
  it('addMember: should successfully add provided member.', () => {
    spy = spyOn(service, 'addMember').and.returnValue(testObj);
    expect(service.addMember({
      firstName: 'test', lastName: 'test', jobTitle: 'test',
      team: 'test', status: 'Inactive'
    })).toBe(testObj);
  })

  // editMember(id, payload): Member
  it('editMember: should successfully update provided member.', () => {
    spy = spyOn(service, 'editMember').and.returnValue(testObj);
    expect(service.editMember(1, {
      firstName: 'test', lastName: 'test', jobTitle: 'test',
      team: 'test', status: 'Inactive'
    })).toBe(testObj);
  })

  // editMember(id, payload): Member
  it('deleteMember: should successfully delete provided member.', () => {
    spy = spyOn(service, 'deleteMember').and.returnValue(testObj);
    expect(service.deleteMember(1)).toBe(testObj);
  })

  // editMember(id, payload): Member
  it('setUserName: should successfully set username.', () => {
    service.setUsername('test');
    expect(service.username).toBe('test');
  })

});