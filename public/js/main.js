function onSubmit(e) {
    e.preventDefault();
    document.querySelector('.msg').textContent = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === '') {
        alert('Please fill in the fields');
        return;
    }
    generateImageReq(prompt, size);
}

async function generateImageReq(prompt, size) {
    try {
        showSpinner();
        const res = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, size })
        })
        if(!res.ok) {
            hideSpinner();
            throw new Error('Something went wrong');
        }
        
        const data = await res.json();
        document.querySelector('#image').src = data.data;

        hideSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
}


function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);