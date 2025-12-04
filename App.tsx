import React, { useState } from 'react';
import { MobileLayout, BottomNav } from './components/UIComponents';
import { Onboarding, LoginRegister, ExamPreferences } from './screens/AuthScreens';
import { HomeDashboard, ProfileScreen } from './screens/Dashboard';
import { DailyTraining, AITutor, TestSimulation } from './screens/ActiveLearning';
import { ProgressScreen } from './screens/Progress';
import { ScreenName, User } from './types';

const MOCK_USER: User = {
  name: 'Т. Болд',
  avatar: 'avatar-url',
  level: 5,
  xp: 1250,
  coins: 450,
  streak: 12
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('onboarding');

  // Simple router logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onNavigate={setCurrentScreen} />;
      case 'auth':
        return <LoginRegister onNavigate={setCurrentScreen} />;
      case 'examPreferences':
        return <ExamPreferences onNavigate={setCurrentScreen} />;
      case 'home':
        return <HomeDashboard user={MOCK_USER} onNavigate={setCurrentScreen} />;
      case 'dailyTraining':
        return <DailyTraining onBack={() => setCurrentScreen('home')} />;
      case 'aiTutor':
        return <AITutor onBack={() => setCurrentScreen('home')} />;
      case 'testSimulation':
        return <TestSimulation onBack={() => setCurrentScreen('home')} />;
      case 'progress':
        return <ProgressScreen user={MOCK_USER} onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen user={MOCK_USER} />;
      default:
        return <HomeDashboard user={MOCK_USER} onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = ['home', 'progress', 'profile'].includes(currentScreen);

  return (
    <MobileLayout>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {renderScreen()}
      </div>
      
      {showBottomNav && (
        <BottomNav 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}
    </MobileLayout>
  );
};

export default App;