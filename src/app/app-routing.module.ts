import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {AddNewListComponent} from './components/add-new-list/add-new-list.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'add', component: AddNewListComponent},
  {path: 'edit/:id', component: AddNewListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
