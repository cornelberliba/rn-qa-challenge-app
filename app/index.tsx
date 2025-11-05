import { router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

import { Text } from '~/components/ui/text';
import { getForceOnboardingOnLogout, getOnboardingComplete, getUser } from '~/lib/storage';

export default function Index() {
  useEffect(() => {
    checkInitialRoute();
  }, []);

  async function checkInitialRoute() {
    try {
      const onboardingComplete = await getOnboardingComplete();
      const user = await getUser();
      const forceOnboardingOnLogout = await getForceOnboardingOnLogout();

      if (!user) {
        // User is logged out
        if (forceOnboardingOnLogout) {
          // Force onboarding when toggle is ON
          router.replace('/(onboarding)/screen1');
        } else if (!onboardingComplete) {
          // Show onboarding if not completed (default behavior)
          router.replace('/(onboarding)/screen1');
        } else {
          // Show login if onboarding completed (default behavior)
          router.replace('/(auth)/login');
        }
      } else {
        // User is logged in
        router.replace('/(tabs)/home');
      }
    } catch (error) {
      console.error('Error checking initial route:', error);
      // Default to onboarding if there's an error
      router.replace('/(onboarding)/screen1');
    }
  }

  // Show loading state while checking route
  return (
    <View className='flex-1 justify-center items-center bg-white'>
      <Text>Loading...</Text>
    </View>
  );
}
