import fs from 'fs'
import csv from 'csv-parser'

export async function validateCsvContent(filePath: string): Promise<void> {
  const requiredColumns = ['latitude', 'longitude']

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath).pipe(csv())

    stream.once('headers', (headers: string[]) => {
      const missing = requiredColumns.filter(col => !headers.includes(col))
      if (missing.length > 0) {
        return reject(new Error(`Colunas obrigatórias ausentes: ${missing.join(', ')}`))
      }
      stream.destroy()
      resolve()
    })

    stream.on('error', reject)
  })
}