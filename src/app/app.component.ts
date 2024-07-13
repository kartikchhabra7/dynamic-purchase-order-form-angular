import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PurchaseFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
}
