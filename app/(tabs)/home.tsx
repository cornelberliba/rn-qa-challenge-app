import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { TEST_IDS } from '~/constants/testIDs';
import type { User } from '~/lib/storage';
import { clearUser, getForceOnboardingOnLogout, getUser } from '~/lib/storage';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userData = await getUser();
      if (userData) {
        setUser(userData);
      } else {
        // No user found, redirect to login
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error loading user:', error);
      router.replace('/(auth)/login');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await clearUser();
      const forceOnboardingOnLogout = await getForceOnboardingOnLogout();

      if (forceOnboardingOnLogout) {
        // Navigate to onboarding if toggle is ON
        router.replace('/(onboarding)/screen1');
      } else {
        // Navigate to login if toggle is OFF (default behavior)
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <View className='flex-1 justify-center items-center p-6 bg-white'>
      <View className='w-full max-w-sm'>
        <Text className='text-3xl font-bold text-center mb-8 text-gray-900'>Welcome</Text>
        <Text
          testID={TEST_IDS.home.fullnameText}
          className='text-xl text-center mb-8 text-gray-700'
        >
          Welcome, {user.fullName}!
        </Text>
        <Button testID={TEST_IDS.home.logout} onPress={handleLogout}>
          <Text>Logout</Text>
        </Button>
      </View>
    </View>
  );
}
