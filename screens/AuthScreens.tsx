import React, { useState } from 'react';
import { Button, Input, Header } from '../components/UIComponents';
import { ScreenName } from '../types';
import { Zap, BookCheck, MessageCircle, Check, AlertCircle } from 'lucide-react';

interface AuthProps {
  onNavigate: (screen: ScreenName) => void;
}

export const Onboarding: React.FC<AuthProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full p-6 justify-between bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center mt-12 space-y-8">
        <div className="w-20 h-20 bg-neon rounded-full flex items-center justify-center shadow-neon">
            <Zap size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-center leading-tight">
          ЕШ Бэлтгэл <br />
          <span className="text-neon">Ирээдүйгээ Бүтээ</span>
        </h1>
        
        <div className="space-y-6 w-full">
            <BenefitItem icon={Zap} text="Өдөр бүр тоглоом шиг давтана" />
            <BenefitItem icon={MessageCircle} text="AI багштай бодлого асууж ойлгоно" />
            <BenefitItem icon={BookCheck} text="ЕШ тестийг ухаалгаар бэлдэнэ" />
        </div>
      </div>

      <div className="relative z-10 w-full mb-8">
        <Button neon onClick={() => onNavigate('auth')}>
          Эхлэх
        </Button>
      </div>
    </div>
  );
};

const BenefitItem: React.FC<{ icon: any, text: string }> = ({ icon: Icon, text }) => (
    <div className="flex items-center gap-4 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800">
        <div className="p-2 bg-neon/20 rounded-lg">
            <Icon className="text-neon" size={24} />
        </div>
        <p className="font-semibold text-sm">{text}</p>
    </div>
);

