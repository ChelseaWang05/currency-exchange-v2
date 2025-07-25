import React, { useState } from 'react'
import { useEffect } from 'react'
import api from './services/api'

const Currency = () => {
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rate = await api.getExchangeRate(1, 4, 20250724);
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };
    fetchExchangeRate();
  }, []);

  return (
    <div>Currency</div>
  )
}

export default Currency