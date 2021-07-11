import { getCustomRepository } from 'typeorm'
import { FavoritesRepositories } from '../repositories/FavoritesRepositories'
import { UsersRepositories } from '../repositories/UsersRepositories'

class ListFavoritesService {
  async execute (user_id: number) {
    const favoritesRepositories = getCustomRepository(FavoritesRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({ id: user_id })
    const favorites = await favoritesRepositories.find({ user })

    if (!favorites) {
      throw new Error('user does not have favorites')
    }

    return favorites
  }
}

export { ListFavoritesService }
