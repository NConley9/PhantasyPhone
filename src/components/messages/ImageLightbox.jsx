import React from 'react';

const ImageLightbox = ({ imageSrc, onClose }) => {
  return (
    <div 
      className="lightbox"
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
      }}
    >
      <div className="lightbox-content" style={{
        position: 'relative',
        maxWidth: '90%',
        maxHeight: '90%'
      }}>
        <div style={{
          width: '300px',
          height: '300px',
          backgroundColor: 'var(--medium-gray)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white'
        }}>
          [Full Image: {imageSrc}]
        </div>
        
        <div 
          className="lightbox-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '-40px',
            right: '0',
            color: 'white',
            fontSize: '30px',
            cursor: 'pointer'
          }}
        >
          ✕
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
