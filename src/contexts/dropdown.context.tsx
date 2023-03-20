import { createContext, useState } from "react";

interface DropdownContextInterface {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleDropdown: () => void;
}

const initialDropdownContext: DropdownContextInterface = {
  show: false,
  setShow: () => null,
  handleToggleDropdown: () => null,
};

export const DropdownContext = createContext<DropdownContextInterface>(initialDropdownContext);

export const DropdownProvider = ({ children, ...props }: { children: React.ReactNode }) => {
  const [show, setShow] = useState<boolean>(initialDropdownContext.show);
  const handleToggleDropdown = () => {
    const handleToggleDropdown = () => {
      setShow((show) => !show);
    };
  };
  return (
    <DropdownContext.Provider
      value={{ show, setShow, handleToggleDropdown }}
      {...props}
    >
      {children}
    </DropdownContext.Provider>
  );
};
