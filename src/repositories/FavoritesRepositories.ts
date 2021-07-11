import { EntityRepository, Repository } from 'typeorm'
import { Favorite } from '../entities/Favorite'

@EntityRepository(Favorite)
class FavoritesRepositories extends Repository<Favorite> {}

export { FavoritesRepositories }
