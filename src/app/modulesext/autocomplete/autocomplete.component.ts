import { Component, OnInit } from '@angular/core';
import { Directive, HostListener, Input, OnDestroy } from '@angular/core';
import {  Output, EventEmitter, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() public allowClear:boolean = false;
  @Input() public placeholder:string = '';
  @Input() public idField:string = 'id';
  @Input() public textField:string = 'text';
  @Input() public childrenField:string = 'children';
  @Input() public multiple:boolean = false;

  @Input()
  public set items(value:Array<any>) {
   
    if (!value) {
      this._items = this.itemObjects = [];
    } else {
      this._items = value.filter((item:any) => {
        if ((typeof item === 'string') || (typeof item === 'object' && item && item[this.textField] && item[this.idField])) {
          return item;
        }
      });
      this.itemObjects = this._items.map((item:any) => (typeof item === 'string' ? new SelectItem(item) : new SelectItem({id: item[this.idField], text: item[this.textField], children: item[this.childrenField]})));
    }
  }

  @Input()
  public set disabled(value:boolean) {
    this._disabled = value;
    if (this._disabled === true) {
      this.hideOptions();
    }
  }

  public get disabled():boolean {
    return this._disabled;
  }

  @Input()
  public set active(selectedItems:Array<any>) {
    if (!selectedItems || selectedItems.length === 0) {
      this._active = [];
    } else {
      let areItemsStrings = typeof selectedItems[0] === 'string';

      this._active = selectedItems.map((item:any) => {
        let data = areItemsStrings
          ? item
          : {id: item[this.idField], text: item[this.textField]};

        return new SelectItem(data);
      });
    }
  }

  @Output() public data:EventEmitter<any> = new EventEmitter();
  @Output() public selected:EventEmitter<any> = new EventEmitter();
  @Output() public removed:EventEmitter<any> = new EventEmitter();
  @Output() public typed:EventEmitter<any> = new EventEmitter();
  @Output() public opened:EventEmitter<any> = new EventEmitter();

  public options:Array<SelectItem> = [];
  public itemObjects:Array<SelectItem> = [];
  public activeOption:SelectItem;
  public element:ElementRef;

  public get active():Array<any> {
    return this._active;
  }

  private set optionsOpened(value:boolean){
    this._optionsOpened = value;
    this.opened.emit(value);
  }

  private get optionsOpened(): boolean{
    return this._optionsOpened;
  }

  protected onChange:any = Function.prototype;
  protected onTouched:any = Function.prototype;

  private inputMode:boolean = false;
  private _optionsOpened:boolean = false;
  private behavior:OptionsBehavior;
  private inputValue:string = '';
  private _items:Array<any> = [];
  private _disabled:boolean = false;
  private _active:Array<SelectItem> = [];

  public constructor(element:ElementRef, private sanitizer:DomSanitizer) {
    this.element = element;
    this.clickedOutside = this.clickedOutside.bind(this);
  }

  public sanitize(html:string):SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public inputEvent(e:any, isUpMode:boolean = false):void {
    // tab
    if (e.keyCode === 9) {
      return;
    }
    if (isUpMode && (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 ||
      e.keyCode === 40 || e.keyCode === 13)) {
      e.preventDefault();
      return;
    }
    // backspace
    if (!isUpMode && e.keyCode === 8) {
      let el:any = this.element.nativeElement
        .querySelector('div.ui-select-container > input');
      if (!el.value || el.value.length <= 0) {
        if (this.active.length > 0) {
          this.remove(this.active[this.active.length - 1]);
        }
        e.preventDefault();
      }
    }
    // esc
    if (!isUpMode && e.keyCode === 27) {
      this.hideOptions();
      this.element.nativeElement.children[0].focus();
      e.preventDefault();
      return;
    }
    // del
    if (!isUpMode && e.keyCode === 46) {
      if (this.active.length > 0) {
        this.remove(this.active[this.active.length - 1]);
      }
      e.preventDefault();
    }
    // left
    if (!isUpMode && e.keyCode === 37 && this._items.length > 0) {
      this.behavior.first();
      e.preventDefault();
      return;
    }
    // right
    if (!isUpMode && e.keyCode === 39 && this._items.length > 0) {
      this.behavior.last();
      e.preventDefault();
      return;
    }
    // up
    if (!isUpMode && e.keyCode === 38) {
      this.behavior.prev();
      e.preventDefault();
      return;
    }
    // down
    if (!isUpMode && e.keyCode === 40) {
      this.behavior.next();
      e.preventDefault();
      return;
    }
    // enter
    if (!isUpMode && e.keyCode === 13) {
      if (this.active.indexOf(this.activeOption) === -1) {
        this.selectActiveMatch();
        this.behavior.next();
      }
      e.preventDefault();
      return;
    }
    let target = e.target || e.srcElement;
    if (target && target.value) {
      this.inputValue = target.value;
      this.behavior.filter(new RegExp(escapeRegexp(this.inputValue), 'ig'));
      this.doEvent('typed', this.inputValue);
    }else {
      this.open();
    }
  }

  public ngOnInit():any {
    this.behavior = (this.firstItemHasChildren) ?
      new ChildrenBehavior(this) : new GenericBehavior(this);
  }

  public remove(item:SelectItem):void {
    if (this._disabled === true) {
      return;
    }
    if (this.multiple === true && this.active) {
      let index = this.active.indexOf(item);
      this.active.splice(index, 1);
      this.data.next(this.active);
      this.doEvent('removed', item);
    }
    if (this.multiple === false) {
      this.active = [];
      this.data.next(this.active);
      this.doEvent('removed', item);
    }
  }

  public doEvent(type:string, value:any):void {
    if ((this as any)[type] && value) {
      (this as any)[type].next(value);
    }

    this.onTouched();
    if (type === 'selected' || type === 'removed') {
      this.onChange(this.active);
    }
  }

  public clickedOutside():void {
    this.inputMode = false;
    this.optionsOpened = false;
  }

  public get firstItemHasChildren():boolean {
    return this.itemObjects[0] && this.itemObjects[0].hasChildren();
  }

  public writeValue(val:any):void {
    this.active = val;
    this.data.emit(this.active);
  }

  public registerOnChange(fn:(_:any) => {}):void {this.onChange = fn;}
  public registerOnTouched(fn:() => {}):void {this.onTouched = fn;}

  protected matchClick(e:any):void {
    
    if (this._disabled === true) {
      return;
    }
    this.inputMode = !this.inputMode;
    if (this.inputMode === true && ((this.multiple === true && e) || this.multiple === false)) {
      this.focusToInput();
      this.open();
    }
  }

  protected  mainClick(event:any):void {
    if (this.inputMode === true || this._disabled === true) {
      return;
    }
    if (event.keyCode === 46) {
      event.preventDefault();
      this.inputEvent(event);
      return;
    }
    if (event.keyCode === 8) {
      event.preventDefault();
      this.inputEvent(event, true);
      return;
    }
    if (event.keyCode === 9 || event.keyCode === 13 ||
      event.keyCode === 27 || (event.keyCode >= 37 && event.keyCode <= 40)) {
      event.preventDefault();
      return;
    }
    this.inputMode = true;
    let value = String
      .fromCharCode(96 <= event.keyCode && event.keyCode <= 105 ? event.keyCode - 48 : event.keyCode)
      .toLowerCase();
    this.focusToInput(value);
    this.open();
    let target = event.target || event.srcElement;
    target.value = value;
    this.inputEvent(event);
  }

  protected  selectActive(value:SelectItem):void {
    this.activeOption = value;
  }

  protected  isActive(value:SelectItem):boolean {
    return this.activeOption.id === value.id;
  }

  protected removeClick(value: SelectItem, event: any): void {
    event.stopPropagation();
    this.remove(value);
  }

  private focusToInput(value:string = ''):void {
    setTimeout(() => {
      let el = this.element.nativeElement.querySelector('div.ui-select-container > input');
      if (el) {
        el.focus();
        el.value = value;
      }
    }, 0);
  }

  private open():void {
    this.options = this.itemObjects
      .filter((option:SelectItem) => (this.multiple === false ||
      this.multiple === true && !this.active.find((o:SelectItem) => option.text === o.text)));

    if (this.options.length > 0) {
      this.behavior.first();
    }
    this.optionsOpened = true;
  }

  private hideOptions():void {
    this.inputMode = false;
    this.optionsOpened = false;
  }

  private selectActiveMatch():void {
    this.selectMatch(this.activeOption);
  }

  public selectMatch1(){
    alert('a');
  }
  public selectMatch2(){
    alert('b');
  }
  public selectMatch3(){
    alert('c');
  }

  private selectMatch(value:SelectItem, e:Event = void 0):void {
    
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (this.options.length <= 0) {
      return;
    }
    if (this.multiple === true) {
      this.active.push(value);
      this.data.next(this.active);
    }
    if (this.multiple === false) {
      this.active[0] = value;
      this.data.next(this.active[0]);
    }
    this.doEvent('selected', value);
    this.hideOptions();
    if (this.multiple === true) {
      this.focusToInput('');
    } else {
      this.focusToInput(stripTags(value.text));
      this.element.nativeElement.querySelector('.ui-select-container').focus();
    }
  }
}

