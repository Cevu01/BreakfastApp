import { Feather } from "@expo/vector-icons";

export const icon = {
  home: (props: any) => <Feather name="home" size={24} {...props} />,
  progress: (props: any) => <Feather name="activity" size={24} {...props} />,
  profile: (props: any) => <Feather name="user" size={24} {...props} />,
};

export default icon;
