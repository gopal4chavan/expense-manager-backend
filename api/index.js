import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/src/routes';
import cors from 'cors';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
   origin: 'http://localhost:3200',
}
app.use(cors(corsOptions))
app.use('/api/v1', routes);
const port = process.env.PORT || 8080;
// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));
app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});
export default app;