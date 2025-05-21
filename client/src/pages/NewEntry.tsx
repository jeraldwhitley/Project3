import { useState } from 'react';
import MoodInput from '../components/MoodInput';
import MoodChart from '../components/MoodChart';

export default function NewEntry() {
  const [mood, setMood] = useState<number | null>(null);

  return (
    <div>
      <div className= "new-entry">
      <h1>How are you feeling today?</h1>
      <MoodInput mood={mood} setMood={setMood} />
      <button onClick={() => alert(`Mood selected: ${mood}`)}>
        Add Journal Entry
      </button>
      <MoodChart />
      </div>
    </div>
  );
}
