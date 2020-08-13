import { Router, response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();

usersRouter.post('/', async (req, res)=>{
        const { name, email, password } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        })
        res.json(user);
})

const upload = multer(uploadConfig);

usersRouter.patch('/avatar', upload.single('avatar'), ensureAuthenticated, async(req, res) =>{
        const updateUserAvatar = new UpdateUserAvatarService;

        const user = await updateUserAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename,
        });

        delete user.password;

        return res.json(user);
})

export default usersRouter;