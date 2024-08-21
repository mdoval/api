import { NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(req: Request, res: NextApiResponse) {            
    const data = await req.formData()
    const file: File = data.get('file') as File
    const fileNameUpload: string = data.get('name') as string

    if(!file) {
        return NextResponse.json({status: "Ok", url: "No existe", message: "No existe la propiedad File en el formulario enviado"})
    }


    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const dir: string = process.env.IMAGEPATH as string
    const url: string = process.env.OUTPUTURL as string
    
    //asignacion de nombre
    let fileName: string = file.name    
    if(fileNameUpload) {
        fileName = fileNameUpload
    }
    //const fileName: string = file.name

    const filePath = path.join(dir+fileName)
    writeFile(filePath, buffer)

    return NextResponse.json({status: "Ok", url: url+fileName, message: "Archivo subido con exito a la ruta "+dir+fileName})
}