const fetch = require('node-fetch');
var amqp = require('amqplib/callback_api');

class DirectQueue {
    producer(msg, res) {

        if (msg.text.length <= 0) {
            res.status(400).json({ error: 'O mensagem da fila não pode ser vazia' })
        } else {
            amqp.connect('amqp://dahrcinj:VMsq8d3CyMfa1gouRm5O4BudEOhZBo0A@finch.rmq.cloudamqp.com/dahrcinj', function (err, conn) {
                conn.createChannel(function (err, ch) {
                    var q = 'comanda.virtual.pagamentos';
                    ch.assertQueue(q, { durable: true });     
                    ch.sendToQueue(q, new Buffer(msg.text));
                    console.log(" [x] Sent %s", msg.text);
                });
                setTimeout(function () { conn.close(); process.exit(0) }, 500);
            });
            res.status(201).json(msg)
        }
    }

    consumerToSlack() {
        console.log(msg)
        if (msg.text.length <= 0) {
            res.status(400).json({ error: 'O mensagem da fila não pode ser vazia' })
        } else {
            amqp.connect('amqp://dahrcinj:VMsq8d3CyMfa1gouRm5O4BudEOhZBo0A@finch.rmq.cloudamqp.com/dahrcinj', function (err, conn) {
                conn.createChannel(function (err, ch) {
                    var q = 'comanda.virtual.pagamentos';

                    ch.assertQueue(q, { durable: true });
                    ch.prefetch(1);
                    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
                    ch.consume(q, function (msg) {

                        let body = JSON.stringify({
                            text: msg.content.toString()
                        });
                        fetch('https://httpbin.org/post', {
                            method: 'POST',
                            body: body
                            })
                            .then(res => res.json())
                            .then(json => {
                                console.log(" Messagem no slack %s", msg.content.toString());
                            })
                            .catch(err => console.log(err));
                    }, { noAck: true });
                });
            });
            res.status(201).json(msg)
        }
    }

    

}

module.exports = new DirectQueue