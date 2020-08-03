import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  valid = false
  accountActivate = false

  constructor(private route: ActivatedRoute, private router: Router, private authService:AuthService) { 
    this.route.queryParams.subscribe(params => {
      let token = params['token'];

      if (token){
        this.authService.validateCheckActivateAccountToken(token).subscribe(
          valid => {
            this.valid = valid;
            this.authService.activeEmail(token).subscribe(
              confirmation => {
                this.accountActivate = confirmation;
              }
            )
          }
        )
      }   
  }
);
  }

  ngOnInit(): void {
  }

}
 