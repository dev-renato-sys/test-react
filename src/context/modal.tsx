import React, { createContext } from "react";

interface ModalContextProps {
  openModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextProps>({} as ModalContextProps);

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);

  const openModal = () => setOpen((bool) => !bool);

  return (
    <ModalContext.Provider value={{ isOpen, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = React.useContext(ModalContext);

  return context;
}

export default ModalContext;
