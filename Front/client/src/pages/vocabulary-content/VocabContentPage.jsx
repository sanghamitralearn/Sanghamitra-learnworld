import { useParams } from 'react-router-dom';
import { topics } from './data';
import './vocabContent.css';

export default function VocabContentPage() {
  const { topic } = useParams();
  const topicData = topics[topic];

  if (!topicData) {
    return (
      <div className="vocab-content-page">
        <div className="container">
          <div className="not-found">
            <h1>Topic not found</h1>
            <p>We couldn't find any vocabulary content for "{topic}".</p>
          </div>
        </div>
      </div>
    );
  }

  const { title, words } = topicData;

  return (
    <div className="vocab-content-page">
      <header className="vocab-header">
        <h1>{title} Vocabulary</h1>
      </header>
      <div className="container">
        <div className="levels">
          <a href="#">Level 1</a>
          <a href="#">Level 2</a>
          <a href="#">Level 3</a>
          <a href="#">Level 4</a>
          <a href="#">Level 5</a>
        </div>

        {words.map((entry, index) => (
          <div className="word" key={`${entry.word}-${index}`}>
            <h2>{entry.word}</h2>
            <div className="phonetics">{entry.phonetics}</div>
            <div className="part-of-speech">{entry.partOfSpeech}</div>
            <div className="definition">
              <strong>Definition:</strong> {entry.definition}
            </div>
            <div className="synonyms">
              <strong>Synonyms:</strong>{' '}
              {entry.synonyms.map((synonym, i) => (
                <span key={i}>{synonym}</span>
              ))}
            </div>
            <div className="antonyms">
              <strong>Antonyms:</strong>{' '}
              {entry.antonyms.map((antonym, i) => (
                <span key={i}>{antonym}</span>
              ))}
            </div>
            {entry.examples.length > 0 && (
              <div className="examples">
                <strong>Examples:</strong>
                <ul>
                  {entry.examples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
