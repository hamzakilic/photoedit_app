import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutocompleteComponent,HighlightPipe,OffClickDirective } from './autocomplete.component';


@NgModule({
  imports: [CommonModule],
  declarations: [AutocompleteComponent, HighlightPipe, OffClickDirective],
  exports: [AutocompleteComponent, HighlightPipe, OffClickDirective]
})
export class AutoCompleteModule {
}
