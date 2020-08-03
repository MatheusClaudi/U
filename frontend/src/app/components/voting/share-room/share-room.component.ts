import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-room',
  templateUrl: './share-room.component.html',
  styleUrls: ['./share-room.component.css']
})
export class ShareRoomComponent implements OnInit {

  @Input("id")
  public id;

  public baseShareUrl: String


  constructor() { 
   
  }


  ngOnInit(): void {
    this.baseShareUrl = "http://localhost:4200/devPlanning?roomId=";
  }

}
