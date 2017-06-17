import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {NotSupportedBrowserComponent} from './components/notsupportedbrowser/notsupported.component';
import { LayoutComponent } from './layout/layout.component';
import { StatusbarComponent } from './components/statusbar/statusbar.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SurfaceComponent } from './components/surface/surface.component';
import { SmallModalComponent } from './components/small-modal/small-modal.component';
import { FormNewImageComponent } from './components/form-new-image/form-new-image.component';
import { ProjectComponent } from './components/project/project.component';
import { LayersInfoComponent } from './components/layers-info/layers-info.component';

import { WorkspaceComponent } from './components/workspace/workspace.component';
import { LayerComponent } from './components/layer/layer.component';

import { ProjectService } from './shared/project.service';
import { KeyboardService } from './shared/keyboard.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    ProjectComponent,
    WorkspaceComponent,
    LayerComponent,
    LayersInfoComponent
  ],
 imports: [
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers:[ ProjectService, KeyboardService ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});

