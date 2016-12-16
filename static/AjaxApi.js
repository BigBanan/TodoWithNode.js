// // all
// $.ajax({
//     type: 'get',
//     url: '/todo/all',
//     success: function(r) {
//         console.log(r)
//     }
// })
//
// // add
// var todo = {
//     task: '写作业',
// }
// $.ajax({
//     type: 'post',
//     url: '/todo/add',
//     data: JSON.stringify(todo),
//     contentType: 'application/json',
//     success: function(r) {
//         console.log(r)
//     }
// })
//
// // delete
// var todo = {
//     id: 1,
// }
// $.ajax({
//     type: 'post',
//     url: '/todo/delete',
//     data: JSON.stringify(todo),
//     contentType: 'application/json',
//     success: function(r) {
//         console.log(r)
//     }
// })
//
// // update
// var todo = {
//     id: 2,
//     task: '吃晚餐',
// }
// $.ajax({
//     type: 'post',
//     url: '/todo/update',
//     data: JSON.stringify(todo),
//     contentType: 'application/json',
//     success: function(r) {
//         console.log(r)
//     }
// })
//
// // finish
// var todo = {
//     id: 2
// }
// $.ajax({
//     type: 'post',
//     url: '/todo/finish',
//     data: JSON.stringify(todo),
//     contentType: 'application/json',
//     success: function(r) {
//         console.log(r)
//     }
// })

var Todo = function() {}

Todo.prototype.post = function(path, data, callback) {
    var ajax = {
        type: 'post',
        url: `/todo/${path}`,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: callback,
    }
    $.ajax(ajax)
}

Todo.prototype.get = function(path, callback) {
    var ajax = {
        type: 'get',
        url: `/todo/${path}`,
        success: callback,
    }
    $.ajax(ajax)
}

Todo.prototype.all = function() {
    var path = 'all'
    var callback = function(r) {
        todoList = JSON.parse(r)
        console.log(todoList)
    }
    this.get(path, callback)
}

// add 需要 todo.task
Todo.prototype.add = function(todo) {
    var path = 'add'
    var data = todo
    var callback = function(r) {
        var todo = JSON.parse(r)
        console.log(todo)
        insertTodo(todo)
    }
    this.post(path, data,callback)
}

// delete 需要 todo.id
Todo.prototype.delete = function(todo) {
    var path = 'delete'
    var data = todo
    var callback = function(r) {
        console.log(r)
    }
    this.post(path, data,callback)
}

// update 需要 todo.id 和 todo.task
Todo.prototype.update = function(todo) {
    var path = 'update'
    var data = todo
    var callback = function(r) {
        console.log(r)
    }
    this.post(path, data,callback)
}



// finish 需要 todo.id 和 todo.finish
Todo.prototype.finish = function(todo) {
    var path = 'finish'
    var data = todo
    var callback = function(r) {
        var todo = JSON.parse(r)
        console.log(todo)
        checkTodo(todo)
    }
    this.post(path, data,callback)
}

var checkTodo = function(todo) {
    var cells = $('.todo-cell')
    var len = cells.length
    for (var i = 0; i < len; i++) {
        var id = $(cells[i]).data('id')
        if(id == todo.id) {
            var tar = cells[i].children[1]
            if (todo.finish) {
                $(tar).removeClass('fa-circle-thin')
                $(tar).addClass('fa-check-circle-o')
                $(cells[i]).addClass('todo-cell-finish')
            } else {
                $(tar).addClass('fa-circle-thin')
                $(tar).removeClass('fa-check-circle-o')
                $(cells[i]).removeClass('todo-cell-finish')
            }
        }
    }
}
