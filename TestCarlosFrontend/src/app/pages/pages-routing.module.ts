import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FullComponent } from '../layouts/full/full.component';


const routes: Routes = [
	{
		path: '',
		component: FullComponent,
		children: [
			{
				path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'packages', loadChildren: () => import('./packages/packages.module').then(m => m.PackagesModule)
			},
			{
				path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
			},
			{
				path: 'shippings', loadChildren: () => import('./shippings/shippings.module').then(m => m.ShippingsModule)
			},
			{
				path: '',
				redirectTo: 'dashboard',
				pathMatch: 'full',
			},
			// {
			//   path: '**',
			//   component: NotFoundComponent,
			// },
		]
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PagesRoutingModule {
}
