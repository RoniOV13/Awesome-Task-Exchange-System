import { StorableEvent } from './interfaces/storable-event'
import * as eventstore from '@libs/event-store'
import * as url from 'url'

export class EventStore {
  private readonly eventstore
  private eventStoreLaunched = false

  constructor(
    mongoURL: string,
    connectOptions: any = {},
    collectionNames: any = {}
  ) {
    let ssl = false

    const parsed = url.parse(mongoURL, true)

    if (
      parsed.query &&
      parsed.query['ssl'] !== undefined &&
      parsed.query['ssl'] === 'true'
    ) {
      ssl = true
    }

    this.eventstore = eventstore({
      type: 'mongodb',
      url: mongoURL,
      options: {
        ssl: ssl,
        ...connectOptions
        // heartbeat: 60 * 1000
      },
      ...collectionNames
    })
    this.eventstore.init((err: any): any => {
      if (err) {
        throw err
      }
      this.eventStoreLaunched = true
    })
  }

  public isInitiated(): boolean {
    return this.eventStoreLaunched
  }

  public async getEvents(
    aggregate: string,
    id: string
  ): Promise<StorableEvent[]> {
    return new Promise<StorableEvent[]>((resolve) => {
      this.eventstore.getFromSnapshot(
        this.getAgrregateId(aggregate, id),
        (err: any, snapshot: any, stream: any) => {
          // snapshot.data; // Snapshot
          resolve(
            stream.events.map((event: any): any =>
              this.getStorableEventFromPayload(event.payload)
            )
          )
        }
      )
    })
  }

  public async getEvent(index: number): Promise<StorableEvent | null> {
    return new Promise<StorableEvent | null>((resolve, reject) => {
      this.eventstore.getEvents(index, 1, (err: any, events: any) => {
        if (events.length > 0) {
          resolve(this.getStorableEventFromPayload(events[0].payload))
        } else {
          resolve(null)
        }
      })
    })
  }

  public async storeEvent<T extends StorableEvent>(
    event: T
  ): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!this.eventStoreLaunched) {
        reject('Event Store not launched!')
        return
      }
      this.eventstore.getEventStream(
        {
          aggregateId: this.getAgrregateId(event.eventAggregate, event.id),
          aggregate: event.eventAggregate
        },
        (err: any, stream: any): any => {
          if (err) {
            reject(err)
            return
          }
          stream.addEvent(event)
          stream.commit((commitErr: any): any => {
            if (commitErr) {
              reject(commitErr)
            }
            resolve()
          })
        }
      )
    })
  }

  // Monkey patch to obtain event 'instances' from db
  private getStorableEventFromPayload(payload: any): StorableEvent {
    const eventPlain = payload
    eventPlain.constructor = { name: eventPlain.eventName }

    return Object.assign(Object.create(eventPlain), eventPlain)
  }

  private getAgrregateId(aggregate: string, id: string): string {
    return aggregate + '-' + id
  }
}
