import { useState, useEffect } from 'react';

export function UseGreeting() {

  // useStates
  const [greeting, setGreeting] = useState(''); 

  // useEffect hook to set the greeting based on current time
  useEffect(() => { 
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) { // set greeting to 'Good morning' between 6 AM and 12 PM
      setGreeting('Good morning');
    } else if (hours >= 12 && hours < 17) { // set greeting to 'Good afternoon' between 12 PM and 5 PM
      setGreeting('Good afternoon');
    } else if (hours >= 17 && hours < 24) { // set greeting to 'Good evening' between 5 PM and midnight
      setGreeting('Good evening');
    } else { // set greeting to 'Go back to sleep' for other times
      setGreeting('Go back to sleep');
    }
  }, []); 

  return greeting; 
}
