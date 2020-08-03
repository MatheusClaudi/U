import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenService } from '../../services/token.service';
import { SprintService } from '../../services/sprint.service';
import { Sprint } from 'src/app/models/Sprint';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  sprintsFromUser: Array<Sprint> = [];

  private userEmail: String;

  constructor(private router: Router, private _ts: TokenService, private _ss: SprintService) {
    this.userEmail = this._ts.getEmail();
    this._ss.findAllSprintsFromUser(this.userEmail).subscribe(
      data => {
        this.sprintsFromUser = [];

        for (let i = 0; i < data.length; i++){
          let sprint: Sprint;
          sprint = new Sprint();
          sprint.id = data[i].id;
          sprint.name = data[i].name;
          sprint.date = data[i].date;
          this.sprintsFromUser.push(sprint);
        }
      }
    )
    
  }

  ngOnInit(): void {
  }

  createNewSprint(){
    this.router.navigate(["/create-sprint"]);
  }

  delete(event, pos){
    event.stopPropagation();
    this._ss.deleteSprint(this.sprintsFromUser[pos].id).subscribe(
      data => {
        this.sprintsFromUser.splice(pos, 1);
      }
    );
  }

  openVotation(sprintId){
    console.log(sprintId);
    this.router.navigate(["/planning"], { queryParams: {sprintId: sprintId}});
  }

}
