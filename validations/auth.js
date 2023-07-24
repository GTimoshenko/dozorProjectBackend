import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Укажите верный формат почты.').isEmail(),
	body('password', 'Слишком короткий пароль.').isLength({ min: 6 }),
	body('fullName', 'Укажите полное имя.').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка.').optional().isURL(),
];

export const registerValidationTeam = [
	body('name', 'Слишком короткое название.').isLength({ min: 3 }),
	body('password', 'Слишком короткий пароль.').isLength({ min: 6 }),
];