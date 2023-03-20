import { DebouncedFunc } from "lodash";
import React from "react";
type SearchPropTypes = {
  placeholder?: string;
  onChange?: string | DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void>;
};
const Search = ({ placeholder, onChange, ...props }: SearchPropTypes) => {
  return (
    <div className="sticky top-0 z-10 w-full bg-white bg-opacity-60 p-2">
      <input
        type="text"
        placeholder={placeholder}
        className="text-text1 w-full rounded-xl border-2 px-6 py-4 text-sm font-medium"
        onChange={onChange as DebouncedFunc<(e: React.ChangeEvent<HTMLInputElement>) => void>}
        {...props}
      />
    </div>
  );
};

export default Search;
