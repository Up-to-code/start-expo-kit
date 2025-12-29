import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Header } from "@/components/shared/Header";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function SocialSignInScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialSignIn = async (provider: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/(home)",
      });
    } catch (err: any) {
      setError(err?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container safe>
      <Header title="Social Sign In" showBack />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8 mt-4">
          <View className="h-20 w-20 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">🔗</Text>
          </View>
          <Text className="text-2xl font-bold text-black text-center mb-2">Continue with</Text>
          <Text className="text-gray-500 text-center">Choose your preferred sign in method</Text>
        </View>

        {error && (
          <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
            <Text className="text-red-500 text-center font-medium">{error}</Text>
          </View>
        )}

        <View className="space-y-4">
          <Button
            label="Continue with Google"
            onPress={() => handleSocialSignIn("google")}
            loading={isLoading}
            variant="outline"
          />

          <Button
            label="Continue with Apple"
            onPress={() => handleSocialSignIn("apple")}
            loading={isLoading}
            variant="outline"
          />

          <Button
            label="Continue with GitHub"
            onPress={() => handleSocialSignIn("github")}
            loading={isLoading}
            variant="outline"
          />
        </View>

        <View className="mt-8">
          <Button
            label="Back to Sign In"
            onPress={() => router.replace("/(auth)/sign-in")}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </Container>
  );
}
