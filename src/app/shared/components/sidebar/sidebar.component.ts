import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from '../../services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  public iconSidebar;
  public menuItems: Menu[];
  public url: any;
  public fileurl: any;

  constructor(private router: Router, public navServices: NavService) {
    let currentUser = JSON.parse(localStorage.currentUser);
    if(currentUser.activatePw == 0 ){

    }else{
      if(currentUser.role == "ADMIN"){
        this.navServices.items.subscribe(menuItems => {
          this.menuItems = menuItems;
          this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              menuItems.filter(items => {
                if (items.path === event.url) {
                  this.setNavActive(items);
                }
                if (!items.children) { return false; }
                items.children.filter(subItems => {
                  if (subItems.path === event.url) {
                    this.setNavActive(subItems);
                  }
                  if (!subItems.children) { return false; }
                  subItems.children.filter(subSubItems => {
                    if (subSubItems.path === event.url) {
                      this.setNavActive(subSubItems);
                    }
                  });
                });
              });
            }
          });
        });
      }else if(currentUser.role == "CANDIDATE"){
        this.navServices.menuCandidate.subscribe(menuItems => {
          this.menuItems = menuItems;
          this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              menuItems.filter(items => {
                if (items.path === event.url) {
                  this.setNavActive(items);
                }
                if (!items.children) { return false; }
                items.children.filter(subItems => {
                  if (subItems.path === event.url) {
                    this.setNavActive(subItems);
                  }
                  if (!subItems.children) { return false; }
                  subItems.children.filter(subSubItems => {
                    if (subSubItems.path === event.url) {
                      this.setNavActive(subSubItems);
                    }
                  });
                });
              });
            }
          });
        });
      }else if(currentUser.role == "AGENCY"){
        this.navServices.menuAgency.subscribe(menuItems => {
          this.menuItems = menuItems;
          this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              menuItems.filter(items => {
                if (items.path === event.url) {
                  this.setNavActive(items);
                }
                if (!items.children) { return false; }
                items.children.filter(subItems => {
                  if (subItems.path === event.url) {
                    this.setNavActive(subItems);
                  }
                  if (!subItems.children) { return false; }
                  subItems.children.filter(subSubItems => {
                    if (subSubItems.path === event.url) {
                      this.setNavActive(subSubItems);
                    }
                  });
                });
              });
            }
          });
        });
      }
    }
  }
  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) { return false; }
        a.children.forEach(b => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }

}
