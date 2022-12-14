import { ViewUpdaters } from '../view-updaters'
import { IEvent } from '@nestjs/cqrs'
import { Type } from '@nestjs/common'

export const VIEW_UPDATER_METADATA = '__event__'

export function ViewUpdaterHandler(event: Type<IEvent>) {
  return (target: any) => {
    ViewUpdaters.add(event.name, target)
  }
}
