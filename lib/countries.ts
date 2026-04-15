// Эхлээд төрлөө (Interface) тодорхойлно
export interface CountryCulturalData {
  id: string;
  name: string;
  cultureImage: string;
  pattern: string;
  symbol: string;
  sound: string;
  description: string;
}

// Одоо датагаа export хийнэ
export const culturalData: CountryCulturalData[] = [
  {
    id: "mn",
    name: "Монгол",
    cultureImage:
      "https://images.unsplash.com/photo-1528255915607-9012fda0f838?q=80&w=2070&auto=format&fit=crop",
    pattern:
      "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/03/Mongolian-Pattern-1.jpg",
    symbol: "Гэр & Морин хуур",
    sound:
      "https://www.chosic.com/wp-content/uploads/2021/07/The-Grand-Path-Authentic-Mongolian-Music.mp3",
    description: "Нүүдэлчин соёл болон мөнх хөх тэнгэрийн орон.",
  },
  {
    id: "jp",
    name: "Япон",
    cultureImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    pattern:
      "https://i.pinimg.com/736x/8d/4d/9d/8d4d9d8d8d8d8d8d8d8d8d8d8d8d8d8d.jpg",
    symbol: "Сакура & Сүши",
    sound:
      "https://www.chosic.com/wp-content/uploads/2021/04/Japanese-Garden-Traditional-Music.mp3",
    description: "Эртний уламжлал ба орчин үеийн технологийн нэгдэл.",
  },
];
