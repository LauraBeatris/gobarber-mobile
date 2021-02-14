import React from "react";
import { Image } from "react-native";

import useUserAvatarURI from "~/hooks/useUserAvatarURI";

import { AvatarProps } from "./types";

const Avatar: React.FC<AvatarProps> = ({ name, avatar_url, ...rest }) => {
  const userAvatarURI = useUserAvatarURI({ name, avatar_url });

  return (
    <Image source={userAvatarURI} {...rest} />
  );
};

export default Avatar;
