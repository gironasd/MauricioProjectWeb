import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AuthGuard } from '../guards/auth.guard';

import { UsuariosmComponent } from './usuariosM/usuariosm/usuariosm.component';
import { CuentasComponent } from './cuentas/cuentas/cuentas.component';


const routes: Routes = [

    { path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },

            //Las rutas de verdad
            { path: 'usuario-movil', component: UsuariosmComponent, data: { titulo: 'Usuarios moviles'} },
            { path: 'cuentas', component: CuentasComponent, data: { titulo: 'Cuentas'} },
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
