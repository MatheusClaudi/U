import {AbstractControl, FormGroup, FormControl, FormArray} from '@angular/forms';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

const DATE_FORMAT = "DD/MM/YYYY";
const DATE_SEPARATOR = "/"

@Injectable({
  providedIn: 'root'
})
export class DateValidator {


  constructor() {
  }


  
  validDateValidator(control: AbstractControl): { [key: string]: boolean } | null {

    if (!DateValidator.isDateValid(control.value)){
      return  { 'validDate': true}
    }
    return null;
  }

  validEndAndStartDate(fg: FormGroup): { [key: string]: boolean } | null {
    
    var adaptStartDate = DateValidator.adapt(fg.get("startDate").value)
    var adaptEndDate = DateValidator.adapt(fg.get("endDate").value)

    if (adaptStartDate === null || adaptEndDate == null){
      return null;
    }

    var calendarStartDate = moment(adaptStartDate, DATE_FORMAT, true)
    var calendarEndDate = moment(adaptEndDate, DATE_FORMAT, true)

    if(!calendarStartDate.isValid() || !calendarEndDate.isValid()){
      return null;
    }

    if(calendarStartDate.isAfter(calendarEndDate)){
      return {'validEndStart': true}
    }

    return null
  }

  validFeedbackRate(fg: FormGroup): { [key: string]: boolean } | null {
    
    var type = fg.get("type").value
    var rate = fg.get("rate").value

    if (type == "Formal" || type == "Expectatica"){
      return null
    }

    if (type == "Constante" && rate  == ""){
      return {'validRate': true}
    }

    return null
  }


  validDatesInMeetingList(fg: FormArray): { [key: string]: boolean } | null {
    
    for (let element of fg.get('meetings').value){


      if(!DateValidator.isDateValid(element.date)){
        return {'validDatesMeetingList': true};
      }
      else{

        let sString = fg.get('startDate').value
        let eString = fg.get('endDate').value


        if (!DateValidator.isDateValid(sString) || !DateValidator.isDateValid(eString)){
          return null
        }

        var adaptStartDate = DateValidator.adapt(sString)
        var adaptEndDate = DateValidator.adapt(eString)
    
        var calendarStartDate = moment(adaptStartDate, DATE_FORMAT, true)
        var calendarEndDate = moment(adaptEndDate, DATE_FORMAT, true)
        var calendarDate = moment(DateValidator.adapt(element.date), DATE_FORMAT, true)
        var today = moment(moment().format(DATE_FORMAT), DATE_FORMAT, true);

        if (calendarDate < calendarStartDate && fg.get('meetings').dirty){
          return {'validIntervalDatesMeetingListStartDate': true}
        }

        if (calendarDate > calendarEndDate && fg.get('meetings').dirty){
          return {'validIntervalDatesMeetingListEndDate': true}
        }

        if(today > calendarDate && fg.get('meetings').dirty){
          return {'validIntervalDatesMeetingListToday': true}
        }
      }
    }

    return null;
  }

  static isDateValid(date): boolean {
    var adaptDate = DateValidator.adapt(date)

    if (adaptDate === null){
      return  false;
    }

    var calendarDate = moment(adaptDate, DATE_FORMAT, true)
    if(!calendarDate.isValid()){

      return  false;
    }
    
    return true;
  }

  static adapt(value) {
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

  static checkTwoLengthFormat(n){
    if(n.length === 1){
      return "0" + n;
    }else if(n.length === 2){
      return n
    }
    else {
      return null
    }
  }  
}
