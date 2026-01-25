// Extract LinkedIn post ID from URL
export function getLinkedInPostId(url: string) {
  const match = url.match(/\/activity\/(\d+)/);
  return match ? match[1] : null;
}

// Extract TikTok video ID from URL
export function getTikTokVideoId(url: string) {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}

// Validate general URL
export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
