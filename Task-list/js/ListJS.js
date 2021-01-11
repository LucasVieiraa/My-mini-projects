;(function(){
                    'use strict'

 const todoAddBtnForm = document.getElementById('todo-add');
 const caixaTxt = document.getElementById('item-input');
 const ul = document.getElementById('todo-list');
 const liS = ul.getElementsByTagName('li');

    let arrTasks = getSavedData()

    function getSavedData(){
        let tasksData = localStorage.getItem('tasks')
        tasksData = JSON.parse(tasksData)
  
        return tasksData && tasksData.length ? tasksData : [
            {
                name: 'task 1',
                createAt: Date.now(),
                completed: false
            },
            {
                name: 'task 2',
                createAt: Date.now(),
                completed: false
            }
        ];

         
    }

    function setNewData(){
        localStorage.setItem('tasks', JSON.stringify(arrTasks))
    }

    setNewData()

 
    function generateLiTask(obj){
        const li = document.createElement('li')
        const p = document.createElement('p')
        const checkBtn = document.createElement('button')
        const editBtn = document.createElement('i')
        const deleteBtn = document.createElement('i')

        li.className = 'todo-item'

        checkBtn.className = 'button-check'
        checkBtn.innerHTML = `<i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkBtn"></i>`
      //checkBtn.innerHTML = '<i class="fas fa-check displayNone" data-action="checkBtn"></i>'//data-action="checkBtn"    
        checkBtn.setAttribute('data-action', 'checkBtn')
        
        li.appendChild(checkBtn)

        p.className = 'task-name'
        p.textContent = obj.name
        li.appendChild(p)

        editBtn.className = 'fas fa-edit'
        editBtn.setAttribute('data-action', 'editBtn')
        li.appendChild(editBtn)

        const containerEdit = document.createElement('div')
        containerEdit.className = 'editContainer'
        const inputEdit = document.createElement('input')
        inputEdit.setAttribute('type', 'text')
        inputEdit.className = 'editInput'
        inputEdit.value = obj.name
        
        containerEdit.appendChild(inputEdit)
        const containerEditBtn = document.createElement('button')
        containerEditBtn.className = 'editButton'
        containerEditBtn.textContent = 'Edit'
        containerEditBtn.setAttribute('data-action', 'containerEditBtn')
        containerEdit.appendChild(containerEditBtn)
        const containerCancelBtn = document.createElement('button')
        containerCancelBtn.className = 'cancelButton'    
        containerCancelBtn.textContent = 'Cancel'
        containerCancelBtn.setAttribute('data-action', 'containerCancelBtn')
        containerEdit.appendChild(containerCancelBtn)
        
        li.appendChild(containerEdit)

        deleteBtn.className = 'fas fa-trash-alt'
        deleteBtn.setAttribute('data-action', 'deleteBtn')
        li.appendChild(deleteBtn)


        //   addEvtLi(li)

          return li
    };


    function renderTask(){
        ul.innerHTML = ''
        arrTasks.forEach(taskObj => {
            ul.appendChild(generateLiTask(taskObj))
        });
    };


    function addTask(task){
        arrTasks.push({
            name: task,
            createAt: Date.now(),
            completed: false
        })

        setNewData()

    };


    function clickedUl(e){

        // console.log(e.target)
        const dataAction = e.target.getAttribute('data-action')

        if(!dataAction) return

        let currentLi = e.target
        while(currentLi.nodeName !== 'LI'){
            currentLi = currentLi.parentElement
        }

        const currentLiIndex = [...liS].indexOf(currentLi)
        // console.log(currentLiIndex)

        const actions = {
            checkBtn: function(){
                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed;
                let faCheck = currentLi.querySelector('.fa-check').classList

                    //  if(arrTasks[currentLiIndex].completed){
                    //     faCheck.remove('displayNone')
                    //  }else{
                    //     faCheck.add('displayNone')
                    //  }
                     setNewData()
                     renderTask()
            },


            editBtn: function(){
                const editContainer = currentLi.querySelector('.editContainer');
                
                [...ul.querySelectorAll('.editContainer')].forEach(container => {
                    container.removeAttribute('style')
                });

                editContainer.style.display = "flex";
            },


            deleteBtn: function(){
                console.log(`Task '${arrTasks[currentLiIndex].name}' removida`)
                arrTasks.splice(currentLiIndex, 1)
                renderTask()
                setNewData()
                //currentLi.remove()
                //currentLi.parentElement.removeChild(currentLi)
            },
            
            containerEditBtn: function(){
                const valorInput = currentLi.querySelector('.editInput').value
                arrTasks[currentLiIndex].name = valorInput
                renderTask()
                setNewData()
            },

            containerCancelBtn: function(){
                currentLi.querySelector('.editContainer').removeAttribute('style')
                currentLi.querySelector('.editInput').value = arrTasks[currentLiIndex].name
                // renderTask()
            }
        };

        if(actions[dataAction]){
           actions[dataAction]()
        }

    };



    todoAddBtnForm.addEventListener('submit', e => {
        e.preventDefault()
        console.log(caixaTxt.value)
        addTask(caixaTxt.value)
        renderTask()
        caixaTxt.value = ''
        caixaTxt.focus()

    });

    ul.addEventListener('click', clickedUl)

        renderTask()
   
 
})();