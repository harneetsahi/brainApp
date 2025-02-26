function random(len: number) {
  let options =
    "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz1234567890";
  let randomHash = "";

  for (let i = 0; i < len; i++) {
    randomHash += options[Math.floor(Math.random() * len)];
  }
  return randomHash;
}

export default random;
