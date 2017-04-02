import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import {NotSupportedBrowserComponent} from './notsupportedbrowser/notsupported.component';
import { LayoutComponent } from './layout/layout.component';
import { StatusbarComponent } from './layout/statusbar/statusbar.component';
import { MenubarComponent } from './layout/menubar/menubar.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { CanvasTargetComponent } from './components/canvas-target/canvas-target.component';

@NgModule({
  declarations: [

    AppComponent,

NotSupportedBrowserComponent,

    LayoutComponent,

    StatusbarComponent,

    MenubarComponent,

    ToolbarComponent,

    CanvasTargetComponent
  ],
  imports: [
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
