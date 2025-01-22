// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { CreateClientComponent } from './components/create-client/create-client.component';
// import { StatisticsComponent } from './components/statistics/statistics.component';
// import { ClientListComponent } from './components/client-list/client-list.component';
// import { FormsModule } from '@angular/forms';
// import { HomeComponent } from './components/home/home.component';
// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'create-client', component: CreateClientComponent },
//   { path: 'statistics', component: StatisticsComponent },
//   { path: 'client-list', component: ClientListComponent },
//   { path: '', redirectTo: '/create-client', pathMatch: 'full' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes), FormsModule],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'list-client', component: ClientListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
