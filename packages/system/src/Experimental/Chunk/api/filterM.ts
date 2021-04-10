import * as core from "../../../Effect/core"
import type { Effect } from "../../../Effect/effect"
import * as coreZip from "../../../Effect/zipWith"
import * as Chunk from "../core"
import { concreteId } from "../definition"

/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */
export function filterM_<R, E, A>(
  self: Chunk.Chunk<A>,
  f: (a: A) => Effect<R, E, boolean>
): Effect<R, E, Chunk.Chunk<A>> {
  return core.suspend(() => {
    const iterator = concreteId(self).arrayLikeIterator()
    let next = iterator.next()
    let dest: Effect<R, E, Chunk.Chunk<A>> = core.succeed(Chunk.empty<A>())

    while (!next.done) {
      const array = next.value
      const len = array.length
      let i = 0
      while (i < len) {
        const a = array[i]!
        dest = coreZip.zipWith_(dest, f(a), (d, b) => (b ? Chunk.append_(d, a) : d))
        i++
      }
      next = iterator.next()
    }
    return dest
  })
}

/**
 * Filters this chunk by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @dataFirst filterM_
 */
export function filterM<R, E, A>(
  f: (a: A) => Effect<R, E, boolean>
): (self: Chunk.Chunk<A>) => Effect<R, E, Chunk.Chunk<A>> {
  return (self) => filterM_(self, f)
}
