import React from 'react';
import { Card, Button } from '../components/UIComponents';
import { ScreenName, User } from '../types';
import { Flame, Star, Zap, ChevronRight, Trophy, Target, BookCheck, MessageSquare, BarChart2 } from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigate: (screen: ScreenName) => void;
}

export const HomeDashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  return (
    <div className="p-5 pb-24 space-y-6 animate-fade-in">
      {/* Header Stats */}
      <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 backdrop-blur">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-tr from-neon to-blue-600 rounded-full flex items-center justify-center border-2 border-black shadow-neon">
                <span className="font-bold text-lg">Lv.{user.level}</span>
            </div>
            <div>
                <p className="text-xs text-zinc-400">Сайн байна уу?</p>
                <p className="font-bold text-white">{user.name}</p>
            </div>
        </div>
        <div className="flex gap-2">
            <div className="flex flex-col items-center bg-black/40 px-3 py-1 rounded-lg border border-zinc-800">
                <Flame className="text-orange-500 fill-orange-500" size={18} />
                <span className="text-xs font-bold text-orange-500">{user.streak}</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 px-3 py-1 rounded-lg border border-zinc-800">
                <Star className="text-yellow-400 fill-yellow-400" size={18} />
                <span className="text-xs font-bold text-yellow-400">{user.coins}</span>
            </div>
        </div>
      </div>

      {/* Today's Quest */}
      <div>
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            <Target className="text-neon" />
            Өнөөдрийн даалгавар
        </h2>
        <Card className="relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h3 className="text-xl font-bold mb-1">Өнөөдрийн 5 бодлого</h3>
            <p className="text-zinc-400 text-sm mb-4">Математик, Физик холимог</p>
            
            <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-2/5 h-full bg-neon shadow-[0_0_10px_#A259FF]"></div>
                </div>
                <span className="text-xs text-neon font-bold">2/5</span>
            </div>

            <Button onClick={() => onNavigate('dailyTraining')} neon className="py-3 text-sm">
                Үргэлжлүүлэх
            </Button>
        </Card>
      </div>

       {/* Mini Challenge */}
       <div className="bg-gradient-to-r from-zinc-900 to-zinc-900 border border-zinc-800 rounded-2xl p-4 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-white">Mini Challenge</h4>
                <p className="text-xs text-zinc-400">Алгебр: Тэгшитгэл</p>
            </div>
            <button className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors">
                <ChevronRight size={20} className="text-neon" />
            </button>
       </div>

       {/* Quick Actions Grid */}
       <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onNavigate('testSimulation')} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col items-center gap-3 hover:border-neon transition-colors group">
                <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20">
                    <BookCheck className="text-blue-500" size={28} />
                </div>
                <span className="font-semibold text-sm">Тест</span>
            </button>
            <button onClick={() => onNavigate('aiTutor')} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col items-center gap-3 hover:border-neon transition-colors group">
                <div className="p-3 bg-neon/10 rounded-full group-hover:bg-neon/20">
                    <MessageSquare className="text-neon" size={28} />
                </div>
                <span className="font-semibold text-sm">AI Багш</span>
            </button>
            <button onClick={() => onNavigate('progress')} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col items-center gap-3 hover:border-neon transition-colors group">
                <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20">
                    <BarChart2 className="text-green-500" size={28} />
                </div>
                <span className="font-semibold text-sm">Ахиц</span>
            </button>
             <button onClick={() => onNavigate('dailyTraining')} className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex flex-col items-center gap-3 hover:border-neon transition-colors group">
                <div className="p-3 bg-pink-500/10 rounded-full group-hover:bg-pink-500/20">
                    <Zap className="text-pink-500" size={28} />
                </div>
                <span className="font-semibold text-sm">Дасгал</span>
            </button>
       </div>
    </div>
  );
};

export const ProfileScreen: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="p-5 pb-24 space-y-6">
            <div className="flex flex-col items-center pt-8 pb-6">
                <div className="w-28 h-28 bg-zinc-800 rounded-full relative p-1 border-2 border-neon shadow-neon">
                     <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                        alt="Avatar" 
                        className="w-full h-full rounded-full bg-zinc-900"
                    />
                    <div className="absolute bottom-0 right-0 bg-neon text-white text-xs px-2 py-1 rounded-full border border-black font-bold">
                        Lv.{user.level}
                    </div>
                </div>
                <h2 className="text-xl font-bold mt-4">{user.name}</h2>
                <p className="text-zinc-400 text-sm">Хөгжүүлэгч сурагч</p>
                <div className="mt-4">
                    <Button variant="outline" className="px-6 py-2 h-auto text-sm rounded-full">
                        Аватар засах
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card className="flex items-center gap-4">
                    <Trophy className="text-yellow-500" size={32} />
                    <div>
                        <p className="text-xs text-zinc-400">Нийт Оноо</p>
                        <p className="text-lg font-bold">{user.xp.toLocaleString()}</p>
                    </div>
                </Card>
                <Card className="flex items-center gap-4">
                    <Star className="text-purple-400" size={32} />
                    <div>
                        <p className="text-xs text-zinc-400">Зоос</p>
                        <p className="text-lg font-bold">{user.coins}</p>
                    </div>
                </Card>
            </div>

            <Card className="space-y-4">
                <h3 className="font-bold text-white">Тохиргоо</h3>
                <div className="space-y-2">
                    {['Мэдэгдэл', 'Нууц үг солих', 'Хэлний сонголт', 'Гарах'].map((item, idx) => (
                         <div key={idx} className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg cursor-pointer hover:bg-zinc-800">
                            <span className={item === 'Гарах' ? 'text-red-500' : 'text-zinc-300'}>{item}</span>
                            <ChevronRight size={16} className="text-zinc-600" />
                         </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}