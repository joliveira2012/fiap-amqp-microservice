Nosso produto é uma solução de comanda virtual para casas noturnas, que visa reduzir a burocracia e aumentar a segurança e praticidade;
Atualmente possuímos o microsserviço de geração de comandas e futuramente teremos outros como gestão de entrada, realização de pagamento, gerenciamento de produtos, entre outros ...
Para apoiar nossa aplicação a partir de agora e com aumento futuro de serviços, decidimos usar o Direct Exchange da AMQP para auxiliar o monitoramento no ambiente.
Criaremos uma fila para notificar erros nas chamadas de APIs dos microsserviços através do slack e email.

Serviços utilizados 
•	Integração do github com o slack (alertas de commits, pull requests, entre outros ..).
•	Integração do cloud amqp com slack e email, para notificar quando acumular mais de 3 mensagens na fila 
•	Consumir mensagens para o slack através de webhook
