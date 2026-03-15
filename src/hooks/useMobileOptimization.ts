'use client';

import { useState, useEffect } from 'react';

interface MobileOptimizationState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  screenWidth: number;
  screenHeight: number;
}

export function useMobileOptimization(): MobileOptimizationState {
  const [state, setState] = useState<MobileOptimizationState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'landscape',
    screenWidth: 1920,
    screenHeight: 1080,
  });

  useEffect(() => {
    const updateState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait',
        screenWidth: width,
        screenHeight: height,
      });
    };

    updateState();
    window.addEventListener('resize', updateState);
    window.addEventListener('orientationchange', updateState);

    return () => {
      window.removeEventListener('resize', updateState);
      window.removeEventListener('orientationchange', updateState);
    };
  }, []);

  return state;
}

export const getResponsiveClasses = (state: MobileOptimizationState) => ({
  // Container classes
  container: `
    ${state.isMobile ? 'px-3 py-4' : state.isTablet ? 'px-4 py-6' : 'px-6 py-8'}
    ${state.isMobile ? 'gap-4' : 'gap-6'}
  `,
  
  // Grid classes
  gridCols: state.isMobile ? 'grid-cols-1' : state.isTablet ? 'grid-cols-2' : 'grid-cols-4',
  
  // Table classes
  tableContainer: state.isMobile ? 'overflow-x-auto' : '',
  tableMinWidth: state.isMobile ? 'min-w-full' : 'min-w-full',
  
  // Button classes
  button: state.isMobile ? 'px-3 py-2 text-sm' : state.isTablet ? 'px-4 py-2 text-sm' : 'px-6 py-2',
  
  // Input classes
  input: state.isMobile ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-sm',
  
  // Text classes
  heading: state.isMobile ? 'text-lg' : 'text-xl',
  subheading: state.isMobile ? 'text-base' : 'text-lg',
  
  // Navigation classes
  navTabs: state.isMobile ? 'flex-nowrap overflow-x-auto' : '',
  navButton: state.isMobile ? 'px-3 py-2 text-xs' : 'px-6 py-4 text-sm',
  
  // Card classes
  card: state.isMobile ? 'p-4' : state.isTablet ? 'p-6' : 'p-6',
  
  // Modal classes
  modal: state.isMobile ? 'w-full h-full' : state.isTablet ? 'w-11/12 h-5/6' : 'w-3/4 h-3/4',
  
  // Form classes
  formGrid: state.isMobile ? 'grid-cols-1' : state.isTablet ? 'grid-cols-2' : 'grid-cols-3',
});

export const getMobileOptimizedStyles = (state: MobileOptimizationState) => ({
  // Touch-friendly targets (minimum 44px for mobile)
  touchTarget: {
    minHeight: state.isMobile ? '44px' : 'auto',
    minWidth: state.isMobile ? '44px' : 'auto',
  },
  
  // Responsive font sizes
  fontSize: {
    xs: state.isMobile ? '0.75rem' : '0.875rem',
    sm: state.isMobile ? '0.875rem' : '1rem',
    base: state.isMobile ? '1rem' : '1.125rem',
    lg: state.isMobile ? '1.125rem' : '1.25rem',
    xl: state.isMobile ? '1.25rem' : '1.5rem',
  },
  
  // Responsive spacing
  spacing: {
    xs: state.isMobile ? '0.5rem' : '0.75rem',
    sm: state.isMobile ? '0.75rem' : '1rem',
    md: state.isMobile ? '1rem' : '1.5rem',
    lg: state.isMobile ? '1.5rem' : '2rem',
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1024px',
  },
});
