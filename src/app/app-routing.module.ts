import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './Pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './Pages/list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    loadChildren: './Pages/login/login.module#LoginPageModule' 
  },
  { 
    path: 'register',
    loadChildren: './Pages/login/register/register.module#RegisterPageModule'
  },
  { 
    path: 'add', 
    loadChildren: './Pages/home/add/add.module#AddPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'item/:id',
    loadChildren: './Pages/home/item/item.module#ItemPageModule',
    canActivate: [AuthGuard]
  },
  { 
    path: 'item/:id/edit', 
    loadChildren: './Pages/home/edit/edit.module#EditPageModule',
    canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
