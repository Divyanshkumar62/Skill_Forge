import React, { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { createHabit } from './api';
import type { CreateHabitData } from './types';

interface NewHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHabitCreated?: () => void;
}

const NewHabitModal: React.FC<NewHabitModalProps> = ({ isOpen, onClose, onHabitCreated }) => {
  const [formData, setFormData] = useState<CreateHabitData>({
    title: '',
    description: '',
    frequency: 'daily',
    xpReward: 10,
  });

  const [advancedSettings, setAdvancedSettings] = useState({
    daysOfWeek: [] as number[],
    customDays: 1,
    startDate: '',
    endDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (key: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[key];
      return newErrors;
    });
  };

  const dayLabels = [
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' },
    { value: 0, label: 'Sun' },
  ];

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({
        title: '',
        description: '',
        frequency: 'daily',
        xpReward: 10,
      });
      setAdvancedSettings({
        daysOfWeek: [],
        customDays: 1,
        startDate: '',
        endDate: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Habit name is required';
    }

    if (formData.frequency === 'weekly' && advancedSettings.daysOfWeek.length === 0) {
      newErrors.daysOfWeek = 'Select at least one day for weekly habits';
    }

    if (formData.frequency === 'custom' && advancedSettings.customDays < 1) {
      newErrors.customDays = 'Must be at least 1 day';
    }

    if (advancedSettings.startDate && advancedSettings.endDate) {
      if (new Date(advancedSettings.startDate) >= new Date(advancedSettings.endDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (!formData.xpReward || formData.xpReward <= 0) {
      newErrors.xpReward = 'XP reward must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const habitData: CreateHabitData = {
        ...formData,
        ...(formData.frequency === 'weekly' && advancedSettings.daysOfWeek.length > 0 && { daysOfWeek: advancedSettings.daysOfWeek }),
        ...(formData.frequency === 'custom' && advancedSettings.customDays > 0 && { customDays: advancedSettings.customDays }),
        ...(advancedSettings.startDate && { startDate: advancedSettings.startDate }),
        ...(advancedSettings.endDate && { endDate: advancedSettings.endDate }),
      };

      const result = await createHabit(habitData);
      if (result.success) {
        onHabitCreated?.();
        onClose();
      } else {
        setErrors({ general: result.error || 'Failed to create habit. Please try again.' });
      }
    } catch (err: any) {
      console.error('Failed to create habit:', err);
      setErrors({ general: err.response?.data?.message || 'Failed to create habit. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value } as CreateHabitData));
    if (errors[field]) {
      clearError(field);
    }
  };

  const handleDayToggle = (day: number) => {
    setAdvancedSettings(prev => ({
      ...prev,
      daysOfWeek: prev.daysOfWeek.includes(day)
        ? prev.daysOfWeek.filter(d => d !== day)
        : [...prev.daysOfWeek, day],
    }));
    if (errors.daysOfWeek) {
      clearError('daysOfWeek');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl shadow-2xl
                      max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100">Create New Habit</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-200 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
              {errors.general}
            </div>
          )}

          {/* Habit Name */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-2">
              Habit Name *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100 placeholder-slate-400
                       focus:outline-none focus:ring-2 transition-all duration-200
                       ${errors.title ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
              placeholder="e.g., Drink water, Exercise, Meditate"
              disabled={loading}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-200 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100
                       placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500
                       focus:border-cyan-500 transition-all duration-200 resize-none"
              placeholder="Describe why you want to build this habit..."
              disabled={loading}
            />
          </div>

          {/* Frequency & XP Reward Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Frequency */}
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-slate-200 mb-2">
                Frequency *
              </label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value as 'daily' | 'weekly' | 'custom')}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                         transition-all duration-200"
                disabled={loading}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="custom">Custom Interval</option>
              </select>
            </div>

            {/* XP Reward */}
            <div>
              <label htmlFor="xpReward" className="block text-sm font-medium text-slate-200 mb-2">
                XP Reward *
              </label>
              <input
                id="xpReward"
                type="number"
                min="1"
                max="100"
                value={formData.xpReward}
                onChange={(e) => handleInputChange('xpReward', parseInt(e.target.value) || 1)}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100
                         focus:outline-none focus:ring-2 transition-all duration-200
                         ${errors.xpReward ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
                disabled={loading}
              />
              {errors.xpReward && (
                <p className="mt-1 text-sm text-red-400">{errors.xpReward}</p>
              )}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">

            {/* Weekly Days Selection */}
            {formData.frequency === 'weekly' && (
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Days of Week *
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {dayLabels.map((day) => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => handleDayToggle(day.value)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                               ${advancedSettings.daysOfWeek.includes(day.value)
                                 ? 'bg-cyan-500 text-white shadow-md'
                                 : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                      disabled={loading}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
                {errors.daysOfWeek && (
                  <p className="mt-1 text-sm text-red-400">{errors.daysOfWeek}</p>
                )}
              </div>
            )}

            {/* Custom Days */}
            {formData.frequency === 'custom' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customDays" className="block text-sm font-medium text-slate-200 mb-2">
                    Every X Days *
                  </label>
                  <input
                    id="customDays"
                    type="number"
                    min="1"
                    value={advancedSettings.customDays}
                    onChange={(e) => {
                      setAdvancedSettings(prev => ({
                        ...prev,
                        customDays: parseInt(e.target.value) || 1,
                      }));
                      if (errors.customDays) {
                        clearError('customDays');
                      }
                    }}
                    className={`w-full px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-100
                             focus:outline-none focus:ring-2 transition-all duration-200
                             ${errors.customDays ? 'border-red-500/50 focus:ring-red-500' : 'border-slate-600 focus:ring-cyan-500 focus:border-cyan-500'}`}
                    disabled={loading}
                  />
                  {errors.customDays && (
                    <p className="mt-1 text-sm text-red-400">{errors.customDays}</p>
                  )}
                </div>
              </div>
            )}

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-200 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Start Date (Optional)
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={advancedSettings.startDate}
                  onChange={(e) => setAdvancedSettings(prev => ({
                    ...prev,
                    startDate: e.target.value,
                  }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                         transition-all duration-200"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-200 mb-2">
                  <FaClock className="inline mr-2" />
                  End Date (Optional)
                </label>
                <input
                  id="endDate"
                  type="date"
                  value={advancedSettings.endDate}
                  onChange={(e) => {
                    setAdvancedSettings(prev => ({
                      ...prev,
                      endDate: e.target.value,
                    }));
                    if (errors.endDate) {
                      clearError('endDate');
                    }
                  }}
                  min={advancedSettings.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500
                         transition-all duration-200"
                  disabled={loading}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-400">{errors.endDate}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200
                       font-medium rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-slate-500"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600
                       hover:from-cyan-600 hover:to-purple-700 text-white font-medium
                       rounded-lg transition-all duration-200 transform hover:scale-105
                       shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50
                       disabled:cursor-not-allowed disabled:transform-none
                       focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Habit...
                </div>
              ) : (
                'Create Habit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHabitModal;
