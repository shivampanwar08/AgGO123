import { useState } from 'react';
import { useApp } from '@/lib/appContext';
import RoleSelection from './RoleSelection';
import EquipmentRenterForm from './EquipmentRenterForm';
import LandOwnerForm from './LandOwnerForm';
import ShopperForm from './ShopperForm';

interface RoleChangeFlowProps {
  onComplete: () => void;
}

export default function RoleChangeFlow({ onComplete }: RoleChangeFlowProps) {
  const { setUserRole } = useApp();
  const [selectedRole, setSelectedRole] = useState<'user' | 'equipment-renter' | 'land-owner' | 'shopper' | null>(null);

  const handleRoleSelect = (role: 'user' | 'equipment-renter' | 'land-owner' | 'shopper') => {
    setSelectedRole(role);
    if (role === 'user') {
      setUserRole(role);
      onComplete();
    }
  };

  const handleFormSubmit = () => {
    if (selectedRole && selectedRole !== 'user') {
      setUserRole(selectedRole);
    }
    onComplete();
  };

  const handleFormBack = () => {
    setSelectedRole(null);
  };

  if (!selectedRole) {
    return <RoleSelection onRoleSelect={handleRoleSelect} />;
  }

  if (selectedRole === 'equipment-renter') {
    return <EquipmentRenterForm onBack={handleFormBack} onSubmit={handleFormSubmit} />;
  }

  if (selectedRole === 'land-owner') {
    return <LandOwnerForm onBack={handleFormBack} onSubmit={handleFormSubmit} />;
  }

  if (selectedRole === 'shopper') {
    return <ShopperForm onBack={handleFormBack} onSubmit={handleFormSubmit} />;
  }

  return null;
}
