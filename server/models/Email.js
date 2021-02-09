 //Requerimos el paquete
 var nodemailer = require('nodemailer');

 //Creamos el objeto de transporte
 var transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
         user: 'akmnj2021@gmail.com',
         pass: 'paralelo2021'
     }
 });

 let sendEmail = (emailF, nombreF, nombre, apellido, idPerro, correoP) => {

     var mensaje = `<h1>Fundacion ${nombreF}</h1><p>${nombre} ${apellido} desea adoptadar el perrito ${idPerro} su correo ${correoP}</p>`;

     var mailOptions = {
         from: 'akmnj2021@gmail.com',
         to: emailF,
         subject: 'Adopcion',
         //text: mensaje,
         html: mensaje
     };
     console.log("queriendo enviar");
     transporter.sendMail(mailOptions, function(error, info) {
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