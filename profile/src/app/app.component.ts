import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'profile-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'profile';

  isEditProfile: boolean
  isAddAddress: boolean

  editProfileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    birthday: new FormControl(''),
  });

  addAddressForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    addressDetails: new FormControl(''),
    district: new FormControl(''),
    province: new FormControl(''),
    postalCode: new FormControl(''),
  });

  profile : any
  address : any[]

  ngOnInit(){
    this.isEditProfile = false
    this.isAddAddress = false
    this.profile = {email: "spy.fo3@gmail.com", firstName: "THANAT", lastName: "SUKANTATOON", phoneNumber:"", birthday:"25/04/2000"}
    this.address = [{firstName: "THANAT", lastName: "SUKANTATOON", address: "112 ม.2", addressDetails: " บ.ดอนไร่ ต.หนองสะเดา", district:"สามชุก", province: "สุพรรณบุรี", postalCode: "72130"},
                    {firstName: "SOM", lastName: "YING", address: "128 ม.8", addressDetails: " บ.สพานหิน ต.สุรนารี", district:"เมือง", province: "นครราชสีมา", postalCode: "30000"}]
  }

  isNull(text){
    if(text == ""){
      return "-"
    }else{
      return text
    }
  }

  editProfile(){
    this.isEditProfile = true
  }

  saveChange(){
    this.isEditProfile = false
    this.profile = {
      email: this.profile.email, 
      firstName: this.editProfileForm.get('firstName').value,
      lastName: this.editProfileForm.get('lastName').value,
      phoneNumber: this.editProfileForm.get('phoneNumber').value,
      birthday: this.dateFormat(this.editProfileForm.get('birthday').value),
    }
  }

  dateFormat(date){
    const spl = date.split('-')
    const newDate = spl[2] + "-" + spl[1] + "-" + spl[0]
    return newDate
  }

  cancel(){
    this.isEditProfile = false
    this.editProfileForm.reset()
  }

  openFormAddress(){
    this.isAddAddress = true
  }

  cancelFormAddress(){
    this.addAddressForm.reset()
    this.isAddAddress = false
  }

  addAddress(){
    console.log(this.addAddressForm.value)
    this.address.push(this.addAddressForm.value)
    this.addAddressForm.reset()
    this.isAddAddress = false
  }

  isNoAddress(){
    if(this.address.length > 0){
      return false
    }else{
      return true
    }
  }
}
