import express from 'express';
import cors from 'cors';
import controllers from '../adapters/inbound/http/controllers';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', controllers);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server running on port', port);
});
