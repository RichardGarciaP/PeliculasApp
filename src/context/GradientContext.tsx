import React, {createContext, useState} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  prevColors: ImageColors;
  setColors: (colors: ImageColors) => void;
  setPrevColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps); //TODO: definir tipo

export const GradientProvider = ({children}: any) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setColors: (colors: ImageColors) => setColors(colors),
        setPrevColors: (colors: ImageColors) => setPrevColors(colors),
      }}>
      {children}
    </GradientContext.Provider>
  );
};
