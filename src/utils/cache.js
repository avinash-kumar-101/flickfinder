// Simple in-memory cache (fast & clean)

const cache = new Map();
const TTL = 1000 * 60 * 10; // 10 minutes

export function getCache(key) {
  const item = cache.get(key);

  if (!item) return null;

  // ⏰ Expired
  if (Date.now() > item.expiry) {
    cache.delete(key);
    return null;
  }

  return item.data;
}

export function setCache(key, data) {
  cache.set(key, {
    data,
    expiry: Date.now() + TTL,
  });
}

export function clearCache() {
  cache.clear();
}