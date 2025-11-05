# Product Requirements Document (PRD)
## QA Automation Challenge - React Native Testing App

---

## 1. Overview

### 1.1 Product Goal
Develop a simple React Native mobile application (Android) specifically designed for QA automation testing using Maestro. The app will serve as a hands-on challenge for QA automation candidates to demonstrate their testing skills.

### 1.2 Target Users
- **Primary:** QA Automation Engineers (candidates)
- **Secondary:** Development team (for validation)

### 1.3 Success Metrics
- APK successfully runs on Android emulator
- All accessibility IDs properly exposed for Maestro
- QA candidates can complete 2-3 automated test flows
- Intentional bugs are discoverable through testing

---

## 2. Product Scope

### 2.1 In Scope
- ✅ Basic authentication flow (Sign-up/Login)
- ✅ 3-screen onboarding flow
- ✅ Home screen with logout
- ✅ Local data persistence (AsyncStorage)
- ✅ Intentional bugs for testing purposes
- ✅ Complete accessibility ID coverage
- ✅ Android APK generation

### 2.2 Out of Scope
- ❌ Backend API integration
- ❌ iOS build
- ❌ Real user authentication
- ❌ Complex UI/animations
- ❌ Push notifications
- ❌ Social login
- ❌ Password recovery

---

## 3. User Flows

### 3.1 First Time User Journey
```
App Launch
    ↓
Onboarding Screen 1 [More Info button]
    ↓
Onboarding Screen 2 [More Info button]
    ↓
Onboarding Screen 3 [Get Started button]
    ↓
Sign-up Screen
    ↓
Home Screen
    ↓
[Logout] → Login Screen
```

### 3.2 Returning User Journey
```
App Launch
    ↓
Login Screen (onboarding skipped)
    ↓
Home Screen
    ↓
[Logout] → Login Screen
```

### 3.3 Alternative Flow
```
Sign-up Screen
    ↓
[Already have an account?] → Login Screen
    ↓
[Don't have an account?] → Sign-up Screen
```

---

## 4. Feature Requirements

### 4.1 Onboarding Flow

#### Screen 1
**Purpose:** Welcome message
- **Content:** App introduction text
- **Action:** Button with `testID="more_info"`
- **Behavior:** Navigate to Onboarding Screen 2

#### Screen 2
**Purpose:** Features overview
- **Content:** App features description
- **Action:** Button with `testID="more_info"`
- **Behavior:** Navigate to Onboarding Screen 3

#### Screen 3
**Purpose:** Call to action
- **Content:** "Ready to start?" message
- **Action:** Button with `testID="get_started"`
- **Behavior:** 
  - Save flag to AsyncStorage (`onboardingComplete: true`)
  - Navigate to Sign-up Screen

**Persistence Logic:**
- Show onboarding only on first app launch
- Subsequent launches skip directly to Login

---

### 4.2 Authentication

#### 4.2.1 Sign-up Screen

**Input Fields:**
| Field | testID | Type | Validation | Bug |
|-------|--------|------|------------|-----|
| Email | `email` | TextInput | Required | 🐛 autoCapitalize enabled |
| Full Name | `fullName` | TextInput | Required | - |
| Password | `password` | SecureTextEntry | Required | - |
| Confirm Password | `confirmPassword` | SecureTextEntry | Required | 🐛 No match validation |

**Actions:**
- **Sign-up Button** (`testID="signup"`)
  - Simulates async operation (2-3 sec delay)
  - Saves user data to AsyncStorage
  - Navigates to Home Screen
  
- **"Already have an account?" Link** (`testID="already_have_an_account"`)
  - Navigates to Login Screen

#### 4.2.2 Login Screen

**Input Fields:**
| Field | testID | Type | Bug |
|-------|--------|------|-----|
| Email | `email` | TextInput | 🐛 autoCapitalize enabled |
| Password | `password` | SecureTextEntry | - |

**Hardcoded Credentials:**
- Email: `contact@tapp.work`
- Password: `qwerty`

**Actions:**
- **Login Button** (`testID="login"`)
  - Validates credentials against hardcoded values
  - Simulates async operation (2-3 sec delay)
  - Navigates to Home Screen on success
  - Shows error on failure
  
- **"Don't have an account?" Link** (`testID="dont_have_an_account"`)
  - Navigates to Sign-up Screen

---

### 4.3 Home Screen

**Display:**
- Welcome text with user's full name
- Text element with `testID="fullname_text"`

