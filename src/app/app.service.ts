import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Member } from './core/interfaces/member.interface';
import { Team } from './core/interfaces/team.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // If false, the application will run on 4200 and call json-server directly
  // If true, the application will utilize node API
  DEBUG: Boolean = true;
  api: string;
  username: string;

  constructor(private http: HttpClient) {
    if (this.DEBUG) {
      this.api = 'http://localhost:3000';
    } else {
      this.api = 'http://localhost:8000/api';
    }
  }

  // Returns all members
  getMembers(): Observable<Member[]> {
    return this.http.get(`${this.api}/members`).pipe(catchError(this.handleError));
  }

  getMember(id: Number): Observable<Member> {
    return this.http.get(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post(`${this.api}/members`, member).pipe(catchError(this.handleError));
  }

  editMember(id: Number, member: Member): Observable<Member> {
    return this.http.put(`${this.api}/members/${id}`, member).pipe(catchError(this.handleError));
  }

  deleteMember(id: Number): Observable<any> {
    return this.http.delete(`${this.api}/members/${id}`).pipe(catchError(this.handleError));
  }

  getTeams(): Observable<Team[]> {
    return this.http.get(`${this.api}/teams`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let err;
    if (error.error instanceof ErrorEvent) {
      err = 'An error occurred:', error.error.message;
    } else {
      err = `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    }
    err && alert(err);
    return [];
  }
}
