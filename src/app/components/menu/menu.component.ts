import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Output() onMenuClosed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor( private authService : AuthService ) { }

  ngOnInit() { }

  public closeMenu(): void {
    this.onMenuClosed.emit();
  }

  logout() {
    this.authService.logout();
  }

}
