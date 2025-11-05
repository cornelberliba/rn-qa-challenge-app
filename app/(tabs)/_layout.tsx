import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: 'QA Automation Challenge',
      }}
    >
      <Stack.Screen name='home' />
    </Stack>
  );
}
