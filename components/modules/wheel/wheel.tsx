"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Star, Gift } from "lucide-react";

export default function FortuneWheelPage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpinTime, setLastSpinTime] = useState<number | null>(null);
  const [spinCount, setSpinCount] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Çark bölümleri ve olasılıkları
  const wheelSegments = [
    {
      label: "Normal Bilet",
      probability: 74,
      color: "bg-blue-500",
      totalWeight: 74,
    },
    {
      label: "Premium Bilet",
      probability: 25,
      color: "bg-purple-500",
      totalWeight: 25,
    },
    { label: "0.10$", probability: 5, color: "bg-green-500", totalWeight: 5 },
    { label: "0.30$", probability: 1, color: "bg-yellow-500", totalWeight: 1 },
  ];

  // En çok çark çeviren kullanıcılar (örnek veri)
  const topSpinners = [
    { rank: 1, name: "Kullanıcı1", spins: 245, prize: "10 TKripto + 10$" },
    { rank: 2, name: "Kullanıcı2", spins: 198, prize: "7 TKripto + 7$" },
    { rank: 3, name: "Kullanıcı3", spins: 167, prize: "5 TKripto + 5$" },
  ];

  // Çark çevirme kontrolü
  useEffect(() => {
    const checkSpinAvailability = () => {
      if (!lastSpinTime) return;

      const now = Date.now();
      const hoursPassed = (now - lastSpinTime) / (1000 * 60 * 60);
      const spinsAllowed = isPremium ? 2 : 1;

      if (hoursPassed >= 1) {
        setCanSpin(true);
      }
    };

    const interval = setInterval(checkSpinAvailability, 1000);
    return () => clearInterval(interval);
  }, [lastSpinTime, isPremium]);

  // Çark çevirme fonksiyonu
  const spinWheel = () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    setResult(null);

    // Rastgele sonuç seçimi (olasılıklara göre)
    const random = Math.random() * 100;
    let cumulativeWeight = 0;
    let selectedSegment = wheelSegments[0];

    for (const segment of wheelSegments) {
      cumulativeWeight += segment.probability;
      if (random <= cumulativeWeight) {
        selectedSegment = segment;
        break;
      }
    }

    // Seçilen segmentin açısını hesapla
    const segmentAngle = 360 / wheelSegments.length;
    const segmentIndex = wheelSegments.indexOf(selectedSegment);
    const targetAngle =
      360 * 5 + segmentIndex * segmentAngle + segmentAngle / 2;

    setRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedSegment.label);
      setLastSpinTime(Date.now());
      setSpinCount((prev) => prev + 1);
      setCanSpin(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Sabit Reklam Alanı */}
      <div className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 p-4 text-center sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto">
          <p className="text-white font-bold text-lg">
            🎉 ÖZEL KAMPANYA: İlk 100 üyeye özel bonus! 🎉
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Premium Üyelik Toggle */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={() => setIsPremium(!isPremium)}
            variant={isPremium ? "default" : "outline"}
            className={isPremium ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            <Star className="w-4 h-4 mr-2" />
            {isPremium ? "Premium Üye" : "Normal Üye"}
          </Button>
        </div>

        {/* Ana Çark Bölümü */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">
              Şans Çarkı
            </CardTitle>
            <p className="text-center text-white/80 mt-2">
              {isPremium
                ? "Saatte 2 çevirme hakkınız var"
                : "Saatte 1 çevirme hakkınız var"}
            </p>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {/* Çark */}
            <div className="relative w-80 h-80 mb-8">
              {/* Ok İşareti */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-red-500"></div>
              </div>

              {/* Çark */}
              <div
                className="w-full h-full rounded-full border-8 border-white shadow-2xl relative overflow-hidden transition-transform duration-[4000ms] ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(
                    from 0deg,
                    #3b82f6 0deg ${(74 / 100) * 360}deg,
                    #a855f7 ${(74 / 100) * 360}deg ${
                    ((74 + 25) / 100) * 360
                  }deg,
                    #10b981 ${((74 + 25) / 100) * 360}deg ${
                    ((74 + 25 + 5) / 100) * 360
                  }deg,
                    #eab308 ${((74 + 25 + 5) / 100) * 360}deg 360deg
                  )`,
                }}
              >
                {/* Çark bölümleri için çizgiler */}
                {wheelSegments.map((_, index) => (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-1 h-40 bg-white origin-bottom"
                    style={{
                      transform: `translateX(-50%) rotate(${
                        (360 / wheelSegments.length) * index
                      }deg)`,
                    }}
                  />
                ))}

                {/* Merkez daire */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Gift className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Çevirme Butonu */}
            <Button
              onClick={spinWheel}
              disabled={isSpinning || !canSpin}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-lg disabled:opacity-50"
            >
              {isSpinning
                ? "Çevrilliyor..."
                : canSpin
                ? "Çarkı Çevir!"
                : "Bekleniyor..."}
            </Button>

            {/* Sonuç */}
            {result && (
              <div className="mt-6 p-4 bg-green-500 text-white rounded-lg text-center animate-bounce">
                <p className="text-xl font-bold">Kazandınız: {result}</p>
              </div>
            )}

            {/* Çevirme Sayacı */}
            <div className="mt-4 text-white text-center">
              <Clock className="w-5 h-5 inline mr-2" />
              Bu ay toplam çevirme:{" "}
              <span className="font-bold">{spinCount}</span>
            </div>
          </CardContent>
        </Card>

        {/* Çark Olasılıkları */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-xl text-white">
              Ödül Olasılıkları
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-500 p-4 rounded-lg text-center text-white">
                <p className="font-bold">Normal Bilet</p>
                <p className="text-2xl">74%</p>
              </div>
              <div className="bg-purple-500 p-4 rounded-lg text-center text-white">
                <p className="font-bold">Premium Bilet</p>
                <p className="text-2xl">25%</p>
              </div>
              <div className="bg-green-500 p-4 rounded-lg text-center text-white">
                <p className="font-bold">0.10$</p>
                <p className="text-2xl">5%</p>
              </div>
              <div className="bg-yellow-500 p-4 rounded-lg text-center text-white">
                <p className="font-bold">0.30$</p>
                <p className="text-2xl">1%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* En Çok Çark Çeviren İlk 3 Kişi */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
              En Çok Çark Çeviren Kullanıcılar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSpinners.map((user) => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    user.rank === 1
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                      : user.rank === 2
                      ? "bg-gradient-to-r from-gray-300 to-gray-400"
                      : "bg-gradient-to-r from-orange-600 to-orange-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-white">
                      #{user.rank}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        {user.name}
                      </p>
                      <p className="text-white/90 text-sm">
                        {user.spins} çevirme
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{user.prize}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ödül Sistemi Bilgilendirme */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center">
              <Gift className="w-6 h-6 mr-2 text-pink-400" />
              Aylık Ödül Sistemi
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">
                En Çok Çark Çeviren Ödülleri:
              </h3>
              <ul className="space-y-2 ml-4">
                <li>
                  🥇 <span className="font-bold">1. Sıra:</span> 10 TKripto + 10
                  Dolar
                </li>
                <li>
                  🥈 <span className="font-bold">2. Sıra:</span> 7 TKripto + 7
                  Dolar
                </li>
                <li>
                  🥉 <span className="font-bold">3. Sıra:</span> 5 TKripto + 5
                  Dolar
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/20">
              <h3 className="font-bold text-lg mb-2">Çekiliş Ödülleri:</h3>
              <ul className="space-y-2 ml-4">
                <li>
                  ⭐ <span className="font-bold">Premium Bilet Çekilişi:</span>{" "}
                  3 TKripto + 3 Dolar
                </li>
                <li>
                  🎫 <span className="font-bold">Normal Bilet Çekilişi:</span> 1
                  TKripto + 1 Dolar
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
