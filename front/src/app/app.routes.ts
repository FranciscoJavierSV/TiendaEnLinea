import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio'
import { Productos } from './pages/productos/productos'
import { Altas } from './pages/altas/altas'
import { Detalleproducto } from './pages/detalleproducto/detalleproducto';

export const routes: Routes = [
    {
        path: 'Inicio', component: Inicio
    },{
        path: 'Productos', component: Productos
    },{
        path: 'Altas' , component: Altas
    },{
        path: 'DetalleP', component: Detalleproducto  
    },{
        path: '',redirectTo: 'Inicio',pathMatch: 'full'
    }
];

