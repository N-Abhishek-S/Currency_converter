import React, { useId, useState } from 'react'

function CurrencyInfo({
    label = "Amount",
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyDisable = false,
    amountDisable = false,
    currencyOptions = [],
    selectCurrency = "usd",
    className = "",
}) {
    const amountInputId = useId();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`relative bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl shadow-lg border border-indigo-100 overflow-hidden ${className}`}>
            {/* Animated background elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-indigo-200 rounded-full opacity-20"></div>
            
            {/* Glowing border effect on focus */}
            <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-all duration-300 ${isFocused ? 'shadow-[0_0_0_2px_theme(colors.indigo.400)]' : ''}`}></div>
            
            <div className="relative z-10">
                <div className="flex flex-col space-y-6">
                    {/* Amount Input - Holographic Card Effect */}
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                        <label 
                            htmlFor={amountInputId} 
                            className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1"
                        >
                            {label}
                        </label>
                        <div className="relative">
                            <input
                                id={amountInputId}
                                className="w-full bg-transparent text-2xl font-light text-gray-800 outline-none placeholder-gray-300"
                                type="number"
                                placeholder="0.00"
                                disabled={amountDisable}
                                value={amount}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                            />
                            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
                        </div>
                    </div>

                    {/* Currency Selector - Futuristic Dropdown */}
                    <div className="relative">
                        <label className="block text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
                            Currency Type
                        </label>
                        <div className="relative">
                            <select
                                className="appearance-none w-full bg-white/90 backdrop-blur-sm p-3 pr-8 rounded-xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] text-gray-800 outline-none cursor-pointer"
                                value={selectCurrency}
                                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                                disabled={currencyDisable}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            >
                                {currencyOptions.map((currency) => (
                                    <option 
                                        key={currency} 
                                        value={currency}
                                        className="py-2"
                                    >
                                        {currency.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated currency visualization (decorative) */}
                <div className="mt-6 flex justify-center space-x-2">
                    {['USD', 'EUR', 'GBP', 'JPY'].map((curr) => (
                        <div 
                            key={curr}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${selectCurrency === curr.toLowerCase() ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500'}`}
                        >
                            {curr}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CurrencyInfo