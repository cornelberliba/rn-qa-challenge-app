import { Settings } from 'lucide-react-native';
import { View } from 'react-native';

import { OnboardingTogglePopover } from '~/components/OnboardingTogglePopover';
import { Button } from '~/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { TEST_IDS } from '~/constants/testIDs';
import { iconWithClassName } from '~/lib/icons/iconWithClassName';

// Configure Settings icon for NativeWind
iconWithClassName(Settings);

export function OnboardingToggleButton() {
  function handleOpenChange() {
    // Popover manages its own state
  }

  return (
    <View className='absolute bottom-4 right-4 z-50'>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            testID={TEST_IDS.onboarding.toggleButton}
            variant='outline'
            size='icon'
            className='rounded-full shadow-lg'
            accessibilityLabel='Open onboarding settings'
            accessibilityRole='button'
          >
            <Settings size={20} className='text-foreground' />
          </Button>
        </PopoverTrigger>
        <PopoverContent side='top' className='w-80'>
          <OnboardingTogglePopover />
        </PopoverContent>
      </Popover>
    </View>
  );
}
