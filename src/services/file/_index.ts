import { connect } from "./connect";
import { create } from "./create";
import { disconnect } from "./disconnect";
import { getMany } from "./getMany";
import { remove } from "./remove";
import { getOne } from "./getOne";

export const fileService = { connect, create, disconnect, getMany, getOne, remove };
