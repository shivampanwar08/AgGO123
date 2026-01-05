import { useState } from 'react';
import { ArrowLeft, Phone, Mail, CheckCircle2, Loader, User } from 'lucide-react';
import { Leaf } from 'lucide-react';

type AuthStep = 'input' | 'otp' | 'name';
type AuthType = 'phone' | 'email';

interface AuthProps {
  onAuth: (user: { id: string; name: string; phone?: string; email?: string; role: string }) => void;
}

export default function Auth({ onAuth }: AuthProps) {
  const [step, setStep] = useState<AuthStep>('input');
  const [authType, setAuthType] = useState<AuthType>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifiedOtpCode, setVerifiedOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOtp, setDebugOtp] = useState('');

  const identifier = authType === 'phone' ? `+91${phoneNumber}` : email;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setPhoneNumber(value);
    setError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError('');
  };

  const validateInput = () => {
    if (authType === 'phone') {
      if (phoneNumber.length !== 10) {
        setError('Please enter a valid 10-digit mobile number');
        return false;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    return true;
  };

  const handleSendOTP = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          type: authType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to send OTP');
        return;
      }

      // For testing - show the OTP (remove in production)
      if (data.debugOtp) {
        setDebugOtp(data.debugOtp);
      }

      setStep('otp');
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    setError('');
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          type: authType,
          code: otpValue,
          name: authType === 'email' ? undefined : name || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid OTP');
        return;
      }

      if (data.requiresName) {
        // Phone user needs to enter name - save OTP code for profile completion
        setVerifiedOtpCode(otpValue);
        setStep('name');
        return;
      }

      if (data.user) {
        // Store user in localStorage for persistence
        localStorage.setItem('aggo_user', JSON.stringify(data.user));
        localStorage.setItem('aggo_user_id', data.user.id);
        localStorage.setItem('aggo_user_phone', data.user.phone || '');
        localStorage.setItem('aggo_user_email', data.user.email || '');
        localStorage.setItem('aggo_user_role', data.user.role || 'user');
        onAuth(data.user);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteProfile = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier,
          type: authType,
          name: name.trim(),
          otpCode: verifiedOtpCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to complete profile');
        return;
      }

      if (data.user) {
        localStorage.setItem('aggo_user', JSON.stringify(data.user));
        localStorage.setItem('aggo_user_id', data.user.id);
        localStorage.setItem('aggo_user_phone', data.user.phone || '');
        localStorage.setItem('aggo_user_email', data.user.email || '');
        localStorage.setItem('aggo_user_role', data.user.role || 'user');
        onAuth(data.user);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtp(['', '', '', '', '', '']);
    await handleSendOTP();
  };

  const handleBack = () => {
    if (step === 'name') {
      setStep('otp');
    } else if (step === 'otp') {
      setStep('input');
      setOtp(['', '', '', '', '', '']);
      setDebugOtp('');
    }
    setError('');
  };

  const switchAuthType = () => {
    setAuthType(authType === 'phone' ? 'email' : 'phone');
    setError('');
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50 flex flex-col items-center justify-center z-50 p-4 overflow-y-auto" data-testid="auth-page">
      <div className="w-full max-w-sm space-y-8 py-8">
        {/* Logo Section */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-xl">
                <Leaf size={32} className="text-white" fill="white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight" data-testid="text-app-title">AgGo</h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Agriculture Platform</p>
        </div>

        {/* Input Step */}
        {step === 'input' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-welcome">Welcome Back</h2>
              <p className="text-sm text-gray-600">
                {authType === 'phone' 
                  ? 'Enter your mobile number to sign up or login'
                  : 'Enter your email address to sign up or login'
                }
              </p>
            </div>

            <div className="space-y-4">
              {authType === 'phone' ? (
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-600 font-bold text-sm">
                    <Phone size={16} />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    data-testid="input-phone"
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-20 pr-4 py-4 text-lg font-bold text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    data-testid="input-email"
                    className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-lg font-bold text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400"
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm font-medium flex items-center gap-2" data-testid="text-error">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={isLoading || (authType === 'phone' ? phoneNumber.length !== 10 : !email)}
                data-testid="button-send-otp"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send OTP'
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button 
                onClick={switchAuthType}
                data-testid="button-switch-auth"
                className="w-full bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {authType === 'phone' ? (
                  <>
                    <Mail size={18} />
                    Continue with Email
                  </>
                ) : (
                  <>
                    <Phone size={18} />
                    Continue with Phone
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <span className="text-green-600 font-bold cursor-pointer hover:underline">Terms of Service</span>
            </p>
          </div>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <button
              onClick={handleBack}
              data-testid="button-back"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} />
              {authType === 'phone' ? 'Change Number' : 'Change Email'}
            </button>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-verify-otp">Verify OTP</h2>
              <p className="text-sm text-gray-600">
                Enter the 6-digit OTP sent to{' '}
                <span className="font-bold text-gray-900" data-testid="text-identifier">
                  {authType === 'phone' ? `+91 ${phoneNumber}` : email}
                </span>
              </p>
            </div>

            {debugOtp && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-800 text-sm">
                <span className="font-bold">Demo OTP:</span> {debugOtp}
              </div>
            )}

            <div className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    maxLength={1}
                    data-testid={`input-otp-${index}`}
                    className="w-12 h-14 bg-white border-2 border-gray-300 rounded-xl text-center text-xl font-bold text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm font-medium flex items-center gap-2" data-testid="text-error">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.join('').length !== 6}
                data-testid="button-verify-otp"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Verify OTP
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Didn't receive OTP?</p>
                <button 
                  onClick={handleResendOTP}
                  disabled={isLoading}
                  data-testid="button-resend-otp"
                  className="text-green-600 font-bold text-sm hover:underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Name Step (for phone users) */}
        {step === 'name' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <button
              onClick={handleBack}
              data-testid="button-back"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900" data-testid="text-complete-profile">Complete Your Profile</h2>
              <p className="text-sm text-gray-600">
                Please enter your name to continue
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-600">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleNameChange}
                  data-testid="input-name"
                  className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-4 text-lg font-bold text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm font-medium flex items-center gap-2" data-testid="text-error">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <button
                onClick={handleCompleteProfile}
                disabled={isLoading || !name.trim()}
                data-testid="button-complete-profile"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Continue
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600">
            <span className="text-green-600 font-bold">Demo Mode:</span> OTP will be shown on screen
          </p>
        </div>
      </div>
    </div>
  );
}
