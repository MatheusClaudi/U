import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from 'src/app/models/Card';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input('data') card: Card;
  @Input('listID') listID: number;
  @Input('cardColor') color;
  @Output('delete') deleteCard = new EventEmitter();
  @Output('update') updateCard = new EventEmitter();

  public enabledEdition: boolean;
  public showMenu: boolean;

  constructor(private router: Router) {
    this.showMenu = false;
  }

  ngOnInit(): void {
    console.log(this.card.tags);
  }

  addTag(item: Tag) {
    this.card.tags.push(item);
    this.updateCard.emit({ newCard: this.card, listID: this.listID });
  }

  removeTag(item: Tag) {
    const i = this.card.tags.findIndex((tag) => tag.id === item.id);
    this.card.tags.splice(i, 1);
    this.updateCard.emit({ newCard: this.card, listID: this.listID });
  }

  displayMenu() {
    this.showMenu = !this.showMenu;
  }

  closeMenu() {
    this.showMenu = false;
  }

  closeEdition() {
    if (this.enabledEdition) {
      this.enabledEdition = false;
    }
  }

  enableEdit(event) {
    event.stopPropagation();
    this.displayMenu();
    this.enabledEdition = true;
  }

  delete() {
    this.deleteCard.emit({ list: this.listID, card: this.card });
  }

  saveChanges(event) {
    if (event.key == 'Enter') {
      let currentValue = event.target.value;
      this.enabledEdition = false;

      let newCard = new Card();
      newCard.id = this.card.id;
      newCard.text = currentValue;
      this.card.text = currentValue;

      this.updateCard.emit({ newCard: newCard, listID: this.listID });
    } else if (event.key == 'Escape') {
      this.closeEdition();
    }
  }
}