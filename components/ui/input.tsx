import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { cn } from '~/lib/utils';

export interface InputProps extends TextInputProps {
  className?: string;
  testID?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(({ className, testID, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      testID={testID}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground native:text-lg web:ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
