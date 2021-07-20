import { getCustomRepository } from 'typeorm'
import { FavoriteType } from '../entities/FavoriteType'
import { FavoritesRepositories } from '../repositories/FavoritesRepositories'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IFavoriteRequest {
  user_id: number;
  marvel_id: string;
  favorite_type: FavoriteType;
  thumbnail: string;
}

class CreateFavoriteService {
  async execute ({ user_id, marvel_id, favorite_type, thumbnail }: IFavoriteRequest) {
    const favoritesRepositories = getCustomRepository(FavoritesRepositories)
    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({ id: user_id })

    if (!user) {
      throw new Error('User does not exists')
    }

    const favoriteAlreadyExists = await favoritesRepositories.findOne({ user, marvel_id })

    if (favoriteAlreadyExists) {
      await favoritesRepositories.delete(favoriteAlreadyExists)
      return true
    }

    const favorite = favoritesRepositories.create({
      user,
      marvel_id,
      favorite_type,
      thumbnail
    })

    await favoritesRepositories.save(favorite)
    delete favorite.user

    return favorite
  }
}

export { CreateFavoriteService }
