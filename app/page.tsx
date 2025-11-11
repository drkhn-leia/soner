import Image from "next/image";
export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <Image src={"/nost.png"} width={200} height={200} alt="Logo" className="spin-slow" />
            <p className="text-4xl font-poppins mt-10">Sitemiz yapım aşamasındadır.</p>
            <p className="text-xl font-poppins mt-5">Kısa süre içinde yayında olacağız.</p>
        </div>
    );
}
