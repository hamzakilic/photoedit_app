import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { NotSupportedBrowserComponent} from './components//notsupportedbrowser/notsupported.component';
import { LayoutComponent } from './layout/layout.component';
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CanvasTargetComponent } from './components/canvas-target/canvas-target.component';
import { SmallModalComponent } from './components/small-modal/small-modal.component';
import { FormNewImageComponent } from './components/form-new-image/form-new-image.component';




@NgModule({
  declarations: [

    AppComponent,

NotSupportedBrowserComponent,

    LayoutComponent,

    StatusbarComponent,

    MenubarComponent,

    ToolbarComponent,

    CanvasTargetComponent,

    SmallModalComponent,

    FormNewImageComponent
  ],
  imports: [
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
