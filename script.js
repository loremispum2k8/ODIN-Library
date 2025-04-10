let myLibrary = [];

function Book(title,author,pages,wasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.wasRead = wasRead;
}

let container = document.querySelector('.card-container');

function addBookToLibrary() {
    myLibrary.forEach((book)=>{
        let card = document.createElement('div'); card.classList.add('card');
        let title = document.createElement('h1'); title.classList.add('title'); title.textContent = book.title;
        let author = document.createElement('p'); author.classList.add('author'); author.textContent = book.author;
        let pages = document.createElement('p'); pages.classList.add('pages'); pages.textContent = book.pages;
        let wasRead = document.createElement('p'); wasRead.classList.add('wasRead');wasRead.textContent = book.wasRead;
        let deleteBtn = document.createElement('button'); deleteBtn.classList.add('deleteBtn'); deleteBtn.textContent = 'Delete';
        let changeStatus = document.createElement('button'); changeStatus.classList.add('changeRead'); changeStatus.textContent = 'Change Status';
        card.appendChild(title); card.appendChild(author); card.appendChild(pages); card.appendChild(wasRead); card.appendChild(deleteBtn); card.appendChild(changeStatus); card.setAttribute('data-id',book.id)
        container.appendChild(card);
    })
}

let addBtn = document.querySelector('.addBtn');
let popUpAddBtn = document.querySelector('.buttonForAdding');
let popUp = document.querySelector('.popUp');
let form = document.querySelector('.form');
let exitBtn = document.querySelector('.exit');

let formTitle = document.querySelector('#title')
let formAuthor = document.querySelector('#author')
let formPages = document.querySelector('#pages')
let formStatus = document.querySelector('#status')
let deleteBtn = document.querySelectorAll('.deleteBtn');
let changeStatusBtn = document.querySelectorAll('.changeRead')
addBtn.addEventListener('click',()=>{
  popUp.style.display='flex';
  exitBtn.addEventListener('click',()=>{
    popUp.style.display='none';
  })
  popUpAddBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(form.checkValidity()){
      myLibrary.push(new Book(formTitle.value,formAuthor.value,formPages.value,formStatus.value));
      container.innerHTML = '';
      addBookToLibrary()
      console.log(myLibrary)
      form.reset();
    }
  })
})


container.addEventListener('click',(e)=>{
  
  if(e.target.classList.contains('deleteBtn')){
    myLibrary = myLibrary.filter((bookId)=>bookId.id !== e.target.parentElement.getAttribute('data-id'));
    container.innerHTML = '';
    addBookToLibrary()
    console.log(myLibrary)
  }
  
  if(e.target.classList.contains('changeRead')){
    myLibrary.forEach((book)=>{
      if(book.id === e.target.parentElement.getAttribute('data-id')){
        if(book.wasRead === 'Not read yet'){
          book.wasRead = 'Already read';
          container.innerHTML = '';
          addBookToLibrary()
          console.log(myLibrary)
        } else if(book.wasRead === 'Already read'){
          book.wasRead = 'Not read yet';
          container.innerHTML = '';
          addBookToLibrary();
          console.log(myLibrary)
        }
      }
    })
  }
})

