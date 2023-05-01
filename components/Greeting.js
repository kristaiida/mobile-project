import { useState, useEffect } from 'react';

export function UseGreeting() {

  // useStates
  const [greeting, setGreeting] = useState(''); 
  const [meal, setMeal] = useState('');

  // useEffect hook to set the greeting based on current time
  useEffect(() => { 
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 10) { // set greeting to 'Good morning' between 6 AM and 12 PM
      setGreeting('☀️ Good Morning');
      setMeal('breakfast');
    } else if (hours >= 10 && hours < 11) {
      setGreeting('☀️ Good Morning');
      setMeal('snacks');
    } else if (hours >= 11 && hours < 14) {
      if (hours >= 11 && hours < 12) {
        setGreeting('☀️ Good Morning');
      } else {
        setGreeting('😎 Good Afternoon');
      }
      setMeal('lunch');
    } else if (hours >= 14 && hours < 17) { // set greeting to 'Good afternoon' between 12 PM and 5 PM
      setGreeting('😎 Good Afternoon');
      setMeal('snacks');
    } else if (hours >= 17 && hours < 21) { // set greeting to 'Good evening' between 5 PM and midnight
      if (hours >= 17 && hours < 18) {
        setGreeting('😎 Good Afternoon');
      } else {
        setGreeting('🥂 Good Evening');
      }
      setMeal('dinner');
    } else { // set greeting to 'Go back to sleep' for other times
      setGreeting('😴 Go Back to Sleep');
    }
  }, []); 

  return { greeting, meal };
}
