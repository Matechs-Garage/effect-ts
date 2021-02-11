import * as F from "@effect-ts/system/IO"

import * as P from "../Prelude"

export const IOURI = "IO"
export type IOURI = typeof IOURI

declare module "@effect-ts/hkt" {
  interface URItoKind<FC, TC, N extends string, K, Q, W, X, I, S, R, E, A> {
    [IOURI]: F.IO<A>
  }
}

/**
 * The `Any` instance for `IO[+_]`.
 */
export const Any = P.instance<P.Any<[IOURI]>>({
  any: () => F.succeed({})
})

/**
 * The `Covariant` instance for `IO[+_]`.
 */
export const Covariant = P.instance<P.Covariant<[IOURI]>>({
  map: F.map
})

/**
 * The `AssociativeBoth` instance for `IO[+_]`.
 */
export const AssociativeBoth = P.instance<P.AssociativeBoth<[IOURI]>>({
  both: F.zip
})

/**
 * The `AssociativeFlatten` instance for `IO[+_]`.
 */
export const AssociativeFlatten = P.instance<P.AssociativeFlatten<[IOURI]>>({
  flatten: (ffa) => F.chain_(ffa, (x) => x)
})

/**
 * The `IdentityFlatten` instance for `IO[+_]`.
 */
export const IdentityFlatten = P.instance<P.IdentityFlatten<[IOURI]>>({
  ...Any,
  ...AssociativeFlatten
})

/**
 * The `Monad` instance for `IO[+_]`.
 */
export const Monad = P.instance<P.Monad<[IOURI]>>({
  ...Any,
  ...Covariant,
  ...AssociativeFlatten
})

/**
 * The `Applicative` instance for `IO[+_]`.
 */
export const Applicative = P.instance<P.Applicative<[IOURI]>>({
  ...Any,
  ...Covariant,
  ...AssociativeBoth
})
