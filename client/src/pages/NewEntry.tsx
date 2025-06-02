import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_JOURNAL_ENTRY } from '../utils/mutations';
import MoodInput from '../components/MoodInput';
import MoodChart from '../components/MoodChart';

export default function NewEntry() {
  const [mood, setMood] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [addEntry] = useMutation(ADD_JOURNAL_ENTRY);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (mood === null || !text.trim()) {
      alert('Please select a mood and enter some text.');
      return;
    }

    try {
      await addEntry({
        variables: { mood, text },
      });
      navigate('/journal'); // Go to journal after successful entry
    } catch (err) {
      console.error('Error adding entry:', err);
    }
  };

  return (
    <div className="new-entry">
      <h1>How are you feeling today?</h1>
      <MoodInput mood={mood} setMood={setMood} />
      <textarea
        placeholder="Write your journal entry..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', minHeight: '150px', margin: '1rem 0' }}
      />
      <button onClick={handleSubmit}>Add Journal Entry</button>
      <MoodChart />
    </div>
  );
}
