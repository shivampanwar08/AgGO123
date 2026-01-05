import { useState } from 'react';
import { ArrowLeft, Phone, CheckCircle2, Loader } from 'lucide-react';
import { Leaf } from 'lucide-react';

export default function Auth({ onAuth }: { onAuth: (phone: string) => void }) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.slice(0, 10);
    setPhoneNumber(value);
    setError('');
  };

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setError('');
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    setError('');
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 4) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAuth(`+91${phoneNumber}`);
    }, 1500);
  };

  const handleBackToPhone = () => {
    setStep('phone');
    setOtp(['', '', '', '']);
    setError('');
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-green-50 flex flex-col items-center justify-center z-50 p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo Section */}
        <div className="text-center pt-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-4 shadow-xl">
                <Leaf size={32} className="text-white" fill="white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">AgGo</h1>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2">Agriculture Platform</p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-sm text-gray-600">Enter your mobile number to sign up or login</p>
            </div>

            <div className="space-y-4">
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
                  className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-20 pr-4 py-4 text-lg font-bold text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all placeholder:text-gray-400"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <button
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length !== 10}
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

              <button className="w-full bg-white border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-2xl hover:bg-gray-50 transition-all active:scale-95">
                Continue with Email
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <span className="text-green-600 font-bold cursor-pointer hover:underline">Terms of Service</span>
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <button
              onClick={handleBackToPhone}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-bold"
            >
              <ArrowLeft size={16} />
              Change Number
            </button>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
              <p className="text-sm text-gray-600">
                Enter the 4-digit OTP sent to <span className="font-bold text-gray-900">+91 {phoneNumber}</span>
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    maxLength={1}
                    className="w-16 h-16 bg-white border-2 border-gray-300 rounded-xl text-center text-2xl font-bold text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                  />
                ))}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm font-medium flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.join('').length !== 4}
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
                <button className="text-green-600 font-bold text-sm hover:underline">Resend OTP</button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-green-50/50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600">
            <span className="text-green-600 font-bold">Demo Mode:</span> Use any mobile number
          </p>
        </div>
      </div>
    </div>
  );
}
