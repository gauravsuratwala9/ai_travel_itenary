import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CreateTripPage from './pages/CreateTripPage';
import LoadingPage from './pages/LoadingPage';
import ItineraryPage from './pages/ItineraryPage';
import ExperiencePage from './pages/ExperiencePage';

function AppRouter() {
  const { currentPage, user } = useApp();

  if (!user || currentPage === 'auth') {
    return <AuthPage />;
  }

  if (currentPage === 'loading') {
    return <LoadingPage />;
  }

  return (
    <Layout>
      {currentPage === 'dashboard' && <DashboardPage />}
      {currentPage === 'create' && <CreateTripPage />}
      {currentPage === 'itinerary' && <ItineraryPage />}
      {currentPage === 'experience' && <ExperiencePage />}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
