import FlagQuizEngine from "@/components/FlagQuizEngine";
import { Map } from "lucide-react";

export default function FlagQuizPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="w-16 h-16 bg-[#7C4F2F] rounded-2xl flex items-center justify-center text-white mb-6 rotate-3 shadow-xl">
            <Map size={32} />
          </div>
          <h1 className="text-5xl font-serif text-[#1A1209] mb-4 tracking-tight">
            Далбаа таах
          </h1>
          <p className="text-[#A68966] font-serif max-w-md leading-relaxed">
            Дэлхийн улсуудын далбааг хэр сайн мэдэх вэ? 10 асуултанд хариулж
            өөрийгөө сориорой.
          </p>
        </div>

        <FlagQuizEngine />
      </div>
    </div>
  );
}
