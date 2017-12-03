import { CmdPaste } from './../../commands/cmdPaste';
import { CmdCopy } from './../../commands/cmdCopy';
import { CmdShowFormShortcuts } from './../../commands/cmdShowFormShortcuts';
import { CmdShowError } from './../../commands/cmdShowError';
import { CmdShowFormAbout } from './../../commands/cmdShowFormAbout';
import { ShortCut } from './../../services/keyboard.service';

import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuItem } from './menu';
import { Utility } from '../../lib/utility';
import { ReadFileOrUrl } from '../../lib/readFileOrUrl';
import { Message } from '../../entities/message';
import { MessageBus } from '../../lib/messageBus';
import { MenuItemOpenFile } from '../menubar/menuItems/menuItemOpenFile';
import { MenuItemOpenImage } from '../menubar/menuItems/menuItemOpenImage';
import { MenuItemNewImage } from '../menubar/menuItems/menuItemNewImage';

import { ProjectService } from '../../services/project.service';
import { AppService } from '../../services/app.service';
import { EffectService } from '../../services/effect.service';

import { SomeTestFuncs } from '../../lib/someTestFuncs'

import { Callback } from '../../lib/callback';
import { CmdZoom } from '../../commands/cmdZoom';

import { CmdNewLayer } from '../../commands/cmdNewLayer';
import { CmdResizeWorkspace } from '../../commands/cmdResizeWorkspace';
import { CmdShowFormResize } from '../../commands/cmdShowFormResize';
import { CmdRotateWorkspace } from '../../commands/cmdRotateWorkspace';
import { CmdAddTextLayer } from '../../commands/cmdAddTextLayer';
import { CmdShowFormFontLoad } from '../../commands/cmdShowFormFontLoad';
import { CmdShowFormLayerProperties } from '../../commands/cmdShowFormLayerProperties';
import { CmdShowFormColorRemap} from '../../commands/cmdShowFormColorRemap';
import { CmdShowFormColorAdjustments} from '../../commands/cmdShowFormColorAdjustment';
import { CmdShowFormSampleImages } from '../../commands/cmdShowFormSampleImages';
import { CmdShowFormGrayscale } from '../../commands/cmdShowFormGrayscale';

import { CmdColorRemap } from '../../commands/cmdColorRemap';
import { CmdExecuteImageAlgorithms } from '../../commands/cmdExecuteImageAlgorithms';
import { CmdCreateInstagramFilter } from '../../commands/cmdCreateInstagramFilter';

import { ImageAlgorithmFlip } from '../../lib/imagealgorithm/imageAlgorithmFlip';
import { ImageAlgorithmGrayscale } from '../../lib/imagealgorithm/imageAlgorithmGrayscale';
import { KeyboardService } from '../../services/keyboard.service';
import { CmdCut } from '../../commands/cmdCut';
import { ClipboardService } from '../../services/clipboard.service';


