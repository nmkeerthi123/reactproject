// src/ImageRecognition.js
import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = '80c39fd515eb46a7b742b3624a9d8c74'; 

function ImageRecognition() {
  const [imageUrl, setImageUrl] = useState('');
  const [concepts, setConcepts] = useState([]);

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const recognizeImage = () => {
    axios
      .post(
        'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs',
        {
          inputs: [
            {
              data: {
                image: {
                  url: imageUrl,
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        const concepts = response.data.outputs[0].data.concepts;
        setConcepts(concepts);
      })
      .catch((error) => console.error('Error recognizing image:', error));
  };

  return (
    <div>
      <h2>Image Recognition</h2>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={handleInputChange}
      />
      <button onClick={recognizeImage}>Recognize</button>
      <ul>
        {concepts.map((concept) => (
          <li key={concept.id}>
            {concept.name} - {concept.value.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageRecognition;