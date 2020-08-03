import { UserService } from '../services/user.service';
import {AbstractControl} from '@angular/forms';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailValidator {

  private timeout;

  constructor(private userService: UserService) {
  }

  validate(control: AbstractControl): Promise<{ [key: string]: boolean }> {
    clearTimeout(this.timeout);

    const value = control.value;

    // do not call server when input is empty or shorter than 2 characters
    if (!value || value.length < 2) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      this.timeout = setTimeout(() => {
        this.userService.existUserWithEmail(control.value)
          .subscribe(flag => {
              console.log(flag)
              if (flag) {
                resolve({'emailTaken': true});
              } else {
                resolve(null);
              }
            },
            (err) => {
              console.log(err);
            }
          );
      }, 200);
    });
  }

  validate_change_user_email(originalEmail) {
    return (control: AbstractControl): Promise<{ [key: string]: boolean }> => {
      clearTimeout(this.timeout);
  
      const value = control.value;
  
      // do not call server when input is empty or shorter than 2 characters
      if (!value || value.length < 2) {
        return Promise.resolve(null);
      }
  
      return new Promise((resolve, reject) => {
        this.timeout = setTimeout(() => {
          this.userService.existUserWithEmail(control.value)
            .subscribe(flag => {
                console.log(flag)
                if (flag) {
                  if (value == originalEmail){
                    resolve(null);
                  }
                  else{
                    resolve({'emailTaken': true});
                  }
                } else {
                  resolve(null);
                }
              },
              (err) => {
                console.log(err);
              }
            );
        }, 200);
      });
    }
  }

}
