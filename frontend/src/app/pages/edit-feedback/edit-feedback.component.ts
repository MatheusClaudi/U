import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
import { User } from 'src/app/models/User';
import { NgbDateStruct, NgbDatepickerI18n, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { compileComponentFromMetadata } from '@angular/compiler';
import { FeedbackService } from 'src/app/services/feedback.service';
import { CreateFeedbackRequest } from 'src/app/models/CreateFeedbackRequest';
import { DateValidator } from 'src/app/utils/date-validator';
import { FieldValidator } from 'src/app/utils/field-validator';
import { FAKE_USERS } from 'src/app/components/user-select/user-select.component';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';



const I18N_VALUES = {
  pt: {
    weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    months: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dec',
    ],
  },
  // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'pt';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ], // define custom NgbDatepickerI18n provider
})
export class EditFeedbackComponent implements OnInit {


  public feedbackForm: FormGroup;

  public mapOriginal = new Map();
  public mapToRetrieve = new Map();
  public mapToPut = new Map();

  public prevChangesMapSize = null;
  public startDate;
  public originalEndDate;
  public feedbackId;
  public originalUserList;

  ready1 = false
  ready2 = false
  ready3 = false
  

 
  constructor(private routeActive: ActivatedRoute, private route: Router,  private dateValidator: DateValidator, private _fs: FeedbackService) {

    this.routeActive.params.subscribe((params) => {
      this.feedbackId = params['id'];
    });

    this._fs.getFeedbackById(this.feedbackId).subscribe(
      data => {
        this.startDate = data.creationDate.split("-").join("/");
        this.originalEndDate = data.deadlineDate.split("-").join("/");
    
        console.log(data)
        let aux = new Array()
        data.usersFeedback.forEach(element => {
          this.mapOriginal.set(element.user.id, element.user)
          aux.push(element.user)
          console.log(this.mapOriginal)
        }, this.originalUserList = aux);
      },
      err => {
        this.route.navigate(["/feedback"])
      }
    )
    
  

    this.feedbackForm = new FormGroup({
      endDate: new FormControl('',Validators.compose([this.dateValidator.validDateValidator])),
      startDate: new FormControl(''),
    },  [this.dateValidator.validEndAndStartDate]);

  }

  ngOnInit(): void {
    this.feedbackForm.get('startDate').setValue(this.startDate);
    this.feedbackForm.get('endDate').setValue(this.originalEndDate);
  }

  hasErrorFeedbackForm(error: string): boolean{
    const ctrl = this.feedbackForm;
    return ctrl.hasError(error);
  }
  

  hasErrorFeedbackField(field: string, error: string): boolean {
    const ctrl = this.feedbackForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }


  onUsersListChanges(evento){
    
    let increase

    let usr: User = evento.change
    console.log(usr)

    if(this.prevChangesMapSize == null){
      increase = this.mapOriginal.size < evento.map.size
    }else{
      increase = this.prevChangesMapSize < evento.map.size
    }

    console.log(increase)

    
    if(increase){
      if (this.mapToRetrieve.has(usr.id)){
        this.mapToRetrieve.delete(usr.id)
      }

      if(!this.mapOriginal.has(usr.id)){
        this.mapToPut.set(usr.id, usr)
      }
    }
    else{
      if (this.mapToPut.has(usr.id)){
        this.mapToPut.delete(usr.id)
      }
      if(this.mapOriginal.has(usr.id)){
        this.mapToRetrieve.set(usr.id, usr)
      }
    }

    this.prevChangesMapSize = evento.map.size;
  }

  onSubmitChanges(){
    
    if (this.feedbackForm.valid  && this.feedbackForm.get("endDate").value){
      console.log("1")
      this._fs.editFeedbackDeadline(this.feedbackId , this.feedbackForm.get('endDate').value).subscribe(
        data => {
          this.ready1 = true
          this.confirm_exit()
        },
        err => {}
      )
    }
    else{
      this.ready1 = true
      this.confirm_exit()
    }
    
    if (this.prevChangesMapSize != null){
      console.log("2")
      console.log(this.mapToPut)
      this._fs.addUsersToFeedback(this.feedbackId, this.listPut()).subscribe(
        data => {
          this.ready2 = true;
          this.confirm_exit();
        }
      )

      this._fs.retrieveUsesrFromFeedback(this.feedbackId, this.listRetrieve()).subscribe(
        data => {
          this.ready3 = true;
          this.confirm_exit()
        }
      )
    }
    else{
      this.ready2 = true
      this.ready3 = true
      this.confirm_exit()
    }
  }

  c1(){
    var a = moment(this.adapt(this.feedbackForm.get('endDate').value), "DD/MM/YYYY", true);
    var b = moment(this.adapt(this.originalEndDate), "DD/MM/YYYY", true);
    
    return a < b;
  }

  adapt(value) {
    let DATE_SEPARATOR = "/"
    let aux = value.split(DATE_SEPARATOR);


    if (aux.length !== 3 || aux.join("").match(/^[0-9]+$/) == null) {
      return null;
    }

    let checkDay = DateValidator.checkTwoLengthFormat(aux[0]);
    let checkMonth = DateValidator.checkTwoLengthFormat(aux[1]);

    if (checkDay == null || checkMonth == null){
      return null
    }

    return [checkDay, checkMonth, aux[2]].join(DATE_SEPARATOR)
  }



  listPut(){
    let aux  = new Array();

    let keys = this.mapToPut.keys()

    while(true){
      let value = keys.next().value
      if (value){
        aux.push(value)
      }
      else{
        break;
      }
    }

    console.log(aux)
    return aux  
  }

  listRetrieve(){
    let aux  = new Array();

    let keys = this.mapToRetrieve.keys()

    while(true){
      let value = keys.next().value
      if (value){
        aux.push(value)
      }
      else{
        break;
      }
    }

    console.log(aux)
    return aux  
  }

  confirm_exit(){
    if (this.ready3 && this.ready2 && this.ready1){
      this.route.navigate(["/feedback"])
    }
  }

}

