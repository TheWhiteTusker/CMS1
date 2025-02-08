import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('kioskSection') kioskSection!: ElementRef;

  showKiosks: boolean = false;
  kiosks = ['Kiosk 1', 'Kiosk 2', 'Kiosk 3', 'Kiosk 4', 'Kiosk 5'];
i: any;

  constructor(private router: Router) {}

  // Toggle kiosk visibility and scroll into view
  toggleKiosks(): void {
    this.showKiosks = true;  // Show kiosks when clicked
      }

      navigateToKiosk(index: number): void {
        if (index === 0) {  // Navigate only for Kiosk 1
          this.router.navigate(['/kiosk-screen']);
        }
      }
}
