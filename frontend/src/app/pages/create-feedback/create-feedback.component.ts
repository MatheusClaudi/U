import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css'],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ], // define custom NgbDatepickerI18n provider
})
export class CreateFeedbackComponent implements OnInit {
  public feedbackForm: FormGroup;

  public haveSubmited: boolean = false;

  public start: string;
  public end: string;
  public minDateAllowed: NgbDateStruct;

  public meetingsCounter: number;
  public meetings = [];
  public userList = [];

  constructor
    (private router: Router,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>,
    private fb: FormBuilder,
    private _fs: FeedbackService,
    private dateValidator: DateValidator,
    private fieldValidator: FieldValidator
  ) {
    this.feedbackForm = new FormGroup({
      type: new FormControl('',Validators.compose([Validators.required])),
      rate: new FormControl(''),
      selectedDuration: new FormControl(''),
      description: new FormControl('', Validators.compose([this.fieldValidator.noWhitespaceValidator])),
      startDate: new FormControl('',Validators.compose([Validators.required, this.dateValidator.validDateValidator])),
      endDate: new FormControl('',Validators.compose([Validators.required, this.dateValidator.validDateValidator])),
      meetings: this.fb.array([]),
    }, [this.dateValidator.validEndAndStartDate, this.dateValidator.validDatesInMeetingList, this.dateValidator.validFeedbackRate]);

    this.minDateAllowed = this.ngbCalendar.getToday();
  }

  ngOnInit(): void {

  }

  hasErrorWithDropdownFeedback(field: string, error: string): boolean {
    const ctrl = this.feedbackForm.get(field);
    return ctrl.hasError(error) && this.haveSubmited;
  }

  hasErrorFeedbackField(field: string, error: string): boolean {
    const ctrl = this.feedbackForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  hasErrorFeedbackForm(error: string): boolean{
    const ctrl = this.feedbackForm;
    return ctrl.hasError(error);
  }
  

  meetingField(date: string) {
    return this.fb.group({
      date: [date],
    });
  }

  createMeetings() {
    this.meetings.forEach((meeting) => {
      (this.feedbackForm.controls.meetings as FormArray).push(
        this.meetingField(meeting)
      );
    });
  }

  getMeetingsControls() {
    return (this.feedbackForm.controls.meetings as FormArray).controls;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday());
  }

  selectType(typeSelection: string): void {
    this.feedbackForm.get('type').setValue(typeSelection);
  }

  getType(){
    return this.feedbackForm.get('type').value;
  }

  selectRate(rateSelection: string): void {
    this.feedbackForm.get('rate').setValue(rateSelection);
    this.refreshMeetings();
  }

  getRate(){
    return this.feedbackForm.get('rate').value;
  }

  getDuration(){
    return this.feedbackForm.get('selectedDuration').value;
  }

  selectDuration(durationSelection: string): void {
    this.feedbackForm.get('selectedDuration').setValue(durationSelection);
    this.refreshDeadline();
    this.refreshMeetings();
  }

  setNMonths(n) {
    if (!this.feedbackForm.get('startDate').value) {
      this.start = this.today;
      this.feedbackForm.controls.startDate.setValue(this.start);
    }

    let aux: any;

    aux = this.dateAdapter.fromModel(this.feedbackForm.get('startDate').value);
    this.end = this.dateAdapter.toModel(this.ngbCalendar.getNext(aux, 'm', n));
    this.feedbackForm.controls.endDate.setValue(this.end);
  }

  refreshDeadline(): void {
    if (this.getDuration() === '6 meses') {
      this.setNMonths(6);
    } else if (this.getDuration() === '1 ano') {
      this.setNMonths(12);
    }
  }

