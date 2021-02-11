import * as P from "../../Prelude"
import { Applicative, Covariant, Fail, Monad, Run } from "./instances"

export const tuple = P.tupleF(Applicative)
export const struct = P.structF(Applicative)

export const getValidationApplicative = P.getValidationF({
  ...Applicative,
  ...Fail,
  ...Run,
  ...Monad
})

/**
 * Matchers
 */
export const { match, matchIn, matchMorph, matchTag, matchTagIn } = P.matchers(
  Covariant
)

/**
 * Conditionals
 */
const branch = P.conditionalF(Covariant)
const branch_ = P.conditionalF_(Covariant)

export { branch as if, branch_ as if_ }
