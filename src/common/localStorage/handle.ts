/**
 * Using Web Browser LocalStorage with time interval
 */

function getItemObject(key: string): any {
  if (typeof window === 'undefined') return;

  const itemStr = localStorage.getItem(key);
  const item = JSON.parse(itemStr as any);
  return item;
}

function clear(): void {
  localStorage.clear();
}

function remove(key: string): void {
  localStorage.removeItem(key);
}

/**
 *
 * @param key
 * @param value
 */
function store(key: string, value: any): void {
  const item = {
    data: value
  };
  localStorage.setItem(key, JSON.stringify(item));
}

// Returns the store value if an object has been stored using the store method
// and have not expired yet
function retrieve(key: string): any {
  const item = getItemObject(key);

  if (!item || !item?.data) return null;

  return item.data;
}

export const localStorageCache = {
  store,
  retrieve,
  remove,
  clear
};
