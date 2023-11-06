import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@core/utils/guards/auth.guard';
import { LoginGuard } from './@core/utils/guards/login.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
    .then( m => m.PagesModule ),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'pages/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages/dashboard' },

];


const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
