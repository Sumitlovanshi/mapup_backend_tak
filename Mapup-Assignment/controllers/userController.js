const fs = require('fs');
const {promisify} = require('util');
const bcrypt = require('bcrypt');
const { verify } = require('crypto');

module.exports = {

    async getAllUsers(){

        const readFile = promisify(fs.readFile);
        const userFile = await readFile('./data/users.json', 'utf-8');
        const users = JSON.parse(userFile);

        return users;
    },


    async getUserById(id){
            
            const users = await this.getAllUsers();
    
            const user = users.find(user => user.id === id);
    
            return user;
        },

    async getUserByEmail(email){
            
            const users = await this.getAllUsers();
    
            const user = users.find(user => user.email === email);
    
            return user;
        },

    async createUser(user){

        const users = await this.getAllUsers();

        const newUser = {
            id: users.length + 1,
            email : user.email,
            password : user.password
        }

        users.push(newUser);

        const writeFile = promisify(fs.writeFile);

        await writeFile('./data/users.json', JSON.stringify(users),'utf-8');

        return newUser;
    },
    
    async verifyPassword(password, hashedPassword){
        const verify = await bcrypt.compare(password, hashedPassword);
        return verify;
    }
}