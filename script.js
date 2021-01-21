const addBtn = document.querySelector('#add')

addBtn.addEventListener('click', () => addNewMemo());

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

    const editBtn = memo.querySelector('.edit-btn')
    const deleteBtn = memo.querySelector('.delete-btn')
    const addText = memo.querySelector('.add-text')
    const textArea = memo.querySelector('textarea')

    textArea.value = text
    addText.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        memo.remove()
    })
    editBtn.addEventListener('click', () => {
        addText.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target

        addText.innerHTML = marked(value)
    })

    document.body.appendChild(memo)
}