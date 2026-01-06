/** Удаляем только null/undefined, не трогаем валидные falsy значения.
 * (value): value is T — это type predicate, он говорит TypeScript,
 * что после фильтрации элементы массива точно типа T, без null/undefined. **/
export const safeArray = <T>(array: (T|undefined|null)[]): T[] => {
  return array.filter((value): value is T => value != null);
};
