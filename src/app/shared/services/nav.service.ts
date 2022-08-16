import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() {
		this.onResize();
		if (this.screenWidth < 1199) {
		  this.closeSidebar = true;
		  this.sidebarToggle = false;
		}
	  }

	public screenWidth: any;
	public closeSidebar: boolean = false;
	public sidebarToggle: boolean = true;
	  public fullScreen = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'Candidates', icon: 'layers', type: 'sub', active: false, children: [
				{ path: '/candidates/candidates-list', title: 'List', type: 'link' },
				{ path: '/candidates/create-candidate', title: 'Create', type: 'link' },
			]
		},
		{
			title: 'Providers', icon: 'book', type: 'sub', active: false, children: [
				{ path: '/providers/providers-list', title: 'List', type: 'link' },
				{ path: '/providers/create-provider', title: 'Create', type: 'link' },
			]
		},
		{
			title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
				{
					title: 'Users', icon: 'users', type: 'sub', active: false, children: [
						{ path: '/user/team-details', title: 'List', type: 'link' },
						{ path: '/user/create-profile', title: 'Create', type: 'link' },
					]
				},
				{
					title: 'Admins', icon: 'users', type: 'sub', active: false, children: [
						{ path: '/admins/admin-list', title: 'List', type: 'link' },
						{ path: '/admins/create-admin', title: 'Create', type: 'link' },
					]
				},
				{
					title: 'Categories', icon: 'users', type: 'sub', active: false, children: [
						{ path: '/categories/categories-list', title: 'List', type: 'link' },
						{ path: '/categories/create-category', title: 'Create', type: 'link' },
					]
				},
			

				
			]
		},
	];
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

	


}