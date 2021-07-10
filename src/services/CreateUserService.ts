import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IUserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
  async execute ({ name, email, password }: IUserRequest) {
    const usersReporitory = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await usersReporitory.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User alread exists')
    }

    const user = usersReporitory.create({
      name,
      email,
      password
    })

    await usersReporitory.save(user)

    delete user.password

    return user
  }
}

export { CreateUserService }
