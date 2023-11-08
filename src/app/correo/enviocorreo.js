const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'migoadvstesting@gmail.com',  
    pass: 'P$2wR8k#6q'  
  }
});

function enviarCorreo(destinatario, asunto, mensaje) {
  const mailOptions = {
    from: 'migoadvstesting@gmail.com',
    to: destinatario,
    subject: asunto,
    text: mensaje
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error al enviar el correo: ' + error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });
}

module.exports = enviarCorreo;
