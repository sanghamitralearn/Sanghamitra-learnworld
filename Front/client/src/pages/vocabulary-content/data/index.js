import money from './money';
import politics from './politics';
import schoolAndEducation from './school-and-education';
import technology from './technology';
import healthAndMedicine from './health-and-medicine';
import environment from './environment';
import sports from './sports';
import history from './history';
import science from './science';
import literature from './literature';

export const topics = {
  money: { title: 'Money', words: money },
  politics: { title: 'Politics', words: politics },
  'school-and-education': { title: 'School and Education', words: schoolAndEducation },
  technology: { title: 'Technology', words: technology },
  'health-and-medicine': { title: 'Health and Medicine', words: healthAndMedicine },
  environment: { title: 'Environment', words: environment },
  sports: { title: 'Sports', words: sports },
  history: { title: 'History', words: history },
  science: { title: 'Science', words: science },
  literature: { title: 'Literature', words: literature }
};

export default topics;
