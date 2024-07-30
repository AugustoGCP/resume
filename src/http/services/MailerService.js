const mailer = require('nodemailer')
require('dotenv').config();

module.exports = {

    async sendEmailContact(req, res){   

        // console.log(req.body)
        let msg = `Muito obrigado pelo contato ${req.body.name}. Agradeço sua procura, já recebi em minha caixa de e-mail sua mensagem, te enviarei uma resposta o mais breve possível! Sinta-se a vontade para me enviar uma mensagem pelo meu WhatsApp, clicando no segundo card do telefone, será redirecionado direto para o meu contato. Agradeço novamente o interesse e um bom dia que se segue!!`
        
        try {
            const transporter = mailer.createTransport({
                host: process.env.MAILER_HOST,
                port: process.env.MAILER_PORT,
                secure: false,
                auth: {
                    user: process.env.MAILER_EMAIL,
                    pass: process.env.MAILER_PASSWD,
                },
                logger: true,
                debug: true,
                connectionTimeout: 10000,
                socketTimeout: 10000
            });
    
            const mailOptions = {
                from: req.body.email,
                to: process.env.MAILER_EMAIL,
                subject: "Mensagem enviada pelo currículo online " + req.body.subject,
                html: `<b>${req.body.name} - ${req.body.email}</b> te enviou uma mensagem: </br> ${req.body.message}`,
            };
    
            const result = await transporter.sendMail(mailOptions);
            // console.log(result);
            return res.status(200).json({
                status: true,
                msg: msg
            });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                status: false,
                msg: 'Erro ao enviar o e-mail: ' + error.message
            });
        }
        
    }

}