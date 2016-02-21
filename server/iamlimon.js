Clientes = new Mongo.Collection("client");

Meteor.methods({
    visitantes: function ($ip) {
        Clientes.insert({
            visitante: "visitante",
            fecha: new Date(),
            ip: this.connection.clientAddress
        });
    },

    clientnew: function ($name, $mail, $mess) {
        Clientes.insert({
            fecha: new Date(),
            name: $name,
            mail: $mail,
            mess: $mess
        });
    },

    sendEmail: function (to, subject, text) {
        check([to, subject, text], [String]);
        this.unblock();
        process.env.MAIL_URL = "smtp://i:LEL@limonazzo.com:587/";
        Email.send({
            to: to,
            from: 'i@limonazzo',
            subject: subject,
            text: text
        });
    }
});
