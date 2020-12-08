import { User } from "shared/types/apiSchema";

/**
 * Returns the image source of a user, dealing with fallback and placeholders.
 *
 * @param user The user data
 */
const useUserAvatarURI = ({ avatar_url, name }: User) => {
  const fallbackSrc = `https://via.placeholder.com/300/F18A07/FFFFFF?text=${name}`;

  return { uri: avatar_url ?? fallbackSrc };
};

export default useUserAvatarURI;
