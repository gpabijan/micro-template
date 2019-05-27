import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserFactory} from '../../test/factories/user';
import {Test, TestingModule} from '@nestjs/testing';

describe('UserController', () => {
  let module: TestingModule, userService: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
      ],
    }).compile();
  });

  beforeEach(async () => {
    userService = module.get(UserService);

  });

  describe('GetUsers', () => {
    it('should return list of users', async () => {
      const users = UserFactory.buildList(10);
      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(users);
      const userController = module.get(UserController);
      expect(await userController.getAllUsers()).toBe(users);
    });
  });

});
