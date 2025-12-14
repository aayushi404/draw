import { Button } from "./ui/button";
import { ModeToggle } from "./ui/themeToggle";

export default function Navbar(){
    return(
    <header className="flex items-center justify-between px-6 py-3 md:py-4 shadow max-w-3xl rounded-xl h-13 mx-auto w-full bg-neutral-500 dark:bg-gray-900">
        
        <nav id="menu" className="max-md:absolute max-md:top-0 max-md:left-0 max-md:overflow-hidden items-center justify-center max-md:h-full max-md:w-0 transition-[width] bg-neutral-500 backdrop-blur flex-col md:flex-row flex gap-8 text-gray-950 dark:text-gray-300 text-sm dark:bg-gray-900">
            <a className="hover:text-neutral-400" href="/">
                Home
            </a>
            <a className="hover:text-neutral-400" href="/workspace">
                Collaborate
            </a>
            <a className="hover:text-neutral-400" href="#">
                Contact
            </a>
            
        </nav>
        <div className="flex items-center space-x-4">
            <ModeToggle />
            
            <Button>Signin</Button>
        </div>
    </header>
    )
}
