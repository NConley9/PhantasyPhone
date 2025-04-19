import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PhoneContainer from './PhoneContainer';
import { SettingsContext } from '../../context/SettingsContext';

// Mock the SettingsContext
const mockSettingsContext = {
  currentWallpaper: 'default.jpg',
};

// Mock the useContext hook
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => mockSettingsContext,
  };
});

describe('PhoneContainer', () => {
  it('renders children correctly', () => {
    render(
      <PhoneContainer>
        <div data-testid="test-child">Test Child</div>
      </PhoneContainer>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toHaveTextContent('Test Child');
  });
  
  it('renders the StatusBar component', () => {
    render(
      <PhoneContainer>
        <div>Test Child</div>
      </PhoneContainer>
    );
    
    // The StatusBar component should be rendered
    expect(document.querySelector('.status-bar')).toBeInTheDocument();
  });
});
