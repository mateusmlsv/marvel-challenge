import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { UsersRepositories } from '../repositories/UsersRepositories'
import authConfigs from '../configs/auth'

interface IAuthenticateRequest {
  email: string;
  password: string
}

class AuthenticateUserService {
  async execute ({ email, password }: IAuthenticateRequest) {
    if (!email || !password) {
      throw new Error('Email/password incorret.')
    }

    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({ email })

    if (!user) {
      throw new Error('Email/password incorret.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/password incorret.')
    }

    const token = sign({
      email: user.email
    }, authConfigs.jwt.secret, {
      subject: user.id.toString(),
      expiresIn: authConfigs.jwt.expiresIn
    })

    delete user.password

    return { token, user }
  }
}

export { AuthenticateUserService }
