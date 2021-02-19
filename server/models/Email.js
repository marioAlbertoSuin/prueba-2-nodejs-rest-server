 //Requerimos el paquete
 var nodemailer = require('nodemailer');

 //Creamos el objeto de transporte
 var transporter = nodemailer.createTransport({
     service: 'hotmail',
     secure: false,
     auth: {
         user: '###',
         pass: '###'
     },
     tls: {
         rejectUnauthorized: false
     }
 });

 let sendEmail = async(emailF, nombreF, nombre, apellido, idPerro, correoP) => {

     var mensaje = `<h1>Fundacion ${nombreF}</h1><p>${nombre} ${apellido} desea adoptadar el perrito ${idPerro} su correo ${correoP}</p>`;

     var mailOptions = {
         from: '###',
         to: emailF,
         subject: 'Adopcion',
         //text: mensaje,
         html: mensaje
     };
     console.log("queriendo enviar");
     await transporter.sendMail(mailOptions, function(error, info) {
         if (error) {
             console.log(error);
             return false;
         } else {
             console.log('Email enviado: ' + info.response);
             return true;
         }
     });
 }

 module.exports = { sendEmail }
