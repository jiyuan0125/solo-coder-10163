export function filter(search: string, items: string[]) {
  return items.map((item, index) => ({ string: item, index, original: item }));
}
