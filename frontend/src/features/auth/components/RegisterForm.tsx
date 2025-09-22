import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good'];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.password || formData.password.length < 8) newErrors.password = '8+ character password required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Call registration API
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const response = await import('../../../features/auth/api').then(m => m.registerRequest(registerData));
      const userData = response.data;

      console.log('Registration successful:', userData);
      onSuccess?.();
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrors({ general: error.response?.data?.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{errors.general}</span>
          </div>
        </div>
      )}

      {/* Name and Email Row - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Hunter Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            className={`w-full px-4 py-3 bg-solo-accent/20 border rounded-lg text-white placeholder-slate-400
                     focus:outline-none focus:ring-2 transition-all duration-200
                     ${errors.name ? 'border-red-500/50 focus:ring-red-500' : 'border-solo-glow/30 focus:ring-solo-glow focus:border-solo-glow'}`}
            placeholder="Enter your hunter name"
            disabled={loading}
          />
          {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            className={`w-full px-4 py-3 bg-solo-accent/20 border rounded-lg text-white placeholder-slate-400
                     focus:outline-none focus:ring-2 transition-all duration-200
                     ${errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-solo-glow/30 focus:ring-solo-glow focus:border-solo-glow'}`}
            placeholder="your@email.com"
            disabled={loading}
          />
          {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
        </div>
      </div>

      {/* Password Fields Row - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Create Password</label>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange('password')}
              className={`w-full px-4 py-3 bg-solo-accent/20 border rounded-lg text-white placeholder-slate-400
                       focus:outline-none focus:ring-2 transition-all duration-200
                       ${errors.password ? 'border-red-500/50 focus:ring-red-500' : 'border-solo-glow/30 focus:ring-solo-glow focus:border-solo-glow'}`}
              placeholder="Create strong password"
              disabled={loading}
            />
          </div>
          {formData.password && (
            <div className="flex items-center space-x-2">
              <div className="text-xs text-slate-400">Power:</div>
              <div className={`text-xs font-medium ${
                passwordStrength.strength >= 3 ? 'text-rarity-legendary' : 
                passwordStrength.strength >= 2 ? 'text-rarity-epic' : 
                passwordStrength.strength >= 1 ? 'text-rarity-rare' : 'text-red-400'
              }`}>
                {passwordStrength.label || 'Weak'}
              </div>
              <div className="flex-1 bg-solo-primary rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    passwordStrength.strength >= 3 ? 'bg-rarity-legendary' :
                    passwordStrength.strength >= 2 ? 'bg-rarity-epic' :
                    passwordStrength.strength >= 1 ? 'bg-rarity-rare' : 'bg-red-400'
                  }`}
                  style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">Confirm Password</label>
          <input
            type={showPasswords ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            className={`w-full px-4 py-3 bg-solo-accent/20 border rounded-lg text-white placeholder-slate-400
                     focus:outline-none focus:ring-2 transition-all duration-200
                     ${errors.confirmPassword ? 'border-red-500/50 focus:ring-red-500' : 'border-solo-glow/30 focus:ring-solo-glow focus:border-solo-glow'}`}
            placeholder="Confirm your password"
            disabled={loading}
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
        </div>
      </div>

      {/* Shadow Monarch Awakening Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-solo-purple to-rarity-legendary hover:from-rarity-legendary hover:to-rarity-mythic
                 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200
                 transform hover:scale-105 shadow-lg hover:shadow-solo-purple/25 animate-power-pulse
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Awakening Shadow...</span>
          </>
        ) : (
          <>
            <FaUserPlus />
            <span>Arise, New Hunter! 👑</span>
          </>
        )}
      </button>

      {/* Login Link */}
      <div className="text-center">
        <Link to="/login" className="text-solo-glow hover:text-solo-purple transition-colors underline">
          Already a Hunter? Continue your journey
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
