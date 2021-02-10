import { HeaderContainerProps } from "../types";

export interface TitleHeaderProps extends HeaderContainerProps {
  title: string;
  firstTouchable: React.ReactNode;
  secondTouchable: React.ReactNode;
}
