import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../modules/header/header.component';
import { FooterComponent } from '../modules/footer/footer.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InlineEditComponent } from './components/inline-edit/inline-edit.component';
import { SatPopoverModule } from '@ncstate/sat-popover';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    InlineEditComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    SatPopoverModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InlineEditComponent,
    FlexLayoutModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
