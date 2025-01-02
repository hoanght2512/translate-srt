const path = require('path')
const fs = require('fs').promises
const translate = require('@iamtraction/google-translate')

const folderPath = path.join(__dirname, '../data')

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const translateLine = async (line) => {
  try {
    const res = await translate(line, { from: 'en', to: 'vi' })
    return res.text
  } catch (error) {
    await delay(5000) // Đợi 5s trước khi thử lại
    return translateLine(line) // Thử lại nếu có lỗi
  }
}

const translateFile = async (filePath) => {
  const fullPath = path.join(folderPath, filePath)
  const newPath = path.join(folderPath, filePath.replace('.en.srt', '.vi.srt'))

  try {
    const content = await fs.readFile(fullPath, 'utf8')
    const lines = content.split('\n')
    console.log(`Đang dịch file: ${filePath}`)

    const translatedLines = []

    // Duyệt từng dòng và dịch tuần tự
    for (const line of lines) {
      if (
        line.includes('-->') || // Dòng thời gian
        line.trim() === '' || // Dòng trống
        !isNaN(line.trim()) // Dòng số
      ) {
        console.log(`Giữ nguyên: ${line}`)
        translatedLines.push(line) // Giữ nguyên dòng nếu không cần dịch
      } else {
        // Dịch dòng
        const translatedLine = await translateLine(line) // Dịch tuần tự
        console.log(`Dịch      : ${translatedLine}`)
        translatedLines.push(translatedLine)
      }
    }

    await fs.writeFile(newPath, translatedLines.join('\n'), 'utf8') // Ghi file sau khi dịch tất cả dòng
    console.log('Thành công:', newPath)
    console.log('\n')
    await delay(3000) // Đợi 3s trước khi dịch file tiếp theo
  } catch (error) {
    console.error('Lỗi xảy ra khi xử lý file:', filePath, error.message)
  }
}

;(async () => {
  try {
    const files = await fs.readdir(folderPath, { recursive: true })
    const srtFiles = files.filter((file) => file.endsWith('.en.srt'))

    if (srtFiles.length === 0) {
      console.log('Không tìm thấy file ".en.srt" nào trong thư mục.')
      return
    }

    // Dịch từng file một
    for (const file of srtFiles) {
      await translateFile(file) // Dịch xong file này mới tiếp tục
    }

    console.log('Hoàn thành dịch tất cả các file!')
  } catch (error) {
    console.error('Lỗi khi đọc thư mục:', folderPath, error.message)
  }
})()
