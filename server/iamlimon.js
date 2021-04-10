Clientes = new Mongo.Collection("client");


var api_key = 'xxx';// process.env.MAILGUN_API_KEY;
var domain = 'XXX';// process.env.MAILGUN_DOMAIN;

var mailgun = Npm.require('mailgun-js')({apiKey: api_key, domain: domain});

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
        var data = {
                    from: 'Limonazzo <info@limonazzo.com>',
                    to: to,
                    subject: subject,
                    text: text
            };

        mailgun.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
});
