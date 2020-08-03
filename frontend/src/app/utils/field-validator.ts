import {Injectable} from '@angular/core';
import {AbstractControl, FormGroup, FormControl, FormArray} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FieldValidator {

  constructor() {
  }

  
  noWhitespaceValidator(control: FormControl): { [key: string]: boolean } | null {
    
    if(control.value.length == 0){
      return null;
    }

    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    console.log('-------')
    console.log(isValid)
    if(!isValid){
      return { 'whitespace': true };
    }
    return null; 
  }

}