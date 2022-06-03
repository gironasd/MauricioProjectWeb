import { Component, OnInit } from '@angular/core';
import { Pagos } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/services/pago.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html'
})
export class PagosComponent implements OnInit {

  public pagos: Pagos[] = [];
  public cargando: boolean = true

  constructor(
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {

   this.cargarPagos();
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
