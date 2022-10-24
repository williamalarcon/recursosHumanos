import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'user',
    loadChildren: () => import('../../components/users/users.module').then(m => m.UsersModule),
    data: {
      title: "Users Agency",
      breadcrumb: "Users Agency"
    }
  },
  {
    path: 'admins',
    loadChildren: () => import('../../components/admins/admins.module').then(m => m.AdminsModule),
    data: {
      title: "Admins",
      breadcrumb: "Admins"
    }
  },
  {
    path: 'providers',
    loadChildren: () => import('../../components/providers/providers.module').then(m => m.ProvidersModule),
    data: {
      title: "Providers",
      breadcrumb: "Providers"
    }
  },
  {
    path: 'candidates',
    loadChildren: () => import('../../components/candidates/candidates.module').then(m => m.CandidatesModule),
    data: {
      title: "Candidates",
      breadcrumb: "Candidates"
    }
  },
  {
    path: 'categories',
    loadChildren: () => import('../../components/categories/categories.module').then(m => m.CategoriesModule),
    data: {
      title: "Categories",
      breadcrumb: "Categories"
    }
  },
  
  {
    path: 'offers',
    loadChildren: () => import('../../components/offers/offers.module').then(m => m.OffersModule),
    data: {
      title: "offers",
      breadcrumb: "offers"
    }
  },
  {
    path: 'job',
    loadChildren: () => import('../../components/job-search/job-search.module').then(m => m.JobSearchModule),
    data: {
      breadcrumb: "Job"
    }
  },

  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      breadcrumb: 'Dashboard'
    }
  },
  {
    path: 'reports',
    loadChildren: () => import('../../components/reports/reports.module').then(m => m.ReportsModule),
    data: {
      title: "reports",
      breadcrumb: "reports",
      link: "reports/generate-report"
    },
  },
  {
    path: 'icons',
    loadChildren: () => import('../../components/icons/icons.module').then(m => m.IconsModule),
    data: {
      breadcrumb: "Icons"
    }
  }
  

];
