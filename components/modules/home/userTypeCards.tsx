"use client";
import {
  Play,
  Target,
  DollarSign,
  Crown,
  Gift,
  Star,
  Zap,
  ArrowRight,
  Eye,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Users,
  Clock,
} from "lucide-react";

interface UserTypeCardsProps {
  userType: "earner" | "business";
  setUserType: (value: "earner" | "business") => void;
}

export default function UserTypeCards({
  userType,
  setUserType,
}: UserTypeCardsProps) {
  return (
    <div className="max-w-5xl mx-auto mb-16 px-2">
      {/* Tabs */}
      <div className="max-w-md mx-auto mb-12">
        <p className="text-center text-white/70 text-sm mb-4">
          Please select your user type to continue.
        </p>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          <div className="grid grid-cols-2 gap-2">
            {/* EARNER */}
            <button
              onClick={() => setUserType("earner")}
              className={`relative py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                userType === "earner"
                  ? "bg-gradient-to-r from-amber-300 to-amber-500 text-white shadow-md scale-[1.02]"
                  : "text-white/60 hover:text-white bg-white/5"
              }`}
            >
              <div className="relative flex items-center justify-center gap-2 text-sm">
                <Play className="w-5 h-5" />
                <span>Reward User</span>{" "}
                {/* Değişiklik: Earner -> Reward User */}
              </div>
            </button>

            {/* BUSINESS (SAFE MODE) */}
            <button
              onClick={() => setUserType("business")}
              className={`relative py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                userType === "business"
                  ? "bg-gradient-to-r from-sky-300 to-indigo-400 text-white shadow-md scale-[1.02]"
                  : "text-white/60 hover:text-white bg-white/5"
              }`}
            >
              <div className="relative flex items-center justify-center gap-2 text-sm">
                <Target className="w-5 h-5" />
                <span>Business</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content Box */}
      <div className="relative">
        {/* Soft Background */}
        <div
          className={`absolute inset-0 rounded-3xl blur-[55px] opacity-20 
          ${
            userType === "earner"
              ? "from-amber-200 via-amber-300 to-amber-400 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]"
              : "from-sky-200 via-indigo-200 to-indigo-300 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]"
          }`}
        ></div>

        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl px-4 py-8 md:p-12 border border-white/10 shadow-xl">
          {userType === "earner" ? (
            <div className="space-y-8">
              {/* HEADER */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-300/20 rounded-2xl mb-4 border border-amber-300/30">
                  <Star className="w-10 h-10 text-amber-400" />{" "}
                  {/* DollarSign -> Star yapıldı */}
                </div>
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
                  For Reward Users{" "}
                  {/* Değişiklik: For Earners -> For Reward Users */}
                </h2>
                <p className="text-white/70 text-md">
                  The modern way to earn digital rewards.{" "}
                  {/* Değişiklik: digital income -> digital rewards */}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* CARD 1 */}
                <div className="bg-white/5 rounded-2xl p-6 border border-amber-300/30 transition-all duration-300 hover:scale-[1.02] hover:border-amber-400/60">
                  <div className="w-14 h-14 bg-amber-300/20 rounded-xl flex items-center justify-center mb-4 border border-amber-300/30">
                    <Eye className="w-7 h-7 text-amber-400" />
                  </div>

                  {/* IMPORTANT SAFE TEXT */}
                  <h3 className="text-white font-bold text-lg mb-2">
                    Watch Spots & Get Rewarded{" "}
                    {/* Değişiklik: Watch Spots & Earn -> Watch Spots & Get Rewarded */}
                  </h3>

                  <p className="text-white/60 text-sm mb-3">
                    Instant points up to 10 points.{" "}
                    {/* Değişiklik: Instant rewards up to $0.01. -> Instant points up to 10 points. */}
                  </p>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
                    <ArrowRight className="w-4 h-4" />
                    Start Now
                  </div>
                  {/* SAFE PRE-REG INFO - EARNER */}
                </div>

                {/* CARD 2 */}
                <div className="bg-white/5 rounded-2xl p-6 border border-yellow-300/30 transition-all duration-300 hover:scale-[1.02] hover:border-yellow-400/60">
                  <div className="w-14 h-14 bg-yellow-300/20 rounded-xl flex items-center justify-center mb-4 border border-yellow-300/30">
                    <Crown className="w-7 h-7 text-yellow-400" />
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2">
                    Wheel of Fortune
                  </h3>

                  <div className="text-white/60 text-sm mb-3 space-y-2">
                    <p>
                      Normal Ticket Draw{" "}
                      <span className="text-amber-300 font-semibold">
                        (Random prize)
                      </span>
                    </p>

                    <p>
                      Premium Ticket Draw{" "}
                      <span className="text-yellow-300 font-semibold">
                        (Higher chance)
                      </span>
                    </p>

                    <p>
                      Instant Win:{" "}
                      <span className="text-green-300 font-semibold">
                        100 Points {/* Değişiklik: $0.10 -> 100 Points */}
                      </span>
                    </p>

                    <p>
                      Instant Win:{" "}
                      <span className="text-emerald-300 font-semibold">
                        1000 Points {/* Değişiklik: $1.00 -> 1000 Points */}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-yellow-400 text-xs font-semibold mb-4">
                    <Star className="w-4 h-4" />4 Reward Types
                  </div>

                  {/* MONTHLY WHEEL REWARDS */}
                  <div className="bg-yellow-300/10 rounded-xl p-4 border border-yellow-300/30">
                    <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-400" />
                      Monthly Wheel Rewards
                    </h4>

                    <ul className="text-white/70 text-xs space-y-1">
                      <li>
                        <span className="text-yellow-300 font-semibold">
                          1st Place:
                        </span>{" "}
                        10000 Points + 10 T-Crypto{" "}
                        {/* Değişiklik: $10 -> 10000 Points */}
                      </li>

                      <li>
                        <span className="text-yellow-300 font-semibold">
                          2nd Place:
                        </span>{" "}
                        7000 Points + 7 T-Crypto{" "}
                        {/* Değişiklik: $7 -> 7000 Points */}
                      </li>

                      <li>
                        <span className="text-yellow-300 font-semibold">
                          3rd Place:
                        </span>{" "}
                        5000 Points + 5 T-Crypto{" "}
                        {/* Değişiklik: $5 -> 5000 Points */}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* CARD 3 */}
                <div className="bg-white/5 rounded-2xl p-6 border border-purple-300/30 transition-all duration-300 hover:scale-[1.02] hover:border-purple-400/60">
                  <div className="w-14 h-14 bg-purple-300/20 rounded-xl flex items-center justify-center mb-4 border border-purple-300/30">
                    <Gift className="w-7 h-7 text-purple-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    Extra Reward Methods{" "}
                    {/* Değişiklik: Extra Earning Methods -> Extra Reward Methods */}
                  </h3>
                  <p className="text-white/60 text-sm mb-3">
                    Installing Applications & Tasks.{" "}
                    {/* Açıklama netleştirildi */}
                  </p>
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
                    <Zap className="w-4 h-4" />
                    VIP Benefits
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="bg-amber-300/10 rounded-xl p-4 border border-amber-300/30">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  <p className="text-white/90 text-sm">
                    <span className="font-semibold">
                      First 10,000 users receive 1000 Points + crypto bonus.{" "}
                      {/* Değişiklik: $1 -> 1000 Points */}
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3 mt-4">
                {/* Block 1 */}
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/70" />
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold">
                      Safe Pre-Registration:
                    </span>
                    Your email is never shared with third parties and no spam is
                    sent.
                  </p>
                </div>

                {/* Block 2 */}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-white/70" />
                  <p className="text-white/80 text-sm">
                    <span className="font-semibold">
                      Limited Pre-Registration:
                    </span>
                    Gifts close when the quota is full.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* HEADER */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-300/20 rounded-2xl mb-4 border border-sky-300/30">
                  <Target className="w-10 h-10 text-sky-400" />
                </div>

                {/* SAFE TITLE */}
                <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-3">
                  For Business Partners
                </h2>

                <p className="text-white/70 text-md">
                  Grow with modern engagement tools.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* CARD 1 (Business - Standard) */}
                <div className="bg-white/5 rounded-2xl p-6 border border-sky-300/30 transition-all duration-300 hover:scale-[1.02] hover:border-sky-400/60">
                  <div className="w-14 h-14 bg-sky-300/20 rounded-xl flex items-center justify-center mb-4 border border-sky-300/30">
                    <TrendingUp className="w-7 h-7 text-sky-400" />
                  </div>

                  {/* SAFE TEXT */}
                  <h3 className="text-white font-bold text-lg mb-2">
                    Standard Spots
                  </h3>

                  <p className="text-white/60 text-sm mb-3">
                    In-content or interactive spot options.
                  </p>
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold">
                    <ArrowRight className="w-4 h-4" />
                    Launch Campaign
                  </div>
                </div>

                {/* CARD 2 (Business - Premium) */}
                <div className="bg-white/5 rounded-2xl p-6 border border-indigo-300/30 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-400/60">
                  <div className="w-14 h-14 bg-indigo-300/20 rounded-xl flex items-center justify-center mb-4 border border-indigo-300/30">
                    <Sparkles className="w-7 h-7 text-indigo-300" />
                  </div>

                  {/* SAFE TEXT */}
                  <h3 className="text-white font-bold text-lg mb-2">
                    Premium Spots
                  </h3>

                  <p className="text-white/60 text-sm mb-3">
                    100% guaranteed visibility.
                  </p>
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
                    <Star className="w-4 h-4" />
                    High Engagement
                  </div>
                </div>

                {/* CARD 3 (Business - Smart Start) */}
                <div className="bg-white/5 rounded-2xl p-6 border border-emerald-300/30 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400/60">
                  <div className="w-14 h-14 bg-emerald-300/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-300/30">
                    <Users className="w-7 h-7 text-emerald-300" />
                  </div>

                  {/* SAFE TEXT */}
                  <h3 className="text-white font-bold text-lg mb-2">
                    Smart Start
                  </h3>

                  <p className="text-white/60 text-sm mb-3">
                    Begin with a minimum $5 budget.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                    <Zap className="w-4 h-4" />
                    Precise Targeting
                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="bg-sky-300/10 rounded-xl p-4 border border-sky-300/30">
                {/* EXTRA BUSINESS INFO BLOCKS */}
                <div className="space-y-4">
                  {/* BLOCK 1 */}
                  <div className="bg-sky-300/10 rounded-xl p-4 border border-sky-300/30">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sky-400" />
                      <p className="text-white/90 text-sm">
                        <span className="font-semibold">
                          Guaranteed real user views
                        </span>{" "}
                        and a unique display system ensures each ad is viewed
                        only 1 time.
                      </p>
                    </div>
                  </div>

                  {/* BLOCK 2 */}
                  <div className="bg-indigo-300/10 rounded-xl p-4 border border-indigo-300/30">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-indigo-300" />
                      <p className="text-white/90 text-sm">
                        High engagement via Wheel & App Install. Payments are
                        securely made with Payoneer, LTC, and Credit Card.
                      </p>
                    </div>
                  </div>

                  {/* BLOCK 3 */}
                  <div className="bg-emerald-300/10 rounded-xl p-4 border border-emerald-300/30">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-300" />
                      <p className="text-white/90 text-sm">
                        Minimum risk of fake clicks.{" "}
                        <span className="font-semibold">
                          Adstowin – Reward platform.{" "}
                          {/* Değişiklik: earnings -> reward */}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full mt-2 mb-4 px-4 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                    Launch Ad Now – Catch the Pre-Registration Opportunity
                  </button>
                </div>

                {/* SAFE PRE-REG INFO - BUSINESS */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3 mt-4 mb-4">
                  {/* Block 1 */}
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/70" />
                    <p className="text-white/80 text-sm">
                      <span className="font-semibold">
                        Safe Pre-Registration:
                      </span>
                      Your email is never shared with third parties and no spam
                      is sent.
                    </p>
                  </div>

                  {/* Block 2 */}
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-white/70" />
                    <p className="text-white/80 text-sm">
                      <span className="font-semibold">
                        Limited Pre-Registration:
                      </span>
                      Gifts close when the quota is full.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-sky-400" />
                  <p className="text-white/90 text-sm">
                    20% extra visibility on your first spot.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
