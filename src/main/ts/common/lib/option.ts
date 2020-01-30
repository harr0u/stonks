type None = undefined
type Option<T> = None | T

function isNone<T>(option: Option<T>): option is None {
  return typeof option === 'undefined'
}

function either<T>(option: Option<T>, def: T): T {
  if (isNone(option)) {
    return def
  } else {
    return option
  }
}

function eitherMap<T, U>(option: Option<T>, mapFn: (t: T) => U, def: U | (() => U)): U {
  if (isNone(option)) {
    return def instanceof Function ? def() : def;
  } else {
    return mapFn(option)
  }
}

function optionApply<T>(option: Option<T>, fn: (t: T) => void): void {
  eitherMap(option, fn, () => {})
}

function optionUnit<T>(val: T): Option<T> {
  return val
}

function optionBind<T, U>(option: Option<T>, bindFn : (t: T) => Option<U>): Option<U> {
  return eitherMap(option, bindFn, undefined) 
}

function optionMap<T, U>(option: Option<T>, mapFn : (t: T) => U): Option<U> {
  return eitherMap(option, (v: T) => optionUnit(mapFn(v)), undefined)
}

export { Option, optionUnit, optionBind, optionMap, either, eitherMap, optionApply}