import { useState, useEffect } from 'react';

export function UseGreeting() {

  // useStates
  const [greeting, setGreeting] = useState(''); 
  const [meal, setMeal] = useState('');
  const [emoji, setEmoji] = useState('');

  // useEffect hook to set the greeting based on current time
  useEffect(() => { 
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 10) { // set greeting to 'Good morning' between 6 AM and 12 PM
      setGreeting('Good Morning');
      setMeal('breakfast');
      setEmoji('🍳');
    } else if (hours >= 10 && hours < 11) {
      setGreeting('Good Morning');
      setMeal('snacks');
      setEmoji('🥨');
    } else if (hours >= 11 && hours < 14) {
      if (hours >= 11 && hours < 12) {
        setGreeting('Good Morning');
      } else {
        setGreeting('Good Afternoon');
      }
      setMeal('lunch');
      setEmoji('🥗');
    } else if (hours >= 14 && hours < 17) { // set greeting to 'Good afternoon' between 12 PM and 5 PM
      setGreeting('Good Afternoon');
      setMeal('snacks');
      setEmoji('🥨');
    } else if (hours >= 17 && hours < 21) { // set greeting to 'Good evening' between 5 PM and midnight
      if (hours >= 17 && hours < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
      setMeal('dinner');
      setEmoji('🍝');
    } else {
      setGreeting('Up at this hour,');
      setMeal('drinks');
      setEmoji('🍹');
    }
  }, []); 

  return { greeting, meal, emoji };
}
