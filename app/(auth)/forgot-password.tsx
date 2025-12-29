import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Header } from "@/components/shared/Header";
import { Input } from "@/components/shared/Input";
import { isValidEmail } from "@/lib/utils";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call - replace with actual forgot password API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess(true);
    setIsLoading(false);
  };

  return (
    <Container safe>
      <Header title="Forgot Password" showBack />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-8 mt-4">
          <View className="h-20 w-20 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">🔑</Text>
          </View>
          <Text className="text-2xl font-bold text-black text-center mb-2">Reset Password</Text>
          <Text className="text-gray-500 text-center">Enter your email to receive a reset link.</Text>
        </View>

        <View>
          <Input
            label="Email Address"
            placeholder="john@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
          />

          {success && (
            <View className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
              <Text className="text-green-600 text-center font-medium">Password reset link sent to your email!</Text>
            </View>
          )}

          {error && !success && (
            <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-4">
              <Text className="text-red-500 text-center font-medium">{error}</Text>
            </View>
          )}

          <Button
            label={success ? "Resend Link" : "Send Reset Link"}
            onPress={handleSubmit}
            loading={isLoading}
            size="lg"
          />

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/sign-in")}
            className="items-center mt-6"
          >
            <Text className="text-[#007AFF] font-medium">Back to Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
}
