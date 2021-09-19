import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'addProduct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  
  img: any;

  constructor(private router: Router) {}

  ngOnInit() {
    
  }

  onFileChange(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.img = reader.result;
    };
  }

  back(){
    this.router.navigateByUrl("/admin/product")
  }
}
