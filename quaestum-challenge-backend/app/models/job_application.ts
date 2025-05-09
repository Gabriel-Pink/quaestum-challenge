import { DateTime } from 'luxon'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, beforeSave, afterFetch, hasOne } from '@adonisjs/lucid/orm';
import User from '#models/user'
import Education from '../dto/data_received.dto.js';

export default class JobApplication extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @hasOne(() => User)
  declare user: HasOne<typeof User>

  @column()
  declare name: string

  @column.date()
  declare birthDate: DateTime

  @column()
  declare email: string

  @column()
  declare phone: string

  @column()
  declare address: string

  @column()
  declare zipCode: string

  @column()
  declare educations: Education[] | string

  @column()
  declare skills: string[] | string

  @column()
  declare status: 'pending' | 'refused' | 'approved'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
