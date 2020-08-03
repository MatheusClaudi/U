import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-conf',
  templateUrl: './conf.component.html',
  styleUrls: ['./conf.component.css']
})
export class ConfComponent implements OnInit {

  sprintName: String;
  release: String;
  planningCards: string[];
  planningConfigFormArray: FormArray;
  cards = ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?', 'Coffee'];
  cardsType: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ){

      this.route.queryParams.subscribe(params => {
        this.sprintName = params['sprintName'];
        this.release = params['release']
    });
    this.planningConfigFormArray = new FormArray([]);

    this.cards.forEach(function(){
      this.planningConfigFormArray.push(new FormControl(true));
    }.bind(this));
  }

  ngOnInit(): void {
    this.cardsType = 'Scrum';
  }

  setCardsType(type: string) {
    this.cardsType = type;
  }

  configPlanning() {
    const formName = 'planningConfigFormArray';
    this.planningCards = [];

    if (this.checkFormIsValid(formName)){
      for (const [key, value] of Object.entries(this.planningConfigFormArray.value)) {
        if (value){
          this.planningCards.push(this.cards[key]);
        }
      }

      console.log(this.planningCards);

      this.router.navigate(["/create-story/"], { queryParams: {sprintName: this.sprintName, release: this.release, cardsList: this.planningCards}});
    }
  }

  goBack(): void {
    this.router.navigate(['/create-sprint']);
  }

  private checkFormIsValid(formName: string) {
    let res = false;
    if (this.invalidForm(formName)) {
      alert('Formulário inválido!');
    } else {
      res = !res;
    }
    return res;
  }

  private invalidForm(name: string) {
    return this[name].invalid;
  }
}
