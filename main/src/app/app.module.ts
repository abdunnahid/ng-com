import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';

import { DynamicBrowserTitleModule } from '@nghacks/dynamic-browser-title';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    DynamicBrowserTitleModule.forRoot({
      selector: 'h1#browser-title'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
