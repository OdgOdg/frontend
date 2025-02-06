import { useState, ReactNode, ComponentType, useMemo } from "react";
import { ModalItem, ModalsDispatch, ModalsDispatchContext, ModalsStateContext } from "./ModalsContext";

interface ModalsProviderProps {
  children: ReactNode;
}

const ModalsProvider = ({ children }: ModalsProviderProps) => {
  const [openedModals, setOpenedModals] = useState<ModalItem[]>([]);

  const open = <P,>(Component: ComponentType<P>, props: P) => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // html도 숨김 처리
    setOpenedModals((modals) => [...modals, { Component, props }]);
  };

  const close = <P,>(Component: ComponentType<P>) => {
    document.body.style.overflow = "unset";
    document.documentElement.style.overflow = "unset";
    setOpenedModals((modals) => modals.filter((modal) => modal.Component !== Component));
  };

  // useMemo를 사용해 불필요한 리렌더링 방지
  const dispatch: ModalsDispatch = useMemo(() => ({ open, close }), []);
  return (
    <ModalsStateContext.Provider value={openedModals}>
      <ModalsDispatchContext.Provider value={dispatch}>{children}</ModalsDispatchContext.Provider>
    </ModalsStateContext.Provider>
  );
};

export default ModalsProvider;
