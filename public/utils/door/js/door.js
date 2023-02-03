const button = document.getElementById('openBtn');
button.addEventListener('click', verifyInput);

function verifyInput(e) {
    e.preventDefault();

    const date = new Date();
    const properMonth = date.getMonth() + 1;
    const month = properMonth < 10 ? '0' + properMonth : properMonth;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    if (month + day === document.getElementById('doorcode').value) {
        document.getElementById('title').textContent += '.';
        console.log('Sending signal to RPi')
    } else {
        document.getElementById('doorcode').value = '';
    }
}