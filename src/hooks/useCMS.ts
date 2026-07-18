'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseCMSOptions {
  autoSave?: boolean;
  autoSaveDelay?: number;
}

export function useCMS(options: UseCMSOptions = {}) {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/site-config');
      if (!response.ok) throw new Error('Failed to fetch configuration');
      const data = await response.json();
      setConfig(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveConfig = useCallback(async (data?: any) => {
    try {
      setSaving(true);
      setError(null);
      const payload = data || config;
      const response = await fetch('/api/site-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('Failed to save');
      const saved = await response.json();
      setConfig(saved);
      setSuccess('Saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
      return saved;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      return null;
    } finally {
      setSaving(false);
    }
  }, [config]);

  const updateSection = useCallback((section: string, data: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  }, []);

  const updateField = useCallback((path: string, value: any) => {
    setConfig((prev: any) => {
      const keys = path.split('.');
      const newConfig = { ...prev };
      let current = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  }, []);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    config,
    setConfig,
    loading,
    saving,
    error,
    success,
    fetchConfig,
    saveConfig,
    updateSection,
    updateField,
    clearMessages,
  };
}
