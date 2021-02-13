import React from "react";
import { Image } from "react-native";

import useUserAvatarURI from "~/hooks/useUserAvatarURI";
import { useAuth } from "~/contexts/auth/AuthContext";

const Avatar: React.FC = (props) => {
  const { user: { name, avatar_url } } = useAuth();
  const userAvatarURI = useUserAvatarURI({ name, avatar_url });

  return (
    <Image source={userAvatarURI} {...props} />
  );
};

export default Avatar;
