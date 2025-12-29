import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { Header } from "@/components/shared/Header";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { authClient } from "@/lib/auth/client";
import { ScrollView, Text, View } from "react-native";

export default function ProfileScreen() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    // No router.replace needed - layout will handle redirect
  };

  if (isPending) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Container safe className="bg-[#F5F5F7]">
      <Header title="Profile" showBack className="bg-[#F5F5F7]" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        className="mt-4"
      >
        <Card className="mb-8">
          <View className="flex-row items-center mb-6">
            <View className="h-16 w-16 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Text className="text-2xl font-bold text-[#007AFF]">{user.name?.[0]?.toUpperCase() || "U"}</Text>
            </View>
            <View>
              <Text className="text-[20px] font-bold text-black">{user.name || "User"}</Text>
              <Text className="text-[15px] text-gray-500">{user.email}</Text>
            </View>
          </View>

          <View className="border-t border-gray-100">
            <View className="flex-row py-4 border-b border-gray-100 justify-between">
              <Text className="font-medium text-gray-900">User ID</Text>
              <Text className="text-gray-500 font-mono text-xs">{user.id}</Text>
            </View>
            <View className="flex-row py-4 justify-between">
              <Text className="font-medium text-gray-900">Member Since</Text>
              <Text className="text-gray-500">Dec 2025</Text>
            </View>
          </View>
        </Card>

        <View className="space-y-4">
          <Button
            label="Edit Profile"
            onPress={() => { }}
            variant="outline"
          />

          <Button
            label="Sign Out"
            onPress={handleSignOut}
            variant="primary"
            className="bg-red-500"
          />
        </View>
      </ScrollView>
    </Container>
  );
}
