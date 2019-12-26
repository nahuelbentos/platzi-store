import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';



import { AdminGuard } from './admin.guard';
import { LayoutComponent } from './layout/components/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        canActivate: [AdminGuard],
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'contact',
        canActivate: [AdminGuard],
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'demo',
        canActivate: [AdminGuard],
        loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
      },
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: '**',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

