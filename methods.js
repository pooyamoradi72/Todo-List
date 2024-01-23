let todo = [
    // {
    //     "title": "salam1",
    //     "Description": "null",
    //     "isDone": true
    // }
]
export function getAllTodo(req, res) {
    res.render("todo", {todos: todo});
}


export function createTodo(request, response) {
    const { title, Description } = request.body
    let { isDone } = request.body
    if ((typeof title === 'string' && title.length > 0) && ['string', 'undefined'].includes(typeof Description))//&& typeof isDone==='boolean')
    {
        if (todo.filter((t) => t.title === title).length > 0) {
            response.status(409).send("Duplicate.")
            return
        }
        if(isDone === undefined) isDone = false;
        todo.push({ title, Description, isDone, createdAt: new Date() })
        response.status(201).redirect("/")
    }
    else {
        response.status(400).send("Bad Request.")
    }
}

export function deleteTodo(request, response) {
    const { title } = request.params
    if (typeof title === 'string' && title.length > 0) {
        if (todo.filter((t) => t.title === title).length === 0) {
            response.status(404).send("Not Found!")
            return
        }
        todo = todo.filter((t) => t.title !== title)

        response.status(200).redirect('/');
    }
    else {
        response.status(400).send("Bad Request.")
    }
}

export function handleUpdateForm(request, response) {
    const { title } = request.params

    response.render("update", {todo: todo.filter((t) => t.title === title)[0]})
}

export function updateTodo(request, response) {
    let todoIndex
    for (let index = 0; index < todo.length; index++) {
        if (todo[index].title === request.params.title) {
            todoIndex = index
            break
        }

    }

    if (typeof todoIndex === "number") {

        let { Description, isDone } = request.body
                
        isDone = (isDone) ? true : false;
        if (['string', 'undefined'].includes(typeof Description))//&& typeof isDone==='boolean')
        {
            todo[todoIndex] = {
                ...todo[todoIndex],
                Description,
                isDone
            }
            return response.status(200).redirect("/")
        }
          return response.status(400).send("Bad Request")
    }
    response.status(404).send("Not Found!")
}
