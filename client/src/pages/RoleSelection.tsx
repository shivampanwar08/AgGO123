import { Users, Wrench, Leaf, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/appContext';
import { t } from '@/lib/translations';

interface RoleSelectionProps {
  onRoleSelect: (role: 'user' | 'equipment-renter' | 'land-owner') => void;
}

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const { darkMode, language } = useApp();
  
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardClass = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';

  const roles = [
    {
      id: 'user',
      title: t('regular_user', language),
      description: t('regular_user_desc', language),
      icon: <Users size={48} className="text-green-500" />,
      color: 'from-green-500 to-green-600'
    },
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
    }
  ];

  return (
    <div className={`${bgClass} min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300`}>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${textClass} mb-2`}>{t('select_role', language)}</h1>
          <p className={`${textMutedClass} text-sm`}>{t('choose_role_desc', language)}</p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleSelect(role.id as 'user' | 'equipment-renter' | 'land-owner')}
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

        <div className={`text-center text-[11px] ${textMutedClass} pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {t('role_change_settings', language)}
        </div>
      </div>
    </div>
  );
}
