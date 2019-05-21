import {Injectable} from '@nestjs/common';
import {User} from './interface/User';

@Injectable()
export class UserService {
    private readonly users: User[] = [];

    create(user: User) {
        this.users.push(user);
    }

    findAll(): User[] {
        return this.users;
    }

}
