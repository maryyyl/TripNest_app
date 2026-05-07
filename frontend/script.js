import fs from "fs"

const inputFile = "input.sql"
const outputFile = "output.sql"

let sql = fs.readFileSync(inputFile, "utf8")

sql = sql.replace(
    /https:\/\/source\.unsplash\.com\/800x600\/\?[^']*?&sig=(\d+)/g,
    (match, sig) => {
        return `https://picsum.photos/seed/${sig}/800/600`
    }
)

fs.writeFileSync(outputFile, sql)

console.log("Done! Converted file saved as output.sql")