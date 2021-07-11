import { getCustomRepository } from 'typeorm'
import { FavoritesRepositories } from '../repositories/FavoritesRepositories'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IFavoriteRequest {
  user_id: number,
  id: number
}

class DeleteFavoriteService {
  async execute ({ user_id, id }: IFavoriteRequest) {
    const favoritesRepositories = getCustomRepository(FavoritesRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({ id: user_id })
    const favorite = await favoritesRepositories.findOne({ id, user })

    if (!favorite) {
      throw new Error('Favorite does not exists')
    }

    await favoritesRepositories.delete({ id })

    return true
  }
}

export { DeleteFavoriteService }
