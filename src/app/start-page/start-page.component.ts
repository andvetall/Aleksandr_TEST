import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./../app.component.scss']
})
export class StartPageComponent {

  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/login'])
  }
  register() {
    this.router.navigate(['/register'])
  }

}
