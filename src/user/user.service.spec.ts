import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

jest.mock('./user.service');

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get(UserService);
  });

  it('should return all users', () => {
    expect(service.findAll()).toEqual([{ title: 'My first news' }]);
  });
});
