
// List of motivational quotes
const QUOTES = [
  { text: "Small habits, repeated daily, create massive results.", author: "James Clear" },
  { text: "Consistency is the DNA of mastery.", author: "Robin Sharma" },
  { text: "Your future is found in your daily routine.", author: "John C. Maxwell" },
  { text: "Don't break the chain.", author: "Jerry Seinfeld" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { text: "First we make our habits, then our habits make us.", author: "John Dryden" },
  { text: "You will never change your life until you change something you do daily.", author: "John C. Maxwell" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
];

// Returns a quote based on the current date (deterministic)
export const getDailyQuote = () => {
  const today = new Date();
  // Use day of year to cycle through quotes
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % QUOTES.length;
  return QUOTES[index];
};
