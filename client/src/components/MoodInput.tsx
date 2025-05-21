// src/components/MoodInput.tsx
type MoodInputProps = {
  mood: number | null;
  setMood: (mood: number) => void;
};

export default function MoodInput({ mood, setMood }: MoodInputProps) {
  const moods = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div >
      <div className="mood-input">
        {moods.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => setMood(idx + 1)}
                  style={{
                    fontWeight: mood === idx + 1 ? 'bold' : 'normal',
                    fontSize: mood === idx + 1 ? '1.5rem' : '1rem',
                  }}
                >
                  {emoji}
                </button>
              ))}
      </div>
      <div className= "rating-words">
        <span>Terrible... 😢</span>
        <span>Terrific! 😊</span>
      </div>
      <div className= "input-box">
      <input
        id="noteInput"
        type="text"
        placeholder="Talk about your day..."
        style={{
          width: '500px',      // adjust as needed
          height: '50px',      // adjust height
          padding: '40px',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />      
      </div>
    </div>
    
  );
}

