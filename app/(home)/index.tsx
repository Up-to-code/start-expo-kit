import { Button } from "@/components/shared/Button";
import { Card } from "@/components/shared/Card";
import { Container } from "@/components/shared/Container";
import { LoadingScreen } from "@/components/shared/LoadingScreen";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <Container safe>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 32, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="py-8 items-center">
          <Text className="text-[34px] font-bold text-black text-center mb-2 tracking-tight">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </Text>
          <Text className="text-[17px] text-gray-500 text-center mb-10">
            You are successfully signed in.
          </Text>

          {user && (
            <Card className="w-full mb-8">
              <Text className="text-[20px] font-semibold text-black mb-6 tracking-tight">
                Account Information
              </Text>

              <View>
                <View className="flex-row py-3 border-b border-gray-100 justify-between items-center">
                  <Text className="font-medium text-gray-900 text-[16px]">Name</Text>
                  <Text className="text-gray-500 text-[16px]">{user.name || "N/A"}</Text>
                </View>

                <View className="flex-row py-3 border-b border-gray-100 justify-between items-center">
                  <Text className="font-medium text-gray-900 text-[16px]">Email</Text>
                  <Text className="text-gray-500 text-[16px]">{user.email}</Text>
                </View>

                {user.id && (
                  <View className="flex-row py-3 justify-between items-center">
                    <Text className="font-medium text-gray-900 text-[16px]">ID</Text>
                    <Text className="text-gray-400 font-mono text-xs">{user.id.slice(0, 8)}...</Text>
                  </View>
                )}
              </View>
            </Card>
          )}

          <View className="w-full space-y-4">
            <Button
              label="View Profile"
              onPress={() => router.push("/(home)/profile")}
              variant="primary"
            />

            <Button
              label="Settings"
              onPress={() => router.push("/(home)/settings")}
              variant="secondary"
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