export class Behavior {
  public optionsMap:Map<string, number> = new Map<string, number>();

  public actor:AutocompleteComponent;

  public constructor(actor:AutocompleteComponent) {
    this.actor = actor;
  }

  public fillOptionsMap():void {
    this.optionsMap.clear();
    let startPos = 0;
    this.actor.itemObjects
      .map((item:SelectItem) => {
        startPos = item.fillChildrenHash(this.optionsMap, startPos);
      });
  }

  

  public ensureHighlightVisible(optionsMap:Map<string, number> = void 0):void {
    
    let container = this.actor.element.nativeElement.querySelector('.ui-select-choices-content');
    if (!container) {
      return;
    }
    let choices = container.querySelectorAll('.ui-select-choices-row');
    if (choices.length < 1) {
      return;
    }
    let activeIndex = this.getActiveIndex(optionsMap);
    if (activeIndex < 0) {
      return;
    }
    let highlighted:any = choices[activeIndex];
    if (!highlighted) {
      return;
    }
    let posY:number = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
    let height:number = container.offsetHeight;
    if (posY > height) {
      container.scrollTop += posY - height;
    } else if (posY < highlighted.clientHeight) {
      container.scrollTop -= highlighted.clientHeight - posY;
    }
  }

  private getActiveIndex(optionsMap:Map<string, number> = void 0):number {
    let ai = this.actor.options.indexOf(this.actor.activeOption);
    if (ai < 0 && optionsMap !== void 0) {
      ai = optionsMap.get(this.actor.activeOption.id);
    }
    return ai;
  }
}

