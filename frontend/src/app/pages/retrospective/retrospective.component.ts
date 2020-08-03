import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RetrospectiveService } from 'src/app/services/retrospective.service';
import { Board } from 'src/app/models/Board';
import { TokenService } from '../../services/token.service';
import { ListBoard } from 'src/app/models/ListBoard';
import { Card } from 'src/app/models/Card';
import { TagService } from '../../services/tag.service';
import { Tag } from 'src/app/models/Tag';

@Component({
  selector: 'app-retrospective',
  templateUrl: './retrospective.component.html',
  styleUrls: ['./retrospective.component.css'],
})
export class RetrospectiveComponent implements OnInit {
  public colors: Array<String>;
  private boardID: number;
  public board: Board;
  public isLogged: boolean = false;
  title = 'Compartilhe com os devs';
  elementType = 'url';

  constructor(
    private route: ActivatedRoute,
    private retrospectiveService: RetrospectiveService,
    private token: TokenService,
    private tagService: TagService
  ) {
    this.colors = ['#00B778', '#EDB600', '#0076ED'];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.boardID = params['id'];
    });

    this.retrospectiveService.getBoard(this.boardID).subscribe((resp) => {
      this.board = resp;
    });
  }

  addNewCard(i): void {
    this.retrospectiveService
      .addNewCard(this.boardID, this.board.lists[i].id, 'Novo card')
      .subscribe((nc) => {
        this.board.lists[i].cards.push(nc);
      });
  }

  deleteCard(card, i): void {
    this.retrospectiveService
      .removeCard(this.boardID, card.list, card.card.id)
      .subscribe(() => {
        const idx = this.board.lists[i].cards.findIndex(
          (cardx) => cardx.id === card.card.id
        );
        this.board.lists[i].cards.splice(idx, 1);
      });
  }

  updateCard(newCardInfo): void {
    const { newCard, listID } = newCardInfo;
    this.retrospectiveService
      .editCard(this.boardID, listID, newCard)
      .subscribe();
  }
}
