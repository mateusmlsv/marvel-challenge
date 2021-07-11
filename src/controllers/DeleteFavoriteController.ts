import { Request, Response } from 'express'
import { DeleteFavoriteService } from '../services/DeleteFavoriteService'

class DeleteFavoriteController {
  async handle (request: Request, response: Response) {
    const { id } = request.params
    const { user_id } = request

    const deleteFavoriteService = new DeleteFavoriteService()

    await deleteFavoriteService.execute({ user_id: parseInt(user_id), id: parseInt(id) })

    return response.status(204).json()
  }
}

export { DeleteFavoriteController }
