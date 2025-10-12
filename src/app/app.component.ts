import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'InstacotizaRequeteOnline';

  consoleDebug() {
    console.log('AppComponent loaded');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('ingresado') === 'true';
  }
  isAdmin(): boolean {
    return sessionStorage.getItem('rol') === 'admin';
  }

  cerrarSesion() {
    sessionStorage.clear();
    window.location.reload();
  }
}
