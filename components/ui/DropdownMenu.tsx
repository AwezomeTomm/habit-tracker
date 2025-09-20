import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}

export function DropdownMenu({ children, trigger, align = 'end' }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 transform -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div
          className={clsx(
            'absolute top-full mt-1 w-48 bg-background border border-border rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200',
            alignmentClasses[align]
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
}

export function DropdownMenuItem({ 
  children, 
  onClick, 
  className,
  variant = 'default' 
}: DropdownMenuItemProps) {
  const variantClasses = {
    default: 'text-foreground hover:bg-accent hover:text-accent-foreground',
    destructive: 'text-destructive hover:bg-destructive/10 hover:text-destructive',
  };

  return (
    <button
      className={clsx(
        'w-full px-4 py-2 text-left text-sm flex items-center space-x-2 transition-colors first:rounded-t-md last:rounded-b-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantClasses[variant],
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
