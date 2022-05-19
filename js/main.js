const URL_BASE = "https://web-mobile.herokuapp.com/";

window.onload = function () {
    readAllStudent();
}

function callAPI(url, method, callback, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url, true);
    if (method == 'POST' || method == 'PATCH' || method == 'PUT') {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }
    xhr.onload = function () {
        callback(xhr.status, xhr.response);
    }
    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }
}

function readAllStudent() {
    var content = document.getElementById('content');
    content.innerHTML = ""
    const url = URL_BASE + "/student";
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            var title = document.getElementById('title')
            title.innerHTML = "<h2>Estudantes</h2>";
            var content = document.getElementById('content');
            content.innerHTML = ""
            for (var i = 0; i < response.length; i++) {
                var str = createCard(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function insertStudent() {
    event.preventDefault();
    var student = {
        name: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        course: document.getElementById('course').value
    }

    const url = URL_BASE + "/student";

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            alert("Aluno criado");
            readAllStudent();
            clear();
        } else {
            alert("ERRO: " + status);
        }
    }, student);
}

function deleteStudent(tia) {
    const resp = confirm('Deseja realmente apagar o aluno com tia ' + tia + '?');
    if (resp) {
        const url = URL_BASE + "/student/" + tia;
        callAPI(url, "DELETE", function () {
            readAllStudent();
        });
    }
}

function updateStudent() {
    event.preventDefault();
    var student = {
        name: document.getElementById('name').value,
        tia: document.getElementById('tia').value,
        course: document.getElementById('course').value
    }

    const url = URL_BASE + "/student/edit";

    callAPI(url, "PUT", function (status, response) {
        if (status === 200 || status === 201) {
            readAllStudent();

            clear();

        } else {
            alert("ERRO: " + status);
        }
    }, student);
}

function clear() {
    document.getElementById('name').value = "";
    document.getElementById('tia').value = "";
    document.getElementById('course').value = "";
}

function createCard(student) {
    var str = "<article>";
    str += "<h1>" + student.name + "</h1>";
    str += "<p>" + student.tia + "</p>";
    str += "<p>" + student.course + "</p>";
    str += "<button onclick='deleteStudent(" + student.tia + ")' class='button'>Deletar</button>";
    str += "<button onclick='updateStudent()'class='button'>Editar</button>";
    str += "</article>";
    return str;
}

function readAllTeacher() {
    const url = URL_BASE + "/teacher";
    callAPI(url, 'GET', function (status, response) {
        if (status === 200) {
            
            var title = document.getElementById('title');
            title.innerHTML = "<h2>Professores</h2>";
            var content = document.getElementById('content');
            content.innerHTML = ""
            for (var i = 0; i < response.length; i++) {
                var str = createTeacherCard(response[i]);
                content.innerHTML += str;
            }

        } else {
            alert("Erro ao contatar o servidor. Tente novamente mais tarde!");
        }
    });
}

function deleteTeacher(tia) {
    const resp = confirm('Deseja realmente apagar o professor com tia ' + tia + '?');
    if (resp) {
        const url = URL_BASE + "/teacher/" + tia;
        callAPI(url, "DELETE", function () {
            readAllTeacher();
        });
    }
}

function createTeacherCard(teacher) {
    var str = "<article>";
    str += "<h1>" + teacher.name + "</h1>";
    str += "<p>" + teacher.tia + "</p>";
    str += "<li>" + teacher.disciplines + "</li>";
    str += "<button onclick='deleteTeacher(" + teacher.tia + ")' class='button'>Deletar</button>";
    str += "<button onclick='updateTeacher()'class='button'>Editar</button>";
    str += "</article>";
    return str;
}

function insertTeacher() {
    event.preventDefault();
    var teacher = {
        name: document.getElementById('teacherName').value,
        tia: document.getElementById('teacherTia').value,
        disciplines: document.getElementById('disciplines').value.split(',')
    }
    console.log(teacher)

    const url = URL_BASE + "/teacher";

    callAPI(url, "POST", function (status, response) {
        if (status === 200 || status === 201) {
            alert("Professor criado");
            readAllTeacher();
            clear();
        } else {
            alert("ERRO: " + status);
        }
    }, teacher);
}

function updateTeacher() {
    event.preventDefault();
    var teacher = {
        name: document.getElementById('teacherName').value,
        tia: document.getElementById('teacherTia').value,
        disciplines: document.getElementById('disciplines').value
    }

    const url = URL_BASE + "/teacher/edit";

    callAPI(url, "PUT", function (status, response) {
        if (status === 200 || status === 201) {
            readAllTeacher();
            clear();
        } else {
            alert("ERRO: " + status);
        }
    }, teacher);
}