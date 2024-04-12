import { create } from "./create";
import { getMany } from "./getMany";
import { getOne } from "./getOne";
import { softRemove } from "./softRemove";
import { update } from "./update";

export const taskService = { create, getMany, getOne, softRemove, update };