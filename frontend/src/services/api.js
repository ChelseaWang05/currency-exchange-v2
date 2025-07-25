// API service for communicating with the backend
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:3000' // Change this to your production backend URL
  : '/api'; // In development, use the proxy

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Currency-related API calls
  async getCurrencies() {
    return this.request('/currencies');
  }

  async getCurrency(id) {
    return this.request(`/currencies/${id}`);
  }

  async createCurrency(currencyData) {
    return this.request('/currencies', {
      method: 'POST',
      body: JSON.stringify(currencyData),
    });
  }

  async updateCurrency(id, currencyData) {
    return this.request(`/currencies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(currencyData),
    });
  }

  async deleteCurrency(id) {
    return this.request(`/currencies/${id}`, {
      method: 'DELETE',
    });
  }

  // Exchange rate API calls
  async getExchangeRates() {
    return this.request('/exchange_rates');
  }

  async getExchangeRate(from, to, date = null) {
    return this.request(`/exchange_rates/convert?from=${from}&to=${to}&date=${date}`);
  }
}

export default new ApiService();
