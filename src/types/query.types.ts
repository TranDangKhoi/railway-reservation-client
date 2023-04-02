import { TrackSearchType } from "src/schemas/schemas";

export type QueryConfigType = {
  [key in keyof TrackSearchType]?: string;
};
