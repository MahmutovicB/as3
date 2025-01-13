function switchTheme(theme) {
    var navbar = document.querySelector('.navbar');
    var button = document.getElementById('readMoreButton');
    var footer = document.getElementById('ftrdiv');
    var navbutton = document.querySelectorAll('.nav-item-link'); 

    if (theme === 'dark') {
        navbar.style.backgroundColor = '#000000';
        button.style.backgroundColor = '#000000';
        footer.style.backgroundColor = '#000000';
        navbutton.forEach(element => {
            element.classList.remove('text-dark');
            element.classList.add('text-white');
        });
        button.classList.remove('text-dark');
        button.classList.add('text-white');
        footer.classList.remove('text-dark');
        footer.classList.add('text-white');

    } else if (theme === 'light') {
        navbar.style.fontcolor = '#000000';
        navbar.style.backgroundColor = '#f2f2f2';
        button.style.backgroundColor = '#f2f2f2';
        footer.style.backgroundColor = '#f2f2f2';
        navbutton.forEach(element => {
            element.classList.add('text-dark');
            element.classList.remove('text-white');
        });
        button.classList.add('text-dark');
        button.classList.remove('text-white');
        footer.classList.add('text-dark');
        footer.classList.remove('text-white');
        
    } else {
        navbar.style.backgroundColor = '#293040';
        button.style.backgroundColor = '#293040';
        footer.style.backgroundColor = '#293040';
        navbutton.forEach(element => {
            element.classList.remove('text-dark');
            element.classList.add('text-white');
        });

        button.classList.remove('text-dark');
        button.classList.add('text-white');
        footer.classList.remove('text-dark');
        footer.classList.add('text-white');
    }
}

async function getJoke() {
    try{
        let response = await fetch('https://official-joke-api.appspot.com/random_joke');
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        document.getElementById('joke').innerHTML = `<h3>${data.setup}</h3><p>${data.punchline}</p>`;
    } catch(error) {
        toastr.error('There has been a problem with your fetch operation:', error);
    }
}
getJoke();


async function fetchProducts() {
    try{
        const response = await fetch('./assets/js/productlist.json');
        if(!response.ok){
            throw new Error('HTTP error ' + response.status);
        }
        const data = await response.json();
        var table = document.getElementById('tbody');
        data.forEach(product => {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            cell1.innerHTML = product.id;
            cell2.innerHTML = product.name;
            cell3.innerHTML = product.price;
            cell4.innerHTML = `<button class="btn btn-secondary" onclick="editProduct(${product.id})">Edit</button>`;
            cell5.innerHTML = `<button class="btn btn-secondary" onclick="deleteProduct(${product.id})">Delete</button>`;
        });
    } catch(error){
        console.error(error);
    } finally{
        console.log('product fetch completed');
    }
}
fetchProducts();


function openModal(imageSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function toggleContent(contentId, event) {
    var button = event.target;
    var content = document.getElementById(contentId);
    if (content.style.display === "none") {
        content.style.display = "block";
        button.textContent = "Show less...";
    } else {
        content.style.display = "none";
        button.textContent = "See more...";
    }
}   

function toggleAccordion(collapseId) {
    var content = document.getElementById(collapseId);
    if (content.classList.contains('show')) {
        content.classList.remove('show');
    } else {
        var allContents = document.querySelectorAll('.accordion-collapse');
        allContents.forEach(function(item) {
            item.classList.remove('show');
        });
        content.classList.add('show');
    }
}


function editProduct(id) {
    var table = document.getElementById('tbody');
    for (var i = 0, row; row = table.rows[i]; i++) {
        if (row.cells[0].innerHTML == id) {
            for (var j = 1; j < row.cells.length - 2; j++) {
                var cell = row.cells[j];
                var input = document.createElement('input');
                input.type = 'text';
                input.value = cell.innerHTML;
                cell.innerHTML = '';
                cell.appendChild(input);
            }
            row.cells[row.cells.length - 2].innerHTML = `<button class="btn btn-secondary"  onclick="saveProduct(${id})">Save</button>`;
            break;
        }
    }
}

function saveProduct(id) {
    var table = document.getElementById('tbody');
    for (var i = 0, row; row = table.rows[i]; i++) {
        if (row.cells[0].innerHTML == id) {
            for (var j = 1; j < row.cells.length - 2; j++) {
                var cell = row.cells[j];
                var input = cell.firstChild;
                cell.innerHTML = input.value;
            }
            row.cells[row.cells.length - 2].innerHTML = `<button class="btn btn-secondary" onclick="editProduct(${id})">Edit</button>`;
            break;
        }
    }
}

function deleteProduct(id) {
    var table = document.getElementById('tbody');
    for (var i = 0, row; row = table.rows[i]; i++) {
        if (row.cells[0].innerHTML == id) {
            table.deleteRow(i);
            break;
        }
    }
}

function reg(event) {
    event.preventDefault();

    let form = document.getElementById('registrationForm');

    let username = form.username.value;
    let email = form.email.value;
    let password = form.password.value;
    let confirmPassword = form.confirm_password.value;

    if (password !== confirmPassword) {
        alert("No matching passwords");
        return;
    }

    let data = {
        username: username,
        email: email,
        password: password
    }
    
    let jsonData = JSON.stringify(data);
    localStorage.setItem('userData', jsonData);
    console.log('Data stored:', jsonData);
    form.reset();
}

async function checkUser(event) {
    event.preventDefault();

    try{
        const response = await fetch('./assets/js/users.json');
        if(!response.ok){
            throw new Error('HTTP error ' + response.status);
        }
        const userData = await response.json();
        console.log(userData);

        let form = document.getElementById('loginform');
        let email = form.email.value;
        console.log('email korisnika: ' , email);
        let password = form.password.value;
        console.log('Sifra korisnika: ', password);


        if (email === '' || password === '') {
            alert('No user registered');
            return;
        } else {
            let userPresent = false;
            userData.forEach(user => {
                if (user.email === email && user.password === password) {
                    alert('Login successful');
                    userPresent = true;

                    let jsonData = JSON.stringify(user);
                    localStorage.setItem('userData', jsonData);
                    window.location.href = 'index.html';

                    let btn = document.getElementById('closeModalButton');
                    btn.click();
                    return; 
                }
            });

            if (!userPresent) {
                alert('Invalid email or password');
                return; 
            }
        }

        form.reset();
    } 
    catch(error){
        console.log(error);
    } 
 
}


