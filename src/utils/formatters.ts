/**
 * Format price with currency symbol
 */
export const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};

/**
 * Format price without decimal if it's a whole number
 */
export const formatPriceSimple = (price: number): string => {
  return price % 1 === 0 ? `¥${price}` : `¥${price.toFixed(2)}`;
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format date with time
 */
export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time only
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format distance
 */
export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * Format rating with star
 */
export const formatRating = (rating: number): string => {
  return `★ ${rating.toFixed(1)}`;
};

/**
 * Format phone number
 */
export const formatPhoneNumber = (phone: string): string => {
  // Format as 138-0013-8000
  if (phone.length === 11) {
    return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`;
  }
  return phone;
};

/**
 * Mask phone number for privacy
 */
export const maskPhoneNumber = (phone: string): string => {
  if (phone.length === 11) {
    return `${phone.slice(0, 3)}****${phone.slice(7)}`;
  }
  return phone;
};

/**
 * Format order number
 */
export const formatOrderNumber = (orderNumber: string): string => {
  // Add spaces every 4 characters for readability
  return orderNumber.replace(/(.{4})/g, '$1 ').trim();
};

/**
 * Get status text in Chinese
 */
export const getStatusText = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    pending: '待处理',
    processing: '制作中',
    completed: '已完成',
    canceled: '已取消',
    open: '营业中',
    closed: '已关闭',
  };
  return statusMap[status] || status;
};

/**
 * Get pickup time display text
 */
export const getPickupTimeText = (time: string): string => {
  const timeMap: { [key: string]: string } = {
    '15min': '15分钟后',
    '30min': '30分钟后',
    '1hour': '1小时后',
  };
  return timeMap[time] || time;
};