export const LoginRegister: React.FC<AuthProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
      if (isLogin) {
          onNavigate('home');
      } else {
          // Go to preferences setup if registering
          onNavigate('examPreferences');
      }
  };

  return (
    <div className="flex flex-col h-full p-6 justify-center max-w-sm mx-auto w-full">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2 text-neon">{isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}</h2>
        <p className="text-zinc-500 text-sm">Тавтай морил!</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs text-zinc-400 ml-1">Утасны дугаар</label>
          <Input type="tel" placeholder="8888-8888" />
        </div>
        <div className="space-y-1">
          <label className="text-xs text-zinc-400 ml-1">Нууц үг</label>
          <Input type="password" placeholder="••••••••" />
        </div>
        
        {!isLogin && (
             <div className="space-y-1">
             <label className="text-xs text-zinc-400 ml-1">Нууц үг давтах</label>
             <Input type="password" placeholder="••••••••" />
           </div>
        )}

        <Button neon className="mt-8" onClick={handleAuth}>
          {isLogin ? 'Нэвтрэх' : 'Бүртгэл үүсгэх'}
        </Button>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            {isLogin ? 'Бүртгэлгүй юу?' : 'Бүртгэлтэй юу?'}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-neon font-bold hover:underline"
            >
              {isLogin ? 'Бүртгүүлэх' : 'Нэвтрэх'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export const ExamPreferences: React.FC<AuthProps> = ({ onNavigate }) => {
    const subjects = [
        "Математик", "Монгол хэл", "Англи хэл", "Физик", 
        "Хими", "Биологи", "Нийгэм", "Газар зүй"
    ];
    
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [year, setYear] = useState('2025');
    const [scores, setScores] = useState<Record<string, string>>({});

    const toggleSubject = (subject: string) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(prev => prev.filter(s => s !== subject));
            // Remove score for unselected subject
            const newScores = {...scores};
            delete newScores[subject];
            setScores(newScores);
        } else {
            if (selectedSubjects.length < 2) {
                setSelectedSubjects(prev => [...prev, subject]);
            }
        }
    };

    const isValid = selectedSubjects.length > 0;

    return (
        <div className="flex flex-col h-full bg-black">
            {/* Progress Header */}
            <div className="pt-safe px-6 pb-2 border-b border-zinc-900 bg-black/50 sticky top-0 z-10 backdrop-blur-md">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-neon font-bold uppercase tracking-wider">Алхам 2 / 3</span>
                    <span className="text-xs text-zinc-500">ЕШ Тохиргоо</span>
                 </div>
                 <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-neon w-2/3 shadow-[0_0_10px_#A259FF]"></div>
                 </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
                {/* Title Section */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">ЕШ-ийн мэдээллээ тохируулъя</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Ямар хичээлээр ЕШ өгөх, хэдэн оноо авахыг хүсэж байгаагаа оруулаарай. Бид чамд тохирсон бэлтгэлийг гаргаж өгнө.
                    </p>
                </div>

                {/* Subject Selection */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold text-white block">
                        ЕШ өгөх хоёр хичээлээ сонгоно уу
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {subjects.map(subj => {
                            const isSelected = selectedSubjects.includes(subj);
                            const isDisabled = !isSelected && selectedSubjects.length >= 2;
                            return (
                                <button
                                    key={subj}
                                    onClick={() => toggleSubject(subj)}
                                    disabled={isDisabled}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                                        isSelected 
                                            ? 'bg-neon/20 border-neon text-neon shadow-[0_0_10px_rgba(162,89,255,0.3)]' 
                                            : isDisabled
                                                ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed'
                                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                                    }`}
                                >
                                    {subj} {isSelected && <Check size={14} className="inline ml-1" />}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedSubjects.length === 2 ? (
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <Check size={12} /> 2 хичээл сонгогдлоо
                            </p>
                        ) : (
                            <p className="text-xs text-zinc-500">Зөвхөн 2 хичээл сонгох боломжтой.</p>
                        )}
                        {selectedSubjects.length > 2 && (
                             <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle size={12} /> 2 хичээлээс илүү сонгох боломжгүй.
                            </p>
                        )}
                    </div>
                </div>

                {/* Score Goals */}
                <div className="space-y-4">
                     <label className="text-sm font-semibold text-white block">
                        Зорилтот оноо
                    </label>
                    
                    <div className="space-y-1">
                        <label className="text-xs text-zinc-400">Нийт хэдэн оноо авахыг хүсэж байна вэ?</label>
                        <Input type="number" placeholder="Жишээ нь: 1400" />
                        <p className="text-[10px] text-zinc-500">Энэ нь чамд зорилгоо тодорхой болгоход тусална.</p>
                    </div>

                    {/* Dynamic Inputs for Selected Subjects */}
                    {selectedSubjects.length > 0 && (
                        <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 space-y-4 animate-fade-in">
                            <h4 className="text-xs font-bold text-neon uppercase tracking-wide mb-2">Хичээл тус бүрээр</h4>
                            {selectedSubjects.map(subj => (
                                <div key={subj} className="space-y-1">
                                    <label className="text-xs text-zinc-300">{subj} – зорилтот оноо</label>
                                    <Input 
                                        type="number" 
                                        placeholder="Жишээ нь: 700" 
                                        className="h-10 text-sm"
                                        value={scores[subj] || ''}
                                        onChange={(e) => setScores({...scores, [subj]: e.target.value})}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                 {/* Exam Year */}
                 <div className="space-y-3">
                    <label className="text-sm font-semibold text-white block">
                        ЕШ өгөх он
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {['2025', '2026', '2027'].map(y => (
                            <button 
                                key={y}
                                onClick={() => setYear(y)}
                                className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                                    year === y 
                                    ? 'bg-zinc-800 border-neon text-white' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'
                                }`}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-zinc-500">Бид чамд үлдсэн хугацаанд тохирсон хуваарь санал болгоно.</p>
                 </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 w-full max-w-md p-6 bg-black border-t border-zinc-900 space-y-3 pb-safe">
                <Button 
                    neon 
                    disabled={!isValid} 
                    onClick={() => onNavigate('home')}
                >
                    Үргэлжлүүлэх
                </Button>
                <button 
                    onClick={() => onNavigate('home')}
                    className="w-full text-center text-xs text-zinc-500 hover:text-white transition-colors py-2"
                >
                    Алгасах <span className="block text-[10px] mt-0.5 opacity-60">Дараа нь тохируулж болно.</span>
                </button>
            </div>
        </div>
    );
};