import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import {UserFactory} from '../../test/factories/user';

jest.mock('./user.service');

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get(UserService);
  });

  it('should return all users', async () => {
    const users = UserFactory.buildList(10);
    jest.spyOn(service, 'getAllUsers').mockResolvedValue(users);
    expect(await service.getAllUsers()).toEqual(users);
  });
});
