import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Header, Card, Modal } from '../components/UIComponents';
import { ScreenName, Question, ChatMessage, ExamSettings, DailyQuest, Mission, User } from '../types';
import { sendMessageToAI, initializeChatWithContext, generateDailyQuest } from '../services/geminiService';
import { Send, Lightbulb, CheckCircle, XCircle, Clock, PlayCircle, RefreshCw, Upload, Image as ImageIcon, MessageSquare, ChevronRight, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

// --- Daily Training ---
export const DailyTraining: React.FC<{ onBack: () => void; user: User }> = ({ onBack, user }) => {
    const [quest, setQuest] = useState<DailyQuest | null>(null);
    const [currentMissionIndex, setCurrentMissionIndex] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const loadQuest = async () => {
            setLoading(true);
            const generatedQuest = await generateDailyQuest(user);
            if (generatedQuest) {
                setQuest(generatedQuest);
            }
            setLoading(false);
        };
        loadQuest();
    }, [user]);

    const currentMission = quest?.missions[currentMissionIndex];

    const checkAnswer = () => {
        if (!currentMission) return;

        // Simple normalization for comparison
        const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '');
        const isCorrect = normalize(answer) === normalize(currentMission.correct_answer) || 
                          (currentMission.problem_type === 'multiple_choice' && answer === currentMission.correct_answer);

        if (isCorrect) {
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }
    };

    const nextMission = () => {
        if (!quest) return;
        if (currentMissionIndex < quest.missions.length - 1) {
            setCurrentMissionIndex(prev => prev + 1);
            setAnswer('');
            setFeedback(null);
            setShowHint(false);
        } else {
            setCompleted(true);
        }
    };

    const handleRetry = () => {
        setFeedback(null);
        setAnswer('');
    };

    if (loading) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-black p-8 text-center">
                <div className="w-16 h-16 border-4 border-neon border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-bold text-white mb-2">Квест бэлдэж байна...</h2>
                <p className="text-zinc-500">AI багш танд зориулсан дасгалуудыг боловсруулж байна.</p>
            </div>
        );
    }

    if (completed && quest) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-black p-8 text-center animate-fade-in relative overflow-hidden">
                <div className="absolute inset-0 bg-neon/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
                <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500 w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Баяр хүргэе!</h2>
                    <p className="text-zinc-400 mb-6">{quest.streak_hint}</p>
                    
                    <div className="bg-black/50 p-4 rounded-xl border border-zinc-800 mb-8 flex justify-between items-center">
                        <span className="text-zinc-400">Нийт XP</span>
                        <span className="text-xl font-bold text-neon">+{quest.xp_reward_total} XP</span>
                    </div>

                    <Button neon onClick={onBack}>Нүүр хуудас руу</Button>
                </div>
            </div>
        );
    }

    if (!quest || !currentMission) {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-black p-8 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="text-red-500 w-8 h-8" />
                </div>
                <p className="text-zinc-400">Уучлаарай, квест ачаалахад алдаа гарлаа. Дахин оролдоно уу.</p>
                <Button variant="secondary" onClick={onBack} className="mt-4">Буцах</Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-black md:bg-zinc-950 pb-20 md:pb-0 relative">
            <div className="md:hidden">
                <Header title={quest.title} onBack={onBack} />
            </div>
            
            <div className="flex-1 flex flex-col justify-center items-center p-5 md:p-8">
                <div className="w-full max-w-2xl bg-black md:bg-dark-card md:border md:border-zinc-800 rounded-3xl md:p-8 md:shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-zinc-400 text-sm font-medium">Даалгавар {currentMissionIndex + 1} / {quest.missions.length}</span>
                        <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs font-mono text-neon flex items-center gap-1">
                            <Sparkles size={12} /> XP +{currentMission.xp_reward}
                        </span>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl mb-8 relative">
                         {/* Difficulty Badge */}
                         <div className={`absolute top-4 right-4 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            currentMission.difficulty === 'easy' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                            currentMission.difficulty === 'medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                            'border-red-500/30 text-red-400 bg-red-500/10'
                        }`}>
                            {currentMission.difficulty === 'easy' ? 'Хялбар' : 
                             currentMission.difficulty === 'medium' ? 'Дундаж' : 'Хүнд'}
                        </div>

                        <h3 className="text-lg md:text-2xl font-bold leading-relaxed mb-4 text-white pr-8">
                            {currentMission.problem_statement}
                        </h3>
                        
                        {showHint && (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl text-sm text-yellow-200 mb-4 animate-fade-in flex gap-3">
                                <Lightbulb size={20} className="shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-bold block mb-1">Зөвлөгөө:</span> 
                                    {currentMission.hints[0]}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Answer Section */}
                    <div className="mb-8">
                        {currentMission.problem_type === 'multiple_choice' && currentMission.choices ? (
                            <div className="grid grid-cols-1 gap-3">
                                {currentMission.choices.map((choice, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setAnswer(choice)}
                                        disabled={feedback === 'correct'}
                                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3 ${
                                            answer === choice 
                                                ? 'bg-neon/20 border-neon text-white' 
                                                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                                        }`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                                            answer === choice ? 'border-neon bg-neon text-white' : 'border-zinc-600 text-zinc-500'
                                        }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <Input 
                                placeholder="Хариултаа оруулна уу..." 
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                disabled={feedback === 'correct'}
                                className="text-center text-xl tracking-widest h-14"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="secondary" onClick={() => setShowHint(true)} disabled={showHint || feedback === 'correct'}>
                            <Lightbulb size={18} className={showHint ? "text-yellow-500" : ""} /> Hint
                        </Button>
                        <Button neon onClick={checkAnswer} disabled={!answer || feedback === 'correct'}>
                            Шалгах
                        </Button>
                    </div>
                </div>
            </div>

            {feedback && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in p-4">
                    <div className={`bg-zinc-900 p-6 md:p-8 rounded-3xl border text-center shadow-2xl max-w-sm w-full relative overflow-hidden ${feedback === 'correct' ? 'border-neon' : 'border-red-500'}`}>
                            {feedback === 'correct' ? (
                                <>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-neon"></div>
                                    <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-white mb-2">Зөв байна!</h2>
                                    <p className="text-zinc-400 mb-6">{currentMission.explanation}</p>
                                    <Button onClick={nextMission}>
                                        {currentMissionIndex < quest.missions.length - 1 ? 'Дараагийн' : 'Дуусгах'} <ArrowRight size={18} />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                                    <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-white mb-2">Буруу байна</h2>
                                    <p className="text-zinc-400 mb-6">Дахин нэг оролдоод үзээрэй.</p>
                                    <Button variant="secondary" onClick={handleRetry}>
                                        <RotateCcw size={18} /> Дахин оролдох
                                    </Button>
                                </>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- AI Tutor Redesigned ---
export const AITutor: React.FC<{ onBack: () => void; examSettings: ExamSettings | null }> = ({ onBack, examSettings }) => {
    const [view, setView] = useState<'landing' | 'chat'>('landing');
    const [input, setInput] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [uploadText, setUploadText] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'model', text: 'Сайн байна уу? Би ЕШ Багш байна. 😊 Бодлого асуух, тайлбар авах, ойлгомжгүй зүйлийг хамтраад шийдье. Танд юугаар туслах вэ?', timestamp: new Date() }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const hasInitialized = useRef(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (view === 'chat') scrollToBottom();
    }, [messages, view]);

    useEffect(() => {
        if (examSettings && !hasInitialized.current) {
            hasInitialized.current = true;
            initializeChatWithContext(examSettings).then(() => {
                setMessages([{ id: 'init', role: 'model', text: `Сайн байна уу? Таны сонгосон ${examSettings.subjects.join(', ')} хичээлүүдэд туслахад бэлэн байна!`, timestamp: new Date() }]);
            });
        }
    }, [examSettings]);

    const handleSend = async (textToSend: string = input) => {
        if (!textToSend.trim() || loading) return;
        
        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: textToSend, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const responseText = await sendMessageToAI(userMsg.text);
            const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() };
            setMessages(prev => [...prev, aiMsg]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickAction = (action: string) => {
        handleSend(action);
    };

    const handleUploadSubmit = () => {
        if (uploadText) {
            setView('chat');
            handleSend(uploadText);
            setUploadText('');
            setShowUpload(false);
        }
    };

    // --- View: Landing ---
    if (view === 'landing') {
        return (
            <div className="flex flex-col h-full bg-black pb-20 md:pb-0 relative overflow-hidden">
                <div className="md:hidden">
                    <Header title="AI Багш" onBack={onBack} />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 w-full max-w-2xl mx-auto">
                    
                    {/* Glowing Avatar */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-neon rounded-full blur-3xl opacity-30 animate-pulse"></div>
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-zinc-900 rounded-full border-2 border-neon p-1 relative z-10 shadow-neon-strong">
                            <img 
                                src="https://api.dicebear.com/7.x/bottts/svg?seed=YESHTeacher&backgroundColor=transparent" 
                                alt="AI Avatar" 
                                className="w-full h-full rounded-full"
                            />
                        </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Сайн уу!</h2>
                    <p className="text-zinc-400 mb-10 text-lg max-w-md leading-relaxed">
                        Бодлого асуух, тайлбар авах, ойлгомжгүй зүйлийг хамтраад шийдье.
                    </p>

                    <div className="w-full max-w-sm space-y-4">
                        <Button neon onClick={() => setShowUpload(true)} className="group">
                            <Upload size={20} className="group-hover:scale-110 transition-transform" />
                            Бодлого оруулах
                        </Button>
                        <Button variant="secondary" onClick={() => setView('chat')}>
                            <MessageSquare size={20} />
                            Өмнөх яриаг үзэх
                        </Button>
                        <Button variant="ghost" className="text-sm text-zinc-500">
                            Сэдэв сонгох <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                {/* Upload Modal */}
                <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Бодлого оруулах">
                    <div className="space-y-4">
                        <textarea 
                            className="w-full h-32 bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-neon placeholder-zinc-600 resize-none"
                            placeholder="Бодлогын текстээ энд бичээрэй..."
                            value={uploadText}
                            onChange={(e) => setUploadText(e.target.value)}
                        />
                        <div className="flex gap-2">
                             <Button variant="secondary" className="flex-1" onClick={() => alert("Зураг оруулах функц удахгүй нэмэгдэнэ!")}>
                                <ImageIcon size={20} />
                             </Button>
                             <Button neon className="flex-[3]" onClick={handleUploadSubmit}>
                                Шалгах
                             </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

    // --- View: Chat ---
    return (
        <div className="flex flex-col h-full bg-black pb-20 md:pb-0">
             <div className="md:hidden">
                <Header title="AI Багш" onBack={() => setView('landing')} />
             </div>
             
             {/* Desktop Header */}
             <div className="hidden md:flex items-center justify-between p-4 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur">
                <div className="flex items-center gap-3">
                    <button onClick={() => setView('landing')} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                        <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <span className="font-bold text-lg">AI Багш</span>
                </div>
                <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    Gemini 2.5 Flash
                </div>
             </div>
             
             {/* Messages Area */}
             <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="max-w-3xl mx-auto w-full space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm md:text-base leading-relaxed shadow-lg ${
                                msg.role === 'user' 
                                ? 'bg-zinc-800 text-white rounded-br-none border border-zinc-700' 
                                : 'bg-neon/5 text-zinc-100 rounded-bl-none border border-neon/50 shadow-[0_0_10px_rgba(162,89,255,0.1)]'
                            }`}>
                                {msg.role === 'model' && (
                                    <div className="text-neon text-[10px] font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
                                        <Sparkles size={10} /> AI Багш
                                    </div>
                                )}
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-zinc-600 mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-neon/5 border border-neon/30 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center">
                                <div className="w-2 h-2 bg-neon rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-neon rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-neon rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
             </div>

             {/* Input Area */}
             <div className="bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 pb-safe md:p-4">
                <div className="max-w-3xl mx-auto w-full">
                    {/* Quick Actions */}
                    <div className="flex gap-2 overflow-x-auto p-3 md:px-0 no-scrollbar mb-2">
                        {['Hint авах', 'Алхам харах', 'Давхар тайлбар', 'Дасгал санал болгох', 'Ойлгосон'].map(action => (
                            <button 
                                key={action}
                                onClick={() => handleQuickAction(action)}
                                disabled={loading}
                                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 hover:border-neon hover:text-white transition-colors flex-shrink-0"
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    <div className="px-3 pb-3 pt-1 md:p-0 flex gap-2 items-end">
                        <div className="flex-1 relative">
                            <textarea 
                                className="w-full bg-black border border-zinc-700 rounded-2xl pl-4 pr-12 py-3 md:py-4 text-sm md:text-base focus:border-neon focus:outline-none text-white resize-none max-h-32 min-h-[50px] shadow-lg"
                                placeholder="Би энэ бодлогыг ойлгохгүй байна..."
                                rows={1}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                            <button 
                                onClick={() => handleSend()}
                                disabled={loading || !input.trim()}
                                className="absolute right-2 bottom-2 md:bottom-3 p-2 bg-neon rounded-full text-white disabled:opacity-50 hover:bg-neon-hover transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="hidden md:block text-[10px] text-zinc-600 text-center mt-2">
                        AI алдаа гаргаж болзошгүй тул хариуг шалгана уу.
                    </p>
                </div>
             </div>
        </div>
    );
};

// --- Test Simulation ---
export const TestSimulation: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const [timer, setTimer] = useState(1200); // 20 mins

    useEffect(() => {
        if (started && !finished && timer > 0) {
            const interval = setInterval(() => setTimer(t => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [started, finished, timer]);

    const formatTime = (secs: number) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (!started) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center pb-24 md:pb-0">
                <div className="w-full max-w-lg bg-black md:bg-dark-card md:border md:border-zinc-800 rounded-3xl p-8 md:shadow-2xl">
                    <div className="w-24 h-24 bg-neon/10 rounded-full flex items-center justify-center mb-6 border border-neon/50 shadow-neon mx-auto">
                        <PlayCircle className="text-neon w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Математик: Бүрэн тест</h2>
                    <p className="text-zinc-400 mb-8">20 асуулт • 20 минут • ЕШ жишиг даалгавар</p>
                    <div className="space-y-3">
                        <Button neon onClick={() => setStarted(true)}>Тест Эхлэх</Button>
                        <Button variant="ghost" className="mt-4" onClick={onBack}>Буцах</Button>
                    </div>
                </div>
            </div>
        );
    }

    if (finished) {
         return (
            <div className="h-full flex flex-col p-6 pb-24 md:pb-0 justify-center items-center">
                <div className="w-full max-w-xl bg-black md:bg-dark-card md:border md:border-zinc-800 rounded-3xl p-6 md:p-8 md:shadow-2xl">
                    <div className="md:hidden mb-4">
                        <Header title="Үр дүн" />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-8 hidden md:block">Үр дүн</h2>
                    
                    <div className="flex flex-col items-center justify-center text-center space-y-6">
                        <div className="relative">
                            <svg className="w-40 h-40 transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#333" strokeWidth="10" fill="transparent" />
                                <circle cx="80" cy="80" r="70" stroke="#A259FF" strokeWidth="10" fill="transparent" strokeDasharray="440" strokeDashoffset="110" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white">75%</span>
                                <span className="text-xs text-zinc-400">Оноо</span>
                            </div>
                        </div>
                        
                        <div className="w-full grid grid-cols-2 gap-4">
                            <Card className="bg-red-500/10 border-red-500/30">
                                <p className="text-xs text-red-300">Сул тал</p>
                                <p className="font-bold">Геометр</p>
                            </Card>
                            <Card className="bg-green-500/10 border-green-500/30">
                                <p className="text-xs text-green-300">Сайн сэдэв</p>
                                <p className="font-bold">Алгебр</p>
                            </Card>
                        </div>

                        <div className="w-full space-y-3 mt-8">
                            <Button neon onClick={() => { setFinished(false); setStarted(false); }}>Дахин турших</Button>
                            <Button variant="secondary" onClick={onBack}>Дуусгах</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-black md:bg-zinc-950 pb-20 md:pb-0">
            <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur sticky top-0 z-10">
                <div className="flex items-center gap-2 text-neon">
                    <Clock size={18} />
                    <span className="font-mono font-bold">{formatTime(timer)}</span>
                </div>
                <span className="text-zinc-400 text-sm">Асуулт {currentQ + 1} / 5</span>
            </div>

            <div className="p-5 flex-1 flex flex-col items-center">
                <div className="w-full max-w-3xl">
                    <div className="bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-2xl mb-6 mt-4">
                        <h3 className="text-lg md:text-xl font-medium leading-relaxed">
                            {/* Placeholder question */}
                            Гурвалжны хоёр тал 5 ба 8, тэдгээрийн хоорондох өнцөг 60° бол гурав дахь талыг ол.
                        </h3>
                    </div>

                    <div className="space-y-3">
                        {['A. 7', 'B. 8', 'C. 9', 'D. √49'].map((opt, idx) => (
                            <button key={idx} className="w-full text-left p-4 md:p-5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-neon hover:bg-zinc-800 transition-all flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-full border border-zinc-600 group-hover:border-neon flex items-center justify-center text-sm font-bold text-zinc-400 group-hover:text-neon transition-colors">
                                    {opt.split('.')[0]}
                                </div>
                                <span className="text-zinc-200 group-hover:text-white text-base">{opt.split('.')[1]}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-5 border-t border-zinc-900 bg-black/80 backdrop-blur-sm sticky bottom-0 md:static">
                 <div className="max-w-3xl mx-auto flex gap-4">
                    <Button variant="secondary" className="flex-1" onClick={() => setFinished(true)}>Тест дуусгах</Button>
                    <Button neon className="flex-1" onClick={() => currentQ < 4 ? setCurrentQ(c => c+1) : setFinished(true)}>
                        {currentQ === 4 ? 'Дуусгах' : 'Дараагийн'}
                    </Button>
                 </div>
            </div>
        </div>
    );
}