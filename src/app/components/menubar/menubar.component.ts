import { ImageAlgorithmEdgeDetectionLaplace5x5_3 } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionLaplace5x5_3';
import { ImageAlgorithmEdgeDetectionLaplaceGaussian } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionLaplaceGaussian';
import { ImageAlgorithmEdgeDetectionLaplace5x5_2 } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionLaplace5x5_2';
import { ImageAlgorithmEdgeDetectionLaplace5x5 } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionLaplace5x5';
import { ImageAlgorithmEdgeDetectionLaplace3x3 } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionLaplace3x3';
import { ImageAlgorithmHighPass } from './../../lib/imagealgorithm/convolution/imageAlgorithmHighPass';
import { ImageAlgorithmEmbossTopLeftBottomRight } from './../../lib/imagealgorithm/convolution/imageAlgorithmEmbossTopLeftBottomRight';
import { ImageAlgorithmEmbossIntense } from './../../lib/imagealgorithm/convolution/imageAlgorithmEmbossIntense';
import { ImageAlgorithmEmboss45Degree } from './../../lib/imagealgorithm/convolution/imageAlgorithmEmboss45Degree';
import { ImageAlgorithmEmboss } from './../../lib/imagealgorithm/convolution/imageAlgorithmEmboss';
import { ImageAlgorithmEdgeDetectionTopLeftBottomRight } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionTopLeftBottomRight';
import { ImageAlgorithmEdgeDetectionVertical } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionVertical';
import { ImageAlgorithmEdgeDetectionHorizontal } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetectionHorizontal';
import { ImageAlgorithmEdgeDetection45Degree } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetection45Degree';
import { ImageAlgorithmEdgeDetection } from './../../lib/imagealgorithm/convolution/imageAlgorithmEdgeDetection';
import { ImageAlgorithmSharpenIntense } from './../../lib/imagealgorithm/convolution/imageAlgorithmSharpenIntense';
import { ImageAlgorithmSharpen5x5 } from './../../lib/imagealgorithm/convolution/imageAlgorithmSharpen5x5';
import { ImageAlgorithmSharpen3x3Factor } from './../../lib/imagealgorithm/convolution/imageAlgorithmSharpen3x3Factor';
import { ImageAlgorithmSharpen3x3 } from './../../lib/imagealgorithm/convolution/imageAlgorithmSharpen3x3';
import { ImageAlgorithmSharpen } from './../../lib/imagealgorithm/convolution/imageAlgorithmSharpen';
import { ImageAlgorithmSoften } from './../../lib/imagealgorithm/convolution/imageAlgorithmSoften';


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
import { CmdClear } from '../../commands/cmdClear';
import { CmdUndo } from '../../commands/cmdUndo';
import { CmdRedo } from '../../commands/cmdRedo';
import { CmdExportWorkspace } from '../../commands/cmdExportWorkspace';
import { ImageAlgorithmBlur3x3 } from '../../lib/imagealgorithm/convolution/imageAlgorithmBlur3x3';
import { ImageAlgorithmGamma } from '../../lib/imagealgorithm/imageAlgorithmGamma';

import { ImageAlgorithmBlurMotionRightToLeft } from './../../lib/imagealgorithm/convolution/imageAlgorithmBlurMotionRightToLeft';
import { ImageAlgorithmBlurMotionLeftToRight } from './../../lib/imagealgorithm/convolution/imageAlgorithmBlurMotionLeftToRight';
import { ImageAlgorithmBlurMotion } from './../../lib/imagealgorithm/convolution/imageAlgorithmBlurMotion';
import { ImageAlgorithmBlurGaussian5x5 } from './../../lib/imagealgorithm/convolution/imageAlgorithmBlurGaussian5x5';
import { ImageAlgorithmBlurGaussian3x3 } from './../../lib/imagealgorithm/convolution/imageAlgorithmBlurGaussian3x3';
import { ImageAlgorithmBlur5x5 } from './../../lib/imagealgorithm/convolution/imageAlgorithmBlur5x5';
import { CmdShowFormConvolution } from './../../commands/cmdShowFormConvolution';
import { CmdChangeBackgroundLayerColor } from './../../commands/cmdChangeBackgroundLayerColor';
import { CmdCloneLayer } from './../../commands/cmdCloneLayer';
import { CmdFlipImage } from './../../commands/cmdFlipImage';
import { CmdFlipWorkspace } from './../../commands/cmdFlipWorkspace';

