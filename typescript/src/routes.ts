import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWord( request: Request, response: Response){
    const user = createUser({
        email: 'diego@rocketseat.com.br',
        password: '123456',
        techs: [
            'Node.js', 
            'React.js', 
            'Reactive Native',
            {title: 'JavaScript', experience: 100 },
        ],
    });
    
    console.log(user.email)
    return response.json({ message: 'Hello World'});
}
