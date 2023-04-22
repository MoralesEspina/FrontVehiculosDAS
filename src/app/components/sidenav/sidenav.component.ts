import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { INavbarData } from './helper';
import { navbarData, navbarDataSecre } from './nav-data';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],

})
export class SidenavComponent implements OnInit {
   private isSidenavOpen = false;
   public rol:any = localStorage.getItem('rol');
   @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
   collapsed = false;
   screenWidth = 0;
   navData = navbarData;
   multiple: boolean = false;
   router: any;
   @HostListener('window:resize', ['$event'])
   onResize(event: any) {
  //   this.screenWidth = window.innerWidth;
  //   if (this.screenWidth <= 768) {
  //     this.collapsed = false;
  //     this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  //   }
  }
  
  //  constructor(private renderer: Renderer2) { } 

  ngOnInit(): void {
    // this.screenWidth = window.innerWidth;
    // if (this.rol == 'Secretaria/o') {
    //   this.navData = navbarDataSecre
    // }
  
  }

//   toggleCollapse(): void {
//     this.collapsed = !this.collapsed;
//     this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    
//   }

//   closeSidenav(): void {
    
//       this.collapsed = false;
//       this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
//       this.isSidenavOpen = false;
//   }

//   handleClick(item: INavbarData): void {
//     this.shrinkItems(item);
//     item.expanded = !item.expanded
//   }

//   shrinkItems(item: INavbarData): void {
//     if (!this.multiple) {
//       for (let modelItem of this.navData) {
//         if (item !== modelItem && modelItem.expanded) {
//           modelItem.expanded = false;
//         }
//       }
//     }
//   }
  


//   // openNav(): void {
//   //   this.collapsed = !this.collapsed;
//   //   this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
//   // }
  
//   //  closeNav(): void {
//   //   this.collapsed = false;
//   //   this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
//   // }
// }

}
