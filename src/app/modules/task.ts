import {User} from "./user";

export class Task {
  title: string;
  description: string;
  state: string;
  created_at: string;
  creator: User;
  index: number;
  id?: string;

  constructor(title: string, description: string, state:string, created_at: string, creator: User, index: number) {
    this.title = title;
    this.description = description;
    this.state = state;
    this.created_at = created_at;
    this.creator = creator;
    this.index = index;
  }
}
