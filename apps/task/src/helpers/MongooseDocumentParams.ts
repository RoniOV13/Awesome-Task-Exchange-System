export interface MongooseDocumentParams {
  sort: {
    [key: string]: 1 | -1;
  };
  skip?: number;
  limit?: number;
}
