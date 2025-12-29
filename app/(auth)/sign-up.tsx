import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { Input } from "@/components/shared/Input";
import { isValidEmail, validateName, validatePassword } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import { Link, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signup, isLoading } = useAuthStore();

  const handleSubmit = async () => {
    setError(null);

    const nameResult = validateName(name);
    if (!nameResult.valid) {
      setError(nameResult.message || "Name is required");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }

    const passwordResult = validatePassword(password);
    if (!passwordResult.valid) {
      setError(passwordResult.message || "Password must be at least 8 characters");
      return;
    }

    const result = await signup(email, password, name);

    if (result.error) {
      setError(result.error.message || "Failed to sign up");
    }
    // Store will handle navigation after successful sign-up
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
          <TouchableOpacity
            onPress={() => router.back()}
            className="mb-6 self-start active:opacity-60"
            disabled={isLoading}
          >
            <Text className="text-[#007AFF] font-medium text-[17px]">Back</Text>
          </TouchableOpacity>

          <View className="items-center mb-10">
            <View className="h-24 w-24 bg-blue-50/50 rounded-full items-center justify-center mb-6">
              <Text className="text-4xl">👤</Text>
            </View>
            <Text className="text-[28px] font-bold text-black mb-2 tracking-tight">Create Account</Text>
            <Text className="text-[17px] text-gray-500 text-center">Join us today!</Text>
          </View>

          <View className="w-full">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              blurOnSubmit={false}
              textContentType="name"
              autoComplete="name"
              editable={!isLoading}
            />

            <Input
              ref={emailInputRef}
              label="Email"
              placeholder="john@example.com"
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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              maxLength={32}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              textContentType="newPassword"
              autoComplete="password-new"
              editable={!isLoading}
            />

            {error && (
              <View className="bg-red-50 p-4 rounded-xl border border-red-100 mb-6">
                <Text className="text-red-500 text-center font-medium">{error}</Text>
              </View>
            )}

            <Button
              label="Sign Up"
              onPress={handleSubmit}
              loading={isLoading}
              size="lg"
              className="mt-2"
            />

            <View className="flex-row justify-center mt-8">
              <Text className="text-gray-500 text-[15px]">Already have an account? </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity disabled={isLoading}>
                  <Text className="text-[#007AFF] font-semibold text-[15px]">Sign In</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
