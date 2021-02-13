import { HeaderContainerProps } from "~/components/Layout/Header/HeaderContainer/types";

export interface TitleHeaderProps extends HeaderContainerProps {
  title: string;
  firstTouchable: React.ReactNode;
  secondTouchable: React.ReactNode;
}
