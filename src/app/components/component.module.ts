import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../pipes/pipe.module';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
  ],
  exports: [
   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    DirectivesModule,
  ],
  providers: [],
  bootstrap: [],
  entryComponents: []
})
export class ComponentModule {


}
