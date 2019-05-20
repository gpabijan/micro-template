import {Body, Controller, Delete, Get, HttpCode, Logger, Param, Post, Put, Req} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {UserService} from './user.service';
import {User} from './interface/User';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(204)
    async create(@Body() createUserDto: CreateUserDto) {
        this.userService.create(createUserDto);
        return 'This action adds a new user';
    }

    @Get()
    async findAll(@Req() createUserDto: CreateUserDto): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): string {
        Logger.log(params.id);
        return `This action returns a #${params.id} user`;
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} user`;
    }
}
