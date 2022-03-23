export type Human = {
  name: string;
  height: string;
  gender: string;
  birth_year: string;
};

type Results = {
  [key: string]: Human;
};

export interface ISwapiService {
  getPeople: (pageNumber: number) => Promise<Results>;
}
