import Image from "next/image";

export default function Home() {
    // Her render'da yeni bir random parametre oluştur
    const randomParam = Math.random().toString(36).substring(2, 8);

    return (
        <>
            <div className="absolute flex flex-col justify-center items-center w-full h-screen text-white z-20">
                <Image
                    src="/nost.png"
                    width={200}
                    height={200}
                    alt="Logo"
                    className="spin-slow"
                />
                <p className="text-4xl font-poppins mt-10">Sitemiz yapım aşamasındadır.</p>
                <p className="text-xl font-poppins mt-5">Kısa süre içinde yayında olacağız.</p>
            </div>

            <div>
                <div className="absolute w-screen h-screen top-0 left-0 select-none bg-black opacity-80 z-10"></div>
                <Image
                    src={`https://picsum.photos/2048/1024?random=${randomParam}`}
                    fill
                    alt="Background"
                    className="select-none"
                />
            </div>
        </>
    );
}
