import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/themeToggle";
import { Send } from "lucide-react";

export default function Header(){
    return(
        <header className="grid grid-cols-[1fr_minmax(0,48rem)_1fr]">
            <div className={cn("flex justify-between items-center col-start-2",
                "h-14 p-2 "
            )}>
                <div className="flex items-center gap-2">
                    <svg width="35" height="35" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="120" height="120" rx="24" fill="#ECFDF5"/>

                        <path
                            d="M40 80 L80 40"
                            stroke="#10B981"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />

                        <path
                            d="M50 90 L90 50"
                            stroke="#34D399"
                            strokeWidth="6"
                            strokeLinecap="round"
                        />

                        <circle cx="78" cy="42" r="4" fill="#065F46"/>
                    </svg>
                    <span className="text-neutral-700 text-2xl font-bold">Sharpner</span>
                </div>
                <div className="flex items-center gap-2">
                    <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" color='#000000'strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </a>
                    <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" color="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                </div>
            </div>
        </header>
    )
}