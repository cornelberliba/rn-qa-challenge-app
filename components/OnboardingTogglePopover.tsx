import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { TEST_IDS } from '~/constants/testIDs';
import { getForceOnboardingOnLogout, setForceOnboardingOnLogout } from '~/lib/storage';

export function OnboardingTogglePopover() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadState();
  }, []);

  async function loadState() {
    try {
      const value = await getForceOnboardingOnLogout();
      setIsEnabled(value);
    } catch (error) {
      console.error('Error loading onboarding toggle state:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle() {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    try {
      await setForceOnboardingOnLogout(newValue);
    } catch (error) {
      console.error('Error saving onboarding toggle state:', error);
      // Revert on error
      setIsEnabled(!newValue);
    }
  }

  if (loading) {
    return (
      <View className='p-4'>
        <Text className='text-sm text-gray-600'>Loading...</Text>
      </View>
    );
  }

  return (
    <View className='gap-4'>
      <View className='flex-row items-center justify-between gap-4'>
        <Text className='text-base font-medium text-foreground'>Always Show Onboarding</Text>
        <Button
          testID={TEST_IDS.onboarding.toggleSwitch}
          variant={isEnabled ? 'default' : 'outline'}
          size='sm'
          onPress={handleToggle}
          accessibilityRole='switch'
          accessibilityState={{ checked: isEnabled }}
          accessibilityLabel={
            isEnabled ? 'Disable always show onboarding' : 'Enable always show onboarding'
          }
        >
          <Text>{isEnabled ? 'ON' : 'OFF'}</Text>
        </Button>
      </View>
      <Text
        testID={TEST_IDS.onboarding.toggleExplanation}
        className='text-sm text-muted-foreground'
      >
        When enabled, onboarding will always show when you log out, even if you've completed it
        before.
      </Text>
    </View>
  );
}
