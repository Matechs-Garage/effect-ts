import { sequence } from "../../Option"

import { stream } from "./index"

export const sequenceOption = sequence(stream)
