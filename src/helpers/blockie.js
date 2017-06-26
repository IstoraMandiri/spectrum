import blockies from 'blockies';

const cache = {};

export default function (_seed) {
  const seed = _seed.toLowerCase();
  if (cache[seed]) { return cache[seed]; }
  cache[seed] = blockies({ seed, size: 8, scale: 16 }).toDataURL();
  return cache[seed];
}
