import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from '../guards/auth.guard';

import { UsuariosmComponent } from './usuariosM/usuariosm/usuariosm.component';
import { CuentasComponent } from './cuentas/cuentas/cuentas.component';
import { CuentaComponent } from './cuentas/cuenta.component';
import { UsuarioMComponent } from './usuariosM/usuario-m/usuario-m.component';
import { PagosComponent } from './pagos/pagos.component';
import { LocalizacionComponent } from './localizacion/localizacion.component';
import { PagoBusquedaComponent } from './pago-busqueda/pago-busqueda.component';


const routes: Routes = [

    { path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            

            //Las rutas de verdad
            { path: 'usuario-movil', component: UsuariosmComponent, data: { titulo: 'Usuarios moviles'} },
            { path: 'usuario-movil/:id', component: UsuarioMComponent, data: { titulo: 'Usuarios moviles'} },

            { path: 'cuentas', component: CuentasComponent, data: { titulo: 'Cuentas'} },
            { path: 'cuenta/:id', component: CuentaComponent, data: { titulo: 'Cuentas'} },

            { 
                path: 'pagos/diaActivos', 
                component: PagosComponent,                
                data: { titulo: 'Pagos'} 
            },
            { 
                path: 'pagos/diaAnulados', 
                component: PagosComponent,                
                data: { titulo: 'Pagos'} 
            },
            { 
                path: 'pagos/:fecha', 
                component: PagoBusquedaComponent,                
                data: { titulo: 'PagosB'} 
            },

            {path : 'localizacion', component: LocalizacionComponent, data: { titulo: 'Localizacion' } }

        ]
    },  


    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
