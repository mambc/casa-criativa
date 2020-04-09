const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./CasaCriativa.db')

db.serialize(function() {
    
    //Criar tabela
    //db.run("CREATE TABLE IF NOT EXISTS ideas();") para organizar melhor, fazemos:
    db.run(`
        CREATE TABLE IF NOT EXISTS ideas(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    

    

    //Deletar um dado na tabela
    //db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
        //if (err) return console.log(err)

        //console.log("DELETEI", this)
    //})

    //Consultar dados na tabela
    

    

})

module.exports = db