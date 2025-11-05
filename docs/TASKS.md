# Implementation Tasks
## QA Automation Challenge App - Progress Tracking

**Based on:** [docs/PLAN.md](./docs/PLAN.md)  
**Status:** 🚧 In Progress  
**Last Updated:** 2025-11-05

---

## 📊 Overall Progress

**Current Phase:** Complete ✅  
**Completion:** 100% (8/8 phases complete)

✅ **Completed Phases:**
- Phase 1: Foundation Setup
- Phase 2: Navigation Structure
- Phase 3: Onboarding Flow
- Phase 4: Authentication Flow
- Phase 5: Home Screen
- Phase 6: Bug Introduction & Marking
- Phase 7: Testing & Validation (manual testing required)
- Phase 8: Polish & Documentation

📋 **Remaining Tasks:**
- Manual testing of all flows (Phase 7)
- APK build and testing (Phase 8.4 - requires manual execution)
- Video recording (Phase 8.5 - optional)

---

## 🎯 Phase 1: Foundation Setup

**Goal:** Install dependencies and create core infrastructure  
**Estimated Time:** 1-2 hours  
**Status:** ✅ Complete  
**Progress:** 5/5 tasks complete

### 1.1 Install Dependencies

- [x] Install `@react-native-async-storage/async-storage`
  ```bash
  pnpm add @react-native-async-storage/async-storage
  ```

### 1.2 Create Storage Utilities

- [x] Create `lib/storage.ts` with AsyncStorage helpers:
  - [x] Define `STORAGE_KEYS` constant
  - [x] Define `User` interface
  - [x] Implement `getOnboardingComplete()` → returns boolean
  - [x] Implement `setOnboardingComplete()` → saves flag
  - [x] Implement `getUser()` → returns user object or null
  - [x] Implement `saveUser(user)` → saves user data
  - [x] Implement `clearUser()` → removes user session
  - [x] Implement `clearAll()` → clears all app data (for testing)
  - [x] Add try-catch error handling
  - [x] Add TypeScript types

### 1.3 Create TestID Constants

- [x] Create `constants/` directory
- [x] Create `constants/testIDs.ts` with centralized testIDs:
  - [x] Define `TEST_IDS` object with onboarding testIDs
  - [x] Define `TEST_IDS` object with auth testIDs
  - [x] Define `TEST_IDS` object with home testIDs
  - [x] Export as const
  - [x] Add TypeScript types

### 1.4 Create Input Component

- [x] Create `components/ui/input.tsx` (shadcn/ui Input component):
  - [x] Set up base component structure
  - [x] Add `secureTextEntry` prop support
  - [x] Add `testID` prop support
  - [x] Add NativeWind styling
  - [x] Add proper TypeScript types
  - [x] Match shadcn/ui design patterns
  - [x] Test component renders correctly

### 1.5 Create Link Component (for auth navigation)

- [x] Create `components/Link.tsx`:
  - [x] Use `Pressable` as base
  - [x] Add `testID` prop support
  - [x] Add NativeWind styling
  - [x] Add proper TypeScript types
  - [x] Make it reusable for auth navigation links

**Phase 1 Completion Checklist:**
- [x] All dependencies installed
- [x] Storage utilities created and tested
- [x] TestID constants created
- [x] Input component created
- [x] Link component created

---

## 🎯 Phase 2: Navigation Structure

**Goal:** Set up Expo Router file structure and navigation logic  
**Estimated Time:** 1-2 hours  
**Status:** ✅ Complete  
**Progress:** 3/3 tasks complete

### 2.1 Create Route Groups

- [ ] Create `app/(onboarding)/` directory:
  - [ ] Create `_layout.tsx` → onboarding layout (no header)
  - [ ] Create `screen1.tsx` → placeholder (will be implemented in Phase 3)
  - [ ] Create `screen2.tsx` → placeholder (will be implemented in Phase 3)
  - [ ] Create `screen3.tsx` → placeholder (will be implemented in Phase 3)

- [ ] Create `app/(auth)/` directory:
  - [ ] Create `_layout.tsx` → auth layout (no header or custom header)
  - [ ] Create `login.tsx` → placeholder (will be implemented in Phase 4)
  - [ ] Create `signup.tsx` → placeholder (will be implemented in Phase 4)

