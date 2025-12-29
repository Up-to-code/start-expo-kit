import { authClient } from '@/lib/auth/client';
import { Redirect, Stack } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
  const { data: session, isPending } = authClient.useSession();

  const isAuthenticated = useMemo(() => !!session?.user, [session?.user]);

  if (isPending) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(home)" />;
  }

  return <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />;
}
