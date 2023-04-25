import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SweetAlertService } from 'src/app/services/sweetAlert.service';
import { UsersService } from 'src/app/services/users.service';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],

})
export class SidenavComponent implements OnInit {
  isLoged: boolean = false;
  active: boolean = false;
  isClicked: boolean = true;
  showSubnivel = false;
  user: any;

  constructor(private _sweetAlert:SweetAlertService,
    private userService: UsersService){

  }

  ngOnInit(): void {
    this.user = localStorage.getItem('rol');
    if (this.user) {
      this.isLoged = true;
    }
  }

  logOut(){
    this.userService.logOut();
    this._sweetAlert.logout('Adios!');
  }
}
