export class Task {
  title: string;
  index: number;
  state: string;
  id: string;
  constructor(title: string, index: number, state:string, id: string) {
    this.title = title;
    this.index = index;
    this.state = state;
    this.id = id;
  }
}
