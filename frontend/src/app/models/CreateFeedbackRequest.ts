import {User} from './User';
import { FormGroup } from '@angular/forms';


export class CreateFeedbackRequest {
    creationDate: String;
    deadlineDate: String; 
    type: String;
    status: String;
    periodicity: String;
    description: String;
    meetingDateList:  Array<String>;
    users:  Array<User>;


    setFeedbackFromFeedbackForm(fg: FormGroup, userList) {
        let listDate = []
        for (let i = 0; i < fg.get("meetings").value.length; i++){
          listDate.push(fg.get("meetings").value[i].date.split("/").join("-"));
        }
    
        this.creationDate = fg.get('startDate').value.split("/").join("-");
        this.deadlineDate = fg.get('endDate').value.split("/").join("-");
        this.meetingDateList = listDate;
        this.status = 'ATIVO';
        this.type = fg.get('type').value.toUpperCase();
        this.users = userList;

        if(this.type == "CONSTANTE"){
            this.periodicity = fg.get("rate").value.toUpperCase();     
        }
       


        if(fg.get('description').value) { this.description =  fg.get('description').value; }
        else { this.description = ""; }
    }
}
