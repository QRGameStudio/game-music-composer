/// <reference path="./song.ts" />

class Keyboard {
  private keys: string[];
  private container: HTMLElement;
  private actIndex: number;
  private record: boolean;
  private song: Song;

  constructor(content: HTMLElement) {
    this.container = document.createElement("div");
    content.appendChild(this.container);
    this.actIndex = 2;
    this.record = false;
    // @ts-ignore
    this.keys = Object.keys(GToneMap);

    const songContainer = document.createElement("div");
    content.appendChild(songContainer);
    this.song = new Song(songContainer);
  }

  private clear = () => (this.container.innerHTML = "");

  private drawKeyboard = () => {
    this.keys.slice(20 * this.actIndex, 20 * (this.actIndex + 1)).forEach((k, i) => {
      const e = document.createElement("div");
      e.innerHTML = k;
      e.className = "key";
      e.style.top = `${Math.floor(i / 5) * 10 + 50}vh`;
      e.style.left = `${(i % 5) * 20}vw`;
      e.onclick = () => {
        if (this.record) {
          this.song.addTone(k);
        } else {
          // @ts-ignore
          new GTone(k).play();
        }
      };
      this.container.appendChild(e);
    });
  };

  private drawSongButtons = () => {
    const bp = document.createElement("div");
    bp.innerHTML = "&#9654;";
    bp.className = "soundBtn playBtn";
    bp.onclick = () => this.song.play();
    this.container.appendChild(bp);

    const bs = document.createElement("div");
    bs.innerHTML = "&#x1F4C2;";
    bs.className = "soundBtn saveBtn";
    // @ts-ignore
    bs.onclick = () => new ModalService().alert("Not implemented", "This feature will come with next update", "danger");
    this.container.appendChild(bs);

    const bd = document.createElement("div");
    bd.innerHTML = "&larr;";
    bd.className = "deleteBtn";
    bd.onclick = () => this.song.deleteLastTone();
    this.container.appendChild(bd);
  };

  private drawKBButtons = () => {
    const bl = document.createElement("div");
    bl.className = "bttn";
    bl.style.left = "0";
    bl.style.top = "90vh";
    bl.innerHTML = "&larr;";
    bl.onclick = () => {
      this.actIndex--;
      this.draw();
    };
    if (this.actIndex > 0) this.container.appendChild(bl);

    const br = document.createElement("div");
    br.className = "bttn";
    br.style.left = "80vw";
    br.style.top = "90vh";
    br.innerHTML = "&rarr;";
    br.onclick = () => {
      this.actIndex++;
      this.draw();
    };
    if (this.actIndex + 1 < this.keys.length / 20) this.container.appendChild(br);

    const rec = document.createElement("div");
    rec.className = "bttn";
    rec.style.left = "20vw";
    rec.style.top = "90vh";
    rec.style.width = "60vw";
    rec.innerHTML = this.record ? "Write song" : "Play sound";
    rec.onclick = () => {
      this.record = !this.record;
      this.draw();
    };
    this.container.appendChild(rec);
  };

  draw = () => {
    this.clear();
    this.drawKeyboard();
    this.drawKBButtons();
    this.drawSongButtons();
  };
}
