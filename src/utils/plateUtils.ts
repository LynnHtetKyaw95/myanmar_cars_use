export interface PlateInfo {
  plate: string;
  type: 'odd' | 'even';
}

export const getPlateType = (plate: string): 'odd' | 'even' => {
  const cleanPlate = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const firstChar = cleanPlate.charAt(0);
  const firstDigit = parseInt(firstChar, 10);
  
  if (isNaN(firstDigit)) {
    const letterMap: Record<string, number> = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18,
      'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
    };
    const letterValue = letterMap[firstChar];
    if (letterValue !== undefined) {
      return letterValue % 2 === 1 ? 'odd' : 'even';
    }
    return 'even';
  }
  
  return firstDigit % 2 === 1 ? 'odd' : 'even';
};

export const canDriveToday = (plate: string): boolean => {
  const today = new Date().getDate();
  const plateType = getPlateType(plate);
  
  if (plateType === 'odd') {
    return today % 2 === 1;
  } else {
    return today % 2 === 0;
  }
};

export const canDriveOnDate = (plate: string, date: number): boolean => {
  const plateType = getPlateType(plate);
  
  if (plateType === 'odd') {
    return date % 2 === 1;
  } else {
    return date % 2 === 0;
  }
};

export const getNextAllowedDate = (plate: string): number => {
  const today = new Date().getDate();
  
  for (let i = 1; i <= 31; i++) {
    const checkDate = ((today + i - 1) % 31) + 1;
    if (canDriveOnDate(plate, checkDate)) {
      return checkDate;
    }
  }
  return today;
};

export const formatPlate = (plate: string): string => {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
};
