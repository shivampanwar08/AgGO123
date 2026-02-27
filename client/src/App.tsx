import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/lib/appContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Drivers from "@/pages/Drivers";
import DriverProfile from "@/pages/DriverProfile";
import Billing from "@/pages/Billing";
import Tracking from "@/pages/Tracking";
import Shops from "@/pages/Shops";
import Marketplace from "@/pages/Marketplace";
import Settings from "@/pages/Settings";
import Splash from "@/pages/Splash";
import Auth from "@/pages/Auth";
import RoleSelection from "@/pages/RoleSelection";
import EquipmentRenterForm from "@/pages/EquipmentRenterForm";
import LandOwnerForm from "@/pages/LandOwnerForm";
import ShopperForm from "@/pages/ShopperForm";
import LandRental from "@/pages/LandRental";
import Garage from "@/pages/Garage";
import Bookings from "@/pages/Bookings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/drivers" component={Drivers}/>
      <Route path="/driver/:id" component={DriverProfile}/>
      <Route path="/shops" component={Shops}/>
      <Route path="/marketplace" component={Marketplace}/>
      <Route path="/land-rental" component={LandRental}/>
      <Route path="/garage" component={Garage}/>
      <Route path="/bookings" component={Bookings}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/billing" component={Billing}/>
      <Route path="/tracking" component={Tracking}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { userRole, setUserRole } = useApp();
  const [showForm, setShowForm] = useState<'equipment' | 'land' | 'shopper' | null>(null);

  const handleFormComplete = () => {
    setShowForm(null);
  };

  const handleRoleSelect = (role: 'user' | 'equipment-renter' | 'land-owner' | 'shopper') => {
    setUserRole(role);
    if (role === 'equipment-renter') {
      setShowForm('equipment');
    } else if (role === 'land-owner') {
      setShowForm('land');
    } else if (role === 'shopper') {
      setShowForm('shopper');
    }
  };

  if (!userRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  if (showForm === 'equipment') {
    return <EquipmentRenterForm onBack={() => setShowForm(null)} onSubmit={handleFormComplete} />;
  }

  if (showForm === 'land') {
    return <LandOwnerForm onBack={() => setShowForm(null)} onSubmit={handleFormComplete} />;
  }

  if (showForm === 'shopper') {
    return <ShopperForm onBack={() => setShowForm(null)} onSubmit={handleFormComplete} />;
  }

  return <Router />;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    const savedPhone = localStorage.getItem('aggo_user_phone');
    if (savedPhone) {
      setIsAuthenticated(true);
      setUserPhone(savedPhone);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuth = (phone: string) => {
    localStorage.setItem('aggo_user_phone', phone);
    setUserPhone(phone);
    setIsAuthenticated(true);
    // Force reset role on new login so user sees RoleSelection
    localStorage.removeItem('aggo_user_role');
  };

  const handleLogout = () => {
    localStorage.removeItem('aggo_user_phone');
    localStorage.removeItem('aggo_user_role');
    setUserPhone(null);
    setIsAuthenticated(false);
  };

  if (showSplash) {
    return <Splash onComplete={handleSplashComplete} />;
  }

  if (!isAuthenticated) {
    return <Auth onAuth={handleAuth} />;
  }

  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <div className="bg-gray-100 min-h-screen flex justify-center items-center dark:bg-black">
            <div className="mobile-container w-full h-[100dvh] flex flex-col overflow-hidden">
              <AppContent />
            </div>
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
