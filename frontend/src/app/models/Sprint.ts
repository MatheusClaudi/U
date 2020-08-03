import { UserStory } from "./UserStory";

export class Sprint {
    id: number;
    name: string;
    date: string;
    release: string;
    userStorys: Array<UserStory>;
    cards: Array<String>;
}
