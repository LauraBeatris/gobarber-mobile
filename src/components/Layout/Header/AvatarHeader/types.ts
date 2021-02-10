import { ViewProps } from "react-native";

import { HeaderContainerProps } from "~/components/Layout/Header/types";

export type AvatarHeaderProps = ViewProps & Pick<HeaderContainerProps, "backgroundColor">
