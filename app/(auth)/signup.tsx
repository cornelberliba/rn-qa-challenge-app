import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { Link } from '~/components/Link';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { TEST_IDS } from '~/constants/testIDs';
import { simulateAsyncDelay, validateSignup } from '~/lib/auth';
import type { User } from '~/lib/storage';
import { saveUser } from '~/lib/storage';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email.trim() || !fullName.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // 🐛 INTENTIONAL BUG: Password confirmation not validated
    // Expected: Should check if password matches confirmPassword
    // Actual: No validation, accepts mismatched passwords

    const userData: User = {
      email: email.trim(),
      fullName: fullName.trim(),
      password: password.trim(),
    };

    if (!validateSignup(userData)) {
      Alert.alert('Error', 'Please fill in all fields correctly');
      return;
    }

    try {
      setLoading(true);
      await simulateAsyncDelay(); // 2-3 second delay
      await saveUser(userData);
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again.');
      setLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className='flex-1 justify-center items-center p-6 bg-white'>
      <View className='w-full max-w-sm'>
        <Text className='text-3xl font-bold text-center mb-8 text-gray-900'>Sign Up</Text>

        <Input
          testID={TEST_IDS.auth.email}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          // 🐛 INTENTIONAL BUG: Email field has autoCapitalize enabled
          // Expected: autoCapitalize="none"
          // Actual: autoCapitalize="words" (causes unwanted capitalization)
          autoCapitalize='words'
          autoComplete='email'
          className='mb-4'
        />

        <Input
          testID={TEST_IDS.auth.fullName}
          placeholder='Full Name'
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize='words'
          autoComplete='name'
          className='mb-4'
        />

        <Input
          testID={TEST_IDS.auth.password}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete='password-new'
          className='mb-4'
        />

        <Input
          testID={TEST_IDS.auth.confirmPassword}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoComplete='password-new'
          className='mb-6'
        />

        <Button testID={TEST_IDS.auth.signup} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color='white' /> : <Text>Sign Up</Text>}
        </Button>

        <View className='mt-4 items-center'>
          <Text className='text-sm text-gray-600 mb-2'>Already have an account?</Text>
          <Link testID={TEST_IDS.auth.alreadyHaveAccount} onPress={handleNavigateToLogin}>
            Login here
          </Link>
        </View>
      </View>
    </View>
  );
}
