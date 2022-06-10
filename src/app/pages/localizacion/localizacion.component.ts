import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
import { Cuentas } from 'src/app/models/cuentas.model';
import { CuentasService } from 'src/app/services/cuentas.service';
import { environment } from 'src/environments/environment';

interface Marcador{
  marker?: mapboxgl.Marker,
  centro?: [number, number]
}

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.component.html',
  styles: [
    `
    #mapa {
      height: 450px;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor: pointer;
    }
    
    `
  ]
})
export class LocalizacionComponent implements OnInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map
  zoomLevel: number = 10
  center: [number, number] = [-68.15, -16.5] //longitud, latitud

  marcadores: Marcador[] = []
  public cuenta: Cuentas[] = []

  ubicacion: Array<{lng: number, lat: number}>
  lng: Array<number>
  lat: Array<number>

  //nuevoMarcador: mapboxgl.Marker

  constructor(private cuentaService: CuentasService) { }

  ngOnInit(): void {

    (mapboxgl as any).accessToken = environment.mapboxToken

    //   var map = new mapboxgl.Map({
    //   container: 'mapa',
    //   style: 'mapbox://styles/mapbox/streets-v11'
    //   });

    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    })

    this.cuentaService.cargarCuentas()
    .subscribe( ({cuentas}) => {
      this.cuenta = cuentas
      
      this.cuenta.forEach(c => {
      
        this.marcadores.push({
          centro: [ c.longitud, c.latencia ],
        })
      })

      this.marcadores.forEach( m => {
        console.log(m.centro[0], m.centro[1])

        const ubicacionMarcador = new mapboxgl.Marker({
          draggable: true
        })
          .setLngLat(m.centro)
          .addTo( this.mapa )
        
          this.marcadores.push({
            marker: ubicacionMarcador
          })
      })



    })

    

    
    
  }

    

    

    // const markerHtml: HTMLElement = document.createElement('div')
    // markerHtml.innerHTML = 'Hola'

  
  
 

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

    //console.log( this.lng )

  }


  




}
