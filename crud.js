//get total
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mode="create";
let tmp;
function getTotal(){
    if(price.value!=""){
        let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerText=result
        total.style.background="green"
      }
      else{
        total.innerText="";
        total.style.background="red"

      }
    }  

//create product and //count
let dataPro;
if(localStorage.product!=null){
     dataPro=JSON.parse(localStorage.product)
}
else{
    dataPro=[];
}

submit.onclick=function(){
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerText,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mode==="create"){
        if(newPro.count>1){
        for(let i=0;i<newPro.count;i++){
            dataPro.push(newPro);
        }
    }
    else{
        dataPro.push(newPro);
    }
    }else{
        dataPro[tmp]=newPro;
        submit.innerHTML="create";
        count.style.display="block";
    }
    
   
   //save localstorage
   localStorage.setItem('product',JSON.stringify(dataPro))
   clearData();
   showData();
getTotal();
 
}
//clear inputs
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerText="";
    count.value="";
    category.value="";
}
//read
function showData(){
    
    let table="";
    for(let i=0;i<dataPro.length;i++){
        table+=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let container=document.getElementById('deleteAll')
    if(dataPro.length>0){
        container.innerHTML=`
        <button onclick="deleteALL()">delete All (${dataPro.length})</button>
        `
    }else{
         container.innerHTML="";

    }
   
}
showData()

//delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product=JSON.stringify(dataPro);
    showData();

}
function deleteALL(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
    
}

//update
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    category.value=dataPro[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML="update";
    mode="update";
    tmp=i;
    
}
//search
let  moodSearch="title";
let search=document.getElementById('search');
function searchMood(id){
    if(id=="searchTitle"){
        moodSearch="title";    
    }
    else{
         moodSearch="category";
        }
    search.placeholder=`search By ${moodSearch}`;
    search.focus();
    search.value="";
    showData();
}
function searchData(value){
    table="";
    for(let i=0;i<dataPro.length;i++){
        if(moodSearch=="title"){
            if(dataPro[i].title.includes(value)){
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                     `  
            }

        }
        else{
                if(dataPro[i].category.includes(value)){
                    table+=`
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                        `  
                }
        }
        document.getElementById('tbody').innerHTML=table;
    }

}
//clean data
