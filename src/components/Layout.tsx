import { ReactNode } from 'react';
import { Compass, Home, Plus, Camera, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

interface LayoutProps {
  children: ReactNode;
}

const navItems: { page: Page; icon: ReactNode; label: string }[] = [
  { page: 'dashboard', icon: <Home size={20} />, label: 'Home' },
  { page: 'create', icon: <Plus size={20} />, label: 'Create' },
  { page: 'experience', icon: <Camera size={20} />, label: 'Experience' },
];

export default function Layout({ children }: LayoutProps) {
  const { currentPage, navigateTo, user, logout } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-400 flex items-center justify-center">
              <Compass size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Voya
            </span>
          </button>

          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-100"
                />
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-lg mx-auto w-full pb-24">
        {children}
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg">
        <div className="max-w-lg mx-auto px-6 py-2 flex items-center justify-around">
          {navItems.map(item => {
            const isActive = currentPage === item.page ||
              (item.page === 'dashboard' && currentPage === 'itinerary');
            return (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-orange-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-medium ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-orange-500 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
