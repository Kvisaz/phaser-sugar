/**
 * A Promise that can be returned immediately,
 * but it will only be executed when
 * resolve or reject is explicitly called.
 */
export class Deferred<T> {
  public readonly promise: Promise<T>;
  public reject: (reason?: string) => void = () => {
  };
  public resolve: (value: T | PromiseLike<T>) => void = () => {
  };

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
