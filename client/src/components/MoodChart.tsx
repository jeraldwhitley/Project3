// src/components/MoodChart.tsx
import { useState } from 'react';
import MoodInput from './MoodInput';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Utility to get day of week
const getDayLabel = (offset: number) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export default function MoodChart() {
  const [weeklyMood, setWeeklyMood] = useState<number[]>([]);
  const [mood, setMood] = useState<number | null>(null);

  const logMood = () => {
    if (mood !== null) {
      const newMoods = [...weeklyMood, mood].slice(-7); // keep latest 7
      setWeeklyMood(newMoods);
      setMood(null);
    }
  };

  const chartData = {
    labels: weeklyMood.map((_, i) => getDayLabel(weeklyMood.length - i - 1)),
    datasets: [
      {
        label: 'Mood Level',
        data: weeklyMood,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { min: 0, max: 10, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="mood-chart" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Track Your Mood This Week</h2>
      <button onClick={logMood} disabled={mood === null} style={{ marginTop: '1rem' }}>
        Log Mood
      </button>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
