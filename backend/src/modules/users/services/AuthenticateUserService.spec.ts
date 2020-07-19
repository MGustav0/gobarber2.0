import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
// import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  // it('should not be able to create a new user with same email from another', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const createUser = new CreateUserService(fakeUsersRepository);

  //   await createUser.execute({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '123456',
  //   });

  //   expect(
  //     createUser.execute({
  //       name: 'John Doe',
  //       email: 'johndoe@example.com',
  //       password: '123456',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
