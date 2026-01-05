const API_BASE_URL = 'https://your-app-name.replit.app';

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
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async requestOtp(identifier, type) {
    return this.request('/api/auth/request-otp', {
      method: 'POST',
      body: JSON.stringify({ identifier, type }),
    });
  }

  async verifyOtp(identifier, type, code) {
    return this.request('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ identifier, type, code }),
    });
  }

  async completeProfile(identifier, type, name, otpCode) {
    return this.request('/api/auth/complete-profile', {
      method: 'POST',
      body: JSON.stringify({ identifier, type, name, otpCode }),
    });
  }

  async getEquipment() {
    return this.request('/api/equipment');
  }

  async getLands() {
    return this.request('/api/lands');
  }

  async getMarketplace() {
    return this.request('/api/marketplace');
  }

  async getProducts() {
    return this.request('/api/products');
  }

  async createEquipment(data) {
    return this.request('/api/equipment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createLand(data) {
    return this.request('/api/lands', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createMarketplaceItem(data) {
    return this.request('/api/marketplace', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(userId, data) {
    return this.request(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
export { API_BASE_URL };