@Component({
  selector: 'menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  public menus: Menu[];
  private _projectService: ProjectService;
  private _appService: AppService;
  private _effectService:EffectService;
  private _clipboardService:ClipboardService;
  constructor(projectService: ProjectService, appservice: AppService,effectService:EffectService,keyboardService:KeyboardService,clipboardService:ClipboardService) {
    this._projectService = projectService;
    this._appService = appservice;
    this._effectService=effectService;
    this._clipboardService=clipboardService;
    this.menus = [];

    let menuFile = new Menu("File");    
    menuFile.childs.push(new MenuItemNewImage(projectService,new ShortCut(true,true,false,'N',menuFile.name)));
    menuFile.childs.push(new MenuItemOpenImage(projectService,new ShortCut(true,false,false,'O',menuFile.name)));
    menuFile.childs.push(new MenuItem("Sample Images", new Callback(() => { this.showFormSampleImages(true) }),new ShortCut(true,true,false,'O',menuFile.name)));
    let divider = new MenuItem('divider', undefined);
    divider.isDivider = true;
    menuFile.childs.push(divider);   
    this.menus.push(menuFile);

    let divider2 = new MenuItem('divider', undefined);
    divider2.isDivider = true;

   



    
    let menuEdit = new Menu("Edit");
    menuEdit.isDisabledCallback=new Callback(()=>this.hasActiveWorkspace())
    menuEdit.childs.push(new MenuItem("Cut", new Callback(()=>this.cut()),new ShortCut(true,false,false,'X',menuEdit.name)));
    menuEdit.childs.push(new MenuItem("Copy", new Callback(()=>this.copy()),new ShortCut(true,false,false,'C',menuEdit.name)));
    menuEdit.childs.push(new MenuItem("Paste", new Callback(()=>this.paste()),new ShortCut(true,false,false,'V',menuEdit.name)));
    menuEdit.childs.push(new MenuItem("Delete", new Callback(this.notImplementedYet),new ShortCut(false,false,false,'D',menuEdit.name)));
    this.menus.push(menuEdit);




    

    let menuImage = new Menu("Image");
    menuImage.isDisabledCallback=new Callback(()=>this.hasActiveWorkspace())
    menuImage.childs.push(new MenuItem("Resize", new Callback(() => (this.resize())),new ShortCut(true,true,false,'R',menuImage.name)));
    menuImage.childs.push(new MenuItem("Rotate 90", new Callback(() => { this.rotate() }),new ShortCut(true,false,false,'R',menuImage.name)));
    let wDivider=new MenuItem("divider",undefined);
    wDivider.isDivider=true;
    menuImage.childs.push(wDivider);
    menuImage.childs.push(new MenuItem("Flip Horizontal", new Callback(() => { this.flipImage(true) })));
    menuImage.childs.push(new MenuItem("Flip Vertical", new Callback(() => { this.flipImage(false) })));

    this.menus.push(menuImage);

    let menuLayers = new Menu("Layer");
    menuLayers.isDisabledCallback=new Callback(()=>this.hasActiveWorkspace())
    menuLayers.childs.push(new MenuItem("New", new Callback(() => { this.newLayer() }),new ShortCut(false,false,true,'N',menuLayers.name)));
    menuLayers.childs.push(new MenuItem("New from selection", new Callback(this.notImplementedYet)));
    menuLayers.childs.push(new MenuItemOpenImage(projectService,new ShortCut(false,false,true,'F',menuLayers.name),  "New from a file", false));
    menuLayers.childs.push(new MenuItem("New text layer", new Callback(()=>this.newTextLayer()),new ShortCut(false,false,true,'T',menuLayers.name)));
    menuLayers.childs.push(new MenuItem("New from samples", new Callback(()=>this.showFormSampleImages(false)),new ShortCut(false,false,true,'I',menuLayers.name)));
    let wDivider2=new MenuItem("divider",undefined);
    wDivider2.isDivider=true;
    menuLayers.childs.push(wDivider2);
    menuLayers.childs.push(new MenuItem("Flip Horizontal", new Callback(() => { this.flipImage(true) }),new ShortCut(false,false,true,'H',menuLayers.name)));
    menuLayers.childs.push(new MenuItem("Flip Vertical", new Callback(() => { this.flipImage(false) }),new ShortCut(false,false,true,'V',menuLayers.name)));
    this.menus.push(menuLayers);

    let menuFilters = new Menu("Filters");
    menuFilters.isDisabledCallback=new Callback(()=>this.hasActiveWorkspace())
    menuFilters.childs.push(new MenuItem("Color remap", new Callback(this.showFormColorRemap)));
    menuFilters.childs.push(new MenuItem("Color adjustment", new Callback(this.showFormColorAdjustment)));
    menuFilters.childs.push(new MenuItem("Grayscale", new Callback(this.showFormGrayscale)));
    this.menus.push(menuFilters);
    
    let font = new Menu("Font");
    font.childs.push(new MenuItem("Load Google Fonts", new Callback(this.showFormFontLoad)));
    this.menus.push(font);

 /*    let window = new menu("Window");
    window.childs.push(new menuItem("Show Layer Properties", new Callback(this.showFormLayerProperties)));
    this.menus.push(window); */

    let menuHelp = new Menu("Help");
    menuHelp.childs.push(new MenuItem("About", new Callback(this.showAbout)));
    menuHelp.childs.push(new MenuItem("Keyboard", new Callback(this.showShortcuts),new ShortCut(true,true,false,'K',menuHelp.name)));
    this.menus.push(menuHelp);


    let menuTest = new Menu("Test");
    menuTest.childs.push(new MenuItem("Create Instagram", new Callback(() => { this.createInstagramFilter(); })));
   // this.menus.push(menuTest);

    this.menus.forEach((item)=>{
      item.childs.forEach((subitem)=>{
        if(subitem.shortCut){
          
          keyboardService.add(subitem.shortCut);
        }

      })
    })

  }

  ngOnInit() {
  }


  private hasActiveWorkspace():boolean{
    
    return !this._projectService.currentProject.activeWorkspace;
  }

  createInstagramFilter() {

    
    let cmd = new CmdCreateInstagramFilter(this._projectService,this._appService);
   
    cmd.executeAsync();
  }

  notImplementedYet() {
    let cmd=new CmdShowError('not implemented yet');
    cmd.executeAsync();
    
  }
  cut() {
    let cmd=new CmdCut(this._projectService);
    cmd.executeAsync();
    
  }
  copy() {
    let cmd=new CmdCopy(this._projectService,this._appService,this._clipboardService);
    cmd.executeAsync();
    
  }
  paste() {
    let cmd=new CmdPaste(this._projectService);
    cmd.executeAsync();
    
  }
  showFormFontLoad(){
     let cmd=new CmdShowFormFontLoad();
     cmd.executeAsync();
  }

  showFormLayerProperties(){
    let cmd=new CmdShowFormLayerProperties();
    cmd.executeAsync();
 }

 showFormColorRemap(){
  let cmd=new CmdShowFormColorRemap();
  cmd.executeAsync();
 }

 showFormColorAdjustment(){
  let cmd=new CmdShowFormColorAdjustments();
  cmd.executeAsync();
 }

 showFormGrayscale(){
   
  let cmd=new CmdShowFormGrayscale();
  cmd.executeAsync();
 }

/**
 * opens sample images dialog for adding new workspace or layer
 */
 showFormSampleImages(openAsWorkspace:boolean){
  let cmd=new CmdShowFormSampleImages(openAsWorkspace);
  cmd.executeAsync();
}

  showAbout() {
    
    let cmd=new CmdShowFormAbout();
    cmd.executeAsync();
    
  }
  showShortcuts() {
    
    let cmd=new CmdShowFormShortcuts();
    cmd.executeAsync();
    
  }
  zoomIn() {
    let cmd = new CmdZoom(CmdZoom.In, this._projectService);
    cmd.executeAsync();
  }

  zoomOut() {
    let cmd = new CmdZoom(CmdZoom.Out, this._projectService);
    cmd.executeAsync();
  }
  newLayer() {
    let cmd = new CmdNewLayer(this._projectService);
    cmd.executeAsync();
  }
  newTextLayer(){
    let cmd= new CmdAddTextLayer(this._projectService,this._appService);
    cmd.executeAsync();
  }

  newLayerFromAFile() {
    let cmd = new CmdNewLayer(this._projectService);
    cmd.executeAsync();
  }
  resize() {
    let cmd = new CmdShowFormResize();
    cmd.executeAsync();
  }

  flipImage(isHorizontal:boolean) {
    let cmd = new CmdExecuteImageAlgorithms([new ImageAlgorithmFlip(isHorizontal)],this._projectService,this._appService );
    cmd.executeAsync();
  }

  
  grayscale() {
    let cmd = new CmdExecuteImageAlgorithms([new ImageAlgorithmGrayscale(1)],this._projectService,this._appService );
    cmd.executeAsync();
  }


  rotate() {
    let cmd = new CmdRotateWorkspace(this._projectService, this._appService);
    cmd.executeAsync();
  }

   colorRemap(name:string) {
    let cmd = new CmdColorRemap(name,this._projectService, this._appService,this._effectService);
    cmd.executeAsync();
  }




  isMenuItem(item: any): boolean {
    return item instanceof MenuItem;

  }

}