export class GenericBehavior extends Behavior implements OptionsBehavior {
  public constructor(actor:AutocompleteComponent) {
    super(actor);
  }

  public first():void {
    this.actor.activeOption = this.actor.options[0];
    super.ensureHighlightVisible();
  }

  public last():void {
    this.actor.activeOption = this.actor.options[this.actor.options.length - 1];
    super.ensureHighlightVisible();
  }

  public prev():void {
    let index = this.actor.options.indexOf(this.actor.activeOption);
    this.actor.activeOption = this.actor
      .options[index - 1 < 0 ? this.actor.options.length - 1 : index - 1];
    super.ensureHighlightVisible();
  }

  public next():void {
    let index = this.actor.options.indexOf(this.actor.activeOption);
    this.actor.activeOption = this.actor
      .options[index + 1 > this.actor.options.length - 1 ? 0 : index + 1];
    super.ensureHighlightVisible();
  }

  public filter(query:RegExp):void {
    let options = this.actor.itemObjects
      .filter((option:SelectItem) => {
        return stripTags(option.text).match(query) &&
          (this.actor.multiple === false ||
          (this.actor.multiple === true && this.actor.active.map((item:SelectItem) => item.id).indexOf(option.id) < 0));
      });
    this.actor.options = options;
    if (this.actor.options.length > 0) {
      this.actor.activeOption = this.actor.options[0];
      super.ensureHighlightVisible();
    }
  }
}

export class ChildrenBehavior extends Behavior implements OptionsBehavior {
  public constructor(actor:AutocompleteComponent) {
    super(actor);
  }

  public first():void {
    this.actor.activeOption = this.actor.options[0].children[0];
    this.fillOptionsMap();
    this.ensureHighlightVisible(this.optionsMap);
  }

  public last():void {
    this.actor.activeOption =
      this.actor
        .options[this.actor.options.length - 1]
        .children[this.actor.options[this.actor.options.length - 1].children.length - 1];
    this.fillOptionsMap();
    this.ensureHighlightVisible(this.optionsMap);
  }

  public prev():void {
    let indexParent = this.actor.options
      .findIndex((option:SelectItem) => this.actor.activeOption.parent && this.actor.activeOption.parent.id === option.id);
    let index = this.actor.options[indexParent].children
      .findIndex((option:SelectItem) => this.actor.activeOption && this.actor.activeOption.id === option.id);
    this.actor.activeOption = this.actor.options[indexParent].children[index - 1];
    if (!this.actor.activeOption) {
      if (this.actor.options[indexParent - 1]) {
        this.actor.activeOption = this.actor
          .options[indexParent - 1]
          .children[this.actor.options[indexParent - 1].children.length - 1];
      }
    }
    if (!this.actor.activeOption) {
      this.last();
    }
    this.fillOptionsMap();
    this.ensureHighlightVisible(this.optionsMap);
  }

