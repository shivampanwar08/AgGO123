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
