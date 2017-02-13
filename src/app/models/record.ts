import { User } from "./user";

export class Record {
  main: string;
  resultat: string;
  date: number;
  opponentId?: string;
  opponent?: User;
  $key?: string;
}
