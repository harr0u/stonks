

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

export { pick, eq, sleep}