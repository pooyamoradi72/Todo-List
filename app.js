import express from "express"
import { getAllTodo, createTodo, deleteTodo, updateTodo, handleUpdateForm } from "./methods.js"
const app = express()

app.use(express.json())
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set("view engine", "ejs");

app.get('/', getAllTodo)
app.post('/', createTodo)
app.get('/update/:title', handleUpdateForm)
app.post('/update/:title', updateTodo)
app.get('/delete/:title', deleteTodo)
app.listen(3000)
