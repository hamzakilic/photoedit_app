import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import { NotSupportedBrowserComponent } from './components//notsupportedbrowser/notsupported.component';
import { LayoutComponent } from './layout/layout.component';
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SurfaceComponent } from './components/surface/surface.component';
import { SmallModalComponent } from './components/small-modal/small-modal.component';
import { FormNewImageComponent } from './components/form-new-image/form-new-image.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ProjectComponent } from './components/project/project.component';

import { ProjectService } from './shared/project.service';
import { KeyboardService } from './shared/keyboard.service';

import { MouseDirective } from './shared/mouse.directive';
import { LayerComponent } from './components/layer/layer.component';
import { LayersInfoComponent } from './components/layers-info/layers-info.component';



@NgModule({
  declarations: [

    AppComponent,
    NotSupportedBrowserComponent,
    LayoutComponent,
    StatusbarComponent,
    MenubarComponent,
    ToolbarComponent,
    SurfaceComponent,
    SmallModalComponent,
    FormNewImageComponent,
    WorkspaceComponent,
    ProjectComponent,
    MouseDirective,
    LayerComponent,
    LayersInfoComponent
  ],
  imports: [
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ProjectService, KeyboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
