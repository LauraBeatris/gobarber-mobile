import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { useAuth } from "../../contexts/auth/AuthContext";

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={signOut}>
        <Text>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
