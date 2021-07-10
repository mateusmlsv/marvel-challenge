import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { UsersRepositories } from '../repositories/UsersRepositories'

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
    }, 'eb632b8590e9f095b2774c28a58c07f5', {
      subject: user.id.toString(),
      expiresIn: '1d'
    })

    return { token }
  }
}

export { AuthenticateUserService }
