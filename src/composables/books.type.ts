export interface Book {
  name: string,
  authors: string[],
  series: string,
}

export interface ReadingRecord {
  // what reference key can we use for this?
  at: Date, //dateonly
  pagesRead: number,
  readForSeconds: number
}