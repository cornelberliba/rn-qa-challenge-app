import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

import { Link } from '~/components/Link';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { TEST_IDS } from '~/constants/testIDs';
import { simulateAsyncDelay, validateLogin } from '~/lib/auth';
import type { User } from '~/lib/storage';
import { saveUser } from '~/lib/storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateLogin(email, password)) {
      Alert.alert('Error', 'Invalid email or password');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await simulateAsyncDelay(); // 2-3 second delay

      // Save user data after successful login
      const userData: User = {
        email: email.trim(),
        fullName: 'Test User', // Mock full name for logged in user
        password: password.trim(),
      };
      await saveUser(userData);

      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Failed to log in. Please try again.');
      setLoading(false);
    }
  };

  const handleNavigateToSignup = () => {
    router.push('/(auth)/signup');
  };

  return (
    <View className='flex-1 justify-center items-center p-6 bg-white'>
      <View className='w-full max-w-sm'>
        <Text className='text-3xl font-bold text-center mb-8 text-gray-900'>Login</Text>

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
          testID={TEST_IDS.auth.password}
          placeholder='Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete='password'
          className='mb-6'
        />

        <Button testID={TEST_IDS.auth.login} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color='white' /> : <Text>Login</Text>}
        </Button>

        <View className='mt-4 items-center'>
          <Text className='text-sm text-gray-600 mb-2'>Don't have an account?</Text>
          <Link testID={TEST_IDS.auth.dontHaveAccount} onPress={handleNavigateToSignup}>
            Sign up here
          </Link>
        </View>
      </View>
    </View>
  );
}
