let reducerRegistry = {};

export default function registerReducers(obj) {
  console.log('reg reducer', obj);
  reducerRegistry = { ...reducerRegistry, ...obj };
}

export function registeredReducers() {
  return reducerRegistry;
}
