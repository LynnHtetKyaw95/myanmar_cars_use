import { useState, useEffect } from 'react';
import { getPlateType, canDriveToday, getNextAllowedDate, formatPlate } from '../utils/plateUtils';

const STORAGE_KEY = 'car_uses_plate';

export const usePlate = () => {
  const [plate, setPlate] = useState<string>('');
  const [plateType, setPlateType] = useState<'odd' | 'even' | null>(null);
  const [todayStatus, setTodayStatus] = useState<boolean | null>(null);
  const [nextAllowed, setNextAllowed] = useState<number | null>(null);

  useEffect(() => {
    const savedPlate = localStorage.getItem(STORAGE_KEY);
    if (savedPlate) {
      setPlate(savedPlate);
    }
  }, []);

  useEffect(() => {
    if (plate) {
      const type = getPlateType(plate);
      setPlateType(type);
      setTodayStatus(canDriveToday(plate));
      setNextAllowed(getNextAllowedDate(plate));
      localStorage.setItem(STORAGE_KEY, plate);
    } else {
      setPlateType(null);
      setTodayStatus(null);
      setNextAllowed(null);
    }
  }, [plate]);

  const updatePlate = (newPlate: string) => {
    setPlate(formatPlate(newPlate));
  };

  const clearPlate = () => {
    setPlate('');
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    plate,
    plateType,
    todayStatus,
    nextAllowed,
    updatePlate,
    clearPlate,
  };
};
