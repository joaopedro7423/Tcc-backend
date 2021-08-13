export default interface IPaginated<T> {
  data: T[];
  totalElementos: number;
  page: number;
  elements: number;
  elementsPerPage: number;
  totalPages: number;
  fistPage: boolean;
  lastPage: boolean;
}
