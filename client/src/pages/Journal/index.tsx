import { useQuery } from '@apollo/client';
import { GET_JOURNAL_ENTRIES } from '../../utils/queries';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default function Journal() {
  const { loading, data } = useQuery(GET_JOURNAL_ENTRIES);

  const entries = data?.journalEntries || [];

  if (loading) return <p>Loading entries...</p>;

  return (
    <div>
      <h1>Your Journal</h1>
      {entries.length === 0 ? (
        <p>No entries yet. Try adding one!</p>
      ) : (
        entries.map((entry: { _id: Key | null | undefined; mood: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; text: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; createdAt: string | number | Date; }) => (
          <div key={entry._id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <p><strong>Mood:</strong> {entry.mood}</p>
            <p>{entry.text}</p>
            <p style={{ fontSize: '0.8rem', color: 'gray' }}>{new Date(entry.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
