import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserStory } from './../../models/UserStory';
import { Sprint } from 'src/app/models/Sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { UserStoryService } from 'src/app/services/userStory.service';
import { VotationRoomService } from 'src/app/services/votation-room.service';
import { TokenService } from 'src/app/services/token.service';
import { VotationCardService } from 'src/app/services/votation-card.service';

@Component({
  selector: 'app-create-us',
  templateUrl: './create-us.component.html',
  styleUrls: ['./create-us.component.css']
})
export class CreateUsComponent implements OnInit{

  usrStories: UserStory[];
  usNameForm: FormGroup;
  userStoryId: number = null;
  parentSprintId: number;
  indexToChange;

  sprintName: string;
  release: string;
  cards: Array<string> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute, private tokenService: TokenService,
    private _ss: SprintService, private _uss: UserStoryService,
    private _vrs: VotationRoomService, private _vcs: VotationCardService
  ){
    this.route.queryParams.subscribe(params => {
      this.sprintName = params.sprintName;
      this.cards = params.cardsList;
      this.release = params.release;
    });

    this.usNameForm = new FormGroup({
      usName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2000)]),
      accCriteria: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(2000)])
    });

    this.route.params.subscribe(params => {
      this.parentSprintId = params.id;
    });
  }

  ngOnInit(): void {
    // Test Lines
    this.usrStories = [];
    // End Test Lines
  }

  saveStoryList(index, sprintId){

    const aux2 = new UserStory();

    aux2.accCriteria = this.usrStories[index].accCriteria;
    aux2.storyName = this.usrStories[index].storyName;

    this._uss.saveUserStoryToSprint(sprintId, aux2).subscribe(
      data => {
        console.log(data);
        if (index + 1 === this.usrStories.length){
          this.saveRoom(sprintId);
        }
        else{
          this.saveStoryList(index + 1, sprintId);
        }
      }
    );

  }

  toggleDetails(index) {
    this.usrStories[index].showDetails = !this.usrStories[index].showDetails;
  }

  saveRoom(sprintId){
    this._vrs.saveRoom(sprintId, this.tokenService.getEmail()).subscribe(
      ota => {
        console.log(ota);
        this.router.navigate(['/planningHome']);
      }
    );
  }

  saveCards(sprintId){
    this._vcs.saveCardsToSprint(sprintId, this.cards).subscribe(

    );
  }

  sendServer(){
    const aux = new Sprint();

    aux.name = this.sprintName;
    aux.release = this.release;
    aux.userStorys = new Array<UserStory>();

    this._ss.saveSprintToUser(this.tokenService.getEmail(), aux).subscribe(
      data1 => {

        this.saveCards(data1.id);

        if (this.usrStories.length > 0){
          this.saveStoryList(0, data1.id);
        }
        else{
          this.saveRoom(data1.id);
        }
      }
    );
  }

  addUserStory(navigate: boolean) {
    if(this.usNameForm.valid){
      const usName = this.usNameForm.get('usName').value;
      const aCriteria = this.usNameForm.get('accCriteria').value;

      if ((usName !== null) && (usName !== '')) {
        const aux2 = new UserStory();

        aux2.accCriteria =  aCriteria;
        aux2.storyName = usName;
        aux2.showDetails = false;

        this.usrStories.push(aux2);
        this.usNameForm.reset();
      }
      else {
        console.log('Invalid Form');
      }

      if(navigate){
        this.sendServer();
      }
    }
  }

  updateUserStory() {
    if(this.usNameForm.valid){

        const usName = this.usNameForm.get('usName').value;
        const aCriteria = this.usNameForm.get('accCriteria').value;

        console.log('GET UserStory by id:', this.userStoryId);
        this.userStoryId = null;

        if ((usName !== null) && (usName !== '')) {
          const body = {
            storyName: usName,
            accCriteria: aCriteria,
            points: 0,
            completed: false
          };
          console.log('PUT US:', body);
          this.usNameForm.reset();
        } else {
          console.log('Invalid Form');
        }
    }
  }

  deleteUserStory(index: number) {
    this.usrStories.splice(index, 1);
  }

  editUS(us: UserStory, i) {
    this.usNameForm.controls.usName.setValue(us.storyName);
    this.usNameForm.controls.accCriteria.setValue(us.accCriteria);
    this.userStoryId = us.id;
    this.indexToChange = i;
    this.deleteUserStory(i);
  }


  goBack() {
    this.router.navigate(['/conf'], { queryParams: {sprintName: this.sprintName}});
  }

}