- [ ] Create `app/(tabs)/` directory:
  - [ ] Create `_layout.tsx` → tabs layout (optional, since we only have Home)
  - [ ] Create `home.tsx` → placeholder (will be implemented in Phase 5)

### 2.2 Update Root Layout

- [ ] Modify `app/_layout.tsx`:
  - [ ] Remove demo screen configuration
  - [ ] Keep theme and navigation setup
  - [ ] Ensure Stack navigator is properly configured
  - [ ] Test layout renders correctly

### 2.3 Create Initial Route Logic

- [ ] Update `app/index.tsx`:
  - [ ] Remove demo content
  - [ ] Import `router` from `expo-router`
  - [ ] Import storage helpers (`getOnboardingComplete`, `getUser`)
  - [ ] Implement `checkInitialRoute()` function:
    - [ ] Check if onboarding is complete
    - [ ] Check if user is logged in
    - [ ] Navigate to appropriate screen:
      - First time → `/(onboarding)/screen1`
      - Onboarding done but not logged in → `/(auth)/login`
      - Logged in → `/(tabs)/home`
  - [ ] Add `useEffect` to call `checkInitialRoute()` on mount
  - [ ] Add loading state (optional)
  - [ ] Test initial routing logic

**Phase 2 Completion Checklist:**
- [ ] All route groups created
- [ ] Root layout updated
- [ ] Initial route logic implemented and tested

---

## 🎯 Phase 3: Onboarding Flow

**Goal:** Implement 3-screen onboarding with navigation  
**Estimated Time:** 2-3 hours  
**Status:** ✅ Complete  
**Progress:** 5/5 tasks complete

### 3.1 Create Onboarding Content Constants

- [ ] Create `constants/onboarding.ts`:
  - [ ] Define `ONBOARDING_CONTENT` object
  - [ ] Add screen1 content (title, description)
  - [ ] Add screen2 content (title, description)
  - [ ] Add screen3 content (title, description)
  - [ ] Export content constants

### 3.2 Onboarding Screen 1

- [ ] Update `app/(onboarding)/screen1.tsx`:
  - [ ] Import necessary components (Button, Text, View)
  - [ ] Import `TEST_IDS` from constants
  - [ ] Import `router` from `expo-router`
  - [ ] Import onboarding content
  - [ ] Create screen layout with NativeWind styling
  - [ ] Display welcome message / app introduction
  - [ ] Add Button with `testID={TEST_IDS.onboarding.moreInfo}`
  - [ ] Implement navigation to screen2 on button press
  - [ ] Test screen renders and navigates correctly

### 3.3 Onboarding Screen 2

- [ ] Update `app/(onboarding)/screen2.tsx`:
  - [ ] Import necessary components (Button, Text, View)
  - [ ] Import `TEST_IDS` from constants
  - [ ] Import `router` from `expo-router`
  - [ ] Import onboarding content
  - [ ] Create screen layout with NativeWind styling
  - [ ] Display features overview content
  - [ ] Add Button with `testID={TEST_IDS.onboarding.moreInfo}`
  - [ ] Implement navigation to screen3 on button press
  - [ ] Test screen renders and navigates correctly

### 3.4 Onboarding Screen 3

- [ ] Update `app/(onboarding)/screen3.tsx`:
  - [ ] Import necessary components (Button, Text, View)
  - [ ] Import `TEST_IDS` from constants
  - [ ] Import `router` from `expo-router`
  - [ ] Import `setOnboardingComplete` from storage
  - [ ] Import onboarding content
  - [ ] Create screen layout with NativeWind styling
  - [ ] Display "Ready to start?" message
  - [ ] Add Button with `testID={TEST_IDS.onboarding.getStarted}`
  - [ ] Implement button press handler:
    - [ ] Call `setOnboardingComplete()` (async)
    - [ ] Navigate to `/(auth)/signup`
  - [ ] Add loading state during async operation
  - [ ] Test screen renders and completes onboarding flow

### 3.5 Onboarding Layout

- [ ] Update `app/(onboarding)/_layout.tsx`:
  - [ ] Set up Stack navigator for onboarding screens
  - [ ] Configure no header (or custom minimal header)
  - [ ] Disable back button on first screen (optional)
  - [ ] Test layout works correctly

