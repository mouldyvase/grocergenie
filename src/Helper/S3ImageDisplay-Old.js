import React, { useState, useEffect } from 'react';

const S3ImageDisplayOld = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchS3Image = async () => {
      try {
        // Replace 'your-s3-image-url' with the actual URL of your image in S3
        const response = await fetch(
            "https://retailtrade1.s3.amazonaws.com/images/temp11189023264625931312.tmp-1700490851357?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231120T143413Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=AKIASMDHLXVAMRA4RVGR%2F20231120%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=7a2dfc085875d71b10bb3b08e37bf85ffb0fd8c41c27dc92bc9322923b5a9be9");
        
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
  }, []);

  return (
    <div>
      {imageUrl ? (
        <img src={imageUrl} alt="S3 Image" />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default S3ImageDisplayOld;
