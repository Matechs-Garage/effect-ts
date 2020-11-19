// trace :: T -> Effect
import * as T from "./Effect"
import { pipe } from "./Function"

pipe(
  T.succeed(0, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:7:3"),
  T.chain(
    (n) =>
      T.succeed(n + 1, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:8:18"),
    "/home/ma/os/matechs-effect/packages/system/src/trace.ts:8:3"
  ),
  T.chain(
    (n) =>
      T.succeed(n + 1, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:9:18"),
    "/home/ma/os/matechs-effect/packages/system/src/trace.ts:9:3"
  ),
  T.chain(
    (n) =>
      T.succeed(n + 1, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:10:18"),
    "/home/ma/os/matechs-effect/packages/system/src/trace.ts:10:3"
  ),
  T.map((n) => n + 1, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:11:3"),
  T.chain(
    () =>
      T.tuple(
        "/home/ma/os/matechs-effect/packages/system/src/trace.ts:12:17",
        T.succeed(0, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:12:25"),
        T.succeed(1, "/home/ma/os/matechs-effect/packages/system/src/trace.ts:12:39")
      ),
    "/home/ma/os/matechs-effect/packages/system/src/trace.ts:12:3"
  )
)