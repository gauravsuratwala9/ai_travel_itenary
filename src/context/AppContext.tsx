import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Trip, Page, CreateTripForm } from '../types';
import { mockTrips } from '../data/mockData';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentPage: Page;
  navigateTo: (page: Page) => void;
  trips: Trip[];
  currentTrip: Trip | null;
  setCurrentTrip: (trip: Trip | null) => void;
  pendingForm: CreateTripForm | null;
  setPendingForm: (form: CreateTripForm | null) => void;
  addTrip: (trip: Trip) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [pendingForm, setPendingForm] = useState<CreateTripForm | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('voya_user');
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
        setCurrentPage('dashboard');
      } catch {
        localStorage.removeItem('voya_user');
      }
    }
  }, []);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) {
      localStorage.setItem('voya_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('voya_user');
    }
  };

  const navigateTo = (page: Page) => setCurrentPage(page);

  const addTrip = (trip: Trip) => setTrips(prev => [trip, ...prev]);

  const logout = () => {
    setUser(null);
    setCurrentPage('auth');
    setCurrentTrip(null);
    setPendingForm(null);
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      currentPage, navigateTo,
      trips, currentTrip, setCurrentTrip,
      pendingForm, setPendingForm,
      addTrip,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
