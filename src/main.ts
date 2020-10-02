/// <reference path="./keyboard.ts" />

const init = () => {
  // @ts-ignore
  new GTheme().apply();
  const content = document.getElementById("game-content");
  content.innerHTML = "";
  new Keyboard(content).draw();
};

window.onload = init;
