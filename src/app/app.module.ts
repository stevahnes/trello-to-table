import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { FileDropDirective } from './components/tabulator/directives/file-drop.directive';
import { TabulatorComponent } from './components/tabulator/tabulator.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [AppComponent, FileDropDirective, TabulatorComponent, AboutComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, AgGridModule.withComponents([])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
