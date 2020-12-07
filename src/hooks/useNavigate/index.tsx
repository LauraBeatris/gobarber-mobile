import { useNavigation } from "@react-navigation/native";

/**
 * Returns a closure which performs navigation, avoiding re-creating
 * handlers just to execute the navigate function.
 */
const useNavigate = () => {
  const { navigate } = useNavigation();

  return (
    routeName: string,
    params: Record<string, unknown>,
  ) => () => navigate(routeName, params);
};

export default useNavigate;
