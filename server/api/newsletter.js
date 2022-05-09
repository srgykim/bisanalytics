`use strict`;

const express = require(`express`);

const router = express.Router();

const nodemailer = require(`nodemailer`);
const Email = require('email-templates');

/*
*  Шаблонная функция для обработки исключений.
*
*  @param cb - функция для выполнения.
* */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}

// Конфигурация почтового сервера
const transporter = nodemailer.createTransport({
    host: `smtp.yandex.ru`,
    port: 465,
    secure: true,
    auth: {
        user: `info@bisanalytics.digital`,
        pass: `12345678Aa!`
    }
});

// Письмо
const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
});

/*
* Отправить письмо для рассылки.
*
* */
router.get(`/`, asyncHandler(async (req, res, next) => {
    await email.send({
        template: `newsletter`,
        message: {
            from: 'BIS Analytics <info@bisanalytics.digital>',
            to: 'srgykim@vk.com',
        },
        locals: {
            fname: 'Sergey',
            lname: 'Kim',
        }
    });

    res.status(200).json({ message: `Рассылка отправлена.`});
}));

module.exports = router;
