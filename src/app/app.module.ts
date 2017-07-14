import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';

import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';



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
import { AppService } from './app.service';

import { MouseDirective } from './shared/mouse.directive';
import { KeyboardDirective } from './shared/keyboard.directive';
import { LayerComponent } from './components/layer/layer.component';
import { LayersInfoComponent } from './components/layers-info/layers-info.component';
import { ToolsComponent } from './components/tools/tools.component';
import { LayerSelectedComponent } from './components/layer-selected/layer-selected.component';
import { LayerPropertiesComponent } from './components/layer-properties/layer-properties.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { CropPropertiesComponent } from './components/crop-properties/crop-properties.component';
import { BusyComponent } from './components/busy/busy.component';





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
    KeyboardDirective,
    LayerComponent,
    LayersInfoComponent,
    ToolsComponent,
    LayerSelectedComponent,
    LayerPropertiesComponent,
    ZoomComponent,
    CropPropertiesComponent,
    BusyComponent,
    
    
    
  ],
  imports: [
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    BusyModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [ProjectService, KeyboardService,AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

