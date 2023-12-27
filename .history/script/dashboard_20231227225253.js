// Store chart instances to properly destroy them before recreating
let donutChartInstance = null;
let lineChartInstance = null;

// Function to update the dashboard
function updateDashboard(balance) {
    // Log the balance value for debugging
    console.log("Original balance value:", balance);

    // Convert balance to a number or use it directly if it's already a number
    const tokenBalance = Number(balance);

    // Define the number of decimals to remove based on your token's smallest unit.
    // For Ethereum's wei to ether conversion, this would be 18.
    const decimalsToRemove = 18; // Adjust this value to match your token's decimal places

    // Assuming the token balance is in a smaller unit, convert it to the main unit by removing the excess decimals.
    const adjustedBalance = tokenBalance / Math.pow(10, decimalsToRemove);

    // Log the adjusted balance for debugging
    console.log("Adjusted token balance:", adjustedBalance);

    // Use the adjusted balance for calculations
    const shareholdPercent = calculateShareholdPercent(adjustedBalance);
    const currentEarnings = calculateCurrentEarnings(adjustedBalance);
    const projectedApr = calculateProjectedApr(adjustedBalance);
    const hedgeCapital = 25000; // Hardcoded hedge capital
    const profitabilityPercent = calculateProfitability(hedgeCapital);
    const cumulativeGrowth = calculateCumulativeGrowth(hedgeCapital);

    // Update the dashboard elements
    document.getElementById('shareholdPercent').innerText = shareholdPercent.toFixed(2) + '%';
    document.getElementById('currentEarnings').innerText = `$${currentEarnings.toFixed(2)}`;
    document.getElementById('projectedApr').innerText = projectedApr.toFixed(2) + '%';
    document.getElementById('hedgeCapital').innerText = `$${hedgeCapital}`;
    document.getElementById('profitabilityPercent').innerText = profitabilityPercent.toFixed(2) + '%';
    document.getElementById('cumulativeGrowth').innerText = cumulativeGrowth.toFixed(2) + '%';

    // Check and destroy previous chart instances if they exist
    if (donutChartInstance) {
        donutChartInstance.destroy();
    }
    if (lineChartInstance) {
        lineChartInstance.destroy();
    }

    // Render charts
    renderDonutChart(shareholdPercent);
    renderLineChart(generateDummyLineChartData()); // Replace with real data
}

// Define this function if it wasn't defined previously
function generateDummyLineChartData() {
    return {
        labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'], // Example labels
        values: [20, 20, 22, 25, 0, 0, 0,] // Example data points
    };
}

function calculateShareholdPercent(adjustedBalance) {
    // Use adjustedBalance in your calculation
    const totalTokens = 471031694; // Verify this is the correct total supply
    return (adjustedBalance / totalTokens) * 100;
}

function calculateCurrentEarnings(tokenBalance) {
    // The total hedgeCapital value divided by the shareholdPercent
    let adjustedBalance = hedgeCapital / shareholdPercent;
    return adjustedBalance;
  }  

function calculateProjectedApr(tokenBalance) {
    // Verify this is the intended fixed APR and adjust if necessary
    return 10; // Example: Is 10% the correct APR?
}

function calculateProfitability(hedgeCapital) {
    // Ensure this calculation is correct
    // Example: Is 5% profitability over what time period?
    return hedgeCapital * 0.05;
}

function calculateCumulativeGrowth(hedgeCapital) {
    // Ensure this calculation is correct
    // Example: Is 10% cumulative growth correct? Over what time period?
    return hedgeCapital * 0.1;
}

// Make sure to format the numbers for display
document.getElementById('currentEarnings').innerText = formatCurrency(currentEarnings);

// Function to format numbers as currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function renderDonutChart(shareholdPercent) {
    const ctx = document.getElementById('donutChartCanvas').getContext('2d');
    const data = {
        datasets: [{
            data: [shareholdPercent, 100 - shareholdPercent],
            backgroundColor: ['#4e73df', '#e0e0e0'],
        }],
        labels: [
            'Your Sharehold',
            'Others',
        ]
    };

    // Create the chart instance and store it
    donutChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutoutPercentage: 80,
            legend: {
                display: false
            }
        }
    });
}

function renderLineChart(data) {
    const ctx = document.getElementById('lineChartCanvas').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Cumulative Growth',
                data: data.values,
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: '#4e73df',
                borderWidth: 2,
                pointBackgroundColor: '#4e73df',
                lineTension: 0.4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
