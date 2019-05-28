import {UserController} from './user.controller';
import {UserService} from './user.service';
import {UserFactory} from '../../test/factories/user';
import {Test, TestingModule} from '@nestjs/testing';

describe('UserController', () => {
  let module: TestingModule;
  let userService: UserService;
  let userController: UserController;

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
    userController = new UserController(userService);

  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = UserFactory.buildList(10);
      jest.spyOn(userService, 'getAllUsers').mockImplementation(() => result);

      expect(await userController.getAllUsers()).toBe(result);
    });
  });

});
