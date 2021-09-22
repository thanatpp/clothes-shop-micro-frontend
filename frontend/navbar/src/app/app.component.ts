import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
//import { hello } from '@thanatpp/utility';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: 'navbar';
  onClickProfile: boolean;
  onClickMenu: boolean;
  onClickOutside: boolean;
  gender: string;
  isLogin: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.auth();
    this.gender = 'MEN';
    this.onClickMenu = false;
    this.onClickProfile = false;
    this.onClickOutside = false;
    window.addEventListener('selectGender', () => {
      this.auth();
    });
  }

  toggleMenu() {
    this.onClickMenu = !this.onClickMenu;
  }

  toggleProfile() {
    this.onClickProfile = !this.onClickProfile;
  }

  selectProfile() {
    console.log('Click Profile');
  }

  onClickedOutsideProfile(e: Event) {
    this.onClickProfile = false;
  }

  selectMen() {
    this.gender = 'men';
    this.emitGender();
    this.toggleMenu();
  }

  selectWomen() {
    this.gender = 'women';
    this.emitGender();
    this.toggleMenu();
  }

  emitGender() {
    const genderEvent = new CustomEvent('selectGender', {
      detail: this.gender,
    });
    window.dispatchEvent(genderEvent);
    const typeEvent = new CustomEvent('selectType', { detail: 'all' });
    window.dispatchEvent(typeEvent);
  }

  logout() {
    localStorage.removeItem('user');
    this.auth();
    this.router.navigateByUrl('/collections/men');
  }

  auth() {
    if (localStorage.getItem('user') === null) {
      this.isLogin = false;
      this.onClickProfile = false;
    } else {
      this.isLogin = true;
    }
  }
}
