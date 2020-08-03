import { Card } from './Card';

export class ListBoard {
  id: number;
  name: string;
  cards: Array<Card>;

  constructor(name: string) {
    this.name = name;
  }
}
