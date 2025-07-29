import { useState } from "react";
import CurrencyInfo from "./componets/ReusbalComponents";
import useCurrencyInfo from "./customeHooks/customehook";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const currencyInformation = useCurrencyInfo(from);
  const options = Object.keys(currencyInformation);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const swap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFrom(to);
      setTo(from);
      setConvertedAmount(amount * currencyInformation[to]);
      setAmount(convertedAmount);
      setIsSwapping(false);
    }, 600);
  };

  const convert = (e) => {
    e.preventDefault();
    setConvertedAmount(amount * currencyInformation[to]);
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden py-8"
      onMouseMove={handleMouseMove}
    >
      {/* Animated background with optimized performance */}
      <div className="fixed inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
          style={{
            transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`
          }}
        />
        
        {/* Optimized floating particles */}
       {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

     <div className="relative z-10 w-full max-w-md mx-4">
        <div className={`bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl transition-all duration-500 ${
          isSwapping ? "scale-95 opacity-90" : "scale-100 opacity-100"
        }`}>
          <h1 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Quantum Converter
          </h1>
          
          <form onSubmit={convert}>
            <div className="space-y-5">
              <CurrencyInfo
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={setFrom}
                selectCurrency={from}
                onAmountChange={setAmount}
              />

              <div className="relative flex justify-center my-2">
                <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gray-600/50 to-transparent" />
                <button
                  type="button"
                  className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 active:scale-95"
                  onClick={swap}
                  aria-label="Swap currencies"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform duration-300 ${isSwapping ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </button>
              </div>

              <CurrencyInfo
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                 onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
            >
              Convert {from.toUpperCase()} → {to.toUpperCase()}
            </button>
          </form>

          {amount > 0 && (
            <div className="mt-4 text-center text-gray-400 text-sm animate-fadeIn">
              <p>
                1 {from.toUpperCase()} = {currencyInformation[to].toFixed(6)} {to.toUpperCase()}
              </p>
              <p className="text-xs opacity-80 mt-1">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tailwind animation definitions */}
    <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-10px) translateX(5px) rotate(2deg); }
          50% { transform: translateY(5px) translateX(-5px) rotate(-2deg); }
          75% { transform: translateY(-5px) translateX(5px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}

export default App;