var express = require('express')
var bodyParser = require("body-parser")
var app = express()

var todoList = [
    {
        id: 1,
        task: '吃饭',
        finish: false,
        time: '2016-11-12 21:36',
    }
]

app.use(bodyParser.json())

app.use(express.static('static'))

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, function(err, data){
        console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var currentTime = function() {
    var d = new Date()
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    if(hours < 10) {
        hours = `0${hours}`
    }
    if(minutes < 10) {
        minutes = `0${minutes}`
    }
    var timeString = `${year}-${month}-${date} ${hours}:${minutes}`
    return timeString
}

var indexById = function(id) {
    var len = todoList.length
    for (var i = 0; i < len; i++) {
        if(todoList[i].id == id) {
            var index = i
            return index
        }
    }
    return false
}

var deleteTodo = function(id) {
    var index = indexById(id)
    if (index === false) {
        console.log('can not delete')
        return false
    } else {
        var todo = todoList[index]
        todoList.splice(index, 1)
        return todo
    }
}

var addTodo = function(todo) {
    if (todo.task.length == 0) {
        return false
    }else if(todoList.length > 0 ) {
        todo.id = todoList[todoList.length - 1].id + 1
    } else {
        todo.id = 1
    }
    todo.time = currentTime()
    todo.finish = false
    todoList.push(todo)
    return todo
}

var updateTodo = function(id, task) {
    var index = indexById(id)
    if (index === false) {
        return false
    } else {
        todoList[index].task = task
        return todoList[index]
    }
}

var finishTodo = function(id, finish) {
    var index = indexById(id)
    if (index === false) {
        return false
    } else {
        todoList[index].finish = finish
        return todoList[index]
    }
}

var sendRes = function(response, todo) {
    var r = JSON.stringify(todo)
    response.send(r)
}

app.get('/', function (request, response) {
    var path = 'index.html'
    sendHtml(path, response)
})

app.get('/todo/all', function (request, response) {
    var r = JSON.stringify(todoList)
    response.send(r)
})

app.post('/todo/delete', function (request, response) {
    console.log('todo delete id', request.body)
    var id = request.body.id
    var todo = deleteTodo(id)
    sendRes(response, todo)
})

app.post('/todo/add', function (request, response) {
    console.log('todo add', request.body)
    var todo = addTodo(request.body)
    sendRes(response, todo)
})

app.post('/todo/update', function (request, response) {
    console.log('todo update', request.body)
    var id = request.body.id
    var task = request.body.task
    var todo = updateTodo(id, task)
    sendRes(response, todo)
})

app.post('/todo/finish', function (request, response) {
    console.log('todo finish', request.body)
    var id = request.body.id
    var finish = request.body.finish
    var todo = finishTodo(id, finish)
    sendRes(response, todo)
})

var port = 8081
app.listen(port, function () {
    console.log(`TODO app listening on port ${port}!`);
})
