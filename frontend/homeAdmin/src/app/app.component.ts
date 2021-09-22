import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'homeAdmin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  isEdit: boolean;
  productEdit: any;
  img: any;
  selectSize: any;
  products = [];

  ngOnInit() {
    this.isEdit = false;
    this.selectSize = "xs"
    this.products = [
      {
        id: '433031',
        productName: 'THE GODFAGLE TEE',
        price: 120,
        details: "100% Polyester Fully sublimated design, Inside: Micro poly net, Outside: Micro poly SK",
        size: { xs: 123, s: 120, m: 99, l: 50, xl: 500, xxl: 20 },
      },
      {
        id: '433032',
        productName: 'TEST 2',
        price: 599,
        details: "100% Polyester Fully sublimated design, Inside: Micro poly net, Outside: Micro poly SK",
        size: { xs: 123, s: 120, m: 99, l: 50, xl: 500, xxl: 20 },
      },
      {
        id: '433032',
        productName: 'TEST TEST',
        price: 299,
        details: "100% Polyester Fully sublimated design, Inside: Micro poly net, Outside: Micro poly SK",
        size: { xs: 123, s: 120, m: 99, l: 50, xl: 500, xxl: 20 },
      },
    ];
  }

  edit(i) {
    this.isEdit = true;
    this.productEdit = this.products[i];
  }

  onFileChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.img = reader.result;
    };
  }

  sizeChange(e){
    this.selectSize = e.target.value
  }

  getQuantity(){
    return this.productEdit["size"][this.selectSize] 
  }

  back(){
    this.isEdit = false
  }
}
