window.onload = () => {
  main();
};

function main() {
  const root = document.getElementById('root');
  const btn = document.getElementById('btn');

  btn.addEventListener('click', function () {
    const bgColor = generateRgbColor();
    root.style.backgroundColor = bgColor;
  });
}

function generateRgbColor() {
  const red = Math.floor(Math.random() * 256); // Range should be 0-255 (inclusive)
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}
