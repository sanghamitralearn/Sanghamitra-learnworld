import { Link } from 'react-router-dom';
import './vocabContent.css';

const categories = [
  { slug: 'money', title: 'Money', icon: 'bi-cash-coin' },
  { slug: 'politics', title: 'Politics', icon: 'bi-bank' },
  { slug: 'school-and-education', title: 'School and Education', icon: 'bi-mortarboard' },
  { slug: 'technology', title: 'Technology', icon: 'bi-laptop' },
  { slug: 'health-and-medicine', title: 'Health and Medicine', icon: 'bi-heart-pulse' },
  { slug: 'environment', title: 'Environment', icon: 'bi-tree' },
  { slug: 'sports', title: 'Sports', icon: 'bi-trophy' },
  { slug: 'history', title: 'History', icon: 'bi-hourglass-split' },
  { slug: 'science', title: 'Science', icon: 'bi-flask' },
  { slug: 'literature', title: 'Literature', icon: 'bi-book' }
];

export default function VocabHub() {
  return (
    <div className="vocab-content-page">
      <header className="vocab-header">
        <h1>Welcome to the Vocabulary Learning Platform</h1>
        <p>Select a category to start learning and assessment</p>
      </header>
      <div className="container">
        {categories.map((category) => (
          <div className="category" key={category.slug}>
            <i className={`bi ${category.icon}`}></i>
            <h2>{category.title}</h2>
            <div className="buttons">
              <Link to={`/vocabulary-content/${category.slug}`}>Learn</Link>
              <a href="#">Assess</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
