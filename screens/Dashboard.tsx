import React from 'react';
import { Card, Button } from '../components/UIComponents';
import { ScreenName, User } from '../types';
import { Flame, Star, Zap, ChevronRight, Trophy, Target, BookCheck, MessageSquare, BarChart2, Bell, Globe, Lock, BookOpen, LogOut } from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
}

export const HomeDashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  return (
    <div className="p-5 md:p-8 pb-24 md:pb-8 space-y-6 md:space-y-8 animate-fade-in max-w-6xl mx-auto w-full">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-900/50 p-4 md:p-6 rounded-2xl border border-zinc-800 backdrop-blur gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tr from-neon to-blue-600 rounded-full flex items-center justify-center border-2 border-black shadow-neon shrink-0">
                <span className="font-bold text-lg md:text-xl">Lv.{user.level}</span>
            </div>
            <div>
                <p className="text-xs md:text-sm text-zinc-400">Сайн байна уу?</p>
                <p className="font-bold text-lg md:text-2xl text-white">{user.name}</p>
            </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
            <div className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-black/40 px-4 py-2 md:py-3 rounded-xl border border-zinc-800">
                <Flame className="text-orange-500 fill-orange-500" size={20} />
                <span className="text-sm md:text-base font-bold text-orange-500">{user.streak}</span>
            </div>
            <div className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-black/40 px-4 py-2 md:py-3 rounded-xl border border-zinc-800">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="text-sm md:text-base font-bold text-yellow-400">{user.coins}</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column: Main Actions */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Today's Quest */}
            <div>
                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="text-neon" />
                    Өнөөдрийн даалгавар
                </h2>
                <Card className="relative overflow-hidden group min-h-[200px] flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-neon/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl md:text-3xl font-bold mb-2">Өнөөдрийн 5 бодлого</h3>
                        <p className="text-zinc-400 text-sm md:text-base mb-6 max-w-md">Математик, Физик холимог сэдвүүдээр мэдлэгээ сориорой.</p>
                        
                        <div className="flex items-center gap-4 mb-6 max-w-sm">
                            <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="w-2/5 h-full bg-neon shadow-[0_0_10px_#A259FF]"></div>
                            </div>
                            <span className="text-sm text-neon font-bold">2/5</span>
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={() => onNavigate('dailyTraining')} neon className="py-3 md:py-4 px-8 w-auto text-sm md:text-base">
                                Үргэлжлүүлэх
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Quick Actions Grid */}
            <div>
                 <h2 className="text-lg md:text-xl font-bold mb-4">Цэс</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <ActionButton 
                        icon={BookCheck} color="text-blue-500" bg="bg-blue-500/10" label="Тест" 
                        onClick={() => onNavigate('testSimulation')} 
                    />
                    <ActionButton 
                        icon={MessageSquare} color="text-neon" bg="bg-neon/10" label="AI Багш" 
                        onClick={() => onNavigate('aiTutor')} 
                    />
                    <ActionButton 
                        icon={BarChart2} color="text-green-500" bg="bg-green-500/10" label="Ахиц" 
                        onClick={() => onNavigate('progress')} 
                    />
                    <ActionButton 
                        icon={Zap} color="text-pink-500" bg="bg-pink-500/10" label="Дасгал" 
                        onClick={() => onNavigate('dailyTraining')} 
                    />
                </div>
            </div>
          </div>

          {/* Right Column: Challenges & Side Content */}
          <div className="lg:col-span-1 space-y-6">
              {/* Mini Challenge */}
             <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                      <div>
                          <h4 className="font-bold text-white text-lg">Mini Challenge</h4>
                          <p className="text-sm text-zinc-400 mt-1">Алгебр: Тэгшитгэл</p>
                      </div>
                      <div className="bg-neon/20 p-2 rounded-lg">
                          <Zap size={20} className="text-neon" />
                      </div>
                  </div>
                  <div className="mt-2">
                       <Button variant="secondary" className="text-sm py-2">Эхлүүлэх</Button>
                  </div>
             </div>

             {/* Recent Activity Placeholder */}
             <Card className="space-y-4">
                 <h4 className="font-bold text-white text-lg">Сүүлд үзсэн</h4>
                 <div className="space-y-3">
                     {[1, 2, 3].map((i) => (
                         <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-800/50 cursor-pointer transition-colors">
                             <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                 <BookOpen size={18} className="text-zinc-400" />
                             </div>
                             <div className="flex-1">
                                 <p className="text-sm font-medium text-white">Математик {i}</p>
                                 <p className="text-xs text-zinc-500">10 минутын өмнө</p>
                             </div>
                             <ChevronRight size={16} className="text-zinc-600" />
                         </div>
                     ))}
                 </div>
             </Card>
          </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: any, color: string, bg: string, label: string, onClick: () => void }> = ({ icon: Icon, color, bg, label, onClick }) => (
    <button onClick={onClick} className="bg-zinc-900 border border-zinc-800 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-3 hover:border-neon hover:bg-zinc-800 transition-all group h-full justify-center">
        <div className={`p-3 md:p-4 rounded-full transition-colors ${bg} group-hover:scale-110 duration-200`}>
            <Icon className={color} size={28} />
        </div>
        <span className="font-semibold text-sm md:text-base text-zinc-300 group-hover:text-white">{label}</span>
    </button>
);

