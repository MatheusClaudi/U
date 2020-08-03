import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventService {

    static newAdminVerificaton = new EventEmitter<boolean>();

    static admin: boolean = undefined;

    static newLogedVerificaton = new EventEmitter<boolean>();

    static loged: boolean = undefined;

    static newClientVerificaton = new EventEmitter<boolean>();

    static client: boolean = undefined;

    static newEventUnselectCards = new EventEmitter<boolean>();


    logedVerification(verification){
        EventService.loged = verification
        EventService.newLogedVerificaton.emit(verification);
    }

    adminVerification(verification){
        EventService.admin = verification
        EventService.newAdminVerificaton.emit(verification);
    }
    
    clientVerification(verification){
        EventService.client = verification
        EventService.newClientVerificaton.emit(verification);
    }

    unselectCards(verification){
        EventService.newEventUnselectCards.emit(verification);
    }
}