var log = function() {
    console.log.apply(console, arguments)
}

var initBrower = function() {
    $('#id-input-add').hide()

}

var initTodo = function() {
    var callback = function(r) {
        todoList = JSON.parse(r)
        console.log(todoList)
        for (var i = 0; i < todoList.length; i++) {
            insertTodo(todoList[i])
            checkTodo(todoList[i])
        }
    }
    todoApi.get('all', callback)
}

var currentTime = function() {
    var d = new Date()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hours = d.getHours()
    var minutes = d.getMinutes()
    var seconds = d.getSeconds()
    // var timeString = `${month}/${date} ${hours}:${minutes}:${seconds}`
    if(hours < 10) {
        hours = `0${hours}`
    }
    if(minutes < 10) {
        minutes = `0${minutes}`
    }
    var timeString = `${hours}:${minutes}`
    return timeString
}

var tempalteTime = function(time) {
    var t = time.slice(11)
    return t
}

var templateTodo = function(todo) {
    var time = tempalteTime(todo.time)
    var t = `
            <div class="todo-cell" data-id=${todo.id}>
                <time> ${time}</time>
                <i class="todo-check fa fa-circle-thin"></i>
                ${todo.task}
            </div>
    `
    return t
}

var insertTodo = function(todo) {
    // 添加到 contains 中
    var todoContainer = $('.todo-cells')
    var t = templateTodo(todo)
    todoContainer.prepend(t)
}

var indexOfElement = function(element) {
    var parent = element.parentElement
    for (var i = 0; i < parent.children.length; i++) {
        var e = parent.children[i]
        if (e === element) {
            // log('i =', i)
            return i
        }
    }
}

var bindNewButton = function() {
    $('#id-newTodo,.fa-plus').on('click', function(){
        $('#id-input-add').show()
        $('#id-input-add')[0].focus()
    })
}

var bindInputBlur = function() {
    $('#id-input-add').on('blur', function(){
        $(this).hide()
        $(this).val('')
    })
}

var bindKeyEnter = function() {
    $('#id-input-add').on('keydown', function(event){
        var todo = {}
        var target = event.target
        if(event.key === 'Enter') {
            event.preventDefault()
            var task = $(target).val()
            if (task.length > 0) {
                todo.task = task
                todoApi.add(todo)
                $(target).val('')
                $('#id-input-add').hide()
            } else {
                $('#id-input-submit').click()
            }
        }
    })
}

var bindFinish = function() {
    $('.todo-task').on('click', '.todo-check', function(event){
        var todo = {}
        var target = event.target
        todo.id = $(target.parentElement).data('id')
        if ($(target).hasClass('fa-check-circle-o')) {
            todo.finish = false
        } else if ($(target).hasClass('fa-circle-thin')) {
            todo.finish = true
        }
        todoApi.finish(todo)
        // $(target).toggleClass('fa-check-circle-o')
        // $(target).toggleClass('fa-circle-thin')
    })
}

var bindEvents = function() {
    bindNewButton()
    bindKeyEnter()
    bindFinish()
    bindInputBlur()
}

var todoList = []
var todoApi = new Todo()

var __main = function() {
    initTodo()
    initBrower()
    bindEvents()
}
