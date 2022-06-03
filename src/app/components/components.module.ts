import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalcuentaComponent } from './modalcuenta/modalcuenta.component';
import { ModalusuarioComponent } from './modalusuario/modalusuario.component';



@NgModule({
  declarations: [
    ModalcuentaComponent,
    ModalusuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ModalcuentaComponent,
    ModalusuarioComponent
  ],

})
export class ComponentsModule { }
