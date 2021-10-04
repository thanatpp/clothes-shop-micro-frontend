import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.gender = 'men';
    this.onClickMenu = false;
    this.onClickProfile = false;
    this.onClickOutside = false;
    window.addEventListener('logout', () => {
      this.auth();
    });
  }

  toggleMenu() {
    this.onClickMenu = !this.onClickMenu;
  }

  toggleProfile() {
    if(this.isLogin !== false){
      this.onClickProfile = !this.onClickProfile;
    }else{
      this.router.navigateByUrl('/login')
    }
    console.log(this.onClickProfile)
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
