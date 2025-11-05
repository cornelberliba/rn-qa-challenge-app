import * as React from 'react';
import { Pressable, PressableProps } from 'react-native';

import { Text } from '~/components/ui/text';
import { cn } from '~/lib/utils';

export interface LinkProps extends PressableProps {
  className?: string;
  testID?: string;
  children: React.ReactNode;
}

const Link = React.forwardRef<React.ElementRef<typeof Pressable>, LinkProps>(
  ({ className, testID, children, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        testID={testID}
        className={cn('active:opacity-70', className)}
        {...props}
      >
        <Text className='text-primary underline'>{children}</Text>
      </Pressable>
    );
  }
);

Link.displayName = 'Link';

export { Link };
