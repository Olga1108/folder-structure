import { useState, useEffect } from 'react';

const API_URL = '/api/fileStructure';
const INVALID_PAYLOAD_MSG = 'Invalid file structure';

function isValidFileStructure(payload) {
  return (
    payload &&
    typeof payload === 'object' &&
    payload.root &&
    typeof payload.root === 'object'
  );
}

export function useFileStructure() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((payload) => {
        if (!isValidFileStructure(payload)) {
          throw new Error(INVALID_PAYLOAD_MSG);
        }
        setData(payload);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
