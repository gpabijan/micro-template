import {Injectable} from '@nestjs/common';
import {User} from './entity/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateUserDto} from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    private readonly users: User[] = [];

    create(createUser: CreateUserDto) {
        const user = new User();
        user.mail = createUser.mail;
        user.name = createUser.name;
        user.surname = createUser.surname;
        user.phone = createUser.phone;
        user.country = createUser.country;
        this.userRepository.save(user);
    }

    getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

}