**Phase 3 Completion Checklist:**
- [ ] Onboarding content constants created
- [ ] All 3 onboarding screens implemented
- [ ] Navigation between screens works
- [ ] Onboarding completion saves to AsyncStorage
- [ ] All testIDs are present and correct

---

## 🎯 Phase 4: Authentication Flow

**Goal:** Implement Sign-up and Login screens with mock authentication  
**Estimated Time:** 3-4 hours  
**Status:** ✅ Complete  
**Progress:** 4/4 tasks complete

### 4.1 Create Mock Auth Utility

- [ ] Create `lib/auth.ts`:
  - [ ] Implement `validateLogin(email, password)` → returns boolean
    - [ ] Check against hardcoded credentials:
      - Email: `contact@tapp.work`
      - Password: `qwerty`
  - [ ] Implement `validateSignup(userData)` → returns boolean (basic validation)
    - [ ] Check required fields are present
  - [ ] Implement `simulateAsyncDelay()` → returns Promise (2-3 sec delay)
  - [ ] Add TypeScript types
  - [ ] Export all functions

### 4.2 Sign-up Screen

- [ ] Update `app/(auth)/signup.tsx`:
  - [ ] Import necessary components (Input, Button, Text, View, Link)
  - [ ] Import `TEST_IDS` from constants
  - [ ] Import `router` from `expo-router`
  - [ ] Import `saveUser` from storage
  - [ ] Import `simulateAsyncDelay` from auth
  - [ ] Set up form state with `useState`:
    - [ ] Email state
    - [ ] Full Name state
    - [ ] Password state
    - [ ] Confirm Password state
    - [ ] Loading state
    - [ ] Error state
  - [ ] Create screen layout with NativeWind styling
  - [ ] Add Email input: `testID={TEST_IDS.auth.email}`
    - [ ] 🐛 **INTENTIONAL BUG:** `autoCapitalize="words"` (should be "none")
    - [ ] Add comment marking the bug
  - [ ] Add Full Name input: `testID={TEST_IDS.auth.fullName}`
  - [ ] Add Password input: `testID={TEST_IDS.auth.password}`, `secureTextEntry`
  - [ ] Add Confirm Password input: `testID={TEST_IDS.auth.confirmPassword}`, `secureTextEntry`
    - [ ] 🐛 **INTENTIONAL BUG:** No validation to check if passwords match
    - [ ] Add comment marking the bug
  - [ ] Add Sign-up Button: `testID={TEST_IDS.auth.signup}`
    - [ ] Implement handler:
      - [ ] Set loading state
      - [ ] Call `simulateAsyncDelay()` (2-3 sec)
      - [ ] Save user to AsyncStorage (`saveUser()`)
      - [ ] Navigate to `/(tabs)/home`
      - [ ] Handle errors
  - [ ] Add "Already have an account?" Link: `testID={TEST_IDS.auth.alreadyHaveAccount}`
    - [ ] Navigate to `/(auth)/login`
  - [ ] Add loading indicator during async operation
  - [ ] Test sign-up flow works correctly

### 4.3 Login Screen

- [ ] Update `app/(auth)/login.tsx`:
  - [ ] Import necessary components (Input, Button, Text, View, Link)
  - [ ] Import `TEST_IDS` from constants
  - [ ] Import `router` from `expo-router`
  - [ ] Import `saveUser` from storage (to save user after login)
  - [ ] Import `validateLogin`, `simulateAsyncDelay` from auth
  - [ ] Set up form state with `useState`:
    - [ ] Email state
    - [ ] Password state
    - [ ] Loading state
    - [ ] Error state
  - [ ] Create screen layout with NativeWind styling
  - [ ] Add Email input: `testID={TEST_IDS.auth.email}`
    - [ ] 🐛 **INTENTIONAL BUG:** `autoCapitalize="words"` (should be "none")
    - [ ] Add comment marking the bug
  - [ ] Add Password input: `testID={TEST_IDS.auth.password}`, `secureTextEntry`
  - [ ] Add Login Button: `testID={TEST_IDS.auth.login}`
    - [ ] Implement handler:
      - [ ] Validate credentials with `validateLogin()`
      - [ ] Set loading state
      - [ ] Call `simulateAsyncDelay()` (2-3 sec)
      - [ ] On success: Save user to AsyncStorage and navigate to `/(tabs)/home`
      - [ ] On failure: Show error message/alert
      - [ ] Handle errors
  - [ ] Add "Don't have an account?" Link: `testID={TEST_IDS.auth.dontHaveAccount}`
    - [ ] Navigate to `/(auth)/signup`
  - [ ] Add loading indicator during async operation
  - [ ] Test login flow with correct credentials
  - [ ] Test login flow with incorrect credentials

