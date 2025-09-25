import { Routes } from '@angular/router';
import { CotizadorComponent } from './pages/cotizador/cotizador.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: 'cotizador', component: CotizadorComponent},
    {path: '', component: HomeComponent},
    {path: '**', redirectTo: 'home'} // en caso de 404
];
