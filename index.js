const customExpress = require('./config/customExpress')

    console.log('conectado com sucesso')
        
    const app = customExpress()

    app.listen(3333, () => console.log('Servidor rodando na porta 3333'))

