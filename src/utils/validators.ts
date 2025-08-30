/**
 * Validate phone number (Chinese mobile number)
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate verification code (6 digits)
 */
export const validateVerificationCode = (code: string): boolean => {
  const codeRegex = /^\d{6}$/;
  return codeRegex.test(code);
};

/**
 * Validate email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password (at least 6 characters)
 */
export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate required field
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Validate price (positive number)
 */
export const validatePrice = (price: number): boolean => {
  return price > 0 && Number.isFinite(price);
};

/**
 * Validate quantity (positive integer)
 */
export const validateQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity > 0;
};

/**
 * Get validation error message
 */
export const getValidationErrorMessage = (
  field: string,
  type: string
): string => {
  const messages: { [key: string]: { [key: string]: string } } = {
    phone: {
      required: '请输入手机号',
      invalid: '请输入正确的手机号',
    },
    code: {
      required: '请输入验证码',
      invalid: '请输入6位验证码',
    },
    email: {
      required: '请输入邮箱',
      invalid: '请输入正确的邮箱格式',
    },
    password: {
      required: '请输入密码',
      invalid: '密码至少6位字符',
    },
    name: {
      required: '请输入姓名',
      invalid: '姓名格式不正确',
    },
    address: {
      required: '请输入地址',
      invalid: '地址格式不正确',
    },
  };

  return messages[field]?.[type] || '输入格式不正确';
};
