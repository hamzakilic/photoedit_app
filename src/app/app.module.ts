import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { StatusbarComponent } from './layout/statusbar/statusbar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { MenubarComponent } from './layout/menubar/menubar.component';

@NgModule({
  declarations: [

    AppComponent,

    LayoutComponent,

    StatusbarComponent,

    TopbarComponent,

    MenubarComponent
  ],
  imports: [
    DropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
