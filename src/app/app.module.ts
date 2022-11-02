import { FormulariocatalogComponent } from './shared/formulariocatalog/formulariocatalog.component';
import { CatalogsComponent } from './pages/catalogs/catalogs.component';
import { TableComponent } from './shared/table/table.component';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxChildProcessModule } from 'ngx-childprocess';
import { LoadingComponent } from './shared/loading/loading.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TableComponent,
    LoadingComponent,
    CatalogsComponent,
    FormulariocatalogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxChildProcessModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
