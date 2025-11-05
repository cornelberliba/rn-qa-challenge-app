import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { ONBOARDING_CONTENT } from '~/constants/onboarding';
import { TEST_IDS } from '~/constants/testIDs';
import { setOnboardingComplete } from '~/lib/storage';

export default function OnboardingScreen3() {
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    try {
      setLoading(true);
      await setOnboardingComplete();
      router.replace('/(auth)/signup');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setLoading(false);
    }
  };

  return (
    <View className='flex-1 justify-center items-center p-6 bg-white'>
      <View className='w-full max-w-sm'>
        <Text className='text-3xl font-bold text-center mb-4 text-gray-900'>
          {ONBOARDING_CONTENT.screen3.title}
        </Text>
        <Text className='text-base text-center mb-8 text-gray-600'>
          {ONBOARDING_CONTENT.screen3.description}
        </Text>
        <Button
          testID={TEST_IDS.onboarding.getStarted}
          onPress={handleGetStarted}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color='white' /> : <Text>Get Started</Text>}
        </Button>
      </View>
    </View>
  );
}
