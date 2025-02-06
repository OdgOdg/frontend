import { ComponentType, createContext } from "react";

export interface ModalsDispatch {
  open: <P>(Component: ComponentType<P>, props: P) => void;
  close: <P>(Component: ComponentType<P>) => void;
}

export interface ModalItem<P = any> {
  Component: ComponentType<P>;
  props: P;
}

// 모달의 상태를 저장할 컨텍스트
export const ModalsStateContext = createContext<ModalItem[]>([]);

// 모달 열기/닫기 기능을 제공할 컨텍스트
export const ModalsDispatchContext = createContext<ModalsDispatch | undefined>(undefined);
