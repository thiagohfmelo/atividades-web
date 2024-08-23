let sum = 0;

function addNumber() {
    const input = document.getElementById('numberInput');
    const number = parseFloat(input.value);
        if (!isNaN(number)) {
            sum += number;
            document.getElementById('sumDisplay').textContent = sum; 
            input.value = '';
    }
}
