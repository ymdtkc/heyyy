import { useState, useEffect } from 'react';
import { EventCreateForm } from './components/EventCreateForm';
import { EventDisplay } from './components/EventDisplay';
import { decodeEventData, type EventData } from './utils/eventUtils';

export default function App() {
  const [currentView, setCurrentView] = useState<'create' | 'event'>('create');
  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      if (hash.startsWith('#/event/')) {
        const encodedData = hash.replace('#/event/', '');
        const decoded = decodeEventData(encodedData);
        
        if (decoded) {
          setEventData(decoded);
          setCurrentView('event');
        } else {
          // Invalid data, redirect to create
          window.location.hash = '';
          setCurrentView('create');
          setEventData(null);
        }
      } else {
        setCurrentView('create');
        setEventData(null);
      }
    };

    // Initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleBackToCreate = () => {
    window.location.hash = '';
  };

  if (currentView === 'event' && eventData) {
    return <EventDisplay eventData={eventData} onBack={handleBackToCreate} />;
  }

  return <EventCreateForm />;
}