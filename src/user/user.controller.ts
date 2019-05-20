import {Controller, Get, HttpCode, Logger, Param, Post, Req} from '@nestjs/common';
import {Observable, of} from 'rxjs';
import {CreateUserDto} from './dto/create-user.dto';

@Controller('user')
export class UserController {

    @Get()
    async findAll(@Req() createUserDto: CreateUserDto): Promise<any[]> {
        return [];
    }

    @Get('all')
    findAllObservable(@Req() createUserDto: CreateUserDto): Observable<any[]> {
        return of ([]);
    }

    @Get(':id')
    findOne(@Param() params): string {
        Logger.log(params.id);
        return `This action returns a #${params.id} user`;
    }

    @Post()
    @HttpCode(204)
    create() {
        return 'This action adds a new user';
    }
}