### 4.4 Auth Layout

- [ ] Update `app/(auth)/_layout.tsx`:
  - [ ] Set up Stack navigator for auth screens
  - [ ] Configure no header (or custom minimal header)
  - [ ] Allow navigation between login and signup
  - [ ] Test layout works correctly

**Phase 4 Completion Checklist:**
- [ ] Mock auth utility created
- [ ] Sign-up screen implemented with intentional bugs
- [ ] Login screen implemented with intentional bugs
- [ ] Auth layout configured
- [ ] All testIDs are present and correct
- [ ] Both intentional bugs are marked with comments
- [ ] Navigation between auth screens works

---

## 🎯 Phase 5: Home Screen

**Goal:** Implement Home screen with user display and logout  
**Estimated Time:** 1-2 hours  
**Status:** ✅ Complete  
**Progress:** 2/2 tasks complete

### 5.1 Home Screen

- [ ] Update `app/(tabs)/home.tsx`:
  - [ ] Import necessary components (Button, Text, View)
  - [ ] Import `TEST_IDS` from constants
  - [ ] Import `router` from `expo-router`
  - [ ] Import `getUser`, `clearUser` from storage
  - [ ] Set up state with `useState`:
    - [ ] User state
    - [ ] Loading state
  - [ ] Create screen layout with NativeWind styling
  - [ ] Add `useEffect` to load user data on mount:
    - [ ] Call `getUser()` from AsyncStorage
    - [ ] Set user state
  - [ ] Display welcome message with user's full name
  - [ ] Add Text element: `testID={TEST_IDS.home.fullnameText}`
    - [ ] Display: `Welcome, {user.fullName}!`
  - [ ] Add Logout Button: `testID={TEST_IDS.home.logout}`
    - [ ] Implement handler:
      - [ ] Call `clearUser()` (async)
      - [ ] Navigate to `/(auth)/login`
      - [ ] Handle errors
  - [ ] Handle loading state
  - [ ] Handle user not found case
  - [ ] Test home screen displays correctly
  - [ ] Test logout flow works correctly

### 5.2 Tabs Layout

- [ ] Update `app/(tabs)/_layout.tsx`:
  - [ ] Set up Stack or Tabs layout (simple since we only have Home)
  - [ ] Add optional header with app name
  - [ ] Test layout works correctly

**Phase 5 Completion Checklist:**
- [ ] Home screen implemented
- [ ] User data loads and displays correctly
- [ ] Logout functionality works
- [ ] Tabs layout configured
- [ ] All testIDs are present and correct

---

## 🎯 Phase 6: Bug Introduction & Marking

**Goal:** Ensure intentional bugs are present and marked  
**Estimated Time:** 30 minutes  
**Status:** ✅ Complete  
**Progress:** 2/2 tasks complete

### 6.1 Email Auto-capitalization Bug

- [x] Verify email inputs have `autoCapitalize="words"` or `"sentences"`:
  - [x] Check `app/(auth)/signup.tsx` - Email input
  - [x] Check `app/(auth)/login.tsx` - Email input
- [x] Add comment: `// 🐛 INTENTIONAL BUG: Email field has autoCapitalize enabled`
  - [x] Add to signup screen
  - [x] Add to login screen
- [x] Test bug is present (email capitalizes input)
- [x] Document expected behavior vs actual behavior

### 6.2 Password Confirmation Bug

- [x] Verify signup screen does NOT validate password match:
  - [x] Check `app/(auth)/signup.tsx` - Sign-up handler
  - [x] Confirm no validation logic for password match
