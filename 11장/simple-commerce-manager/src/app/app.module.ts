import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ScmMainModule } from './scm-main/scm-main.module'

import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';




@NgModule({
  declarations: [
    AppComponent,
  


  ],
  imports: [
    /* Angular Modules */
    BrowserModule, FormsModule, HttpModule,

    /* App Modules */
    ScmMainModule, ProductModule, CategoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
