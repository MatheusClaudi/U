import { ListBoard } from './ListBoard';
import { Sprint } from './Sprint';

export class Board {
  id: number;
  name: string;
  date: string;
  lists: Array<ListBoard>;
  sprint: Sprint;
}