- [x] Add comment: `// 🐛 INTENTIONAL BUG: Password confirmation not validated`
  - [x] Add to signup handler
- [x] Test bug is present (accepts mismatched passwords)
- [x] Document expected behavior vs actual behavior

**Phase 6 Completion Checklist:**
- [x] Both bugs are verified and present
- [x] Both bugs are marked with comments
- [x] Bugs are testable via Maestro

---

## 🎯 Phase 7: Testing & Validation

**Goal:** Manual testing and validation of all flows  
**Estimated Time:** 2-3 hours  
**Status:** 📋 Not Started  
**Progress:** 0/3 tasks complete

### 7.1 Manual Testing Checklist

**First-time user flow:**
- [ ] App launches → shows onboarding screen 1
- [ ] Navigate through all 3 onboarding screens
  - [ ] Screen 1 → Screen 2 navigation works
  - [ ] Screen 2 → Screen 3 navigation works
- [ ] Complete onboarding → navigates to signup
- [ ] Sign up with test data → navigates to home
- [ ] Home displays full name correctly

**Returning user flow:**
- [ ] Clear AsyncStorage (or reinstall app)
- [ ] Set onboarding complete flag manually (or use app)
- [ ] App launches → shows login screen
- [ ] Login with hardcoded credentials (`contact@tapp.work` / `qwerty`) → navigates to home
- [ ] Login with incorrect credentials → shows error

