import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const requirements = [
    { 
      label: 'At least 8 characters',
      test: (pass: string) => pass.length >= 8 
    },
    { 
      label: 'Contains uppercase letter',
      test: (pass: string) => /[A-Z]/.test(pass)
    },
    { 
      label: 'Contains lowercase letter',
      test: (pass: string) => /[a-z]/.test(pass)
    },
    { 
      label: 'Contains number',
      test: (pass: string) => /[0-9]/.test(pass)
    },
    { 
      label: 'Contains special character',
      test: (pass: string) => /[^A-Za-z0-9]/.test(pass)
    }
  ];

  const strength = requirements.filter(req => req.test(password)).length;
  const getStrengthText = () => {
    if (strength === 0) return '';
    if (strength <= 2) return 'Weak';
    if (strength <= 4) return 'Medium';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (strength <= 2) return 'text-red-500 dark:text-red-400';
    if (strength <= 4) return 'text-yellow-500 dark:text-yellow-400';
    return 'text-green-500 dark:text-green-400';
  };

  return (
    <div className="mt-2 space-y-2">
      {password && (
        <p className="text-sm">
          Password strength:{' '}
          <span className={getStrengthColor()}>
            {getStrengthText()}
          </span>
        </p>
      )}

      <div className="space-y-1">
        {requirements.map((req) => (
          <div 
            key={req.label} 
            className={`text-sm ${
              !password ? 'text-gray-400 dark:text-gray-500' :
              req.test(password) 
                ? 'text-gray-400 dark:text-gray-500 line-through' 
                : 'text-red-500 dark:text-red-400'
            }`}
          >
            {req.label}
          </div>
        ))}
      </div>
    </div>
  );
};