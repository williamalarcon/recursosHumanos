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

	
	MENUACTIVATEUSER: Menu[] = [
	];


	MENUPROVIDER: Menu[] = [
		{
			title: 'Dashboard',path: '/dashboard/default', icon: 'home', type: 'link', badgeType: 'pill gradient-primary-1'
		},
		{
			title: 'Reports', icon: 'file-text', type: 'sub', badgeType: 'pill gradient-primary-1', children: [
				{ path: '/reports/generate-report', title: 'Generate', type: 'link' }
			]
		}
	];


	MENUCANDIDATE: Menu[] = [
		{
			title: 'Dashboard',path: '/dashboard/default', icon: 'home', type: 'link', badgeType: 'pill gradient-primary-1'
		},
		{
			title: 'Jobs', icon: 'user-check', type: 'sub', active: false, children: [
				{ path: '/job/search', title: 'Search', type: 'link' }
			]
		},
		{
			title: 'Reports', icon: 'file-text', type: 'sub', badgeType: 'pill gradient-primary-1', children: [
				{ path: '/reports/generate-report', title: 'Generate', type: 'link' }
			]
		},
		{
			title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
				{ path: '/candidates/edit-profile', title: 'My profile', type: 'link' },
			]
		}
	];


	MENUADMIN: Menu[] = [
		{
			title: 'Dashboard',path: '/dashboard/default', icon: 'home', type: 'link'
		},
		{
			title: 'Offers', icon: 'briefcase', type: 'sub', active: false, children: [
				{ path: '/offers/offers-list', title: 'List', type: 'link' },
				{ path: '/offers/create-offer', title: 'New Job Offer', type: 'link' },
			]
		},
		{
			title: 'Candidates', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/candidates/candidates-list', title: 'List', type: 'link' },
				{ path: '/candidates/create-candidate', title: 'New JS', type: 'link' },
			]
		},
		{
			title: 'Providers', icon: 'book', type: 'sub', active: false, children: [
				{ path: '/providers/providers-list', title: 'List', type: 'link' },
				{ path: '/providers/create-provider', title: 'New Provider', type: 'link' },
			]
		},
		{
			title: 'Agency Staff', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/user/team-details', title: 'List', type: 'link' },
				{ path: '/user/create-profile', title: 'New Agency Staff', type: 'link' },
			]
		},
		{
			title: 'Reports', icon: 'file-text', type: 'sub', badgeType: 'pill gradient-primary-1', children: [
				{ path: '/reports/generate-report', title: 'Generate', type: 'link' }
			]
		},
		{
			title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [

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

	MENUAGENCY: Menu[] = [
		{
			title: 'Dashboard',path: '/dashboard/default', icon: 'home', type: 'sub', badgeType: 'pill gradient-primary-1'
		},
		{
			title: 'Offers', icon: 'briefcase', type: 'sub', active: false, children: [
				{ path: '/offers/offers-list', title: 'List', type: 'link' },
				{ path: '/offers/create-offer', title: 'New Job Offer', type: 'link' },
			]
		},
		{
			title: 'Candidates', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/candidates/candidates-list', title: 'List', type: 'link' },
				{ path: '/candidates/create-candidate', title: 'New JS', type: 'link' },
			]
		},
		{
			title: 'Providers', icon: 'book', type: 'sub', active: false, children: [
				{ path: '/providers/providers-list', title: 'List', type: 'link' },
				{ path: '/providers/create-provider', title: 'New Provider', type: 'link' },
			]
		},
		{
			title: 'Agency Staff', icon: 'users', type: 'sub', active: false, children: [
				{ path: '/user/team-details', title: 'List', type: 'link' },
				{ path: '/user/create-profile', title: 'New Agency Staff', type: 'link' },
			]
		},
		{
			title: 'Reports', icon: 'file-text', type: 'sub', badgeType: 'pill gradient-primary-1', children: [
				{ path: '/reports/generate-report', title: 'Generate', type: 'link' }
			]
		},
		{
			title: 'Settings', icon: 'settings', type: 'sub', active: false, children: [
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
	items = new BehaviorSubject<Menu[]>(this.MENUADMIN);
	menuCandidate = new BehaviorSubject<Menu[]>(this.MENUCANDIDATE);
	menuProvider = new BehaviorSubject<Menu[]>(this.MENUPROVIDER);
	menuAgency = new BehaviorSubject<Menu[]>(this.MENUAGENCY);
	

	


}
