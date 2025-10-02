import React from 'react';

interface EventMediaProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  alt: string;
  className?: string;
}

const EventMedia: React.FC<EventMediaProps> = ({ mediaUrl, mediaType, alt, className }) => {
  if (mediaType === 'video') {
    return (
      <video src={mediaUrl} className={className} autoPlay muted loop playsInline />
    );
  }

  return <img src={mediaUrl} alt={alt} className={className} />;
};

export default EventMedia;
