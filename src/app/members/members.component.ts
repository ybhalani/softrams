import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonMethodBaseClass } from '../core/base-class/common-method';
import { Member } from '../core/interfaces/member.interface';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent extends CommonMethodBaseClass implements OnInit {
  members: Member[] = [];
  subscriptions: Subscription[] = [];

  constructor(public appService: AppService, private router: Router) {
    super();
  }

  /**
  * On init
  */
  ngOnInit() {
    this.subscriptions.push(this.appService.getMembers().subscribe(members => (this.members = members)));
  }

  /**
  * naviagte to member detail screen for add
  */
  goToAddMemberForm() {
    this.router.navigate(['/member']);
  }

  /**
  * naviagte to member detail screen
  */
  editMemberByID(id: number) {
    this.router.navigate([`/member/${id}`]);
  }

  // TODO: Add member to members
  /**
  * delete member form list
  */
  deleteMemberById(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {

      this.subscriptions.push(
        this.appService.deleteMember(id).subscribe(data => {
          this.members = this.members.filter(a => a.id !== id);
          this.showAlert('success', `Member has been deleted successfully`);
          // hide alert after 2 sec once message get displayed.
          setTimeout(() => {
            this.hideAlert();
          }, 2000)
        }, err => {
          this.showAlert('danger', err.message);
        })
      );

    }
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
