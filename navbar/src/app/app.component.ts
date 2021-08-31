import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
//import { hello } from '@thanatpp/utility';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title: "navbar"
  onClickProfile: boolean
  onClickMenu: boolean
  onClickOutside: boolean
  gender: string
  
  constructor(private ChangeDetectorRef:ChangeDetectorRef){}

  ngOnInit(){
    this.gender = "MEN"
    this.onClickMenu = false
    this.onClickProfile = false
    this.onClickOutside = false
  }

  toggleMenu(){
    this.onClickMenu = !this.onClickMenu
  }

  toggleProfile(){
    this.onClickProfile = !this.onClickProfile
  }

  selectProfile(){
    console.log("Click Profile")
  }

  onClickedOutsideProfile(e: Event) {
    this.onClickProfile = false
  }

  selectMen(){
    this.gender = "men"
    this.emitGender()
    this.toggleMenu()
  }

  selectWomen(){
    this.gender = "women"
    this.emitGender()
    this.toggleMenu()
  }

  emitGender(){
    const genderEvent = new CustomEvent("selectGender", {detail: this.gender})
    window.dispatchEvent(genderEvent)
    const typeEvent = new CustomEvent("selectType", {detail: "all"})
    window.dispatchEvent(typeEvent)
  }
}
