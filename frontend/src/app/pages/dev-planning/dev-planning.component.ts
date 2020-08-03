import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DevService } from 'src/app/services/dev.service';
import { TokenService } from 'src/app/services/token.service';
import { VotationRoomService } from 'src/app/services/votation-room.service';
import { VoterService } from 'src/app/services/voter.service';
import { UserStoryService } from 'src/app/services/userStory.service';
import { interval } from 'rxjs';
import { EventService } from 'src/app/services/events-service';


@Component({
  selector: 'app-dev-planning',
  templateUrl: './dev-planning.component.html',
  styleUrls: ['./dev-planning.component.css']
})
export class DevPlanningComponent implements OnInit, OnDestroy {

  public roomId;
  public currentUs;
  public userStory = new Array();
  public sprintId;
  public inVotation = false;
  public votationOpen;
  myVar;
  public status
  public showResult = false;

  constructor(private router: Router, private route: ActivatedRoute, private _ds: DevService, private _ts: TokenService, private _vrs: VotationRoomService, private _vs: VoterService, private _uss: UserStoryService, private _es: EventService) { 
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'];
      let room = this.roomId;
      
      if (!!this._ts.getToken()){
        this._vrs.addNewLogedDev(room, this._ts.getEmail()).subscribe(
          data => {
            console.log(data);
            this._ds.saveDevId(data.id);
          }
        )
      }
      else {
        let name = params['name'];
        if (!name){
          this.router.navigate(["/unloged-dev-entry"], { queryParams: {roomId: this.roomId}});
        }
        else{
          this._vrs.addNewNotLogedDev(this.roomId, name).subscribe(
            sucess => {
              console.log(sucess);
              this._ds.saveDevId(sucess.id);
            }
          );
        }
      }
    });  
    this.refresh();
  }

  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {
    this.stopRefresh();
    this.getOutOfVotation(null);
  }

  refresh() {
    this.myVar = interval(1000).subscribe(
      (val) => { this.initRefresh() }
    );
  }

  updateStatus(){
    if (!this.inVotation && !this.currentUs){
      this.status = "Esperando início da votação"
    }
    else if (this.inVotation && this.currentUs){
      this.status = "Em votação"
    }

    else if (!this.inVotation && this.currentUs){
      this.status = "Votação encerrada"
      this._es.unselectCards("confirmação")
    }
  }

  initRefresh(){
    this._vrs.getRoomById(this.roomId).subscribe(
      data => {

        console.log(data);

        
        if (this.votationOpen  && !data.objectOfCurrentVotation){
          this._uss.getUserStoryById(this.currentUs.id).subscribe(
            sucess => {
              this.currentUs = sucess;
              this.updateStatus();
              this.showResult = true;
              this.myVar.unsubscribe();
              return;
            }
          )
        }
       
        this.votationOpen = !!data.objectOfCurrentVotation;
        this.currentUs = data.objectOfCurrentVotation;
        this.inVotation = data.votationOpen;
        this.userStory = data.sprintInVotation.userStory;
        this.sprintId = data.sprintInVotation.id;
        this.updateStatus();
        console.log(this.sprintId)    
      }
    )
  }

  resetRefresh(){
    this.inVotation = false;
    this.currentUs = undefined;
    this.showResult = false;
    this.refresh();
  }
  
  stopRefresh() {
    this.myVar.unsubscribe();
  }

  @HostListener('window:onunload')
  @HostListener('window:beforeunload')
  async getOutOfVotation(event){
    let id = await this._ds.getDevId();

    let a = await this._vrs.sendBeaconToRemoveDev(this.roomId, id);
    this._ds.removeDevId(); 
  }

}
