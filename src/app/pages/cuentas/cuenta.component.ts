import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Cuentas } from 'src/app/models/cuentas.model';
import { Pagos } from 'src/app/models/pago.model';
import { CuentasService } from 'src/app/services/cuentas.service';
import { ModalcuentaService } from 'src/app/services/modalcuenta.service';
import { PagoService } from 'src/app/services/pago.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

interface Marcador{
  marker?: mapboxgl.Marker,
  centro?: [number, number]
}

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styles: [
     `
    #mapa {
      height: 450px;
      width: 100%;
    }

   
    
    `
  ]
})
export class CuentaComponent implements OnInit {

  public cuentaForm!: FormGroup;

  public cuenta: Cuentas[] = []
  public cuentaSeleccionada!: Cuentas;
  public pago: Pagos[] = [];
  public id: string;

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map
  zoomLevel: number = 17
  center: [number, number] = [-68.15, -16.5] //longitud, latitud

  public marcadores: Marcador[] = []

  ubicacion: Array<{lng: number, lat: number}>
  public lng: Array<number>
  public lat: Array<number>


  constructor( 
    private fb: FormBuilder,
    private cuentaService: CuentasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public modalcuentaService: ModalcuentaService,
    private pagoService: PagoService,
    
    ) {
    
   }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken
    
    if(this.activatedRoute.snapshot.paramMap.get('id') !== 'nuevo'){
      this.activatedRoute.params.subscribe( ({id}) => {
        this.cargarCuenta(id)
      })
    }

    else {

      this.mapa = new mapboxgl.Map({
        container: 'mapa',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: this.center,
        zoom: this.zoomLevel
      })
      const nuevoMarcador = new mapboxgl.Marker({
        draggable: true
      })
        .setLngLat (this.center)
        .addTo( this.mapa )
  
        this.marcadores.push({
          marker: nuevoMarcador
        })
     
    }
    this.cuentaForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      ciudad: ['', Validators.required],
      latencia: [this.lat, Validators.required],
      longitud: [this.lng, Validators.required],
    })
    

    

    
        
  }

   calcularUbicacion() {

    // const nuevoMarcador = new mapboxgl.Marker({
    //   draggable: true
    // })
    //   .setLngLat( this.center )
    //   .addTo( this.mapa )
    
    const lnglatArr: Marcador[] = []

    this.marcadores.forEach( m => {
     
      const { lng, lat } = m.marker!.getLngLat()

      lnglatArr.push({
        centro: [ lng, lat ]
      })

    })

    this.lng = lnglatArr.map(m => m.centro[0])
    this.lat = lnglatArr.map(m => m.centro[1])

    console.log('longitud ', lnglatArr[0].centro[0])
    console.log('latitud ', lnglatArr[0].centro[1])
    

    const {nombres, apellidos, email, ciudad} = this.cuentaForm.value
    
    

    this.cuentaForm = this.fb.group({
      nombres: [nombres, Validators.required],
      apellidos: [apellidos, Validators.required],
      email: [email, Validators.required],
      ciudad: [ciudad, Validators.required],
      latencia: [lnglatArr[0].centro[1], Validators.required],
      longitud: [lnglatArr[0].centro[0], Validators.required],
    })


  }

  cargarCuenta( id: string ){

    if ( id === 'nuevo'){
      return;
    }

    this.cuentaService.obtenerCuentaById( id )
      .subscribe ( cuentas =>{

        

        if ( !cuentas ) {
          return this.router.navigateByUrl(`/dashboard/cuentas/`)
        }
        const { nombres, apellidos, email, ciudad, latencia, longitud } = cuentas
        
        this.cuentaSeleccionada = cuentas
        this.cuentaForm.setValue({ nombres, apellidos, email, ciudad, latencia, longitud})



        this.mapa = new mapboxgl.Map({
          container: 'mapa',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [longitud, latencia],
          zoom: this.zoomLevel
        })

        const lnglatArr: Marcador[] = []

          
    
          lnglatArr.push({
            centro: [ longitud, latencia ]
          })
    
        

        const ubicacionMarcador = new mapboxgl.Marker({
          draggable: true
        })
          .setLngLat(lnglatArr[0].centro)
          .addTo( this.mapa )
        
          this.marcadores.push({
            marker: ubicacionMarcador
          })
       
      })

     
  }
  

  guardarCuenta(){
    const {nombres} = this.cuentaForm.value

    if( this.cuentaSeleccionada ) {
      //actualizar
      const data = {
        ...this.cuentaForm.value,
        _id: this.cuentaSeleccionada._id
      }
      this.cuentaService.actualizarCuenta( data )
        .subscribe( resp => {
          console.log(resp)
          Swal.fire('Actualizado', `${ nombres } actualizado correctamente`, 'success')
          this.router.navigateByUrl(`/dashboard/cuentas`)
        })

    } else {
      //Crear
      this.cuentaService.crearCuenta( this.cuentaForm.value)
      .subscribe( (resp: any) => {
        console.log(resp)
        Swal.fire('Creado', `${ nombres } creado correctamente`, 'success')
        this.router.navigateByUrl(`/dashboard/cuentas`)
      })
    }

    
  }

  abrirModal(){
    
    
    this.activatedRoute.params.subscribe( ({id}) => {
      this.modalcuentaService.abrirModal(id)
    })
  }

 

}
