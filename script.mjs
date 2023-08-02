const todo = "password is 0"

const getTodo = (req) => {
    console.log(req);
    document.getElementById("todo").value = ''
    axios.get("https://rich-plum-springbok-fez.cyclic.cloud/todos")
        .then((res) => {
            const todos = res.data.todos;
            const container = document.querySelector(".container");
            document.getElementById("how").innerHTML = `Total Todo : ${todos.length}`
            if (todos.length > 0) {
                container.innerHTML = ""
                todos.map((item) => {
                    container.innerHTML += `
                    <li id=${item._id}>
                    <div class="item">
                    <p>${item.todo} </p>
                    <p>${moment(item.date).fromNow()}</p>
                    </div>
                    <div class="buttons">
                    <button onclick="deleteTodo('${item._id}')"><i class="fa-solid fa-trash-can"></i></button>
                    <button onclick="updatePara('${item._id}')"><i class="fa-solid fa-pencil"></i></button>
                    </div>
                    </li>
                    `
                })
            } else {
                container.innerHTML = `
                    <p class="not">Not  Anybody's Todo</p>
                `
            }
        }).catch((err) => {
            console.log(err);
        })
}

const deleteTodo = (id) => {
    const confirmation = confirm("Do You Really Want To Delete !")
    if (confirmation === true) {
        const password = prompt("Enter the Password")
        if (password === todo) {
            axios.delete(`https://rich-plum-springbok-fez.cyclic.cloud/todo/${id}`)
                .then((res) => {
                    getTodo(`Deleted Todo ${id}`)
                }).catch((err) => {
                    console.log(err);
                })
        }
    }
    else {

    }
}

getTodo("Get All Products")

const addTodo = () => {
    const date = new Date();
    const days = ["Sunday", 'Monday', "Tuesday", "Wednesday", "Thursday", "Sataurday"]
    axios.post("https://rich-plum-springbok-fez.cyclic.cloud/todo"
        , { todo: document.getElementById("todo").value, date: moment().format() })
        .then((res) => {
            getTodo("Posted Todo")
        }).catch((err) => {
            console.log(err);
        })
}

const updatePara = (id) => {
    axios.get(`https://rich-plum-springbok-fez.cyclic.cloud/todo/${id}`)
        .then((res) => {
            const item = res.data.todo
            const element = document.getElementById(`${id}`);
            element.innerHTML = `
            <input value='${item.todo}' id='${item._id}-todo' />
            <div class="buttons">
            <button onclick="deleteTodo('${item._id}')"><i class="fa-solid fa-trash-can"></i></button>
            <button onclick="updateTodo('${item._id}')"><i class="fa-solid fa-pencil"></i></button>
            </div>
            `
        }).catch((err) => {
            console.log(err);
        })
}

const updateTodo = (id) => {
    axios.put(`https://rich-plum-springbok-fez.cyclic.cloud/todo/${id}`,
        { todo: document.getElementById(`${id}-todo`).value })
        .then((res) => {
            getTodo(`Updated Todo ${id}`)
        }).catch((err) => {
            console.log(err);
        })
}

window.addTodo = addTodo
window.deleteTodo = deleteTodo
window.updatePara = updatePara
window.updateTodo = updateTodo