import styled from "styled-components/native";
import Avatar from "~/components/Base/Avatar";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px 40px 40px;
  align-items: center;
`;

export const ProfileFormContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 5%;
`;

const PROFILE_AVATAR_PIXELS_SIZE = 186;

export const ProfileAvatar = styled(Avatar)`
  width: ${PROFILE_AVATAR_PIXELS_SIZE}px;
  height: ${PROFILE_AVATAR_PIXELS_SIZE}px;
  margin-bottom: 40px;
  border-radius: ${PROFILE_AVATAR_PIXELS_SIZE / 2}px;
`;

export const ProfileAvatarContainer = styled.View`
  position: relative;
`;

const PROFILE_AVATAR_BUTTON_PIXELS_SIZE = 50;

export const ProfileAvatarButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  right: 5%;
  bottom: 15%;
  width: ${PROFILE_AVATAR_BUTTON_PIXELS_SIZE}px;
  height: ${PROFILE_AVATAR_BUTTON_PIXELS_SIZE}px;
  position: absolute;
  align-items: center;
  border-radius: ${PROFILE_AVATAR_BUTTON_PIXELS_SIZE / 2}px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.yellow};
`;
