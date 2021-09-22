import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'order-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  orders: any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.orders = [
      {
        order_id: 1145,
        firstName: 'THANAT',
        lastName: 'SUKANTATOON',
        address: '112 ม.2',
        addressDetails: ' บ.ดอนไร่ ต.หนองสะเดา',
        district: 'สามชุก',
        province: 'สุพรรณบุรี',
        postalCode: '72130',
        productName: 'THE GODFAGLE TEE',
        quantity: 2,
        date: '20/9/2564',
      },
      {
        order_id: 1146,
        firstName: 'SOMPONG',
        lastName: 'SANSUK',
        address: '112 ม.2',
        addressDetails: ' บ.ดอนไร่ ต.หนองสะเดา',
        district: 'สามชุก',
        province: 'สุพรรณบุรี',
        postalCode: '72130',
        productName: 'THE GODFAGLE TEE',
        quantity: 2,
        date: '19/9/2564',
      },
    ];
  }

  address(address, addressDetails, district, province, postalCode){
    return address + ", " + addressDetails + ", " + district + ", " + province + ", " + postalCode
  }
}
