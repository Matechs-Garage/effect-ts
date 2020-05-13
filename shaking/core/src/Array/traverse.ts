import type { Traverse1 } from "fp-ts/lib/Traversable"

import { traverse as traverse_1 } from "../Readonly/Array/traverse"

import { URI } from "./URI"

export const traverse: Traverse1<URI> = traverse_1 as any
