import { Request, Response } from 'express'
import { CreateFavoriteService } from '../services/CreateFavoriteService'

class CreateFavoriteController {
  async handle (request: Request, response: Response) {
    const { favorite_type, marvel_id, thumbnail } = request.body
    const { user_id } = request

    const createFavoriteService = new CreateFavoriteService()

    const user = await createFavoriteService.execute({ user_id: parseInt(user_id), favorite_type, marvel_id, thumbnail })

    return response.json(user)
  }
}

export { CreateFavoriteController }
