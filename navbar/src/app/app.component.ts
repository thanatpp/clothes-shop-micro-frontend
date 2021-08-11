import { Component, OnInit, ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'navbar-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

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
    const event = new Event("toggleMenu");
    window.dispatchEvent(event);
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
    this.gender = "MEN"
    this.emitGender()
  }

  selectWomen(){
    this.gender = "WOMEN"
    this.emitGender()
  }

  emitGender(){
    const genderEvent = new CustomEvent("selectGender", {detail: this.gender})
    window.dispatchEvent(genderEvent)
    const typeEvent = new CustomEvent("selectType", {detail: "ALL"})
    window.dispatchEvent(typeEvent)
  }
}
