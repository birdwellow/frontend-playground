import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { Test3dcomponentComponent } from './test3dcomponent/test3dcomponent.component';
import { FormsModule } from "@angular/forms";
import { Math2DService } from "./math/math2-d.service";

@NgModule({
  declarations: [
    AppComponent,
    Test3dcomponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [D3Service, Math2DService],
  bootstrap: [AppComponent]
})
export class AppModule { }
