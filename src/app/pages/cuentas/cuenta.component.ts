import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: [
  ]
})
export class CuentaComponent implements OnInit {

  public cuentaForm!: FormGroup;

  constructor( private fb: FormBuilder) {
    
   }

  ngOnInit(): void {

    this.cuentaForm = this.fb.group({
      nombres: ['Wendy', Validators.required],
      apellidos: ['Guzman', Validators.required],
      email: ['wendy@gmail.com', Validators.required],
      ciudad: ['2', Validators.required]
    })
  }

  guardarCuenta(){
    console.log(this.cuentaForm.value)
  }

}
