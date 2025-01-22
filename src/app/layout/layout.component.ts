// import { Component } from '@angular/core';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-layout',
//   templateUrl: './layout.component.html',
//   styleUrls: ['./layout.component.css'],
//   standalone: true,
//   imports: [
//     MatSidenavModule,
//     MatToolbarModule,
//     MatButtonModule,
//     MatIconModule,
//     MatListModule,
//     RouterModule, // Necesario para routerLink
//   ],
// })
// export class LayoutComponent {}
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
  ],
})
export class LayoutComponent {
  @ViewChild('drawer') drawer!: MatSidenav; // Obtiene la referencia al mat-sidenav

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/';
    });
  }

  toggleDrawer() {
    this.drawer.toggle(); // Abre o cierra el menú lateral
  }
}
