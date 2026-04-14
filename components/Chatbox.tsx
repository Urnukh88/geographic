"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Globe, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Сайн байна уу? Би таны газарзүйн багш байна. Та юу мэдэхийг хүсэж байна?",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map((m) => ({
            role: m.role === "bot" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [...prev, { role: "bot", text: data.text }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Уучлаарай, холболтонд алдаа гарлаа." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-[#E2D9CC] flex flex-col overflow-hidden"
          >
            <div className="bg-[#1A1209] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#7C4F2F] rounded-full flex items-center justify-center">
                  <Globe
                    size={18}
                    className={isLoading ? "animate-spin" : ""}
                  />
                </div>
                <h3 className="text-sm font-bold font-serif text-white">
                  Гео-Багш
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F5F0]"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#7C4F2F] text-white rounded-tr-none"
                        : "bg-white text-[#1A1209] border border-[#E2D9CC] rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl border border-[#E2D9CC] flex items-center gap-2 shadow-sm">
                    <Loader2
                      size={16}
                      className="animate-spin text-[#7C4F2F]"
                    />
                    <span className="text-xs text-[#7A6A58]">
                      Багш бодож байна...
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-[#E2D9CC]">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Асуултаа энд бичээрэй..."
                  className="w-full pl-4 pr-12 py-3 bg-[#F8F5F0] border-none rounded-xl focus:ring-2 focus:ring-[#7C4F2F] outline-none text-sm text-[#1A1209]"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#7C4F2F] text-white rounded-lg hover:bg-[#5C3820] disabled:bg-gray-400 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#1A1209] text-white rounded-full flex items-center justify-center shadow-xl hover:bg-[#7C4F2F] transition-all"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
