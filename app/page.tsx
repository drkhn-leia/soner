"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
    const [rnd, setRnd] = useState<string>("");

    useEffect(() => {
        // Her client yüklemesinde yeni parametre
        setRnd(Math.random().toString(36).slice(2, 10));
    }, []);

    return (
        <>
            <div className="absolute flex flex-col justify-center items-center w-full h-screen text-white z-20">
                <Image src="/nost.png" width={200} height={200} alt="Logo" className="spin-slow" />
                <p className="text-4xl font-poppins mt-10">Sitemiz yapım aşamasındadır.</p>
                <p className="text-xl font-poppins mt-5">Kısa süre içinde yayında olacağız.</p>
            </div>

            <div>
                <div className="absolute w-screen h-screen top-0 left-0 select-none bg-black opacity-80 z-10" />
                {rnd && (
                    <Image
                        src={`https://picsum.photos/2048/1024?seed=${rnd}`}
                        alt="Background"
                        fill
                        className="select-none"
                        priority
                    />
                )}
            </div>
        </>
    );
}
