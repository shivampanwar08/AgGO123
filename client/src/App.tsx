import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Drivers from "@/pages/Drivers";
import Billing from "@/pages/Billing";
import Tracking from "@/pages/Tracking";
import BottomNav from "@/components/BottomNav";

// Placeholder pages
const Shops = () => <div className="p-4 pt-20 text-center font-bold text-gray-500">Shops Coming Soon <BottomNav /></div>;
const Settings = () => <div className="p-4 pt-20 text-center font-bold text-gray-500">Settings Coming Soon <BottomNav /></div>;

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/drivers" component={Drivers}/>
      <Route path="/shops" component={Shops}/>
      <Route path="/settings" component={Settings}/>
      <Route path="/billing" component={Billing}/>
      <Route path="/tracking" component={Tracking}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
