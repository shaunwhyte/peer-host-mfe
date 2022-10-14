import { Subject, tap } from "rxjs";

let subject = new Subject();
let global = (window as unknown) as any;
global.subject = subject;

export let getObservable = () => {
    return subject.asObservable();
}

export let next = (val: string) => {
    subject.next(val);
} 


export default subject;