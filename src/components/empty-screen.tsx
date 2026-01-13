'use client';

import { Bot, Dumbbell, Zap, Flame, User } from 'lucide-react';
import { ScoopLogo } from './scoop-logo';

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
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <ScoopLogo className="w-10 h-10" />
                    <h1 className="text-3xl font-bold text-primary">Scoop AI ასისტენტი</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    რა არის შენი მიზანი?
                </p>
            </div>

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
