import fs from "fs"

function myReadFile(fileName){
    try {
        const data = fs.readFileSync(fileName, 'utf-8', (err, data) => {
            if (err) throw err;
            return data;
          });
        return data
    } catch (error) {
        console.error('Error reading Firebase config file:', error);
        throw error;
    }
}
export { myReadFile }