import { NgModule } from '@angular/core';
import { TranslatePipe} from './translate.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    SafePipe,
    TranslatePipe,
  ],
  exports: [
    SafePipe,
    TranslatePipe,
  ],
  imports: [],
  providers: [],
  bootstrap: [],
  entryComponents: []
})
export class PipeModule {
}
