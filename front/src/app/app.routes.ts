import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio'
import { Productos } from './pages/productos/productos'
import { Altas } from './pages/altas/altas'
import { Detalleproducto } from './pages/detalleproducto/detalleproducto';

/* Rutas principales de la aplicación */
export const routes: Routes = [
    {
        path: 'inicio', component: Inicio
    },{
        path: 'productos', component: Productos
    },{
        path: 'altas', component: Altas
    },{
        path: 'detalle-producto/:id', component: Detalleproducto
    },{
        path: '', redirectTo: 'inicio', pathMatch: 'full'
    }
];

