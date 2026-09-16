import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, BookOpen, ChevronDown, Check, Palette } from 'lucide-react';
import { useApp, ThemeMode } from '../../context/AppContext';

interface ThemeToggleButtonProps {
  showLabel?: boolean;
  variant?: 'compact' | 'pill' | 'expanded';
  className?: string;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  showLabel = false,
  variant = 'compact',
  className = '',
}) => {
  const { theme, setTheme, toggleTheme } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const themes: { id: ThemeMode; label: string; description: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'light',
      label: 'Daylight',
      description: 'Clean high-contrast light mode',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      color: 'text-amber-500',
    },
    {
      id: 'dark',
      label: 'Night Study',
      description: 'Deep midnight dark mode for night owls',
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      color: 'text-indigo-400',
    },
    {
      id: 'sepia',
      label: 'Warm Eye-Care',
      description: 'Paper tone for long reading sessions',
      icon: <BookOpen className="w-4 h-4 text-amber-700" />,
      color: 'text-amber-700',
    },
  ];

  const currentThemeObj = themes.find(t => t.id === theme) || themes[0];

  const handleSelectTheme = (newTheme: ThemeMode, e: React.MouseEvent) => {
    e.stopPropagation();
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  if (variant === 'expanded') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 px-1 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-blue-500" />
          <span>Display Theme</span>
        </p>
        <div className="grid grid-cols-3 gap-2">
          {themes.map(t => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={(e) => handleSelectTheme(t.id, e)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 text-blue-700 dark:bg-blue-950/40 dark:border-blue-400 dark:text-blue-300 font-bold shadow-xs'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                <div className="mb-1.5">{t.icon}</div>
                <span className="truncate w-full text-center">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center ${className}`} ref={dropdownRef}>
      {/* Combined Button: Click icon to toggle directly, click arrow for theme menu */}
      <div 
        className="inline-flex items-center rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80 p-0.5 shadow-2xs transition group"
      >
        <button
          type="button"
          id="theme-change-btn"
          onClick={toggleTheme}
          aria-label={`Current theme: ${currentThemeObj.label}. Click to cycle themes`}
          title={`Theme: ${currentThemeObj.label} (Click to toggle, arrow for options)`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-xs transition cursor-pointer"
        >
          <span className="transition-transform duration-300 group-hover:rotate-12">
            {currentThemeObj.icon}
          </span>
          {showLabel && (
            <span className="hidden sm:inline-block font-semibold">
              {currentThemeObj.label}
            </span>
          )}
        </button>

        {/* Dropdown Opener Arrow */}
        <button
          type="button"
          id="theme-dropdown-arrow-btn"
          onClick={(e) => {
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }}
          aria-label="Open theme options menu"
          className="px-1.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer border-l border-slate-200/60 dark:border-slate-700/60"
        >
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Floating Dropdown Menu */}
      {dropdownOpen && (
        <div 
          className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-850 rounded-2xl shadow-xl border border-slate-200/90 dark:border-slate-700 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-750">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Select Theme
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personalize your study experience
            </p>
          </div>

          <div className="py-1 space-y-0.5">
            {themes.map(t => {
              const isSelected = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={(e) => handleSelectTheme(t.id, e)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-bold dark:bg-blue-950/40 dark:text-blue-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="p-1 rounded-lg bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/60 dark:border-slate-700">
                      {t.icon}
                    </span>
                    <div>
                      <div className="font-semibold">{t.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-400 line-clamp-1">
                        {t.description}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
