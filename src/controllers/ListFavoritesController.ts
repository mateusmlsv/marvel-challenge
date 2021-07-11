import { Request, Response } from 'express'
import { ListFavoritesService } from '../services/ListFavoritesService'

class ListFavoritesController {
  async handle (request: Request, response: Response) {
    const { user_id } = request

    const listFavoritesService = new ListFavoritesService()

    const userFavorites = await listFavoritesService.execute(parseInt(user_id))

    return response.json(userFavorites)
  }
}

export { ListFavoritesController }
