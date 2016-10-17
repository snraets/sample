import ready from './app/ready';

if (process.env.NODE_ENV !== 'production') {
  require('./index.html');
}

ready();

