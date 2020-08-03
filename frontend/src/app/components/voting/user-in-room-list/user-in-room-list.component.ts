import { Component, OnInit, Input, OnDestroy , OnChanges, SimpleChanges} from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, ChildActivationStart } from '@angular/router';
import { DevService } from 'src/app/services/dev.service';
import { TokenService } from 'src/app/services/token.service';
import { VotationRoomService } from 'src/app/services/votation-room.service';
import { interval } from 'rxjs';



@Component({
  selector: 'app-user-in-room-list',
  templateUrl: './user-in-room-list.component.html',
  styleUrls: ['./user-in-room-list.component.css']
})
export class UserInRoomListComponent implements OnInit, OnDestroy, OnChanges {

  @Input("id")
  id;

  @Input("inVotation")
  public inVotation;

  @Input("hasUserStory")
  public hasUserStory;

  myVar

  votersList = Array();


  constructor(private router: Router, private route: ActivatedRoute, private _ds: DevService, private _ts: TokenService, private _vrs: VotationRoomService) {
    console.log(this.id);
    console.log(this._vrs.listVoterInRoom(this.id));
    this.initRefresh();
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.inVotation){
      this.inVotation = changes.inVotation.currentValue;  
    }
    
    if (changes.hasUserStory) {
      this.hasUserStory = changes.hasUserStory.currentValue;
    }
  }

  ngOnDestroy(): void{
    this.stopRefresh();
  }

  refresh() {
    this.myVar = interval(2000)
    .subscribe((val) => { this.initRefresh() });
  }

  initRefresh(){
    this._vrs.listVoterInRoom(this.id).subscribe(
      data => {
        this.votersList = data;
      },
      err => {
        this.refresh();
      }
    )
  }
  
  stopRefresh() {
    this.myVar.unsubscribe();
  }

}
