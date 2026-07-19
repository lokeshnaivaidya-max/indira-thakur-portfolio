import mongoose, { Schema, Document } from 'mongoose';

export interface IThemeSettings extends Document {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  mutedTextColor: string;
  cardBackground: string;
  cardBorder: string;
  cardRadius: string;
  buttonRadius: string;
  buttonStyle: 'filled' | 'outlined' | 'soft';
  navBackground: string;
  navTextColor: string;
  footerBackground: string;
  footerTextColor: string;
  headingFont: string;
  bodyFont: string;
  shadowIntensity: 'none' | 'light' | 'medium' | 'heavy';
  glassEffect: boolean;
  updatedAt: Date;
}

const ThemeSettingsSchema = new Schema<IThemeSettings>(
  {
    primaryColor: { type: String, default: '#C2186A' },
    secondaryColor: { type: String, default: '#9D1457' },
    accentColor: { type: String, default: '#C2186A' },
    backgroundColor: { type: String, default: '#F8F5F1' },
    surfaceColor: { type: String, default: '#FFFFFF' },
    textColor: { type: String, default: '#111111' },
    mutedTextColor: { type: String, default: '#6E655D' },
    cardBackground: { type: String, default: '#FFFFFF' },
    cardBorder: { type: String, default: '#F4EEE7' },
    cardRadius: { type: String, default: '0px' },
    buttonRadius: { type: String, default: '0px' },
    buttonStyle: { type: String, enum: ['filled', 'outlined', 'soft'], default: 'filled' },
    navBackground: { type: String, default: '#F8F5F1' },
    navTextColor: { type: String, default: '#111111' },
    footerBackground: { type: String, default: '#111111' },
    footerTextColor: { type: String, default: '#FFFFFF' },
    headingFont: { type: String, default: 'Playfair Display' },
    bodyFont: { type: String, default: 'Inter' },
    shadowIntensity: { type: String, enum: ['none', 'light', 'medium', 'heavy'], default: 'light' },
    glassEffect: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.ThemeSettings || mongoose.model<IThemeSettings>('ThemeSettings', ThemeSettingsSchema);
