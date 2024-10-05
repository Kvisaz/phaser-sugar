/**
 * Creates a delay for a specified amount of time.
 *
 * This function returns a Promise that resolves after the given number of milliseconds.
 * It can be used in an async function to pause execution for a certain duration.
 *
 * @param {number} ms - The number of milliseconds to wait before the promise resolves.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
