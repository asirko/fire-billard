import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FirebaseListObservable} from "angularfire2";
import {User} from "../../models/user";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  @Output() onUserSelected: EventEmitter<User> = new EventEmitter<User>();

  // public filter : string;
  public users$ : FirebaseListObservable<Array<User>>;

  constructor(private us : UserService) { }

  ngOnInit() {
    this.users$ = this.us.getUsers$();
  }

  public selectUser(user : User): void {
    this.onUserSelected.emit(user);
  }

}
