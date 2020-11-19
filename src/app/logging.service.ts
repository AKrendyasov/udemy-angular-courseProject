import { Injectable } from '@angular/core';

/*@Injectable({
    providedIn: 'root'
})*/
export class LoggingService {
    lastLog: string;

    constructor() {
    }

    printLastLog(msg) {
        console.log('msg', msg);
        console.log('this.lastLog', this.lastLog);
        this.lastLog = msg;
    }
}
