import { duplicate as duplicate_1 } from "../Array"

import { ReadonlyNonEmptyArray } from "./ReadonlyNonEmptyArray"

export const duplicate: <A>(
  ma: ReadonlyNonEmptyArray<A>
) => ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<A>> = duplicate_1 as any
