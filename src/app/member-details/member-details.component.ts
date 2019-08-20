import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonMethodBaseClass } from '../core/base-class/common-method';
import { Team } from '../core/interfaces/team.interface';
import { Member } from '../core/interfaces/member.interface';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent extends CommonMethodBaseClass implements OnInit, OnChanges {
  members: Member[] = [];
  memberModel: Member;
  memberForm: FormGroup;
  teams: Team[] = [];
  memberId: Number = 0;
  submitted = false;


  subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {
    super();
  }

  /**
   * On init
   */
  ngOnInit() {
    this.initMemberForm();
    this.getAllMembers();
    this.getTeams();
    // Handle route param change
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.memberId = params.id;
      if (params && params.id) {
        this.getMember(params.id);
      }
    }));
  }

  /**
  * Get all members
  */
  getAllMembers() {
    this.subscriptions.push(this.appService.getMembers().subscribe(members => (this.members = members)));
  }

  /**
   *easy access to form fields
  */
  get f() { return this.memberForm.controls; }

  /**
  * Get Teams for member form
  */
  getTeams() {
    this.subscriptions.push(
      this.appService.getTeams().subscribe(data => {
        this.teams = data || [];
      })
    );
  }

  /**
   * Get Member for member form of edit mode
   */
  getMember(id: Number) {
    this.subscriptions.push(
      this.appService.getMember(id).subscribe(data => {
        const formFields = ['firstName', 'lastName', 'jobTitle', 'team', 'status'];
        formFields.forEach(field => {
          this.memberForm.get(field) && this.memberForm.get(field).patchValue(data[field], { emit: true });
        });
      })
    );
  }

  /**
   * On Changes
   * not needed as of now
   */
  ngOnChanges() { }

  /**
  * Form initalization
  * Default params, validators
  */
  initMemberForm() {
    this.memberForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(100)
      ])],
      lastName: ['', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(100)
      ])],
      jobTitle: ['', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(100)
      ])],
      team: ['', Validators.compose([
        Validators.required
      ])],
      status: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  // TODO: Add member to members
  /**
  * Member form submit
  */
  onSubmit(form: FormGroup) {
    this.hideAlert();
    if (form.invalid) {
      return;
    }
    this.memberModel = form.value;

    if (this.checkExists(this.memberModel)) {
      this.showAlert('danger', `Member already exits with same first name and last name.`);
      setTimeout(() => {
        this.hideAlert();
      }, 2000);
      return;
    }

    this.submitted = true;

    let request = this.memberId ? this.appService.editMember(this.memberId, this.memberModel) :
      this.appService.addMember(this.memberModel);

    this.subscriptions.push(
      request.subscribe(data => {
        this.showAlert('success', `Member has been ${this.memberId ? 'edited' : 'added'} successfully`);

        // naviagte to members after 2 sec once message get displayed.
        setTimeout(() => {
          this.submitted = false;
          this.hideAlert();
          this.router.navigate(['/members']);
        }, 2000);
      }, err => {
        this.submitted = false;
        this.showAlert('danger', err.message);
      })
    );

  }

  /**
  * Check exists first name and last name for prevent duplicates
  */
  checkExists(member: Member) {
    return this.members.find(a => a.id != this.memberId && a.firstName.toLowerCase() === member.firstName.toLowerCase() && a.lastName.toLowerCase() === member.lastName.toLowerCase());
  }

  /**
  * back to members 
  */
  cancel() {
    this.router.navigate(['/members']);
  }

  /**
  * destroy all subscriptions
  */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
