import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
