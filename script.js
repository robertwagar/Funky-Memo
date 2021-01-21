const addBtn = document.querySelector('#add');

addBtn.addEventListener('click', () => addNewMemo());

 ///// local storage ///////////
const memos = JSON.parse(localStorage.getItem('memos'));

if(memos) {
    memos.forEach(memo => addNewMemo(memo))
}

function addNewMemo(text = '') {
    const memo = document.createElement('div')
    memo.classList.add('memo')


    // creating template to add when a memo is done, its commented on the html
    // and added ternary operator with dynamic classes
    memo.innerHTML = `
        <div class="memo-content">
            <button class="edit-btn"><i class="far fa-edit"></i></button>
            <button class="delete-btn"><i class="far fa-trash-alt"></i></button>
        </div>
        <div class="add-text ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}" ></textarea>  
    `

    const addText = memo.querySelector('.add-text');
    const textArea = memo.querySelector('textarea');
    const editBtn = memo.querySelector('.edit-btn');
    const deleteBtn = memo.querySelector('.delete-btn');

    textArea.value = text;
    addText.innerHTML = marked(text);

    deleteBtn.addEventListener('click', () => {
        memo.remove();

        updateLocalStorage();
    })


    editBtn.addEventListener('click', () => {
        addText.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        addText.innerHTML = marked(value);

            ////// localStorage ////////////
        updateLocalStorage();
    })

    document.body.appendChild(memo);
}

////////////// localStorage /////////////////

function updateLocalStorage () {
    const memoInput = document.querySelectorAll('textarea');

    const memos = []

        // for each memo add the value to the array of memos
    memoInput.forEach(memo => memos.push(memo.value));


    localStorage.setItem('memos', JSON.stringify(memos));
}


/* 
// basic localstorage set get
localStorage.setItem('name', JSON.stringify())
JSON.parse(localStorage.getItem('name'))
localStorage.removeItem('name') */