**Actions:**
- **Logout Button** (`testID="logout"`)
  - Clears user session from AsyncStorage
  - Navigates to Login Screen

---

## 5. Technical Specifications

### 5.1 Tech Stack
- **Framework:** React Native with Expo (~50.x)
- **Navigation:** React Navigation 6.x (Stack Navigator)
- **Storage:** @react-native-async-storage/async-storage
- **Build:** EAS Build (for APK generation)

### 5.2 Project Structure
```
src/
├── screens/
│   ├── Onboarding1Screen.js
│   ├── Onboarding2Screen.js
│   ├── Onboarding3Screen.js
│   ├── SignupScreen.js
│   ├── LoginScreen.js
│   └── HomeScreen.js
├── navigation/
│   └── AppNavigator.js
├── components/
│   ├── CustomButton.js
│   └── CustomInput.js
├── utils/
│   ├── storage.js        # AsyncStorage helpers
│   └── auth.js           # Mock auth logic
└── constants/
    ├── testIDs.js        # Centralized accessibility IDs
    └── content.js        # Onboarding content
```

### 5.3 Data Persistence (AsyncStorage)

**Keys:**
```javascript
{
  "onboardingComplete": "true" | "false",
  "user": {
    "email": string,
    "fullName": string,
    "password": string // Mock - never do this in production!
  }
}
```

### 5.4 Accessibility IDs Map

| Screen | Element | testID | Type |
|--------|---------|--------|------|
| Onboarding 1 | Next Button | `more_info` | Button |
| Onboarding 2 | Next Button | `more_info` | Button |
| Onboarding 3 | Get Started | `get_started` | Button |
| Sign-up | Email Input | `email` | TextInput |
| Sign-up | Full Name Input | `fullName` | TextInput |
| Sign-up | Password Input | `password` | TextInput |
| Sign-up | Confirm Password | `confirmPassword` | TextInput |
| Sign-up | Sign-up Button | `signup` | Button |
| Sign-up | Login Link | `already_have_an_account` | Pressable |
| Login | Email Input | `email` | TextInput |
| Login | Password Input | `password` | TextInput |
| Login | Login Button | `login` | Button |
| Login | Sign-up Link | `dont_have_an_account` | Pressable |
| Home | Full Name Text | `fullname_text` | Text |
| Home | Logout Button | `logout` | Button |

---

## 6. Intentional Bugs (For QA Testing)

### 🐛 Bug #1: Email Auto-capitalization
**Location:** Sign-up & Login screens
**Description:** Email input has `autoCapitalize="words"` or `"sentences"` enabled
**Expected:** Email should have `autoCapitalize="none"`
**Impact:** Users typing emails will see unwanted capitalization
**Severity:** Medium

### 🐛 Bug #2: Password Confirmation Missing
**Location:** Sign-up screen
**Description:** No validation to check if `password` matches `confirmPassword`
**Expected:** Should show error if passwords don't match
**Impact:** Users can create accounts with mismatched passwords
**Severity:** High

---

## 7. Development Tasks

### Phase 1: Setup (1-2 hours)
- [ ] Initialize Expo project
- [ ] Install dependencies (React Navigation, AsyncStorage)
- [ ] Configure EAS Build
- [ ] Setup basic navigation structure

### Phase 2: Onboarding (2 hours)
- [ ] Create 3 onboarding screens with content
- [ ] Implement navigation between screens
- [ ] Add AsyncStorage logic for "seen" flag
- [ ] Add accessibility IDs to buttons

### Phase 3: Authentication (3 hours)
- [ ] Create Sign-up screen with inputs
- [ ] Create Login screen with inputs
- [ ] Implement mock authentication with delay
- [ ] Add navigation between Auth screens
- [ ] **Introduce Bug #1:** Set `autoCapitalize` on email fields
- [ ] **Introduce Bug #2:** Skip password match validation

### Phase 4: Home Screen (1 hour)
- [ ] Create Home screen layout
- [ ] Display user's full name
- [ ] Implement logout functionality
- [ ] Add accessibility IDs

### Phase 5: Testing & Validation (2 hours)
- [ ] Manual testing of all flows
- [ ] Verify all accessibility IDs are present
- [ ] Test AsyncStorage persistence
- [ ] Validate bugs are present and detectable

### Phase 6: Build & Documentation (1 hour)
- [ ] Generate Android APK via EAS Build
- [ ] Record video walkthrough of app
- [ ] Create README with setup instructions
- [ ] Document all accessibility IDs

