class Book {
    constructor (title , auther ,isbn){
        this.title = title ;
        this.auther = auther ;
        this.isbn = isbn ;
    };
}

class Store {
    
    //get books from local storage
    static getbooks() {
        let books  ;
        if (localStorage.getItem("books") === null) {
            books = [] ;
        }else {
            books = JSON.parse(localStorage.getItem("books")) ;
        }
        return books ; 

    }
    
    // add a book to  localstorage
    static addbook(book)  {
        const books = Store.getbooks() ;
        books.push(book) ;
        localStorage.setItem('books' ,JSON.stringify(books)) ;
    }

    static removeBook(rl) {
        const books = Store.getbooks() ;
        books.forEach((value , index ) => {
            if (value['isbn'] === rl){
                books.splice(index ,1)
            }
        })
        console.log(books)
        localStorage.setItem('books' , JSON.stringify(books)) ;



    }
}

class UI {
    // display books
    static displayBooks () {
        const books = Store.getbooks()
        books.forEach((book)=> UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector("#content") ;
        const row  = document.createElement('tr') ;

        row.innerHTML = `<td>${book.title}</td>
        <td>${book.auther}</td>
        <td>${book.isbn}</td>
        <td ><a class="delete" href="#">x</a></td>` ;

        list.appendChild(row) ;
    }

    static deleteBook(ele) {
        ele.parentElement.parentElement.remove();
    }


    // show  warning  all inputs required 
    static showWarning(er , cl){
        const container = document.querySelector('.container') ; 
        const   div = document.createElement("div") ;
            div.className = "notification" ;
            div.innerText = er ;
            div.style = `color : ${cl} ;`
        
        const form = document.querySelector("#book-form") ;

        container.insertBefore(div , form) ;

        // wait 3 second and go away 
        setTimeout(()=> div.remove() ,3000) ;
    }

    static ClearFiles() {
        document.querySelector('#title').value = '' ;
        document.querySelector("#auther").value = '' ;
        document.querySelector("#isbn").value = '' ;
    }
}


document.addEventListener('DOMContentLoaded' , UI.displayBooks) ;

document.querySelector("#book-form").addEventListener('submit' , (e)=>
 {
    e.preventDefault() ;
    //get form value
    const title = document.querySelector('#title').value ;
    const auther = document.querySelector("#auther").value ;
    const isbn = document.querySelector("#isbn").value ;


    if ( title === "" || auther=== "" || isbn === "" ) {
        UI.showWarning("All input are required" , "red") ;


    }else {

        //construct it with the class book
        const book = new Book(title , auther , isbn) ;

        //add book to ui 
        UI.addBookToList(book) ;

        Store.addbook(book)
        
        // clear fields
        UI.ClearFiles();

        console.log(book) ; 
        UI.showWarning("new book has been added successfully" , "green") ;
    }
 })


 document.querySelector("#content").addEventListener('click' , (e) =>
 {
    // delete elements with the  button 
    if (e.target.className === "delete"){
        Store.removeBook(e.target.parentElement.previousElementSibling.innerText) ;
        UI.deleteBook(e.target);
        
        UI.showWarning("One book has been deleted" , "brown") ;
    };
 });