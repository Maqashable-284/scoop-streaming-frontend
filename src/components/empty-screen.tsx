'use client';

import { Bot, Dumbbell, Zap, Flame, User } from 'lucide-react';

interface EmptyScreenProps {
    setInput: (text: string) => void;
}

const categories = [
    {
        id: 1,
        title: 'კუნთის მასის ზრდა',
        description: 'მირჩიე პროტეინი და კრეატინი',
        icon: Dumbbell,
        color: '#D9B444', // Metallic Gold
        message: 'მინდა კუნთის მასის მომატება. რომელი პროტეინი და კრეატინი მირჩევ?',
    },
    {
        id: 2,
        title: 'წონის კლება',
        description: 'მირჩიე ცხიმისმწველი',
        icon: Flame,
        color: '#CC3348', // Brick Red
        message: 'მინდა წონის დაკლება. რომელი ცხიმისმწველი და L-კარნიტინი მირჩევ?',
    },
    {
        id: 3,
        title: 'ენერგია და ძალა',
        description: 'მირჩიე კრეატინი და Pre-workout',
        icon: Zap,
        color: '#0A7364', // Pine Green
        message: 'მინდა ენერგიის და ძალის გაზრდა. რომელი კრეატინი და Pre-workout მირჩევ?',
    },
    {
        id: 4,
        title: 'დამწყები ვარ',
        description: 'ვარჯიშს ვიწყებ და რჩევა მჭირდება',
        icon: User,
        color: '#8B5CF6', // Purple
        message: 'დამწყები ვარ, ახლა ვიწყებ ვარჯიშს. რა დანამატები მჭირდება დასაწყებად?',
    },
];

export function EmptyScreen({ setInput }: EmptyScreenProps) {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            {/* Bot greeting */}
            <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-xl border border-[#E5E7EB] flex items-center justify-center bg-card">
                    <Bot className="w-7 h-7 text-foreground" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    რა არის შენი მიზანი?
                </h1>
            </div>

            {/* Category cards - Clean lab style with precise borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setInput(category.message)}
                        className="group flex items-start gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-card hover:border-[#0A7364] hover:bg-[#0A7364]/5 hover:shadow-md transition-all duration-200 text-left cursor-pointer active:scale-95"
                    >
                        <div
                            className="p-2 rounded-xl transition-colors"
                            style={{ backgroundColor: `${category.color}15` }}
                        >
                            <category.icon
                                className="w-5 h-5 flex-shrink-0"
                                style={{ color: category.color }}
                                strokeWidth={1.5}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="font-semibold text-foreground text-lg mb-1 group-hover:text-[#0A7364] transition-colors">
                                {category.title}
                            </h2>
                            <p className="text-muted-foreground text-sm">{category.description}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EmptyScreen;
