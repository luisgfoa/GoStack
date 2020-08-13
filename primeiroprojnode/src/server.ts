import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload'
import AppError from './errors/AppError'

import './database';

const app = express();

app.use(cors());
// CORS evita que alguns sites que não sejam confiáveis da nossa aplicação possam acessar o nosso site
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    })
});

app.get('/', (req, res)=>{
    return res.json({ message: 'Hello GoStack' })
})

app.listen(3333, ()=>{
    console.log('Server started on port 3333!')
})