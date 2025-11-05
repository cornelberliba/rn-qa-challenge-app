import { router } from 'expo-router';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { ONBOARDING_CONTENT } from '~/constants/onboarding';
import { TEST_IDS } from '~/constants/testIDs';

export default function OnboardingScreen2() {
  const handleNext = () => {
    router.push('/(onboarding)/screen3');
  };

  return (
    <View className='flex-1 justify-center items-center p-6 bg-white'>
      <View className='w-full max-w-sm'>
        <Text className='text-3xl font-bold text-center mb-4 text-gray-900'>
          {ONBOARDING_CONTENT.screen2.title}
        </Text>
        <Text className='text-base text-center mb-8 text-gray-600'>
          {ONBOARDING_CONTENT.screen2.description}
        </Text>
        <Button testID={TEST_IDS.onboarding.moreInfo} onPress={handleNext}>
          <Text>More Info</Text>
        </Button>
      </View>
    </View>
  );
}