  refreshMeetings(): void {
    this.meetings = [];
    (this.feedbackForm.controls.meetings as FormArray).clear();

    let type = this.feedbackForm.get('type').value;

    if (type === 'Formal') {
      this.meetings.push(this.feedbackForm.get('endDate').value);
    } else if (type === 'Expectativa') {
      if (
        moment(this.feedbackForm.get('startDate').value, 'DD/MM/YYYY').isAfter(
          moment(this.today, 'DD/MM/YYYY')
        )
      ) {
        this.meetings.push(this.feedbackForm.get('startDate').value);
      } else {
        this.meetings.push(this.today);
      }
    } else if (this.getRate()) {
      this.countMeetings();
    }

    this.createMeetings();
  }

  countMeetings(): void {
    let inc: number;

    switch (this.getRate()) {
      case 'Mensal':
        inc = 1;
        break;

      case 'Bimestral':
        inc = 2;
        break;

      case 'Trimestral':
        inc = 3;
        break;

      case 'Semestral':
        inc = 6;
        break;

      default:
        return;
    }

    let aux: any = this.dateAdapter.fromModel(this.today);

    if (
      moment(this.feedbackForm.get('startDate').value, 'DD/MM/YYYY').isAfter(
        moment(this.today, 'DD/MM/YYYY')
      )
    ) {
      aux = this.dateAdapter.fromModel(
        this.feedbackForm.get('startDate').value
      );
    }

    if (
      moment(this.feedbackForm.get('startDate').value, 'DD/MM/YYYY').isBefore(
        moment(this.today, 'DD/MM/YYYY')
      )
    ) {
      this.meetings.push(this.today);
    }

    let nextMeeting = this.ngbCalendar.getNext(aux, 'm', inc);

    while (this.isInPeriod(nextMeeting)) {
      this.meetings.push(this.dateAdapter.toModel(nextMeeting));
      console.log(
        'td:',
        aux,
        '\ninc:',
        inc,
        '\nnM:',
        nextMeeting,
        '\nr:',
        this.isInPeriod(nextMeeting)
      );
      nextMeeting = this.ngbCalendar.getNext(nextMeeting, 'm', inc);
    }

    this.meetings.push(this.feedbackForm.get('endDate').value);
  }

  isInPeriod(day: NgbDateStruct) {
    /*
    Nota: Existe uma incompatibilidade entre as formas de representar datas entre as bibliotecas
    MonentJS e NGBCalendar. A NGBCalendar representa as datas no formato {day: 21, month: 12, year: 2020},
    contando Janeiro como o mês 1 e Dezembro como o mês 12. Mas quando a biblioteca MomentJS recebe datas
    nesse formato, ela irá realizar o parse como Janeiro sendo o mês 0 e Dezembro sendo o mês 11. Ou seja,
    moment('2020-01,01') e moment({day: 1, month: 0, year: 2020}) representam o mesmo dia.

    Por isso, nesse código irei sempre trazer as datas para o formato brasileiro (01/01/2020, por exemplo)
    e informar o formato para a biblioteca fazer o parse corretamente.
    */
    const pStart = moment(
      this.feedbackForm.get('startDate').value,
      'DD/MM/YYYY'
    );
    const pEnd = moment(this.feedbackForm.get('endDate').value, 'DD/MM/YYYY');
    const aux = moment(this.dateAdapter.toModel(day), 'DD/MM/YYYY');

    return moment(aux).isBetween(pStart, pEnd, undefined, '()');
  }

  onUsersListChanges(evento){
    
    let myList = []
    evento.map.forEach((value, key: string) => {
      let user = new User();
      user.id = value.id
      myList.push(user);
  });

    console.log(myList);
    this.userList = myList;
  }

  submitForms() {
  
    this.haveSubmited = true;

    console.log(this.feedbackForm)

    if(this.feedbackForm.valid){
      let request = new CreateFeedbackRequest();
      request.setFeedbackFromFeedbackForm(this.feedbackForm, this.userList);
      
      this._fs.createFeedback(request).subscribe(
        data => {
          console.log(data);
          this.router.navigate(["/feedback"])
        }
      )
    }
  }
}
