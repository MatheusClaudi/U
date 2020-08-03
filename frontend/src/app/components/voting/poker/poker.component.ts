import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DevService } from 'src/app/services/dev.service';
import { VoterService } from 'src/app/services/voter.service';
import { SprintService } from 'src/app/services/sprint.service';
import { EventService } from 'src/app/services/events-service';


@Component({
  selector: 'app-poker',
  templateUrl: './poker.component.html',
  styleUrls: ['./poker.component.css']
})
export class PokerComponent implements OnInit, OnChanges {

  cards: String[]
  clickedCard: String;

  @Input("inVotation")
  inVotation: boolean;

  @Input("sprintId")
  sprintId

  constructor(private router: Router, private route: ActivatedRoute, private _ds: DevService, private _vs: VoterService, private _ss: SprintService) {
    EventService.newEventUnselectCards.subscribe(
      confirmation => {
        this.clickedCard = undefined;
      }
    )
  }

  ngOnInit(): void {
    console.log(this.sprintId)
    this._ss.getCardsFromSprint(this.sprintId).subscribe(
      data => {
        this.cards = data;
      }
    )
    console.log(this.cards);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.inVotation = changes.inVotation.currentValue;
  }

  isClicked(card: String): Boolean{
    return card == this.clickedCard;
  }

  vote(value){
    if (this.inVotation){
      this.clickedCard = value;
      console.log(value);
      this._vs.vote(this._ds.getDevId(), value).subscribe();
    }
  }
}
