type None = undefined
type Maybe<T> = None | T

function isNone<T>(option: Maybe<T>): option is None {
  return typeof option === 'undefined';
}

function isSome<T>(option: Maybe<T>): option is T {
  return !isNone(option);
}

function either<T>(option: Maybe<T>, def: T): T {
  if (isNone(option)) {
    return def
  } else {
    return option
  }
}

function eitherMap<T, U>(option: Maybe<T>, mapFn: (t: T) => U, def: U | (() => U)): U {
  if (isNone(option)) {
    return def instanceof Function ? def() : def;
  } else {
    return mapFn(option)
  }
}

function maybeApply<T>(option: Maybe<T>, fn: (t: T) => void): void {
  eitherMap(option, fn, () => {})
}

function maybeUnit<T>(val: T): Maybe<T> {
  return val
}

function maybeBind<T, U>(option: Maybe<T>, bindFn : (t: T) => Maybe<U>): Maybe<U> {
  return eitherMap(option, bindFn, undefined) 
}

function maybeMap<T, U>(option: Maybe<T>, mapFn : (t: T) => U): Maybe<U> {
  return eitherMap(option, (v: T) => maybeUnit(mapFn(v)), undefined)
}

export { Maybe, isNone, isSome, maybeUnit, maybeBind, maybeMap, either, eitherMap, maybeApply}