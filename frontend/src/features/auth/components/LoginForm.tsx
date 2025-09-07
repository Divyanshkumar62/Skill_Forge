import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';

interface LoginFormProps {
  onSuccess?: (userData: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  // Client-side validation
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Call login API
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await import('../../../features/auth/api').then(m => m.loginRequest(loginData));
      const userData = response.data;

      console.log('Login successful:', userData);
      onSuccess?.(userData);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({
        general: error.response?.data?.message || 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear field error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {errors.general && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm"
             role="alert" aria-live="polite">
          <div className="flex items-center space-x-2">
            <span>⚠️</span>
            <span>{errors.general}</span>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-slate-200">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400
                   focus:outline-none focus:ring-2 transition-all duration-200
                   ${errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
          placeholder="your@email.com"
          disabled={loading}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-400 text-sm" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-slate-200">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange('password')}
            className={`w-full px-4 py-3 pr-12 bg-slate-800/50 border rounded-lg text-white placeholder-slate-400
                     focus:outline-none focus:ring-2 transition-all duration-200
                     ${errors.password ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
            placeholder="Enter your password"
            disabled={loading}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={loading}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="text-red-400 text-sm" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700
                 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200
                 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                 flex items-center justify-center space-x-2"
        aria-describedby="login-button"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Leveling Up...</span>
          </>
        ) : (
          <>
            <FaSignInAlt />
            <span>Begin Your Journey 🔥</span>
          </>
        )}
      </button>

      {/* Links */}
      <div className="text-center space-y-2">
        <Link
          to="/register"
          className="block text-slate-300 hover:text-cyan-400 transition-colors duration-200 underline"
        >
          New to Skill Forge? Create your account
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
