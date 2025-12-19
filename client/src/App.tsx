import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/drivers" component={Drivers}/>
      <Route path="/driver/:id" component={DriverProfile}/>
      <Route path="/shops" component={Shops}/>
      <Route path="/marketplace" component={Marketplace}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/billing" component={Billing}/>
      <Route path="/tracking" component={Tracking}/>
      <Route component={NotFound} />
    </Switch>
  );
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
  };

  const handleLogout = () => {
    localStorage.removeItem('aggo_user_phone');
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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
