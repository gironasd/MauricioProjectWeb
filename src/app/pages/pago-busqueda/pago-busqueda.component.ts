import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Pagos } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/services/pago.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago-busqueda',
  templateUrl: './pago-busqueda.component.html',
})
export class PagoBusquedaComponent implements OnInit {

  public pagos: Pagos[] = [];
  public cargando: boolean = true
  public activo: string = '/dashboard/pagos/diaActivos'
  public flagActivo: boolean = true
  model: NgbDateStruct;
  public buscarForm: FormGroup
  readonly DELIMITER = '/';

  constructor(
    private pagoService: PagoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    
      this.activatedRoute.params.subscribe( ({fecha}) => {
        this.cargarPagosFecha(fecha)
      })
    
  
      this.cargarPagos();
  
      this.buscarForm = this.fb.group({
        fecha: ['', Validators.required]
      })
  
    
    console.log(this.activo, this.router.url)
     
    }
  
    BuscaFecha(){
        
     
      const { fecha } = this.buscarForm.value
      const  buenaFecha  = fecha.year + this.DELIMITER + fecha.month + this.DELIMITER + fecha.day
      console.log(buenaFecha)
      const fechaM = moment(buenaFecha).format('YYYY-MM-DD HH:mm:ss');
      const date = new Date(fechaM)
      let fechaIso = date.toISOString()
  
      
  
      console.log("Fecha normal: ", fecha)
      console.log("Fecha moment: ", fechaM)
      console.log("Fecha date: ", date)
      console.log("Fecha ISO: ", fechaIso)
  
      this.router.navigateByUrl('/dashboard/pagos/' + fechaIso)
  
  
    }

  cargarPagos() {
    this.cargando = true

    this.pagoService.cargarPagos()
        .subscribe( pagos => {
          this.cargando = false
          this.pagos = pagos;
          console.log(this.pagos)
          console.log(this.pagos.map(pagos => pagos.fecha))
        })
  }

  cargarPagosFecha(fecha) {
    this.cargando = true



    this.pagoService.cargarPagosFecha(fecha)
        .subscribe( pagos => {
          this.cargando = false
          this.pagos = pagos;
          console.log(this.pagos)
          console.log(this.pagos.map(pagos => pagos.fecha))
        })
  }

  createPDF(){
    console.log('en el pdf: ', this.pagos)
    const pdfDefinition: any = {
      content: [
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                'Ciudad',
                'Fecha',
                'Usuario',
                'Cliente',
                'Monto (Bs)',
                'Monto ($us)',
                
              ],
              ...this.pagos.map(p => ([p.cuenta.ciudad, p.fecha || 'dd/mm/YYYY', p.usuarioM.nombre, p.cuenta.nombres+' '+p.cuenta.apellidos, p.montoBs, p.montoSus])),
              [
                {
                  text: 'Total:', colspan: 4
                },
                {},
                {},
                {},
                this.pagos.reduce((acc, p) => acc + p.montoBs, 0)+'Bs',
                this.pagos.reduce((acc, p) => acc + p.montoSus, 0)+'$us'
              ]
                
              
             
            ]
          }
        }
      ]
    }
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
 
  }

}
