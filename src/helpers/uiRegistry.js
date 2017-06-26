// a registry for UI components (current only for transactions)
const transactionUIRegistry = {};

export function registerUIs(obj) {
  Object.keys(obj).forEach((key) => {
    transactionUIRegistry[key] = { ...obj[key] };
  });
}

export function getUI(key) {
  return transactionUIRegistry[key];
}
