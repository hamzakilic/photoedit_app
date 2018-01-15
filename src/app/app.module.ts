import { FormEdgeGradientComponent } from './components/form-edgegradient/form-edgegradient.component';
import { FormCartoonComponent } from './components/form-cartoon/form-cartoon.component';


import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CgBusyModule } from 'angular-busy2';

import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { PopoverModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap';

import { ColorPickerModule } from './modulesext/color-picker';
import { AutoCompleteModule } from './modulesext/autocomplete';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { AngularDraggableModule } from 'angular2-draggable';
import { DndModule } from 'ng2-dnd';





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
import { FormConvolutionComponent } from './components/form-convolution/form-convolution.component';
import { FormErodeDilationComponent } from './components/form-erodedilation/form-erodedilation.component';
import { FormOilPaintingComponent } from './components/form-oilpainting/form-oilpainting.component';
import { TrackbarComponent } from './components/trackbar/trackbar.component';
import { CropPropertiesComponent } from './components/crop-properties/crop-properties.component';
import { ToolsOptionsComponent } from './components/tools-options/tools-options.component';
import { ToolsOptionsClipComponent } from './components/tools-options-clip/tools-options-clip.component';
import { ToolsOptionsBrushComponent } from './components/tools-options-brush/tools-options-brush.component';
import { ToolsOptionsEraseComponent } from './components/tools-options-erase/tools-options-erase.component';
import { ToolsOptionsBucketfillComponent } from './components/tools-options-bucketfill/tools-options-bucketfill.component';
import { AlertComponent } from './components/alert/alert.component';
import { FormAboutComponent } from './components/form-about/form-about.component';
import { FormShortcutsComponent } from './components/form-shortcuts/form-shortcuts.component';
import { ClipboardService } from './services/clipboard.service';













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
    FormConvolutionComponent,
    FormErodeDilationComponent,
    FormOilPaintingComponent,
    FormEdgeGradientComponent,
    FormCartoonComponent,
    CropPropertiesComponent,
    ToolsOptionsComponent,
    ToolsOptionsClipComponent,
    ToolsOptionsBrushComponent,
    ToolsOptionsEraseComponent,
    ToolsOptionsBucketfillComponent,
    AlertComponent,
    FormAboutComponent,
    FormShortcutsComponent,
    
  ],
  imports: [
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    DndModule.forRoot(),
    BrowserAnimationsModule,
    CgBusyModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([]),
    AutoCompleteModule,
    ColorPickerModule,
    VirtualScrollModule,
    AngularDraggableModule
    

  ],
  providers: [ProjectService, KeyboardService, AppService, FontService, UserService, EffectService,ClipboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

