'use client'

import { useState } from 'react'

interface AmountOption {
  value: number
  impact: string
}

const PRESET_AMOUNTS: AmountOption[] = [
  { value: 500, impact: 'Stationery kit for one child' },
  { value: 1000, impact: 'One month of learning materials' },
  { value: 2000, impact: 'One month of teaching support' },
  { value: 4000, impact: 'Two months of support' },
  { value: 6000, impact: 'Three months of support' },
  { value: 12000, impact: 'Six months of support' },
]

interface AmountSelectorProps {
  selectedAmount: number | null
  onSelect: (amount: number) => void
}

export default function AmountSelector({ selectedAmount, onSelect }: AmountSelectorProps) {
  const [customValue, setCustomValue] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  const selectedPreset = PRESET_AMOUNTS.find((p) => p.value === selectedAmount)

  function handlePresetClick(amount: number) {
    setIsCustom(false)
    setCustomValue('')
    onSelect(amount)
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setCustomValue(raw)
    setIsCustom(true)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed) && parsed > 0) {
      onSelect(parsed)
    }
  }

  function handleCustomFocus() {
    setIsCustom(true)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRESET_AMOUNTS.map((option) => {
          const isSelected = !isCustom && selectedAmount === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handlePresetClick(option.value)}
              className={`rounded-xl px-4 py-3 text-left transition-all duration-150 ${
                isSelected
                  ? 'bg-primary text-white shadow-md'
                  : 'border-2 border-primary text-primary bg-white hover:bg-surface'
              }`}
            >
              <div className="font-bold text-lg">₹{option.value.toLocaleString('en-IN')}</div>
              <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-text-secondary'}`}>
                {option.impact}
              </div>
            </button>
          )
        })}
      </div>

      {/* Custom amount input */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Or enter a custom amount (₹)
        </label>
        <input
          type="number"
          min={1}
          placeholder="e.g. 750"
          value={customValue}
          onChange={handleCustomChange}
          onFocus={handleCustomFocus}
          className={`border-2 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            isCustom && customValue
              ? 'border-primary bg-surface'
              : 'border-stone-300 bg-white'
          }`}
        />
      </div>

      {/* Impact caption */}
      {selectedPreset && !isCustom && (
        <p className="text-sm text-text-secondary italic">
          Your ₹{selectedPreset.value.toLocaleString('en-IN')} will cover: {selectedPreset.impact}
        </p>
      )}
      {isCustom && customValue && parseInt(customValue, 10) > 0 && (
        <p className="text-sm text-text-secondary italic">
          Every rupee makes a real difference — thank you!
        </p>
      )}
    </div>
  )
}
