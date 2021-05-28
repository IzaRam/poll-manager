import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnqueteListComponent } from './enquete/enquete-list/enquete-list.component';
import { EnqueteDetailsComponent } from './enquete/enquete-details/enquete-details.component';
import { HeaderComponent } from './header/header.component';
import { EnqueteNewComponent } from './enquete/enquete-new/enquete-new.component';

@NgModule({
  declarations: [
    AppComponent,
    EnqueteListComponent,
    EnqueteDetailsComponent,
    HeaderComponent,
    EnqueteNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
