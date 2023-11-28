import React, { useState, useEffect } from 'react';

const S3ImageDisplay = ({ s3ImageUrl }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchS3Image = async () => {
      try {
        const response = await fetch(s3ImageUrl);

        if (response.ok) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);
          setImageUrl(objectUrl);
        } else {
          console.error('Error fetching image:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };

    fetchS3Image();
  }, [s3ImageUrl]);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="S3 Image Not loading" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default S3ImageDisplay;
