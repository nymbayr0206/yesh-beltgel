import React, { useState } from 'react';
import { Button, Input, Header } from '../components/UIComponents';
import { ScreenName, ExamSettings } from '../types';
import { Zap, BookCheck, MessageCircle, Check, AlertCircle } from 'lucide-react';

interface AuthProps {
  onNavigate: (screen: ScreenName) => void;
  onSave?: (settings: ExamSettings) => void;
}

export const Onboarding: React.FC<AuthProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
       {/* Left/Top: Hero Image & Overlay */}
       <div className="flex-1 relative bg-[url('https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center min-h-[50vh] md:min-h-full">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-0"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-24 h-24 bg-neon rounded-full flex items-center justify-center shadow-neon mb-8 animate-bounce-slow">
                    <Zap size={48} className="text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                ЕШ Бэлтгэл <br />
                <span className="text-neon">Ирээдүйгээ Бүтээ</span>
                </h1>
                <p className="text-zinc-400 max-w-md text-lg">
                    Монголын анхны AI багштай, тоглоом шиг сонирхолтой ЕШ бэлтгэлийн апп.
                </p>
            </div>
       </div>

       {/* Right/Bottom: Features & Action */}
       <div className="flex-1 bg-black flex flex-col justify-center p-8 md:p-16">
            <div className="max-w-md mx-auto w-full space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6 md:hidden">Үндсэн боломжууд</h2>
                <div className="space-y-4">
                    <BenefitItem icon={Zap} text="Өдөр бүр тоглоом шиг давтана" description="Уйтгартай давталт биш, сонирхолтой квестүүд" />
                    <BenefitItem icon={MessageCircle} text="AI багштай бодлого асууж ойлгоно" description="24/7 хэзээ ч хамаагүй асуулт асуух боломж" />
                    <BenefitItem icon={BookCheck} text="ЕШ тестийг ухаалгаар бэлдэнэ" description="Өөрийн түвшинд тохирсон тестүүд" />
                </div>
                
                <div className="pt-8">
                    <Button neon onClick={() => onNavigate('auth')} className="h-14 text-lg">
                        Эхлэх
                    </Button>
                </div>
            </div>
       </div>
    </div>
  );
};

const BenefitItem: React.FC<{ icon: any, text: string, description?: string }> = ({ icon: Icon, text, description }) => (
    <div className="flex items-start gap-4 bg-zinc-900/60 p-5 rounded-2xl border border-zinc-800 hover:border-neon/50 transition-colors">
        <div className="p-3 bg-neon/20 rounded-xl shrink-0">
            <Icon className="text-neon" size={24} />
        </div>
        <div>
            <p className="font-bold text-base text-white">{text}</p>
            {description && <p className="text-sm text-zinc-500 mt-1">{description}</p>}
        </div>
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
    <div className="flex h-full w-full bg-black">
      {/* Visual Side (Desktop) */}
      <div className="hidden md:flex flex-1 bg-zinc-900 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10 p-12 max-w-lg">
                <h2 className="text-4xl font-bold text-white mb-6">Амжилтанд хүрэх зам <span className="text-neon">эндээс</span> эхэлнэ.</h2>
                <div className="grid grid-cols-2 gap-4">
                     <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                         <h3 className="text-2xl font-bold text-neon mb-1">10k+</h3>
                         <p className="text-zinc-500 text-sm">Сурагчид</p>
                     </div>
                     <div className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                         <h3 className="text-2xl font-bold text-neon mb-1">500k+</h3>
                         <p className="text-zinc-500 text-sm">Бодсон бодлого</p>
                     </div>
                </div>
          </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-sm space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold mb-2 text-white">{isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}</h2>
                <p className="text-zinc-500">
                    {isLogin ? 'ЕШ Бэлтгэлд тавтай морил' : 'Шинээр бүртгэл үүсгэн аяллаа эхлүүлээрэй'}
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-1">
                <label className="text-xs text-zinc-400 ml-1">Утасны дугаар</label>
                <Input type="tel" placeholder="8888-8888" className="h-12" />
                </div>
                <div className="space-y-1">
                <label className="text-xs text-zinc-400 ml-1">Нууц үг</label>
                <Input type="password" placeholder="••••••••" className="h-12" />
                </div>
                
                {!isLogin && (
                    <div className="space-y-1">
                    <label className="text-xs text-zinc-400 ml-1">Нууц үг давтах</label>
                    <Input type="password" placeholder="••••••••" className="h-12" />
                </div>
                )}

                <Button neon className="mt-8 h-12 text-lg" onClick={handleAuth}>
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
      </div>
    </div>
  );
};

