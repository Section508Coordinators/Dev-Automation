import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { InputOneComponent } from './components/input-one.component'
import { InputTwoComponent } from './components/input-two.component'
import { RadioButtonComponent } from './components/radio-button.component'
import { TableComponent } from './components/table.component'
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    InputOneComponent,
    InputTwoComponent,
    RadioButtonComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
