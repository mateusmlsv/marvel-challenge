import { compare, hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IUserRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

class UpdateUserService {
  async execute ({
    user_id,
    name,
    email,
    old_password,
    password
  }: IUserRequest) {
    const usersReporitory = getCustomRepository(UsersRepositories)

    const user = await usersReporitory.findOne({ id: parseInt(user_id) })

    if (!user) {
      throw new Error('User not found.')
    }

    const userWithUpdatedEmail = await usersReporitory.findOne({ email })

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== parseInt(user_id)) {
      throw new Error('Email already in use by another user.')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new Error('You need to inform the old password to set a new password.')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new Error('Old password does not math.')
      }

      user.password = await hash(password, 8)
    }

    return usersReporitory.save(user)
  }
}

export { UpdateUserService }
