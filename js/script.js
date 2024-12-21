
document.getElementById('bbody').style.backgroundColor = "rgb(31, 31, 49 )";
 

function getMatrix(rows, cols, prefix) {
    const matrix = [];
    for (let i = 1; i <= rows; i++) {
        const row = [];
        for (let j = 1; j <= cols; j++) {
            const value = document.getElementById(`${prefix}${i}${j}`).value;
            row.push(value ? parseInt(value, 10) : 0);
        }
        matrix.push(row);
    }
    return matrix;
}

// Populate output for the sequence
function setProcessSequence(sequence) {
    for (let i = 0; i < sequence.length; i++) {
        document.getElementById(`p${i + 1}`).value = `P${sequence[i]}`;
    }
}



// Banker's Algorithm to find safe sequence
function bankersAlgorithm(allocation, max, available) {
    const rows = allocation.length;
    const cols = available.length;

    const need = calculateNeed(max, allocation);
    const work = [...available];
    const finish = Array(rows).fill(false);
    const safeSequence = [];

    while (safeSequence.length < rows) {
        let found = false;

        for (let i = 0; i < rows; i++) {
            if (!finish[i]) {
                let canAllocate = true;
                for (let j = 0; j < cols; j++) {
                    if (need[i][j] > work[j]) {
                        canAllocate = false;
                        break;
                    }
                }

                if (canAllocate) {
                    for (let j = 0; j < cols; j++) {
                        work[j] += allocation[i][j];
                    }
                    finish[i] = true;
                    safeSequence.push(i);
                    found = true;
                }
            }
        }

        if (!found) {
            alert("The system is not in a safe state.");
       document.getElementById('bbody').style.backgroundColor = "red";;
       document.getElementById('p1').value="";
       document.getElementById('p2').value="";
       document.getElementById('p3').value="";
       document.getElementById('p4').value="";
       document.getElementById('p5').value="";

            return null;
        }
    }

    alert("The system is in a safe state.");
    document.getElementById('bbody').style.backgroundColor = "green";;

    return safeSequence;
}

// Example to fill sample data
function example() {
    const allocationExample = [
        [0, 1, 0],
        [2, 0, 0],
        [3, 0, 2],
        [2, 1, 1],
        [0, 0, 2],
    ];
    const maxExample = [
        [7, 5, 3],
        [3, 2, 2],
        [9, 0, 2],
        [2, 2, 2],
        [4, 3, 3],
    ];
    const availableExample = [3, 3, 2];

    fillMatrix(allocationExample, "a");
    fillMatrix(maxExample, "m");
    fillRow(availableExample, "av");
}

// Fill matrix in HTML
function fillMatrix(matrix, prefix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            document.getElementById(`${prefix}${i + 1}${j + 1}`).value = matrix[i][j];
        }
    }
}

// Fill single row
function fillRow(row, prefix) {
    for (let i = 0; i < row.length; i++) {
        document.getElementById(`${prefix}1${i + 1}`).value = row[i];
    }
}

function validateInput(rows, cols, prefix) {
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const value = document.getElementById(`${prefix}${i}${j}`).value;
            if (value === "" || isNaN(value)) {
                return false; // Invalid input detected
            }
        }
    }
    return true; // All inputs are valid
}

function validateRow(cols, prefix) {
    for (let j = 1; j <= cols; j++) {
        const value = document.getElementById(`${prefix}1${j}`).value;
        if (value === "" || isNaN(value)) {
            return false; // Invalid input detected
        }
    }
    return true; // All inputs are valid
}

function run_algo() {
    // Validate matrices and available resources
    if (!validateInput(5, 3, "a")) {
        alert("Please fill all the Allocation matrix fields with valid numbers.");
        return;
    }
    if (!validateInput(5, 3, "m")) {
        alert("Please fill all the Max matrix fields with valid numbers.");
        return;
    }
    if (!validateRow(3, "av")) {
        alert("Please fill all the Available resource fields with valid numbers.");
        return;
    }

    // Get input matrices
    const allocation = getMatrix(5, 3, "a");
    const max = getMatrix(5, 3, "m");
    const available = getMatrix(1, 3, "av")[0];

    // Calculate the Need matrix
    const need = calculateNeed(max, allocation);

    // Fill the Need matrix into the inputs
    fillMatrix(need, "n");

    // Run the Banker's Algorithm to find the safe sequence
    const sequence = bankersAlgorithm(allocation, max, available);
    if (sequence) {
        setProcessSequence(sequence);
    }
}


// Calculate the Need matrix (Max - Allocation)
function calculateNeed(max, allocation) {
    const need = [];
    for (let i = 0; i < max.length; i++) {
        const row = [];
        for (let j = 0; j < max[i].length; j++) {
            row.push(max[i][j] - allocation[i][j]);
        }
        need.push(row);
    }
    return need;
}



// Reset values to empty
function reset() {
    clearMatrix(5, 3, "a");
    clearMatrix(5, 3, "m");
    clearMatrix(5, 3, "n");
    clearMatrix(1, 3, "av");
    clearMatrix(1, 5, "p");
    document.getElementById('p1').value = "";
    document.getElementById('p2').value = "";
    document.getElementById('p3').value = "";
    document.getElementById('p4').value = "";
    document.getElementById('p5').value = "";

    document.getElementById('bbody').style.backgroundColor = "rgb(31, 31, 49)";  // Reset background color
}

// Clear matrix in HTML
function clearMatrix(rows, cols, prefix) {
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            const element = document.getElementById(`${prefix}${i}${j}`);
            if (element) {
                element.value = "";  // Clear the input field
            }
        }
    }
}


 