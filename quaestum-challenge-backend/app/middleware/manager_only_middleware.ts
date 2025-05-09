import { HttpContext } from '@adonisjs/core/http'
import RoleMiddleware from './role_middleware.js'


export default class ManagerOnlyMiddleware extends RoleMiddleware {
  constructor() {
    super('manager')
  }

  async handle(ctx: HttpContext, next: () => Promise<void>) {
    return super.handle(ctx, next)
  }
}