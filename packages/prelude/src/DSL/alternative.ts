import type { HKT, Intro, Kind, Mix, UHKT, URIS } from "@effect-ts/hkt"
import { pipe } from "@effect-ts/system/Function"

import type { AssociativeEither } from "../AssociativeEither"
import type { Covariant } from "../Covariant"

export function orElseF<F extends URIS, C>(
  F: AssociativeEither<F, C> & Covariant<F, C>
): <N2 extends string, K2, Q2, W2, X2, I2, S2, R2, E2, B>(
  fb: () => Kind<F, C, N2, K2, Q2, W2, X2, I2, S2, R2, E2, B>
) => <N extends string, K, Q, W, X, I, S, R, E, A>(
  fa: Kind<
    F,
    C,
    Intro<C, "N", N2, N>,
    Intro<C, "K", K2, K>,
    Intro<C, "Q", Q2, Q>,
    Intro<C, "W", W2, W>,
    Intro<C, "X", X2, X>,
    Intro<C, "I", I2, I>,
    Intro<C, "S", S2, S>,
    Intro<C, "R", R2, R>,
    Intro<C, "E", E2, E>,
    A
  >
) => Kind<
  F,
  C,
  Mix<C, "N", [N2, N]>,
  Mix<C, "K", [K2, K]>,
  Mix<C, "Q", [Q2, Q]>,
  Mix<C, "W", [W2, W]>,
  Mix<C, "X", [X2, X]>,
  Mix<C, "I", [I2, I]>,
  Mix<C, "S", [S2, S]>,
  Mix<C, "R", [R2, R]>,
  Mix<C, "E", [E2, E]>,
  A | B
>
export function orElseF<F>(F: AssociativeEither<UHKT<F>> & Covariant<UHKT<F>>) {
  return <B>(fb: () => HKT<F, B>) => <A>(fa: HKT<F, A>): HKT<F, A | B> =>
    pipe(
      fa,
      F.orElseEither(fb),
      F.map((e) => (e._tag === "Left" ? e.left : e.right))
    )
}