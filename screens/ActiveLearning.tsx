import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Header, Card, Modal } from '../components/UIComponents';
import { ScreenName, Question, ChatMessage } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import { Send, Lightbulb, CheckCircle, XCircle, Clock, PlayCircle, RefreshCw, Upload, Image as ImageIcon, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';

// --- Daily Training ---
export const DailyTraining: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [showHint, setShowHint] = useState(false);

    const checkAnswer = () => {
        if (answer.trim() === '4') { // Mock logic
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }
    };

    return (
        <div className="flex flex-col h-full bg-black pb-20">
            <Header title="Өдрийн Дасгал" onBack={onBack} />
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-400 text-sm">Бодлого 1 / 5</span>
                    <span className="bg-zinc-900 px-3 py-1 rounded-full text-xs font-mono text-neon">XP +50</span>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl mb-8 relative">
                    <h3 className="text-lg font-bold leading-relaxed mb-4">
                        f(x) = x² - 4x + 3 функцийн хамгийн бага утгыг ол.
                    </h3>
                    {showHint && (
                         <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-xl text-sm text-yellow-200 mb-4 animate-fade-in">
                            <span className="font-bold">Hint:</span> Уламжлал авч тэгтэй тэнцүүл.
                         </div>
                    )}
                </div>

                <Input 
                    placeholder="Хариултаа оруулна уу..." 
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={feedback === 'correct'}
                    className="mb-4 text-center text-lg tracking-widest"
                />

                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <Button variant="secondary" onClick={() => setShowHint(true)} disabled={showHint}>
                        <Lightbulb size={18} className={showHint ? "text-yellow-500" : ""} /> Hint авах
                    </Button>
                    <Button neon onClick={checkAnswer} disabled={!answer}>
                        Хариу шалгах
                    </Button>
                </div>

                {feedback === 'correct' && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in">
                        <div className="bg-zinc-900 p-8 rounded-3xl border border-neon text-center shadow-neon">
                             <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                             <h2 className="text-2xl font-bold text-white mb-2">Зөв байна!</h2>
                             <p className="text-zinc-400 mb-6">+50 XP нэмэгдлээ</p>
                             <div className="flex gap-4">
                                <Button onClick={() => { setAnswer(''); setFeedback(null); setShowHint(false); }}>Дараагийн</Button>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- AI Tutor Redesigned ---
export const AITutor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [view, setView] = useState<'landing' | 'chat'>('landing');
    const [input, setInput] = useState('');
    const [showUpload, setShowUpload] = useState(false);
    const [uploadText, setUploadText] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', role: 'model', text: 'Сайн байна уу? Би ЕШ Багш байна. 😊 Бодлого асуух, тайлбар авах, ойлгомжгүй зүйлийг хамтраад шийдье. Танд юугаар туслах вэ?', timestamp: new Date() }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (view === 'chat') scrollToBottom();
    }, [messages, view]);

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
            <div className="flex flex-col h-full bg-black pb-20 relative overflow-hidden">
                <Header title="AI Багш" onBack={onBack} />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10">
                    
                    {/* Glowing Avatar */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-neon rounded-full blur-2xl opacity-40 animate-pulse"></div>
                        <div className="w-32 h-32 bg-zinc-900 rounded-full border-2 border-neon p-1 relative z-10 shadow-neon-strong">
                            <img 
                                src="https://api.dicebear.com/7.x/bottts/svg?seed=YESHTeacher&backgroundColor=transparent" 
                                alt="AI Avatar" 
                                className="w-full h-full rounded-full"
                            />
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold mb-2 text-white">Сайн уу!</h2>
                    <p className="text-zinc-400 mb-10 max-w-xs leading-relaxed">
                        Бодлого асуух, тайлбар авах, ойлгомжгүй зүйлийг хамтраад шийдье.
                    </p>

                    <div className="w-full space-y-4">
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
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl pointer-events-none"></div>
                
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
        <div className="flex flex-col h-full bg-black pb-20">
             <Header title="AI Багш" onBack={() => setView('landing')} />
             
             {/* Messages Area */}
             <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
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

             {/* Input Area */}
             <div className="bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 pb-safe">
                {/* Quick Actions */}
                <div className="flex gap-2 overflow-x-auto p-3 no-scrollbar">
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

                <div className="px-3 pb-3 pt-1 flex gap-2 items-end">
                    <div className="flex-1 relative">
                        <textarea 
                            className="w-full bg-black border border-zinc-700 rounded-2xl pl-4 pr-10 py-3 text-sm focus:border-neon focus:outline-none text-white resize-none max-h-24 min-h-[46px]"
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
                            className="absolute right-2 bottom-2 p-1.5 bg-neon rounded-full text-white disabled:opacity-50 hover:bg-neon-hover transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </div>
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
            <div className="h-full flex flex-col items-center justify-center p-6 text-center pb-24">
                <div className="w-24 h-24 bg-neon/10 rounded-full flex items-center justify-center mb-6 border border-neon/50 shadow-neon">
                    <PlayCircle className="text-neon w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Математик: Бүрэн тест</h2>
                <p className="text-zinc-400 mb-8 max-w-xs">20 асуулт • 20 минут • ЕШ жишиг даалгавар</p>
                <Button neon onClick={() => setStarted(true)}>Тест Эхлэх</Button>
                <Button variant="ghost" className="mt-4" onClick={onBack}>Буцах</Button>
            </div>
        );
    }

    if (finished) {
         return (
            <div className="h-full flex flex-col p-6 pb-24">
                <Header title="Үр дүн" />
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
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
        );
    }

    return (
        <div className="flex flex-col h-full bg-black pb-20">
            <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-2 text-neon">
                    <Clock size={18} />
                    <span className="font-mono font-bold">{formatTime(timer)}</span>
                </div>
                <span className="text-zinc-400 text-sm">Асуулт {currentQ + 1} / 5</span>
            </div>

            <div className="p-5 flex-1">
                 <h3 className="text-lg font-medium leading-relaxed mb-8">
                    {/* Placeholder question */}
                    Гурвалжны хоёр тал 5 ба 8, тэдгээрийн хоорондох өнцөг 60° бол гурав дахь талыг ол.
                </h3>

                <div className="space-y-3">
                    {['A. 7', 'B. 8', 'C. 9', 'D. √49'].map((opt, idx) => (
                        <button key={idx} className="w-full text-left p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-neon hover:bg-zinc-800 transition-all flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-zinc-600 flex items-center justify-center text-sm font-bold text-zinc-400">
                                {opt.split('.')[0]}
                            </div>
                            <span className="text-zinc-200">{opt.split('.')[1]}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-5 flex gap-4">
                 <Button variant="secondary" className="flex-1" onClick={() => setFinished(true)}>Тест дуусгах</Button>
                 <Button neon className="flex-1" onClick={() => currentQ < 4 ? setCurrentQ(c => c+1) : setFinished(true)}>
                    {currentQ === 4 ? 'Дуусгах' : 'Дараагийн'}
                 </Button>
            </div>
        </div>
    );
}