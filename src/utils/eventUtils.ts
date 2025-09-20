export interface EventData {
  title: string;
  details: string;
  date: string;
  timeRange: string;
  location: string;
}

export function encodeEventData(eventData: EventData): string {
  const jsonString = JSON.stringify(eventData);
  return btoa(encodeURIComponent(jsonString));
}

export function decodeEventData(encodedData: string): EventData | null {
  try {
    const jsonString = decodeURIComponent(atob(encodedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Failed to decode event data:', error);
    return null;
  }
}

export function generateEventUrl(eventData: EventData): string {
  const encodedData = encodeEventData(eventData);
  return `${window.location.origin}${window.location.pathname}#/event/${encodedData}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
}