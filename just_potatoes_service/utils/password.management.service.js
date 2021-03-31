module.exports.read_JSON_File = (filepath) =>{
    require('fs').readFile(filepath, 'utf8', (error, data) => {
        if(error) {
            return JSON.parse({message: 'NOT FOUND'})
        } else {
            var value = JSON.parse(data);
            return value;
        }
    })
}
