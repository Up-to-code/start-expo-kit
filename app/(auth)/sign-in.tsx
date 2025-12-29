import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Input } from "@/components/shared/Input";
import { authClient } from "@/lib/auth/client";
import { isValidEmail } from "@/lib/utils";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    setIsLoading(true);

    const result = await authClient.signIn.email({ email, password });

    if (result.error) {
      setError(result.error.message || "Failed to sign in");
      setIsLoading(false);
    }
    // Layout will handle redirect after successful sign-in
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingBottom: 32, paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-10">
            <View className="h-24 w-24 bg-blue-50/50 rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">🔒</Text>
            </View>
            <Text className="text-[28px] font-bold text-black mb-2 tracking-tight">Welcome Back</Text>
            <Text className="text-[17px] text-gray-500 text-center">Sign in to continue</Text>
          </View>

          <View className="w-full">
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
              textContentType="username"
              autoComplete="username"
              editable={!isLoading}
            />

            <Input
              ref={passwordInputRef}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              textContentType="password"
              autoComplete="password"
              editable={!isLoading}
            />

            <TouchableOpacity
              onPress={() => { }}
              className="items-end mb-6"
              disabled={isLoading}
            >
              <Text className="text-[#007AFF] font-medium text-[15px]">Forgot Password?</Text>
            </TouchableOpacity>

            {error && (
              <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
                <Text className="text-red-500 text-center font-medium">{error}</Text>
              </View>
            )}

            <Button
              label="Sign In"
              onPress={handleSubmit}
              loading={isLoading}
              size="lg"
            />

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500 text-[15px]">Don't have an account? </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity disabled={isLoading}>
                  <Text className="text-[#007AFF] font-semibold text-[15px]">Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