import { CmdNewLayerFromSelection } from './../../commands/cmdNewLayerFromSelection';
import { CmdPaste } from './../../commands/cmdPaste';
import { CmdCopy } from './../../commands/cmdCopy';
import { CmdShowFormShortcuts } from './../../commands/cmdShowFormShortcuts';
import { CmdShowError } from './../../commands/cmdShowError';
import { CmdShowFormAbout } from './../../commands/cmdShowFormAbout';
import { ShortCut } from './../../services/keyboard.service';


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
    menuFile.childs.push(new MenuItemOpenImage(this._appService,projectService,new ShortCut(true,false,false,'O',menuFile.name)));
    menuFile.childs.push(new MenuItem("Sample Images", Callback.from(() => { this.showFormSampleImages(true) }),new ShortCut(true,true,false,'O',menuFile.name)));
    let divider = new MenuItem('divider', undefined);
    divider.isDivider = true;
    menuFile.childs.push(divider);   
    this.menus.push(menuFile);
     
    menuFile.childs.push(new MenuItem("Export jpeg", Callback.from(() => { this.export("image/jpeg") }),new ShortCut(true,false,true,'S',menuFile.name)));
    menuFile.childs.push(new MenuItem("Export png", Callback.from(() => { this.export("image/png") }),new ShortCut(true,false,true,'D',menuFile.name)));
    let divider5 = new MenuItem('divider', undefined);
    divider5.isDivider = true;
    menuFile.childs.push(divider5);   
    menuFile.childs.push(new MenuItem("Preview", Callback.from(() => { this.exportPreview("image/png") }),new ShortCut(true,false,true,'P',menuFile.name)));
    
    let divider2 = new MenuItem('divider', undefined);
    divider2.isDivider = true;

   



    
    let menuEdit = new Menu("Edit");
    menuEdit.isDisabledCallback=Callback.from(()=>this.hasActiveWorkspace())
    menuEdit.childs.push(new MenuItem("Cut", Callback.from(()=>this.cut()),new ShortCut(true,false,false,'X',menuEdit.name)));
    menuEdit.childs.push(new MenuItem("Copy", Callback.from(()=>this.copy()),new ShortCut(true,false,false,'C',menuEdit.name)));
    menuEdit.childs.push(new MenuItem("Paste", Callback.from(()=>this.paste()),new ShortCut(true,false,false,'V',menuEdit.name)));
    let dividerEdit = new MenuItem('divider', undefined);
    dividerEdit.isDivider = true;
    menuEdit.childs.push(dividerEdit);   
    menuEdit.childs.push(new MenuItem("Clear", Callback.from(()=>this.clear()),new ShortCut(false,false,false,'Delete',menuEdit.name)));

    let dividerEdit2 = new MenuItem('divider', undefined);
    dividerEdit2.isDivider = true;
    menuEdit.childs.push(dividerEdit2);   
    menuEdit.childs.push(new MenuItem("Undo", Callback.from(()=>this.undo()),new ShortCut(true,false,false,'Z',menuEdit.name)));
    menuEdit.childs.push(new MenuItem("Redo", Callback.from(()=>this.redo()),new ShortCut(true,false,false,'Y',menuEdit.name)));
    this.menus.push(menuEdit);





    

    let menuImage = new Menu("Workspace");
    menuImage.isDisabledCallback=Callback.from(()=>this.hasActiveWorkspace())
    menuImage.childs.push(new MenuItem("Resize", Callback.from(() => (this.resize())),new ShortCut(true,true,false,'R',menuImage.name)));
    menuImage.childs.push(new MenuItem("Rotate 90", Callback.from(() => { this.rotate() }),new ShortCut(true,false,false,'R',menuImage.name)));
    let wDivider=new MenuItem("divider",undefined);
    wDivider.isDivider=true;
    menuImage.childs.push(wDivider);
    menuImage.childs.push(new MenuItem("Flip Horizontal", Callback.from(() => { this.flipWorkspaceImage(true) })));
    menuImage.childs.push(new MenuItem("Flip Vertical", Callback.from(() => { this.flipWorkspaceImage(false) })));
    let wDivider3=new MenuItem("divider",undefined);
    wDivider3.isDivider=true;
    menuImage.childs.push(wDivider3);
    menuImage.childs.push(new MenuItem("Next Background Color", Callback.from(() => { this.changeWorkspaceBackgroundColor() })));

    this.menus.push(menuImage);

    let menuLayers = new Menu("Layer");
    menuLayers.isDisabledCallback=Callback.from(()=>this.hasActiveWorkspace())
    menuLayers.childs.push(new MenuItem("New", Callback.from(() => { this.newLayer() }),new ShortCut(false,false,true,'N',menuLayers.name)));
    menuLayers.childs.push(new MenuItem("New from clipboard", Callback.from(()=>this.newLayerFromSelection())));
    menuLayers.childs.push(new MenuItem("Clone selected", Callback.from(()=>this.cloneSelectedLayer())));
    menuLayers.childs.push(new MenuItemOpenImage(this._appService,projectService,new ShortCut(false,false,true,'F',menuLayers.name),  "New from a file", false));
    menuLayers.childs.push(new MenuItem("New text layer", Callback.from(()=>this.newTextLayer()),new ShortCut(false,false,true,'T',menuLayers.name)));
    menuLayers.childs.push(new MenuItem("New from samples", Callback.from(()=>this.showFormSampleImages(false)),new ShortCut(false,false,true,'I',menuLayers.name)));
    let wDivider2=new MenuItem("divider",undefined);
    wDivider2.isDivider=true;
    menuLayers.childs.push(wDivider2);
    menuLayers.childs.push(new MenuItem("Flip Horizontal", Callback.from(() => { this.flipImage(true) }),new ShortCut(false,false,true,'H',menuLayers.name)));
    menuLayers.childs.push(new MenuItem("Flip Vertical", Callback.from(() => { this.flipImage(false) }),new ShortCut(false,false,true,'V',menuLayers.name)));
    this.menus.push(menuLayers);

    let menuFilters = new Menu("Filters");
    menuFilters.isDisabledCallback=Callback.from(()=>this.hasActiveWorkspace())
    menuFilters.childs.push(new MenuItem("Color remap", Callback.from(this.showFormColorRemap)));
    menuFilters.childs.push(new MenuItem("Color adjustment", Callback.from(this.showFormColorAdjustment)));
    menuFilters.childs.push(new MenuItem("Grayscale", Callback.from(this.showFormGrayscale)));
    menuFilters.childs.push(new MenuItem("Blur", Callback.from(this.showFormBlur)));
    menuFilters.childs.push(new MenuItem("Soften", Callback.from(this.showFormSoften)));
    menuFilters.childs.push(new MenuItem("Sharpen", Callback.from(this.showFormSharpen)));
    menuFilters.childs.push(new MenuItem("Edge detection", Callback.from(this.showFormEdgeDetection)));
    menuFilters.childs.push(new MenuItem("Emboss", Callback.from(this.showFormEmboss)));
    menuFilters.childs.push(new MenuItem("High pass", Callback.from(this.showFormHighPass)));
    this.menus.push(menuFilters);
    
    let font = new Menu("Font");
    font.childs.push(new MenuItem("Load Google Fonts", Callback.from(this.showFormFontLoad)));
    this.menus.push(font);

 /*    let window = new menu("Window");
    window.childs.push(new menuItem("Show Layer Properties", Callback.from(this.showFormLayerProperties)));
    this.menus.push(window); */

    let menuHelp = new Menu("Help");
    menuHelp.childs.push(new MenuItem("About", Callback.from(this.showAbout)));
    menuHelp.childs.push(new MenuItem("Keyboard", Callback.from(this.showShortcuts),new ShortCut(true,true,false,'K',menuHelp.name)));
    menuHelp.childs.push(new MenuItem("Bug report", Callback.from(this.openBugLink)));
    menuHelp.childs.push(new MenuItem("Twitter", Callback.from(this.openTwitterLink)));
    this.menus.push(menuHelp);


    let menuTest = new Menu("Test");
    menuTest.childs.push(new MenuItem("Create Instagram", Callback.from(() => { this.createInstagramFilter(); })));
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

  newLayerFromSelection() {
    let cmd=new CmdNewLayerFromSelection(this._projectService,this._appService);
    cmd.executeAsync();
    
  }
  cloneSelectedLayer() {
    let cmd=new CmdCloneLayer(this._projectService,this._appService);
    cmd.executeAsync();    
  }
  openBugLink(){
    window.open("https://github.com/hamzakilic/photoedit_app/issues","_blank");
  }
  openTwitterLink(){
    window.open("https://twitter.com/photoedit_onlin","_blank");
  }

  clear() {
    let cmd=new CmdClear(this._projectService,this._appService,this._clipboardService);
    cmd.executeAsync();
    
  }

  cut() {
    let cmd=new CmdCut(this._projectService,this._appService,this._clipboardService);
    cmd.executeAsync();
    
  }

  undo() {
    let cmd=new CmdUndo(this._projectService,this._appService);
    cmd.executeAsync();
    
  }

  redo() {
    let cmd=new CmdRedo(this._projectService,this._appService);
    cmd.executeAsync();
    
  }


  copy() {
    let cmd=new CmdCopy(this._projectService,this._appService,this._clipboardService);
    cmd.executeAsync();
    
  }
  paste() {
    let cmd=new CmdPaste(this._projectService,this._clipboardService);
    cmd.executeAsync();
    
  }

  changeWorkspaceBackgroundColor() {
    let cmd=new CmdChangeBackgroundLayerColor(this._projectService,this._appService);
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
 showFormBlur(){
   
  let cmd=new CmdShowFormConvolution([
    new ImageAlgorithmBlur3x3(),
    new ImageAlgorithmBlur5x5(),
    new ImageAlgorithmBlurGaussian3x3(),
    new ImageAlgorithmBlurGaussian5x5(),
    new ImageAlgorithmBlurMotion(),
    new ImageAlgorithmBlurMotionLeftToRight(),
    new ImageAlgorithmBlurMotionRightToLeft()
    
  ]);
  cmd.executeAsync();
 }


 showFormSoften(){
   
  let cmd=new CmdShowFormConvolution([
    new ImageAlgorithmSoften(),
    
  ]);
  cmd.executeAsync();
 }
 showFormSharpen(){
   
  let cmd=new CmdShowFormConvolution([
    new ImageAlgorithmSharpen(),
    new ImageAlgorithmSharpen3x3(),
    new ImageAlgorithmSharpen3x3Factor(),
    new ImageAlgorithmSharpen5x5(),
    new ImageAlgorithmSharpenIntense(),
    
  ]);
  cmd.executeAsync();
 }
 showFormEdgeDetection(){
   
  let cmd=new CmdShowFormConvolution([
    new ImageAlgorithmEdgeDetection(),
    new ImageAlgorithmEdgeDetection45Degree(),
    new ImageAlgorithmEdgeDetectionHorizontal(),
    new ImageAlgorithmEdgeDetectionVertical(),
    new ImageAlgorithmEdgeDetectionTopLeftBottomRight(),
    new ImageAlgorithmEdgeDetectionLaplace3x3(false),
    new ImageAlgorithmEdgeDetectionLaplace3x3(true),
    new ImageAlgorithmEdgeDetectionLaplace5x5(false),
    new ImageAlgorithmEdgeDetectionLaplace5x5(true),
    /* new ImageAlgorithmEdgeDetectionLaplace5x5_2(false),        
    new ImageAlgorithmEdgeDetectionLaplace5x5_2(true),
    new ImageAlgorithmEdgeDetectionLaplace5x5_3(false),    
    new ImageAlgorithmEdgeDetectionLaplace5x5_3(true), */
    new ImageAlgorithmEdgeDetectionLaplaceGaussian(false),
    new ImageAlgorithmEdgeDetectionLaplaceGaussian(true),
  ]);
  cmd.executeAsync();
 }

 showFormEmboss(){
   
  let cmd=new CmdShowFormConvolution([
    new ImageAlgorithmEmboss(),
    new ImageAlgorithmEmboss45Degree(),
    new ImageAlgorithmEmbossIntense(),
    new ImageAlgorithmEmbossTopLeftBottomRight(),
  ]);
  cmd.executeAsync();
 }


 showFormHighPass(){
   
  let cmd=new CmdShowFormConvolution([
    new ImageAlgorithmHighPass()
    
  ]);
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

  flipWorkspaceImage(isHorizontal:boolean) {
    let cmd = new CmdFlipWorkspace(isHorizontal,this._projectService,this._appService );
    cmd.executeAsync();
  }

  flipImage(isHorizontal:boolean) {
    let cmd = new CmdFlipImage(isHorizontal,this._projectService,this._appService );
    cmd.executeAsync();
  }

  export(format:string){
    let cmd=new CmdExportWorkspace(format,false,this._projectService,this._appService);
    cmd.executeAsync();
  }
  exportPreview(format:string){
    let cmd=new CmdExportWorkspace(format,true,this._projectService,this._appService);
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




