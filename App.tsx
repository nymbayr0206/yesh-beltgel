import React, { useState } from 'react';
import { AppLayout } from './components/UIComponents';
import { Onboarding, LoginRegister, ExamPreferences } from './screens/AuthScreens';
import { HomeDashboard, ProfileScreen } from './screens/Dashboard';
import { DailyTraining, AITutor, TestSimulation } from './screens/ActiveLearning';
import { ProgressScreen } from './screens/Progress';
import { ScreenName, User, ExamSettings } from './types';

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
  const [examSettings, setExamSettings] = useState<ExamSettings | null>(null);

  const handleSaveSettings = (settings: ExamSettings) => {
    setExamSettings(settings);
    setCurrentScreen('home');
  };

  const userWithSettings = { ...MOCK_USER, examSettings: examSettings || undefined };

  const isAuthScreen = ['onboarding', 'auth', 'examPreferences'].includes(currentScreen);

  // Simple router logic
  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onNavigate={setCurrentScreen} />;
      case 'auth':
        return <LoginRegister onNavigate={setCurrentScreen} />;
      case 'examPreferences':
        return <ExamPreferences onNavigate={setCurrentScreen} onSave={handleSaveSettings} />;
      case 'home':
        return <HomeDashboard user={userWithSettings} onNavigate={setCurrentScreen} />;
      case 'dailyTraining':
        return <DailyTraining user={userWithSettings} onBack={() => setCurrentScreen('home')} />;
      case 'aiTutor':
        return <AITutor onBack={() => setCurrentScreen('home')} examSettings={examSettings} />;
      case 'testSimulation':
        return <TestSimulation onBack={() => setCurrentScreen('home')} />;
      case 'progress':
        return <ProgressScreen user={userWithSettings} onBack={() => setCurrentScreen('home')} />;
      case 'profile':
        return <ProfileScreen user={userWithSettings} />;
      default:
        return <HomeDashboard user={userWithSettings} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <AppLayout 
      currentScreen={currentScreen} 
      onNavigate={setCurrentScreen}
      showNav={!isAuthScreen}
    >
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {renderScreen()}
      </div>
    </AppLayout>
  );
};

export default App;