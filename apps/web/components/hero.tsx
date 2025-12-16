import { Button } from "./ui/button";

export default function Hero(){
    return(
        <main className="relative w-screen h-[90vh]">
            <div
                className="
                absolute
                top-1/4 sm:top-1/3
                left-1/2 -translate-x-1/2
                max-w-xl
                px-4
                flex flex-col
                space-y-7
                "
            >
                {/* Heading */}
                <h1 className="text-neutral-700 text-4xl sm:text-5xl font-extrabold leading-tight">
                Just draw it out
                </h1>

                {/* Subline */}
                <p className="text-neutral-600/70 font-extrabold sm:text-lg leading-relaxed">
                A shared canvas for thinking out loud.
                <br />
                Draw, erase, and rethink ideas together.
                </p>

                {/* Buttons */}
                <div className="flex gap-4 pt-5 justify-center h-30 items-center">
                    <Button className="px-6 w-25">Collab</Button>
                    <Button className="px-6 w-25">
                        Draw
                    </Button>
                </div>
            </div>
        </main>
    )
}