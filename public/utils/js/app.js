const mealsContainer = document.querySelector('.meals');
const recipesContainer = document.querySelector('.recipes');
const buttonContainer = document.querySelector('.day-btn-container');
buttonContainer.addEventListener('click', e => {
    const mealDayElements = mealsContainer.children;
    const recipeDayElements = recipesContainer.children;
    currentMealDays = [];

    for (let i = 0; i < mealDayElements.length; i++) {
        currentMealDays.push(mealDayElements[i].children[0].innerHTML);
    }

    const daysArray = [
        'maandag',
        'dinsdag',
        'woensdag',
        'donderdag',
        'vrijdag',
        'zaterdag',
        'zondag',
    ];
    
    if (e.target.innerHTML == '+ begin') {
        firstDayWeekDayIndex = daysArray.indexOf(
            currentMealDays[0].toLowerCase()
        );
        newDayToAdd = firstDayWeekDayIndex == 0 ? 6 : firstDayWeekDayIndex - 1;
        const dayName =
            daysArray[newDayToAdd].charAt(0).toUpperCase() +
            name.charAt(0).toUpperCase() +
            daysArray[newDayToAdd].slice(1);
        const newId = 'meal-' + daysArray[newDayToAdd].substr(0, 2);
        let randomClassName = Math.random();

        const newMealDayInputNode = createDayInputNode(dayName, newId, randomClassName);
        const newRecipeDayInputNode = createDayInputNode(dayName, newId, randomClassName);
        
        mealsContainer.insertBefore(newMealDayInputNode, mealDayElements[0]);
        recipesContainer.insertBefore(newRecipeDayInputNode, recipeDayElements[0]);
    } else {
        console.log(currentMealDays);
        lastDayWeekDayIndex = daysArray.indexOf(
            currentMealDays[currentMealDays.length-1].toLowerCase()
        );
        newDayToAdd = lastDayWeekDayIndex == 6 ? 0 : lastDayWeekDayIndex + 1;
        const dayName =
        daysArray[newDayToAdd].charAt(0).toUpperCase() +
        name.charAt(0).toUpperCase() +
        daysArray[newDayToAdd].slice(1);
        
        const newId = 'meal-' + daysArray[newDayToAdd].substr(0, 2);
        let randomClassName = Math.random();

        const newMealDayInputNode = createDayInputNode(dayName, newId, randomClassName);
        const newRecipeDayInputNode = createDayInputNode(dayName, newId, randomClassName);

        mealsContainer.insertBefore(newMealDayInputNode, mealDayElements.nextSibling);
        recipesContainer.insertBefore(newRecipeDayInputNode, recipeDayElements.insertBefore);
    }
});

const displayModalBtn = document.querySelector(".process-container");
const closeModalBtn = document.querySelector(".close-modal-btn");
const mainPage = document.querySelector(".main-container");
const modal =  document.querySelector(".modal");
displayModalBtn.addEventListener('click', () => {
    mainPage.classList.add('disabled');
    modal.style.display = 'block';
    const copyBtns = document.getElementsByClassName('copy-btn');
    for(let i = 0; i < copyBtns.length; i++) {
        copyBtns[i].addEventListener('click', c => {
            let textToCopy = c.target.parentNode.nextElementSibling.nextElementSibling.innerHTML;
            textToCopy = '*' + c.target.parentNode.innerHTML.substr(0, c.target.parentNode.innerHTML.indexOf('<')).trim() + '*\n' + textToCopy.replace(/<br>/g, '\n');
    
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = textToCopy;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();
            document.execCommand("copy");
            tempTextarea.remove();
        })
    }
    fillModal();

    closeModalBtn.addEventListener('click', () => {
        mainPage.classList.remove('disabled');
        modal.style.display = 'none';
    });
    
});


function fillModal(className) {
    const mealsList = createList("meals");
    document.querySelector('.content-meals').innerHTML = mealsList.join('<br>');
    
    const recipesList = createList("recipes");
    document.querySelector('.content-recipes').innerHTML = recipesList.join('<br>');

    const shoppingList = document.getElementById("main-groceries").value.split("\n");
    document.querySelector('.content-shopping').innerHTML = shoppingList.join('<br>');
    
    const otherList = document.getElementById("other-groceries").value.split("\n");
    document.querySelector('.content-other').innerHTML = otherList.join('<br>');

    const laterList = document.getElementById("later-groceries").value.split("\n");
    document.querySelector('.content-later').innerHTML = laterList.join('<br>');311
}


function createContentDiv() {
    const newMealDayInputNode = document.createElement('div');
    newMealDayInputNode.classList.add('wa-content');
}

function createList(className) {
    let myParentNode = document.getElementsByClassName(className)[0].children;
    const myArray = Array.from(myParentNode);
    let mealsList = myArray.map(
        m => "*" + m.children[0].innerHTML.substr(0,2).toLowerCase() + "* " + m.children[1].value
    );

    return mealsList.filter(m => m.substr(5) != "");
}


function removeNode() {
    const removalId = this.parentNode.classList[1];
    const elementsToRemove = Array.from(document.getElementsByClassName(removalId));
    elementsToRemove.forEach(n => n.remove());
}

function createDayInputNode(dayName, newId, randomClassName) {
    const newMealDayInputNode = document.createElement('div');
    newMealDayInputNode.classList.add('day-input');
    newMealDayInputNode.classList.add(randomClassName);
    
    const newDayInputLabel = document.createElement('label');
    newDayInputLabel.setAttribute('for', newId + '-' + Math.random());
    newDayInputLabel.innerHTML = dayName;
    newMealDayInputNode.appendChild(newDayInputLabel);
    
    const newDayInputTextInput = document.createElement('input');
    newDayInputTextInput.setAttribute('type', 'text');
    newDayInputTextInput.id = newId + '-' + Math.random();
    newMealDayInputNode.appendChild(newDayInputTextInput);
    
    const newDayInputDeleteBtn = document.createElement('span');
    newDayInputDeleteBtn.classList.add('delete-btn');
    newDayInputDeleteBtn.innerHTML = '-';
    newDayInputDeleteBtn.addEventListener('click', removeNode);
    newMealDayInputNode.append(newDayInputDeleteBtn);

    return newMealDayInputNode;
}