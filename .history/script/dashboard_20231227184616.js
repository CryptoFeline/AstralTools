// dashboard.js

// Function to update the dashboard
function updateDashboard(balance) {
    // Convert balance to a number or use it directly if it's already a number
    const tokenBalance = Number(balance);

    // Calculate other dashboard values based on the token balance
    const shareholdPercent = calculateShareholdPercent(tokenBalance);
    const currentEarnings = calculateCurrentEarnings(tokenBalance);
    const projectedApr = calculateProjectedApr(tokenBalance);
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

    // Render charts
    renderDonutChart(shareholdPercent);
    renderLineChart(generateDummyLineChartData()); // Replace with real data
}

// Example calculation functions
function calculateShareholdPercent(tokenBalance) {
    const totalTokens = 471031694; // Total tokens in the hedge
    return (tokenBalance / totalTokens) * 100;
}

function calculateCurrentEarnings(tokenBalance) {
    // Placeholder for actual earnings calculation
    return tokenBalance * 0.1; // Example calculation
}

function calculateProjectedApr(tokenBalance) {
    // Placeholder for actual APR calculation
    return 10; // Example fixed APR
}

function calculateProfitability(hedgeCapital) {
    // Placeholder for profitability calculation
    return hedgeCapital * 0.05; // 5% profitability for example
}

function calculateCumulativeGrowth(hedgeCapital) {
    // Placeholder for cumulative growth calculation
    return hedgeCapital * 0.1; // 10% cumulative growth for example
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

    new Chart(ctx, {
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
            labels: data.labels, // Array of labels (e.g., ['January', 'February', 'March'])
            datasets: [{
                label: 'Cumulative Growth',
                data: data.values, // Array of data points (e.g., [20, 30, 45])
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
