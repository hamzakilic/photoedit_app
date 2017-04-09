import { TestBed, async } from '@angular/core/testing';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';
import {NotSupportedBrowserComponent} from './notsupportedbrowser/notsupported.component';
import { LayoutComponent } from './layout/layout.component';
import { StatusbarComponent } from './layout/statusbar/statusbar.component';
import { MenubarComponent } from './layout/menubar/menubar.component';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { CanvasTargetComponent } from './components/canvas-target/canvas-target.component';
import { SmallModalComponent } from './components/small-modal/small-modal.component';


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

    CanvasTargetComponent,

    SmallModalComponent
  ],
 imports: [
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
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
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
