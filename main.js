let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");;
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create'
let tmp;

// get total
// Array افضل الاماكن للحفظ هو الأريي 
// أي ارايي فيها داتا يعني بيانات وتريد استخدامة في مشروع ستفعل علية لوب اي اراي ستفعل عليها لوب

function getTotal() 
{
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
         - +discount.value
        total.innerHTML = result
        total.style = "background: #040;";
    }else {
        total.innerHTML = '';
        total.style = "background: #852828;";
    }
}





// create product

let dataPro;
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}


submit.onclick = function (){
    let newPor = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != ''&& price.value != '' && newPor.count < 100){
    if (mood === "create"){
        if (newPor.count > 1) {
            for (let i = 0; i < newPor.count; i++) {
                dataPro.push(newPor);
            }
        }else {
            dataPro.push(newPor);
        }
    }else {
        dataPro[tmp] = newPor; 
        // هذا يتسمى المتغير الوهمي او المتغير المساعد تنشأه بدون ان يساوي شيء ثم تضعة في فونكشن المراد اخذ المتغير الخاص بها وتضع تمبليت يساوي المتغير ثم تنقلة الى اي مكان ثاني 
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block'
    }
    clearData(); 
}
   
    // save localstorage
    //                                             [dataPro]
    // dataPro.push(newPor); // VVVVVV هل من الممكن ان نضع دات برو الأريي  لحفظها في لوكل استورج لا لاينفع لماذا لأن الوكل ستورج ما تاخذ غير سترينق يعني نص لذالك سنهندل الداتا بهذه الطريقة 
    localStorage.setItem('product', JSON.stringify(dataPro));

    
    showData();
}

// clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData() 
{
    getTotal()
    let table = '';
    
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td onclick="deleteData(${i})"><button id="delete">delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataPro.length})</button>`
    }else {
        btnDelete.innerHTML = ''
    }
}

showData();

// delete

function deleteData(i) {
    dataPro.splice(i, 1); // هل هو كذا يحذف عنصر نعم ولاكن سيحذف من الأراي فقط ولا يحذف من الوكل استورج لذالك بعد ما تحذف من الأري
    // تروح حاذفة من الوكل استورج باضافت الأري الجديدة التي حذفت منها العنصر ويجب عليك عند اضافة الأريي تحويلها الى سترينق لان الوكل استورج لا تقبل غير السترينق
    localStorage.product = JSON.stringify(dataPro); // showData() هل كذا سيحذف نعم لكن لا ترى ما حذفت حتا تعمل تحديث للصفحة لذالك يجب عليك استدعاء فونكشن ال 
    showData();
}

function deleteAll() {
    let confirmMsg = confirm("هل تريد حذف جميع البيانات")
    if (confirmMsg == true) {
    localStorage.clear();
    dataPro.splice(0);
    showData();
    }else {
        console.log("No")
    }
}

// count

// update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update'
    mood = 'update'
    tmp = i;
    scroll({
        top: 0,
        behavior:'smooth'
    })
    search.value = '';
}

// search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchTitle') {
        searchMood = 'title';
        
    }else {
        searchMood = 'category';

    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value)
 {
    let table = ''
    for (i = 0; i < dataPro.length; i++){
    if (searchMood == 'title')

    {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td onclick="deleteData(${i})"><button id="delete">delete</button></td>
                </tr>`;
            }
  
        }
        
    else {  

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td onclick="deleteData(${i})"><button id="delete">delete</button></td>
                </tr>`;
            }
    }
    document.getElementById('tbody').innerHTML = table;
}
 }




