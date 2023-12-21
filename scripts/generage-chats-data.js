import { writeFile } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

const FILE_PATH = 'src/shared/assets/chats.json'

const chatsCount = parseInt(process.argv[2], 10)
const messageCountRange = Array.from({ length: 2 }, (_, k) => process.argv.slice(3, 5)[k]).map(item => parseInt(item, 10))

if (isNaN(chatsCount) || messageCountRange.some(isNaN)) throw new Error('All arguments must be numbers!')

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateRandomMessage = () => {
    const messageId = randomUUID()
    const time = new Date().toISOString()
    const text = `Random message ${messageId}`.repeat(getRandomInt(1, 3))

    return { id: messageId, time, text }
}

const generateRandomChat = (messageCountRange) => {
    const chatId = randomUUID()
    const chatName = `Chat ${chatId}`
    const messageCount = getRandomInt(messageCountRange[0], messageCountRange[1])
    const messages = Array.from({ length: messageCount }, generateRandomMessage)

    return { id: chatId, name: chatName, count: messageCount, messages, avatar: "https://placehold.co/600x400" }
}

const generateArrayOfChats = (chatsCount, messageCountRange) => {
    return Array.from({ length: chatsCount }, () => generateRandomChat(messageCountRange))
}

const chats = generateArrayOfChats(chatsCount, messageCountRange)
const jsonChats = JSON.stringify(chats, null, 2)

try {
  await writeFile(FILE_PATH, jsonChats)

  console.log(`The file is saved at the "${FILE_PATH}" path`)
} catch (error) {
  console.error(error)
}
