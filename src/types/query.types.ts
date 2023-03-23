import { TrackSearchType } from "src/utils/schemas";

export type QueryConfigType = {
  [key in keyof TrackSearchType]?: string;
};
