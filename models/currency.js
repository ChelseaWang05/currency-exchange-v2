// Currency model
class Currency {
  constructor(data = {}) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.is_active = data.is_active !== undefined ? data.is_active : false;
  }

  // Validation methods
  validate() {
    const errors = [];
    
    if (!this.code || this.code.length !== 3) {
      errors.push('Currency code must be exactly 3 characters');
    }
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Currency name is required');
    }
    
    return errors;
  }

  // Check if currency is valid
  isValid() {
    return this.validate().length === 0;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      is_active: this.is_active
    };
  }

  // Convert to plain object
  toObject() {
    return this.toJSON();
  }
}

export default Currency;
