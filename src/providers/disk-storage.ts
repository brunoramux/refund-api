import uploadConfig from "@/configs/upload"
import fs from "node:fs"
import path from "node:path"

class DiskStorage {
    async saveFile(file: string){
        const tmpPath = path.resolve(uploadConfig.TMP_FOLDER, file)
        console.log(tmpPath)
        const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        console.log(destPath)

        // VERIFICAR SE O ARQUIVO PASSADO EXISTE
        try {
            await fs.promises.access(tmpPath)
        } catch (error) {
            throw new Error("Arquivo não encontrado.")
        }

        // VERIFICAR SE A PASTA DESTINO EXISTE.SE NÃO EXISTE, CRIA COM MKDIR
        await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true })

        await fs.promises.rename(tmpPath, destPath)

        return file
    }

    async deleteFile(file: string, type: "tmp" | "upload"){
        const pathFile = type === "tmp" ? uploadConfig.TMP_FOLDER : uploadConfig.UPLOADS_FOLDER

        const filePath = path.resolve(pathFile, file)
        // VERIFICA SE ARQUIVO EXISTE
        try {
            await fs.promises.stat(filePath)
        } catch  {
            return 
        }

        // DELETE O ARQUIVO
        await fs.promises.unlink(filePath)
    }
}

export { DiskStorage }