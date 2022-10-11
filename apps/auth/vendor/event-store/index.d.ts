declare function eventstore(options: unknown): {
  init: (clb: (err: unknown) => unknown) => unknown;
  getFromSnapshot: (aggregateId: string, cb: (err: unknown, snapshot: unknown, stream: aunknownny) => void) => unknown;
  getEvents: (index: number, count: number, cb: (err: unknown, events: unknown) => void) => unknown[]
  getEventStream: (params: {aggregateId: string, aggregate: string}, cb: (err: unknown, stream: unknown) => void) => unknown;
};
declare namespace eventstore {}
export = eventstore;