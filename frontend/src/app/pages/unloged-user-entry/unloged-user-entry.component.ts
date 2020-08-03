import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-unloged-user-entry',
  templateUrl: './unloged-user-entry.component.html',
  styleUrls: ['./unloged-user-entry.component.css']
})
export class UnlogedUserEntryComponent implements OnInit {

  usrStoryCompleted: number;
  devNameForm: FormGroup;
  roomId;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
    });

    this.devNameForm = new FormGroup({
      devName: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  enterDev(){
    this.router.navigate(["/devPlanning"], { queryParams: {roomId: this.roomId, name: this.devNameForm.get('devName').value}});
  }

}
