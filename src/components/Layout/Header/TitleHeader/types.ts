import { HeaderContainerProps } from "~/components/Layout/Header/HeaderContainer/types";

export type TitleHeaderProps = HeaderContainerProps & {
  title: string;
  firstTouchable: React.ReactNode;
  secondTouchable: React.ReactNode;
}