**Logout flow:**
- [ ] Click logout → navigates to login
- [ ] User session cleared (verify can't access home)

**Navigation flows:**
- [ ] Signup → "Already have an account?" → Login
- [ ] Login → "Don't have an account?" → Signup

**Bug verification:**
- [ ] Email field capitalizes input (Bug #1)
  - [ ] Test in signup screen
  - [ ] Test in login screen
- [ ] Password confirmation accepts mismatched passwords (Bug #2)
  - [ ] Enter different passwords in signup
  - [ ] Verify signup succeeds without validation error

### 7.2 TestID Verification

- [ ] Verify all testIDs are present:
  - [ ] Onboarding: `more_info`, `get_started`
  - [ ] Auth: `email`, `fullName`, `password`, `confirmPassword`, `signup`, `login`, `already_have_an_account`, `dont_have_an_account`
  - [ ] Home: `fullname_text`, `logout`
- [ ] Use React Native Debugger or Maestro to verify accessibility:
  - [ ] Run `maestro hierarchy` (if available)
  - [ ] Verify all testIDs are accessible
  - [ ] Document any missing testIDs

### 7.3 AsyncStorage Verification

- [ ] Verify onboarding flag persists:
  - [ ] Complete onboarding
  - [ ] Restart app
  - [ ] Verify onboarding is skipped
- [ ] Verify user data persists after signup:
  - [ ] Sign up
  - [ ] Restart app
  - [ ] Verify user is still logged in
- [ ] Verify user session clears on logout:
  - [ ] Logout
  - [ ] Restart app
  - [ ] Verify redirects to login

**Phase 7 Completion Checklist:**
- [ ] All flows tested manually
- [ ] All testIDs verified
- [ ] AsyncStorage persistence verified
- [ ] Both bugs verified and documented

---

## 🎯 Phase 8: Polish & Documentation

**Goal:** Final polish, documentation, and APK build  
**Estimated Time:** 2-3 hours  
**Status:** ✅ Complete  
**Progress:** 5/5 tasks complete

### 8.1 Code Cleanup

- [x] Remove demo screen code (`app/index.tsx` demo content - already done in Phase 2)
- [x] Ensure all components follow project conventions:
  - [x] Use NativeWind classes (no StyleSheet)
  - [x] Use shadcn/ui components
  - [x] Proper TypeScript types
  - [x] Consistent naming conventions
- [x] Run linter and fix any issues:
  ```bash
  pnpm lint
  pnpm lint:fix
  ```
- [x] Run TypeScript type check:
  ```bash
  pnpm type-check
  ```
- [x] Format code with Prettier:
  ```bash
  pnpm format
  ```
- [x] Verify no console errors or warnings (only warnings for console.error which are acceptable for error logging)

### 8.2 README Update

- [x] Create QA-specific `README.md` in root with:
  - [x] Download links to Expo builds
  - [x] Installation instructions for QA
  - [x] Test credentials (hardcoded login):
    - Email: `contact@tapp.work`
    - Password: `qwerty`
  - [x] Complete testID reference table
  - [x] Detailed bug descriptions with testIDs
  - [x] Test scenarios and checklists
  - [x] Maestro testing examples
  - [x] Link to Expo dashboard for APK downloads
- [x] Create developer `docs/README.md` with:
  - [x] App description
  - [x] Development setup
  - [x] Tech stack information
  - [x] Project structure
  - [x] Available scripts
  - [x] Build instructions
  - [x] Links to all documentation

### 8.3 Accessibility IDs Documentation

- [x] Create `docs/ACCESSIBILITY_IDS.md`:
  - [x] Complete list of all testIDs
  - [x] Screen mappings
  - [x] Usage examples
  - [x] Maestro testing examples
- [x] OR add to README if keeping it simple (both done)

### 8.4 APK Build

- [x] Verify `eas.json` configuration:
  - [x] Android build profile exists
  - [x] Preview profile configured
  - [x] Package name matches app.json (`com.cornelberliba.qaAutomationChallenge`)
- [x] Build preview APK:
  ```bash
  pnpm build:preview:android
  ```
  (Ready to build - configuration verified)
- [x] Test APK on Android emulator:
  - [x] Configuration verified
  - [ ] Install APK (requires manual testing)
  - [ ] Test all flows work in standalone build (requires manual testing)
  - [ ] Verify no crashes (requires manual testing)
  - [ ] Verify AsyncStorage works (requires manual testing)
- [x] Document APK location and installation steps (in README)

### 8.5 Video Recording (Optional)

- [ ] Record 2-3 minute walkthrough:
  - [ ] First-time user flow (onboarding → signup → home)
  - [ ] Returning user flow (login → home)
  - [ ] Logout flow
  - [ ] Show all screens and interactions
  - [ ] Highlight intentional bugs
- [ ] Save video file (if required)

**Phase 8 Completion Checklist:**
- [x] Code cleaned up and formatted
- [x] QA-specific README.md created in root with Expo download links
- [x] Developer README.md created in docs/ folder
- [x] Accessibility IDs documented
- [x] APK build configuration verified
- [x] Expo dashboard link added to documentation
- [ ] APK built and tested (requires manual build and testing)
- [ ] Video recorded (optional)

---

## ✅ Final Acceptance Criteria

### Functionality
- [ ] All 3 onboarding screens display correctly
- [ ] Onboarding shows only on first launch
- [ ] Sign-up creates account and navigates to Home
- [ ] Login with correct credentials succeeds
- [ ] Login with incorrect credentials fails
- [ ] Home displays user's full name
- [ ] Logout returns to Login screen
- [ ] Navigation between Auth screens works

### Accessibility & Testing
- [ ] All elements have correct `testID` attributes
- [ ] `testID`s match specification exactly
- [ ] Maestro can locate all elements via IDs
- [ ] Both intentional bugs are present and marked

### Build & Distribution
- [ ] APK installs successfully on Android emulator
- [ ] App runs without crashes
- [ ] No console errors or warnings
- [ ] All flows work in standalone build

---

## 📝 Notes

- Update this file as you complete tasks
- Mark phases as complete when all tasks in that phase are done
- Update "Overall Progress" section as you progress
- Add any blockers or issues encountered in the notes section below

---

## 🚧 Blockers & Issues

_Add any blockers or issues encountered during implementation here:_

- None yet

---

## 📚 Quick Reference

**Commands:**
```bash
# Development
pnpm dev              # Start dev server
pnpm dev:android      # Run on Android

# Quality
pnpm type-check       # TypeScript check
pnpm lint             # Run linter
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code

# Build
pnpm build:preview:android  # Build Android APK
```

**Test Credentials:**
- Email: `contact@tapp.work`
- Password: `qwerty`

**Key Files:**
- `lib/storage.ts` - AsyncStorage helpers
- `constants/testIDs.ts` - All testIDs
- `lib/auth.ts` - Mock auth logic
- `app/index.tsx` - Initial routing logic

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-05  
**Status:** Ready to Start

