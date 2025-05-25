import { Region } from '@/types/holiday';
import React, { createContext, useContext, useState } from 'react';

const RegionContext = createContext<{ memRegion: Region | null, setMemRegion: Function }>({ memRegion: null, setMemRegion: () => {} });

export const SessionProvider = ({ children }) => {
  const [ memRegion, setMemRegion ] = useState(null);
  return (
    <RegionContext.Provider value={{ memRegion, setMemRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useMemRegion = () => useContext(RegionContext);