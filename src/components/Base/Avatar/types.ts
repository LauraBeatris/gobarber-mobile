import { User } from "~/shared/types/apiSchema";

export type AvatarProps = Pick<User, "name" | "avatar_url">
