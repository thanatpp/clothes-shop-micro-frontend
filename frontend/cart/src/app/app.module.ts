import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumberDirective } from './number-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    NumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
