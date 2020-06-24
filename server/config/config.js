const config={
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGOD_URI
    },
    default:{
         SECRET:'SUPERSECRETPASSWORD123',
         DATABASE: 'mongodb://localhost:27017/uol-acf'
    }
}
exports.get = function get(env){
    return config[env] || config.default
}