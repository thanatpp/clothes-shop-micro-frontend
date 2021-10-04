import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';

@Component({
  selector: 'listitem-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  products: any
  gender: string
  type: string = "all"

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(){
    this.checkUrl()
    window.addEventListener("selectGender", (e: CustomEvent) => {
        this.gender = e.detail
        this.getProduct()
    })
    window.addEventListener("selectType", (e: CustomEvent) => {
      this.type = e.detail
      this.getProduct()
    })
  }
  
  price(i: any){
    return Intl.NumberFormat().format(this.products[i].price)
  }

  checkUrl(){
    const url = window.location.href.split("/")
    console.log(url)
    if(url[4] == "women"){
      this.gender = "women"
    }else{
      this.gender = "men"
    }
    this.getProduct()
  }

  getProduct(){
    this.productService.getProduct(this.gender, this.type).subscribe(
      (data) => {
        this.products = data.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  clickItem(i: any){
    localStorage.setItem("product_id", this.products[i]._id)
    this.router.navigateByUrl("/collections/product/",this.products[i]._id)
  }
}
