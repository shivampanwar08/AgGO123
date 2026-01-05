import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Leaf, Phone, Mail, ArrowLeft, User } from 'lucide-react-native';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';

export default function AuthScreen() {
  const { login } = useApp();
  const [step, setStep] = useState('input');
  const [authType, setAuthType] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [verifiedOtpCode, setVerifiedOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOtp, setDebugOtp] = useState('');

  const identifier = authType === 'phone' ? `+91${phoneNumber}` : email;

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
      const data = await api.requestOtp(identifier, authType);
      if (data.debugOtp) {
        setDebugOtp(data.debugOtp);
      }
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await api.verifyOtp(identifier, authType, otp);

      if (data.requiresName) {
        setVerifiedOtpCode(otp);
        setStep('name');
        return;
      }

      if (data.user) {
        login(data.user);
      }
    } catch (err) {
      setError(err.message || 'Invalid OTP');
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
      const data = await api.completeProfile(identifier, authType, name.trim(), verifiedOtpCode);
      if (data.user) {
        login(data.user);
      }
    } catch (err) {
      setError(err.message || 'Failed to complete profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'name') {
      setStep('otp');
    } else if (step === 'otp') {
      setStep('input');
      setOtp('');
      setDebugOtp('');
    }
    setError('');
  };

  const renderInputStep = () => (
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Leaf size={48} color="#16a34a" />
        </View>
        <Text style={styles.appName}>AgGo</Text>
        <Text style={styles.tagline}>Agriculture Marketplace</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, authType === 'phone' && styles.activeTab]}
          onPress={() => setAuthType('phone')}
        >
          <Phone size={18} color={authType === 'phone' ? '#16a34a' : '#6b7280'} />
          <Text style={[styles.tabText, authType === 'phone' && styles.activeTabText]}>Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, authType === 'email' && styles.activeTab]}
          onPress={() => setAuthType('email')}
        >
          <Mail size={18} color={authType === 'email' ? '#16a34a' : '#6b7280'} />
          <Text style={[styles.tabText, authType === 'email' && styles.activeTabText]}>Email</Text>
        </TouchableOpacity>
      </View>

      {authType === 'phone' ? (
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            placeholderTextColor="#9ca3af"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text.replace(/\D/g, ''));
              setError('');
            }}
          />
        </View>
      ) : (
        <TextInput
          style={styles.fullInput}
          placeholder="Enter email address"
          placeholderTextColor="#9ca3af"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
        />
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSendOTP}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Get OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderOtpStep = () => (
    <View style={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ArrowLeft size={24} color="#111827" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to{'\n'}
        <Text style={styles.identifier}>{identifier}</Text>
      </Text>

      {debugOtp ? (
        <View style={styles.debugContainer}>
          <Text style={styles.debugText}>Debug OTP: {debugOtp}</Text>
        </View>
      ) : null}

      <TextInput
        style={styles.otpInput}
        placeholder="Enter 6-digit OTP"
        placeholderTextColor="#9ca3af"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={(text) => {
          setOtp(text.replace(/\D/g, ''));
          setError('');
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleVerifyOTP}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendButton} onPress={handleSendOTP}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNameStep = () => (
    <View style={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <ArrowLeft size={24} color="#111827" />
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <User size={48} color="#16a34a" />
      </View>

      <Text style={styles.title}>What's your name?</Text>
      <Text style={styles.subtitle}>This will be shown to other users</Text>

      <TextInput
        style={styles.fullInput}
        placeholder="Enter your full name"
        placeholderTextColor="#9ca3af"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setError('');
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleCompleteProfile}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {step === 'input' && renderInputStep()}
        {step === 'otp' && renderOtpStep()}
        {step === 'name' && renderNameStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  tagline: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeTabText: {
    color: '#16a34a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 16,
  },
  prefix: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#111827',
  },
  fullInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    color: '#111827',
  },
  otpInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    color: '#111827',
    textAlign: 'center',
    letterSpacing: 8,
  },
  button: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  identifier: {
    fontWeight: '600',
    color: '#111827',
  },
  debugContainer: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  debugText: {
    color: '#92400e',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendText: {
    color: '#16a34a',
    fontSize: 14,
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
});
