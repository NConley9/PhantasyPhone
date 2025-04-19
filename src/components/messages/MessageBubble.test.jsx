import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MessageBubble from './MessageBubble';

describe('MessageBubble', () => {
  const mockCharacter = {
    name: 'Test Character',
  };
  
  it('renders a text message correctly', () => {
    const mockMessage = {
      type: 'message',
      content: 'Hello, world!',
    };
    
    render(
      <MessageBubble
        message={mockMessage}
        character={mockCharacter}
        isUser={false}
        onImageClick={() => {}}
      />
    );
    
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });
  
  it('renders a user message with the correct styling', () => {
    const mockMessage = {
      type: 'message',
      content: 'User message',
    };
    
    render(
      <MessageBubble
        message={mockMessage}
        character={mockCharacter}
        isUser={true}
        onImageClick={() => {}}
      />
    );
    
    const messageBubble = screen.getByText('User message').closest('.message-bubble');
    expect(messageBubble).toHaveStyle({ backgroundColor: 'var(--user-message-color)' });
  });
  
  it('renders a character message with the correct styling', () => {
    const mockMessage = {
      type: 'message',
      content: 'Character message',
    };
    
    render(
      <MessageBubble
        message={mockMessage}
        character={mockCharacter}
        isUser={false}
        onImageClick={() => {}}
      />
    );
    
    const messageBubble = screen.getByText('Character message').closest('.message-bubble');
    expect(messageBubble).toHaveStyle({ backgroundColor: 'var(--character-message-color)' });
  });
  
  it('renders an image message correctly', () => {
    const mockMessage = {
      type: 'image',
      content: 'test-image.jpg',
    };
    
    render(
      <MessageBubble
        message={mockMessage}
        character={mockCharacter}
        isUser={false}
        onImageClick={() => {}}
      />
    );
    
    expect(screen.getByText('[Image: test-image.jpg]')).toBeInTheDocument();
  });
  
  it('calls onImageClick when an image is clicked', () => {
    const mockMessage = {
      type: 'image',
      content: 'test-image.jpg',
    };
    
    const mockOnImageClick = vi.fn();
    
    render(
      <MessageBubble
        message={mockMessage}
        character={mockCharacter}
        isUser={false}
        onImageClick={mockOnImageClick}
      />
    );
    
    fireEvent.click(screen.getByText('[Image: test-image.jpg]').closest('.message-image'));
    expect(mockOnImageClick).toHaveBeenCalledWith('test-image.jpg');
  });
});
