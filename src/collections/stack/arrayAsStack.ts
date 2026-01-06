export type Stack<T> = T[];
export const takeTopStack = <T>(s: Stack<T>) => s.pop();
const putTopStack  = <T>(s: Stack<T>, item: T) => { s.push(item); };
const moveAllFromStackToStackPreserveOrder = <T>(from: Stack<T>, to: Stack<T>) => {
  /** Сохраняем порядок: переносим элементы в прямом порядке. **/
  for (let i = 0; i < from.length; i++) to.push(from[i]);
  from.length = 0;
};
