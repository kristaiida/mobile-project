import { useState, useEffect } from 'react';

export function UseGreeting() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) {
      setGreeting('Good morning');
    } else if (hours >= 12 && hours < 17) {
      setGreeting('Good afternoon');
    } else if (hours >= 17 && hours < 24) {
      setGreeting('Good evening');
    } else {
      setGreeting('Go back to sleep');
    }
  }, []);

  return greeting;
}