  public next():void {
    let indexParent = this.actor.options
      .findIndex((option:SelectItem) => this.actor.activeOption.parent && this.actor.activeOption.parent.id === option.id);
    let index = this.actor.options[indexParent].children
      .findIndex((option:SelectItem) => this.actor.activeOption && this.actor.activeOption.id === option.id);
    this.actor.activeOption = this.actor.options[indexParent].children[index + 1];
    if (!this.actor.activeOption) {
      if (this.actor.options[indexParent + 1]) {
        this.actor.activeOption = this.actor.options[indexParent + 1].children[0];
      }
    }
    if (!this.actor.activeOption) {
      this.first();
    }
    this.fillOptionsMap();
    this.ensureHighlightVisible(this.optionsMap);
  }

  public filter(query:RegExp):void {
    let options:Array<SelectItem> = [];
    let optionsMap:Map<string, number> = new Map<string, number>();
    let startPos = 0;
    for (let si of this.actor.itemObjects) {
      let children:Array<SelectItem> = si.children.filter((option:SelectItem) => query.test(option.text));
      startPos = si.fillChildrenHash(optionsMap, startPos);
      if (children.length > 0) {
        let newSi = si.getSimilar();
        newSi.children = children;
        options.push(newSi);
      }
    }
    this.actor.options = options;
    if (this.actor.options.length > 0) {
      this.actor.activeOption = this.actor.options[0].children[0];
      super.ensureHighlightVisible(optionsMap);
    }
  }
}


export function escapeRegexp(queryToEscape:string):string {
  return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}

@Directive({
  selector: '[offClick]'
})

export class OffClickDirective implements OnInit, OnDestroy {
  /* tslint:disable */
  @Input('offClick') public offClickHandler: any;
  /* tslint:enable */
  @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
    $event.stopPropagation();
  }

  public ngOnInit(): any {
    setTimeout(() => { if(typeof document !== 'undefined') { document.addEventListener('click', this.offClickHandler); } }, 0);
  }

  public ngOnDestroy(): any {
    if(typeof document !== 'undefined') { document.removeEventListener('click', this.offClickHandler); }
  }
}

export interface OptionsBehavior {
  first():any;
  last():any;
  prev():any;
  next():any;
  filter(query:RegExp):any;
}

export class SelectItem {
  public id:string;
  public text:string;
  public children:Array<SelectItem>;
  public parent:SelectItem;

  public constructor(source:any) {
    if (typeof source === 'string') {
      this.id = this.text = source;
    }
    if (typeof source === 'object') {
      this.id = source.id || source.text;
      this.text = source.text;
      if (source.children && source.text) {
        this.children = source.children.map((c:any) => {
          let r:SelectItem = new SelectItem(c);
          r.parent = this;
          return r;
        });
        this.text = source.text;
      }
    }
  }

  public fillChildrenHash(optionsMap:Map<string, number>, startIndex:number):number {
    let i = startIndex;
    this.children.map((child:SelectItem) => {
      optionsMap.set(child.id, i++);
    });
    return i;
  }

  public hasChildren():boolean {
    return this.children && this.children.length > 0;
  }

  public getSimilar():SelectItem {
    let r:SelectItem = new SelectItem(false);
    r.id = this.id;
    r.text = this.text;
    r.parent = this.parent;
    return r;
  }

  getFamily(o:SelectItem){
   // debugger;
    return "Arial";
  }
}

@Pipe({name: 'highlight'})
export class HighlightPipe implements PipeTransform {
  public transform(value:string, query:string):any {
    if (query.length < 1) {
      return value;
    }

    if ( query ) {
        let tagRE    = new RegExp('<[^<>]*>', 'ig');
        // get ist of tags
        let tagList  = value.match( tagRE );
        // Replace tags with token
        let tmpValue = value.replace( tagRE, '$!$');
        // Replace search words
        value = tmpValue.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>');
        // Reinsert HTML
        for (let i = 0; value.indexOf('$!$') > -1; i++) {
          value = value.replace('$!$', tagList[i]);
        }
    }
    return value;
  }

}

export function stripTags(input:string):string {
  let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  let commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, '');
}