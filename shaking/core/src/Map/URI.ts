/**
 * @since 2.0.0
 */
export const URI = "Map"

/**
 * @since 2.0.0
 */
export type URI = typeof URI

declare module "fp-ts/lib/HKT" {
  interface URItoKind2<E, A> {
    readonly Map: Map<E, A>
  }
}