**Total Estimated Time:** 10-12 hours

---

## 8. Deliverables

### For QA Candidates:
1. **APK File** (`app-release.apk`)
   - Installable on Android emulator
   - Size: ~30-50MB

2. **Video Recording** (2-3 minutes)
   - Demonstrates all user flows
   - Shows all screens and interactions

3. **README.md**
   ```markdown
   # QA Challenge App - Setup Guide
   
   ## Installation
   1. Install APK on Android emulator
   2. Launch app
   
   ## Test Credentials
   - Email: contact@tapp.work
   - Password: qwerty
   
   ## Available Flows
   1. First time user: Onboarding → Sign-up → Home
   2. Returning user: Login → Home
   3. Logout flow
   
   ## Accessibility IDs
   [Complete list of testIDs...]
   
   ## Known Issues (for testing)
   - Email fields have auto-capitalization
   - Password confirmation not validated
   ```

4. **accessibility-ids.json** (Optional)
   ```json
   {
     "onboarding": ["more_info", "get_started"],
     "auth": ["email", "fullName", "password", "confirmPassword", "signup", "login", "already_have_an_account", "dont_have_an_account"],
     "home": ["fullname_text", "logout"]
   }
   ```

---

## 9. Acceptance Criteria

### App Functionality
- ✅ All 3 onboarding screens display correctly
- ✅ Onboarding shows only once
- ✅ Sign-up creates account and navigates to Home
- ✅ Login with correct credentials succeeds
- ✅ Login with incorrect credentials fails
- ✅ Home displays user's full name
- ✅ Logout returns to Login screen
- ✅ Navigation between Auth screens works

### Accessibility & Testing
- ✅ All elements have correct `testID` attributes
- ✅ `testID`s match specification exactly
- ✅ Maestro can locate all elements via IDs
- ✅ Both intentional bugs are present

### Build & Distribution
- ✅ APK installs successfully on Android emulator
- ✅ App runs without crashes
- ✅ No console errors or warnings
- ✅ Video clearly shows all functionality

---

## 10. Non-Functional Requirements

### Performance
- App launches in < 3 seconds
- Screen transitions are smooth (no lag)
- Async operations complete within 2-3 seconds

### Compatibility
- Android API Level 21+ (Android 5.0+)
- Tested on Android emulator (Pixel 5, API 33)

### Code Quality
- Clean, readable code
- Proper component structure
- Centralized constants for testIDs
- Comments for intentional bugs

---

## 11. Testing Strategy (For Development)

### Manual Testing Checklist
- [ ] Install APK on fresh emulator
- [ ] Complete first-time user flow
- [ ] Reinstall app and verify onboarding skipped
- [ ] Test Sign-up with various inputs
- [ ] Test Login with correct credentials
- [ ] Test Login with wrong credentials
- [ ] Verify full name displays correctly
- [ ] Test logout functionality
- [ ] Verify both bugs are present
- [ ] Verify all testIDs via Maestro hierarchy

### Maestro Verification
```bash
# Verify all testIDs are accessible
maestro hierarchy

# Test basic flow
maestro test example-flow.yaml
```

---

## 12. Timeline

| Milestone | Duration | Status |
|-----------|----------|--------|
| Setup & Planning | 1 day | 📋 To Do |
| Development | 2-3 days | 📋 To Do |
| Testing & Bug Fixes | 1 day | 📋 To Do |
| APK Build & Documentation | 0.5 day | 📋 To Do |
| **Total** | **4-5 days** | |

---

## 13. Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Expo build fails | High | Use EAS Build with proper configuration |
| testIDs not accessible in Maestro | High | Test early with `maestro hierarchy` |
| AsyncStorage doesn't persist | Medium | Test on actual emulator, not Expo Go |
| APK too large | Low | Optimize assets, use Hermes engine |

---

## 14. Open Questions

- [ ] Should we add a "Reset Onboarding" button for testing? → **No, reinstall app**
- [ ] Need loading indicators during async operations? → **Yes, simple spinner**
- [ ] Should errors be displayed for wrong login? → **Yes, simple alert**
- [ ] Include app icon and splash screen? → **Optional, nice-to-have**

---

## 15. Future Enhancements (Out of Scope)

- Real backend API integration
- Biometric authentication
- Password strength meter
- Email validation with regex
- iOS build
- Dark mode support
- Internationalization (i18n)

---

**Document Version:** 1.0  
**Last Updated:** November 5, 2025  
**Owner:** Development Team  
**Reviewers:** QA Team Lead