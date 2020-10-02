class Song {
  private song: string[];
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.song = [];
    this.container = container;
  }

  // @ts-ignore
  play = () => new GSong(this.song).play();

  deleteLastTone = () => {
    this.song = this.song.slice(0, this.song.length - 1);
    this.draw();
  };

  addTone = (tone: string) => {
    this.song.push(tone);
    this.draw();
  };

  private draw = () => {
    this.container.innerHTML = this.song.join(" ");
  };
}
