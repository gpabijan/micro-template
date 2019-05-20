import {Injectable} from '@nestjs/common';
import {User} from './interface/User';

@Injectable()
export class UserService {
    private readonly users: User[] = [];

    create(cat: User) {
        this.users.push(cat);
    }

    findAll(): User[] {
        return this.users;
    }

}
