import { Component, OnInit, Output, Input } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { Board } from '../../models/Board';
import { TokenService } from 'src/app/services/token.service';
import { ListBoard } from '../../models/ListBoard';
import { Router } from '@angular/router';
import { SprintService } from 'src/app/services/sprint.service';
import { Sprint } from 'src/app/models/Sprint';

@Component({
  selector: 'create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css'],
})
export class CreateBoardComponent implements OnInit {
  public modalForm: FormGroup;
  private apiUrl: string;
  public sprintsFromUSer;
  public sprintSelected;
  public showError = false;

  constructor(
    public dashBoardService: DashboardService,
    private router: Router,  private _ss: SprintService
  ) {
    const API = environment.API;
    this.apiUrl = API + '/api';
    this.modalForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
    });


      this._ss.findAllSprintsFromUser("").subscribe(
        data => {
          this.sprintsFromUSer = [];
  
          for (let i = 0; i < data.length; i++){
            let sprint: Sprint;
            sprint = new Sprint();
            sprint.id = data[i].id;
            sprint.name = data[i].name;
            sprint.date = data[i].date;
            this.sprintsFromUSer.push(sprint);
          }
        }
      )
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.modalForm.get(field);
    return (ctrl.dirty && ctrl.hasError(error)) || (this.showError && ctrl.hasError(error));
  }

  ngOnInit() {}

  selectSprint(sprint) {
    this.sprintSelected = sprint;
  }

  createBoard(): void {
    if(this.modalForm.valid){
      let board = new Board();
      board.name = this.modalForm.get('name').value;
      board.lists = [
        new ListBoard('Ótimo'),
        new ListBoard('Aprimorar'),
        new ListBoard('Pontos de ação'),
      ];

      if (this.sprintSelected){
        board.sprint = this.sprintSelected;
      }
      this.dashBoardService.save(board).subscribe((data) => {
        this.dashBoardService.newBoardSubject.next(board);
        this.router.navigate(['/dashboard']);
      });
    }
    else{
      this.showError = true;
    }
  }
}
