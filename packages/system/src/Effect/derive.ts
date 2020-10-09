import type { Has, Tag } from "../Has"
import type { Effect } from "./effect"
import { accessService, accessServiceM } from "./has"

export type ShapeFn<T> = Pick<
  T,
  {
    [k in keyof T]: T[k] extends (
      ...args: infer ARGS
    ) => Effect<infer R, infer E, infer A>
      ? ((...args: ARGS) => Effect<R, E, A>) extends T[k]
        ? k
        : never
      : never
  }[keyof T]
>

export type ShapeCn<T> = Pick<
  T,
  {
    [k in keyof T]: T[k] extends Effect<any, any, any> ? k : never
  }[keyof T]
>

export type ShapePu<T> = Omit<
  T,
  | {
      [k in keyof T]: T[k] extends (...args: any[]) => any ? k : never
    }[keyof T]
  | {
      [k in keyof T]: T[k] extends Effect<any, any, any> ? k : never
    }[keyof T]
>

export type DerivedLifted<
  T,
  Fns extends keyof ShapeFn<T>,
  Cns extends keyof ShapeCn<T>,
  Values extends keyof ShapePu<T>
> = {
  [k in Fns]: T[k] extends (...args: infer ARGS) => Effect<infer R, infer E, infer A>
    ? (...args: ARGS) => Effect<R & Has<T>, E, A>
    : never
} &
  {
    [k in Cns]: T[k] extends Effect<infer R, infer E, infer A>
      ? Effect<R & Has<T>, E, A>
      : never
  } &
  {
    [k in Values]: Effect<Has<T>, never, T[k]>
  }

export function deriveLifted<T>(H: Tag<T>) {
  return <
    Fns extends keyof ShapeFn<T> = never,
    Cns extends keyof ShapeCn<T> = never,
    Values extends keyof ShapePu<T> = never
  >(
    functions: Fns[],
    constants: Cns[],
    values: Values[]
  ): DerivedLifted<T, Fns, Cns, Values> => {
    const ret = {} as any

    for (const k of functions) {
      ret[k] = (...args: any[]) => accessServiceM(H)((h) => h[k](...args))
    }

    for (const k of constants) {
      ret[k] = accessServiceM(H)((h) => h[k])
    }

    for (const k of values) {
      ret[k] = accessService(H)((h) => h[k])
    }

    return ret as any
  }
}

export type DerivedAccessM<T, Gens extends keyof T> = {
  [k in Gens]: <R_, E_, A_>(
    f: (_: T[k]) => Effect<R_, E_, A_>
  ) => Effect<R_ & Has<T>, E_, A_>
}

export function deriveAccessM<T>(H: Tag<T>) {
  return <Gens extends keyof T = never>(generics: Gens[]): DerivedAccessM<T, Gens> => {
    const ret = {} as any

    for (const k of generics) {
      ret[k] = (f: any) => accessServiceM(H)((h) => f(h[k]))
    }

    return ret as any
  }
}

export type DerivedAccess<T, Gens extends keyof T> = {
  [k in Gens]: <A_>(f: (_: T[k]) => A_) => Effect<Has<T>, never, A_>
}

export function deriveAccess<T>(H: Tag<T>) {
  return <Gens extends keyof T = never>(generics: Gens[]): DerivedAccess<T, Gens> => {
    const ret = {} as any

    for (const k of generics) {
      ret[k] = (f: any) => accessService(H)((h) => f(h[k]))
    }

    return ret as any
  }
}
