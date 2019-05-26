import {Authority} from './Authority';

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    authorities: Authority[];
}
