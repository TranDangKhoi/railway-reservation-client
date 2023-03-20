import { debounce } from "lodash";
import { useState } from "react";

export default function useOnChange(timeout = 1000) {
  const [value, setValue] = useState<string>("");
  const onChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, timeout);
  return [value, onChange];
}
