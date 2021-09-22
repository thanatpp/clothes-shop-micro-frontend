import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'registry-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  createAcount = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    type: new FormControl('customer'),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private user: UserService, private router: Router) {}

  ngOnInit() {}

  register() {
    this.user.createAccount(this.createAcount.value).subscribe(
      (result) => {
        if (result.status === true) {
          alert("Create an Account Successfully")
          this.router.navigateByUrl('/login')
        } else {
          alert('Cannot Create an Account.')
        }
      },
      (err) => {
        console.log(err.error.message);
        alert('Cannot Create an Account.')
      }
    );
  }
}
