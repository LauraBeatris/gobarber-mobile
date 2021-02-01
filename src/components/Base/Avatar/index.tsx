import React from "react";
import { Image } from "react-native";

import useUserAvatarURI from "~/hooks/useUserAvatarURI";

import { AvatarProps } from "./types";

const Avatar: React.FC<AvatarProps> = ({ user, ...rest }) => {
  const userAvatarURI = useUserAvatarURI(user);

  return (
    <Image source={userAvatarURI} {...rest} />
  );
};

export default Avatar;
