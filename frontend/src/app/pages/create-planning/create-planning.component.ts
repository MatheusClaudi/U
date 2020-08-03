import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { SprintService } from '../../services/sprint.service';
import { UserStoryService } from '../../services/userStory.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Sprint } from 'src/app/models/Sprint';
import { UserStory } from 'src/app/models/UserStory';
import { VotationRoomService } from 'src/app/services/votation-room.service';

@Component({
  selector: 'app-create-planning',
  templateUrl: './create-planning.component.html',
  styleUrls: ['./create-planning.component.css']
})
export class CreatePlanningComponent implements OnInit {

  public planningForm: FormGroup;


  constructor(private router: Router, private authService:AuthService, private tokenService: TokenService, private _ss: SprintService, private _uss: UserStoryService, private _vrs: VotationRoomService) {

    this.planningForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
      release: new FormControl('', [Validators.required,,Validators.minLength(2), Validators.maxLength(200)])
    });
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/planningHome']);
  }

  onSubmit(): void {

    this.router.navigate(['/conf'],{ queryParams: {sprintName: this.planningForm.get("name").value, release: this.planningForm.get("release").value}});
  }

  isFormFieldInvalid(field: string): boolean {
    const ctrl = this.planningForm.get(field);
    return !ctrl.valid && ctrl.touched && ctrl.dirty;
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.planningForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

}
