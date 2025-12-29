import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Header } from "@/components/shared/Header";
import { authClient } from "@/lib/auth/client";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    // No router.replace needed - layout will handle redirect
  };

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <View className="mb-8">
      <Text className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4 ml-1">{title}</Text>
      <View className="bg-white rounded-[16px] border border-gray-100 overflow-hidden mx-1">
        {children}
      </View>
    </View>
  );

  const Item = ({ label, value, onPress }: { label: string, value?: string, onPress?: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-between p-4 bg-white active:bg-gray-50 border-b border-gray-100 last:border-b-0"
    >
      <Text className="text-[17px] font-medium text-black">{label}</Text>
      <View className="flex-row items-center gap-2">
        {value && <Text className="text-[17px] text-gray-500">{value}</Text>}
        <Text className="text-gray-300 font-bold text-lg">›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Container safe className="bg-[#F5F5F7]">
      <Header title="Settings" showBack className="bg-[#F5F5F7]" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 20 }}
        className="mt-4"
        showsVerticalScrollIndicator={false}
      >
        <Section title="Account">
          <Item label="Profile" value={user?.email || "Not set"} onPress={() => { }} />
          <Item label="Security" value="Password" onPress={() => { }} />
        </Section>

        <Section title="Preferences">
          <Item label="Notifications" value="On" onPress={() => { }} />
          <Item label="Theme" value="Light" onPress={() => { }} />
        </Section>

        <Section title="About">
          <Item label="App Version" value="1.0.0" onPress={() => { }} />
          <Item label="Help & Support" onPress={() => { }} />
        </Section>

        <View className="mt-4 px-1">
          <Button
            label="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            className="border-red-200"
          />
        </View>
      </ScrollView>
    </Container>
  );
}
