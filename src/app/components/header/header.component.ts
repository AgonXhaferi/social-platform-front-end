import {Component, OnInit} from '@angular/core';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIcon,
    RouterLink,
    MatIconButton,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.isAuthenticated$
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
  }

  redirect() {
    this.router.navigate(['/'])
  }
}
