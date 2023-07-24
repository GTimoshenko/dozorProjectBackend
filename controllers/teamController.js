import teamModel from '../models/team.js';
import userModel from '../models/user.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//регистрация команды
export const registerTeam = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) 
        {
			return res.status(400).json(errors.array());
		}

        const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

        const doc = new teamModel({
			name: req.body.name,
			passwordHash: hash,
		});

        const team = await doc.save();

        const token = jwt.sign(
			{
				_id: team._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			},
		);

		const { passwordHash, ...teamData } = team._doc;

		res.json({
			...teamData,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось зарегистрироваться',
		});
	}
};
//WIP
//приглашение пользователя в команду
export const inviteUser = async (req, res)=>{
    try{
        const { teamID, userID}=req.body;

        const team = await teamModel.findById(teamID);
        const user = await userModel.findById(userID);

        if (!team || !user) 
        {
            return res.status(404).json({ error: 'Команда или пользователь не найден' });
        }
        //????можно убрать
        if (team.members.includes(userId)) {
            return res.status(400).json({ error: 'Пользователь уже является участником команды' });
        }

        team.members.push(userID);
        await team.save();

        res.status(200).json({ message: 'Пользователь успешно приглашен в команду' });

        } catch (err) {
		    console.log(err);
		    res.status(500).json({
			    message: 'Не удалось зарегистрироваться',
		});

    }
};
