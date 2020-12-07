import { useImage } from "react-image";

import { User } from "shared/types/apiSchema";

/**
 * Returns the image source of a user, dealing with fallback and placeholders.
 *
 * @param user The user data
 */
const useUserImage = (user: User): string | undefined => {
  const fallbackSrc = `https://via.placeholder.com/300/F18A07/FFFFFF?text=${user?.name}`;

  const { src: avatarUrl } = useImage({
    srcList: [user?.avatar_url ?? fallbackSrc, fallbackSrc],
    useSuspense: false,
  });

  return avatarUrl;
};

export default useUserImage;
