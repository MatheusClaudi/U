import { Component, OnInit, OnDestroy, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DevService } from 'src/app/services/dev.service';
import { TokenService } from 'src/app/services/token.service';
import { VotationRoomService } from 'src/app/services/votation-room.service';
import { VoterService } from 'src/app/services/voter.service';
import { UserStoryService } from 'src/app/services/userStory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/events-service';


@Component({
  selector: 'app-poker-planning',
  templateUrl: './poker-planning.component.html',
  styleUrls: ['./poker-planning.component.css']
})
export class PokerPlanningComponent implements OnInit, OnDestroy, OnChanges {

  public sprintId;
  public currentUs;
  public currentUsTemp;
  public userStory = new Array();
  public inVotation;
  public hiddenController = false;
  roomId;
  aux
  public votationOpen;
  public pointsForUs
  public votersThatVoted 

  a = "";

  constructor(private router: Router, private route: ActivatedRoute, private _ds: DevService, private _ts: TokenService, private _vrs: VotationRoomService, private _vs: VoterService, private _uss: UserStoryService, public _es: EventService) { 
    this.route.queryParams.subscribe(params => {
      this.sprintId = params['sprintId'];
    })

  
    this._vrs.getRoomBySprintId(this.sprintId).subscribe(
      data => {
        console.log(data);
        this.roomId = data.id;

        let userEmail = this._ts.getEmail();

        console.log("algo chamou o consrutor")
        this._vrs.addNewLogedDev(this.roomId, userEmail).subscribe(
          data => {
            console.log(data);
            this._ds.saveDevId(data.id);
          }
        )
        
        this.currentUs = data.objectOfCurrentVotation;
        this.inVotation = data.votationOpen;
        this.userStory = data.sprintInVotation.userStory;
        this.votationOpen = !!data.objectOfCurrentVotation;
      },
      err => {
        //this.router.navigate(["/planningHome"]);
      }
    )
  }

  @HostListener('window:onunload')
  @HostListener('window:beforeunload')
  async getOutOfVotation(event){
    
    let id = await this._ds.getDevId();

    let a = await this._vrs.sendBeaconToRemoveDev(this.roomId, id);
    this._ds.removeDevId(); 
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy(): void{
    console.log("sdd")
    this.getOutOfVotation(null);
  }

  ngOnChanges(event): void{
    console.log(event);
  }

  changeUserStory(us){
    this.currentUsTemp = us;
  }

  changeUSInVotation(){
    if (this.currentUsTemp){
      console.log(this.currentUsTemp.id);
      this._vrs.changeUsInVotation(this.roomId, this.currentUsTemp.id).subscribe(
        sucess => {
          this._vrs.getRoomBySprintId(this.sprintId).subscribe(
            data => {
              
              this.roomId = data.id;
              this.currentUs = data.objectOfCurrentVotation;
              this.inVotation = data.votationOpen;
              this.userStory = data.sprintInVotation.userStory;
              this.votationOpen = !!data.objectOfCurrentVotation;

            }
          )
        }
      );
    }
  }

  endCurrentVotation(){
    
    let value;

    if (this.pointsForUs == "Coffee" || this.pointsForUs == "?"){
      value = 0;
    }
    else{
      value = this.pointsForUs;
    }

    this._vrs.endCurrentVotation(this.roomId, value).subscribe(
      sucess => {
        this._uss.getUserStoryById(this.currentUs.id).subscribe(
        
        )
        this._vrs.getRoomBySprintId(this.sprintId).subscribe(
          data => {
            
            this.roomId = data.id;
            this.currentUs = data.objectOfCurrentVotation;
            this.inVotation = data.votationOpen;
            this.userStory = data.sprintInVotation.userStory;
            this.votationOpen = !!data.objectOfCurrentVotation;
          }
        )
      }
    );

  }

  cleanVotes(){
    this._vrs.cleanVotes(this.roomId).subscribe(
      sucess => {
      //  alert("Votos limpos");
      }
    );
  }

  stopVotation(){

    this._vrs.setVotationStatus(this.roomId, false).subscribe(
      sucess => {
        this.pointsForUs = undefined;
        this.inVotation = false;
        this._es.unselectCards("confirmação")
        //
        this._vrs.listVoterInRoomThatVoted(this.roomId).subscribe(
          data => {
            this.votersThatVoted = data;
            console.log(data);
          }
        )
     //   alert("votação parada");
      }
    )
  }

  restartVotation(){
    this.cleanVotes();
    this._vrs.setVotationStatus(this.roomId, true).subscribe(
      sucess => {
        this.inVotation = true;
       // alert("votação iniciada");
      }
    )
  }

  get myStyles(): any {
    return {
        'display' : this.a
    };
}

  showOrCloseController(){
    this.hiddenController = !this.hiddenController;
    if (this.hiddenController){
      this.a = 'none'
    }
    else{
      this.a = ""
    }
  }


  changePoints(points){
    this.pointsForUs = points;
  }
}
