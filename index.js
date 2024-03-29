import express from 'express';

import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';

import { registerValidationTeam } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';

import * as userController from './controllers/userController.js';

import * as teamController from './controllers/teamController.js';

mongoose
	.connect('mongodb+srv://admin:admin@nodejsproject.nmgtmwq.mongodb.net/blog?retryWrites=true&w=majority')
	.then(() => console.log('DB is OK!'))
	.catch((err) => console.log('DB error\n', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('ZV.1.0');
});

app.post('/auth/login', userController.login);

app.post('/auth/register', registerValidation, userController.register);

app.get('/auth/me', checkAuth, userController.getMe);

app.post('/auth/registerteam',registerValidationTeam,teamController.registerTeam)

app.post('/auth/invite',teamController.inviteUser)

app.listen(5000, (err) => {
	if (err) {
		return console.log(err);
	}

	console.log('Server is OK!');
});