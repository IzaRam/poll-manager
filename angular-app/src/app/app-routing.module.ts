import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnqueteListComponent } from './enquete/enquete-list/enquete-list.component';
import { EnqueteDetailsComponent } from './enquete/enquete-details/enquete-details.component';
import { EnqueteNewComponent } from './enquete/enquete-new/enquete-new.component';

const routes: Routes = [
	{ path: '', redirectTo: '/enquetes', pathMatch: 'full' },
	{ path: 'enquetes', component: EnqueteListComponent },
	{ path: 'enquetes/:id', component: EnqueteDetailsComponent },
	{ path: 'adicionar', component: EnqueteNewComponent },
	{ path: 'editar/:id', component: EnqueteNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
