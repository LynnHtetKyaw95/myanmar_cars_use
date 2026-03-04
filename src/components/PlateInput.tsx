import { useState } from 'react';
import './PlateInput.css';

interface PlateInputProps {
  value: string;
  onChange: (plate: string) => void;
  onClear: () => void;
}

export const PlateInput = ({ value, onChange, onClear }: PlateInputProps) => {
  const [error, setError] = useState('');

  const getParts = (plate: string): [string, string] => {
    const clean = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length <= 2) {
      return [clean, ''];
    }
    return [clean.slice(0, 2), clean.slice(2)];
  };

  const [prefix, suffix] = getParts(value);

  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 2);
    onChange(input + suffix);
    setError('');
  };

  const handleSuffixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    onChange(prefix + input);
    setError('');
  };

  const handleBlur = () => {
    if (prefix && prefix.length < 2) {
      setError('First field must have letter + digit');
    } else {
      setError('');
    }
  };

  return (
    <div className="plate-input-container">
      <label className="plate-label">License Plate Number</label>
      <div className="plate-input-wrapper plate-input--split">
        <div className="plate-input-group">
          <input
            type="text"
            value={prefix}
            onChange={handlePrefixChange}
            onBlur={handleBlur}
            placeholder="3I"
            className="plate-input plate-input--prefix"
            maxLength={2}
          />
          <span className="plate-separator">|</span>
          <input
            type="text"
            value={suffix}
            onChange={handleSuffixChange}
            placeholder="6789"
            className="plate-input plate-input--suffix"
            maxLength={4}
          />
        </div>
        {value && (
          <button onClick={onClear} className="clear-button" type="button">
            ×
          </button>
        )}
      </div>
      {error && <span className="plate-error">{error}</span>}
    </div>
  );
};
