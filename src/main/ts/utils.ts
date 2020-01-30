function pick<T>(arr: T[]): T {
  const randomIndex = Math.floor(arr.length * (Math.random() - 0.00001))
  return arr[randomIndex]
}

function eq<T>(a: T): (b: T) => boolean {
  return (b: T) => a === b
}

async function sleep(timeMS: number): Promise<void> {
  return new Promise((onDone, __) => setTimeout(onDone, timeMS))
}

function getEnv(): string {
  return process.env.NODE_ENV || 'dev';
}

function isDevEnv(): boolean {
  return getEnv() === 'dev'
}

function isProdEnv(): boolean {
  return getEnv() === 'prod'
}


export { pick, eq, sleep, getEnv, isDevEnv, isProdEnv }