export const ProfileScreen: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="p-5 md:p-8 pb-24 md:pb-8 animate-fade-in max-w-5xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-6 md:hidden">Миний Профайл</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Col: Avatar & Basic Info */}
                <div className="md:col-span-1">
                    <Card className="flex flex-col items-center py-8">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-800 rounded-full relative p-1 border-2 border-neon shadow-neon mb-4">
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                                alt="Avatar" 
                                className="w-full h-full rounded-full bg-zinc-900"
                            />
                            <div className="absolute bottom-0 right-2 bg-neon text-white text-sm px-3 py-1 rounded-full border border-black font-bold">
                                Lv.{user.level}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold mt-2 text-center">{user.name}</h2>
                        <p className="text-zinc-400 text-sm mb-6 text-center">Хөгжүүлэгч сурагч</p>
                        <Button variant="outline" className="w-full md:w-auto px-8 py-2 h-auto text-sm rounded-full">
                            Аватар засах
                        </Button>
                    </Card>
                    
                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <Card className="flex flex-col items-center justify-center p-4">
                            <Trophy className="text-yellow-500 mb-2" size={28} />
                            <p className="text-xs text-zinc-400">Нийт Оноо</p>
                            <p className="text-xl font-bold">{user.xp.toLocaleString()}</p>
                        </Card>
                        <Card className="flex flex-col items-center justify-center p-4">
                            <Star className="text-purple-400 mb-2" size={28} />
                            <p className="text-xs text-zinc-400">Зоос</p>
                            <p className="text-xl font-bold">{user.coins}</p>
                        </Card>
                    </div>
                </div>

                {/* Right Col: Settings & Details */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <h3 className="font-bold text-white mb-4 text-lg border-b border-zinc-800 pb-2">Статистик</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-zinc-900/50 p-4 rounded-xl">
                                <span className="text-zinc-500 text-xs">Нийт бодсон бодлого</span>
                                <p className="text-2xl font-bold text-white">1,245</p>
                            </div>
                            <div className="bg-zinc-900/50 p-4 rounded-xl">
                                <span className="text-zinc-500 text-xs">Зөв хариултын хувь</span>
                                <p className="text-2xl font-bold text-neon">84%</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="space-y-2">
                        <h3 className="font-bold text-white mb-4 text-lg border-b border-zinc-800 pb-2">Тохиргоо</h3>
                        <div className="space-y-1">
                            <SettingsItem icon={Bell} label="Мэдэгдэл" />
                            <SettingsItem icon={Lock} label="Нууц үг солих" />
                            <SettingsItem icon={Globe} label="Хэлний сонголт" />
                            <SettingsItem icon={LogOut} label="Гарах" isDestructive />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

const SettingsItem: React.FC<{ icon: any, label: string, isDestructive?: boolean }> = ({ icon: Icon, label, isDestructive }) => (
    <div className={`flex justify-between items-center p-4 bg-zinc-900/30 rounded-xl cursor-pointer hover:bg-zinc-800 transition-colors group`}>
        <div className="flex items-center gap-3">
            <Icon size={18} className={isDestructive ? 'text-red-500' : 'text-zinc-400 group-hover:text-neon'} />
            <span className={`text-sm md:text-base ${isDestructive ? 'text-red-500 font-medium' : 'text-zinc-300 group-hover:text-white'}`}>{label}</span>
        </div>
        <ChevronRight size={16} className="text-zinc-600 group-hover:text-zinc-400" />
    </div>
);