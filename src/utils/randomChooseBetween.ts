export function randomChooseBetween(...options) {
  const selectedIndex = Math.floor(Math.random() * options.length);
  return options[selectedIndex];
}
