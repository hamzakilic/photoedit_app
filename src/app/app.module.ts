import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';

import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';

import { ColorPickerModule } from './modulesext/color-picker';
import { AutoCompleteModule } from './modulesext/autocomplete';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { AngularDraggableModule } from 'angular2-draggable';




import { AppComponent } from './app.component';
import { NotSupportedBrowserComponent } from './components//notsupportedbrowser/notsupported.component';
import { LayoutComponent } from './components/layout/layout.component';

import { MenubarComponent } from './components/menubar/menubar.component';

import { SurfaceComponent } from './components/surface/surface.component';
import { MessageBoxModalComponent } from './components/messagebox-modal/messagebox-modal.component';
import { FormNewImageComponent } from './components/form-new-image/form-new-image.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ProjectComponent } from './components/project/project.component';

import { ProjectService } from './services/project.service';
import { KeyboardService } from './services/keyboard.service';
import { AppService } from './services/app.service';
import { FontService } from './services/font.service';
import { UserService } from './services/user.service';
import { EffectService } from './services/effect.service';


import { MouseDirective } from './directives/mouse.directive';
import { KeyboardDirective } from './directives/keyboard.directive';
import { LayerComponent } from './components/layer/layer.component';
import { LayersInfoComponent } from './components/layers-info/layers-info.component';
import { ToolsComponent } from './components/tools/tools.component';
import { LayerSelectedComponent } from './components/layer-selected/layer-selected.component';
import { LayerPropertiesComponent } from './components/layer-properties/layer-properties.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { SelectionPropertiesComponent } from './components/selection-properties/selection-properties.component';
import { BusyComponent } from './components/busy/busy.component';
import { FormResizeComponent } from './components/form-resize/form-resize.component';
import { LayerTextPropertiesComponent } from './components/layer-text-properties/layer-text-properties.component';
import { WorkspaceResizeComponent } from './components/workspace-resize/workspace-resize.component';

import { FormGoogleFontloadComponent } from './components/form-googlefontload/form-googlefontload.component';

import { LayerGraphicsPropertiesComponent } from './components/layer-graphics-properties/layer-graphics-properties.component';
import { FormColorRemapComponent } from './components/form-color-remap/form-color-remap.component';
import { FormSampleImagesComponent } from './components/form-sample-images/form-sample-images.component';
import { FormColorAdjustmentComponent } from './components/form-color-adjustment/form-color-adjustment.component';
import { FormGrayscaleComponent } from './components/form-grayscale/form-grayscale.component';
import { TrackbarComponent } from './components/trackbar/trackbar.component';
import { CropPropertiesComponent } from './components/crop-properties/crop-properties.component';
import { ToolsOptionsComponent } from './components/tools-options/tools-options.component';












@NgModule({
  declarations: [

    AppComponent,
    NotSupportedBrowserComponent,
    LayoutComponent,
    
    MenubarComponent,
    
    SurfaceComponent,
    MessageBoxModalComponent,
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
    SelectionPropertiesComponent,
    BusyComponent,
    FormResizeComponent,
    LayerTextPropertiesComponent,
    WorkspaceResizeComponent,
    FormGoogleFontloadComponent,
    LayerGraphicsPropertiesComponent,
    FormColorRemapComponent,
    FormSampleImagesComponent,
    FormColorAdjustmentComponent,
    TrackbarComponent,
    FormGrayscaleComponent,
    CropPropertiesComponent,
    ToolsOptionsComponent,
    








  ],
  imports: [
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    BusyModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AutoCompleteModule,
    ColorPickerModule,
    VirtualScrollModule,
    AngularDraggableModule

  ],
  providers: [ProjectService, KeyboardService, AppService, FontService, UserService, EffectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

