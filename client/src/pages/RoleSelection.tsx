import { Users, Wrench, Leaf, ArrowRight, ShoppingCart, ChevronLeft } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';
import { useState } from 'react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'user' | 'equipment-renter' | 'land-owner' | 'shopper') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const { darkMode, language } = useApp();
  const [step, setStep] = useState<'initial' | 'provider'>('initial');

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  const providerRoles = [
    {
      id: 'equipment-renter',
      title: t('equipment_renter', language),
      description: t('equipment_renter_desc', language),
      icon: <Wrench size={48} className="text-blue-500" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'land-owner',
      title: t('land_owner', language),
      description: t('land_owner_desc', language),
      icon: <Leaf size={48} className="text-amber-500" />,
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'shopper',
      title: t('shopper', language),
      description: t('shopper_desc', language),
      icon: <ShoppingCart size={48} className="text-purple-500" />,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  if (step === 'initial') {
    return (
      <div className={`${bgClass} min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300`}>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <h1 className={`text-4xl font-bold ${textClass} mb-2`}>AgGo</h1>
            <p className={`${textMutedClass} text-sm`}>{t('choose_role_desc', language)}</p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={() => onRoleSelect('user')}
              className={`w-full ${cardClass} border-2 hover:border-green-500 rounded-3xl p-6 transition-all hover:shadow-xl active:scale-95 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Users size={120} />
              </div>
              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="p-3 rounded-2xl bg-green-500/10 mb-4">
                  <Users size={32} className="text-green-500" />
                </div>
                <h3 className={`text-2xl font-bold ${textClass} mb-1`}>{t('i_want_to_hire', language) || 'I want to Hire/Buy'}</h3>
                <p className={`text-sm ${textMutedClass}`}>{t('i_want_to_hire_desc', language) || 'Find tractors, land, seeds & more'}</p>
              </div>
            </button>

            <button
              onClick={() => setStep('provider')}
              className={`w-full ${cardClass} border-2 hover:border-blue-500 rounded-3xl p-6 transition-all hover:shadow-xl active:scale-95 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Wrench size={120} />
              </div>
              <div className="relative z-10 flex flex-col items-start text-left">
                <div className="p-3 rounded-2xl bg-blue-500/10 mb-4">
                  <Wrench size={32} className="text-blue-500" />
                </div>
                <h3 className={`text-2xl font-bold ${textClass} mb-1`}>{t('i_want_to_sell', language) || 'I want to Sell/Rent'}</h3>
                <p className={`text-sm ${textMutedClass}`}>{t('i_want_to_sell_desc', language) || 'List your services & products'}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgClass} min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300`}>
      <div className="w-full max-w-md space-y-6">
        <button 
          onClick={() => setStep('initial')}
          className={`flex items-center gap-2 ${textMutedClass} hover:${textClass} transition-colors mb-4`}
        >
          <ChevronLeft size={20} />
          {t('back_to_selection', language) || 'Back'}
        </button>

        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>{t('what_to_offer', language) || 'What to offer?'}</h1>
        </div>

        <div className="space-y-3">
          {providerRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleSelect(role.id as 'equipment-renter' | 'land-owner' | 'shopper')}
              className={`w-full ${cardClass} border rounded-2xl p-4 transition-all hover:shadow-lg active:scale-95`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${role.color} bg-opacity-20 flex-shrink-0`}>
                  {role.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-bold ${textClass} mb-1`}>{role.title}</h3>
                  <p className={`text-xs ${textMutedClass}`}>{role.description}</p>
                </div>
                <ArrowRight size={20} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