export const ExamPreferences: React.FC<AuthProps> = ({ onNavigate, onSave }) => {
    const subjects = [
        "Математик", "Монгол хэл", "Англи хэл", "Физик", 
        "Хими", "Биологи", "Нийгэм", "Газар зүй"
    ];
    
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [year, setYear] = useState('2025');
    const [targetScore, setTargetScore] = useState('');
    const [scores, setScores] = useState<Record<string, string>>({});

    const toggleSubject = (subject: string) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(prev => prev.filter(s => s !== subject));
            const newScores = {...scores};
            delete newScores[subject];
            setScores(newScores);
        } else {
            if (selectedSubjects.length < 2) {
                setSelectedSubjects(prev => [...prev, subject]);
            }
        }
    };

    const handleContinue = () => {
        if (onSave) {
            onSave({
                subjects: selectedSubjects,
                year,
                targetScore,
                subjectScores: scores
            });
        } else {
            onNavigate('home');
        }
    };

    const isValid = selectedSubjects.length > 0;

    return (
        <div className="flex h-full w-full bg-black">
             {/* Progress Sidebar (Desktop) */}
             <div className="hidden md:block w-1/4 bg-zinc-900 border-r border-zinc-800 p-8">
                 <div className="sticky top-8">
                    <div className="mb-8">
                        <span className="text-xs text-neon font-bold uppercase tracking-wider block mb-2">Алхам 2 / 3</span>
                        <h2 className="text-2xl font-bold text-white">ЕШ Тохиргоо</h2>
                        <p className="text-zinc-500 mt-2 text-sm">Эдгээр мэдээлэл дээр үндэслэн таны хиймэл оюун ухаант багш сургалтын төлөвлөгөөг гаргах болно.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className={`p-4 rounded-xl border transition-colors ${selectedSubjects.length === 2 ? 'bg-green-500/10 border-green-500/30' : 'bg-zinc-800 border-zinc-700'}`}>
                             <div className="flex items-center gap-3">
                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${selectedSubjects.length === 2 ? 'bg-green-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>1</div>
                                 <span className="font-medium text-sm">Хичээл сонгох</span>
                             </div>
                        </div>
                        <div className={`p-4 rounded-xl border transition-colors ${targetScore ? 'bg-green-500/10 border-green-500/30' : 'bg-zinc-800 border-zinc-700'}`}>
                             <div className="flex items-center gap-3">
                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${targetScore ? 'bg-green-500 text-black' : 'bg-zinc-700 text-zinc-400'}`}>2</div>
                                 <span className="font-medium text-sm">Зорилго тодорхойлох</span>
                             </div>
                        </div>
                    </div>
                 </div>
             </div>

            <div className="flex-1 flex flex-col h-full bg-black">
                {/* Mobile Progress Header */}
                <div className="md:hidden pt-safe px-6 pb-4 border-b border-zinc-900 bg-black/50 sticky top-0 z-10 backdrop-blur-md">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-neon font-bold uppercase tracking-wider">Алхам 2 / 3</span>
                        <span className="text-xs text-zinc-500">ЕШ Тохиргоо</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-neon w-2/3 shadow-[0_0_10px_#A259FF]"></div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-2xl mx-auto p-6 md:p-12 space-y-10 pb-32">
                        {/* Title Section */}
                        <div className="md:hidden">
                            <h2 className="text-2xl font-bold text-white mb-2">ЕШ-ийн мэдээллээ тохируулъя</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Ямар хичээлээр ЕШ өгөх, хэдэн оноо авахыг хүсэж байгаагаа оруулаарай.
                            </p>
                        </div>

                        {/* Subject Selection */}
                        <div className="space-y-4">
                            <label className="text-base md:text-lg font-bold text-white block">
                                1. ЕШ өгөх хоёр хичээлээ сонгоно уу
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {subjects.map(subj => {
                                    const isSelected = selectedSubjects.includes(subj);
                                    const isDisabled = !isSelected && selectedSubjects.length >= 2;
                                    return (
                                        <button
                                            key={subj}
                                            onClick={() => toggleSubject(subj)}
                                            disabled={isDisabled}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border flex items-center justify-center gap-2 ${
                                                isSelected 
                                                    ? 'bg-neon/20 border-neon text-neon shadow-[0_0_10px_rgba(162,89,255,0.3)]' 
                                                    : isDisabled
                                                        ? 'bg-zinc-900/50 border-zinc-800 text-zinc-600 cursor-not-allowed'
                                                        : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800'
                                            }`}
                                        >
                                            {subj} {isSelected && <Check size={14} />}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex items-center gap-2 min-h-[20px]">
                                {selectedSubjects.length === 2 ? (
                                    <p className="text-xs text-green-500 flex items-center gap-1 animate-fade-in">
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
                        <div className="space-y-6">
                            <label className="text-base md:text-lg font-bold text-white block">
                                2. Зорилтот оноо
                            </label>
                            
                            <div className="space-y-2">
                                <label className="text-sm text-zinc-400">Нийт хэдэн оноо авахыг хүсэж байна вэ?</label>
                                <Input 
                                    type="number" 
                                    placeholder="Жишээ нь: 1400" 
                                    value={targetScore}
                                    onChange={(e) => setTargetScore(e.target.value)}
                                    className="max-w-xs"
                                />
                                <p className="text-xs text-zinc-500">Энэ нь чамд зорилгоо тодорхой болгоход тусална.</p>
                            </div>

                            {/* Dynamic Inputs for Selected Subjects */}
                            {selectedSubjects.length > 0 && (
                                <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 space-y-4 animate-fade-in">
                                    <h4 className="text-xs font-bold text-neon uppercase tracking-wide mb-2">Хичээл тус бүрээр</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {selectedSubjects.map(subj => (
                                            <div key={subj} className="space-y-2">
                                                <label className="text-xs text-zinc-300 block">{subj} – зорилтот оноо</label>
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
                                </div>
                            )}
                        </div>

                        {/* Exam Year */}
                        <div className="space-y-4">
                            <label className="text-base md:text-lg font-bold text-white block">
                                3. ЕШ өгөх он
                            </label>
                            <div className="grid grid-cols-3 gap-3 max-w-sm">
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
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="sticky bottom-0 w-full p-6 bg-black/95 border-t border-zinc-900 md:border-none backdrop-blur">
                    <div className="max-w-md mx-auto md:ml-0 md:max-w-xs flex flex-col gap-3">
                        <Button 
                            neon 
                            disabled={!isValid} 
                            onClick={handleContinue}
                        >
                            Үргэлжлүүлэх
                        </Button>
                        <button 
                            onClick={() => onNavigate('home')}
                            className="w-full text-center text-xs text-zinc-500 hover:text-white transition-colors py-2"
                        >
                            Алгасах <span className="text-[10px] opacity-60 ml-2">Дараа нь тохируулж болно.</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};