import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User | null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}
