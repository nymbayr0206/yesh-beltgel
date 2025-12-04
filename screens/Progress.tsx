import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Header } from '../components/UIComponents';
import { User } from '../types';

interface ProgressProps {
    onBack?: () => void;
    user: User;
}

const dataWeakness = [
  { subject: 'Алгебр', A: 120, fullMark: 150 },
  { subject: 'Геометр', A: 80, fullMark: 150 },
  { subject: 'Магадлал', A: 60, fullMark: 150 },
  { subject: 'Функц', A: 100, fullMark: 150 },
  { subject: 'Тооцоолол', A: 140, fullMark: 150 },
];

const dataWeekly = [
    { day: 'Да', xp: 400 },
    { day: 'Мя', xp: 300 },
    { day: 'Лха', xp: 550 },
    { day: 'Пү', xp: 200 },
    { day: 'Ба', xp: 450 },
    { day: 'Бя', xp: 600 },
    { day: 'Ня', xp: 100 },
];

export const ProgressScreen: React.FC<ProgressProps> = ({ onBack }) => {
    return (
        <div className="pb-24 animate-fade-in bg-black min-h-full">
            <Header title="Миний Ахиц" onBack={onBack} />
            <div className="p-5 space-y-8">
                
                {/* Strength/Weakness Radar */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                    <h3 className="font-bold text-white mb-4 pl-2 border-l-4 border-neon">Эзэмшсэн түвшин</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataWeakness}>
                                <PolarGrid stroke="#333" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="#A259FF"
                                    strokeWidth={2}
                                    fill="#A259FF"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Weekly Progress Bar */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                    <h3 className="font-bold text-white mb-4 pl-2 border-l-4 border-blue-500">Сүүлийн 7 хоногийн ахиц (XP)</h3>
                    <div className="h-48 w-full">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataWeekly}>
                                <XAxis dataKey="day" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                                    cursor={{fill: 'rgba(255, 255, 255, 0.05)'}}
                                />
                                <Bar dataKey="xp" fill="#A259FF" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                        <p className="text-zinc-500 text-xs mb-1">Тестийн дундаж</p>
                        <p className="text-2xl font-bold text-white">780 <span className="text-xs text-zinc-500 font-normal">/ 800</span></p>
                    </div>
                     <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                        <p className="text-zinc-500 text-xs mb-1">Сул талтай сэдэв</p>
                        <p className="text-lg font-bold text-red-400">Магадлал</p>
                    </div>
                </div>
            </div>
        </div>
    );
};