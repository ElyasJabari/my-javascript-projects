const wheel = document.getElementById("wheel"),
    spinBtn = document.getElementById("spin-btn"),
    remove = document.getElementById("remove"),
    finalValue = document.getElementById("final-value");
textInput = document.getElementById("text-input");

let myChart;
let count = 0;
let resultValue = 101;
let rotationValues = [];
let wheelElement;
let names = [];

textInput.addEventListener("input", function (e) {
    names = [];
    textInput.childNodes.forEach(function (element) {
        let trimmedText = element.textContent.trim();
        if (trimmedText !== "") {
            names.push(trimmedText);
        }
    });
    updateMyChart();
});

function updateMyChart() {
    let data = [];
    const pieSize = 360 / names.length;
    for (let i = 0; i < names.length; i++) {
        data[i] = 10;
        rotationValues[i] = { minDegree: (pieSize * i) + 1, maxDegree: pieSize * (i + 1), value: names[i] }
    }
    let pieColors = [
        "#1565c0",
        "#2196f3",
    ];
    if (myChart) {
        myChart.data.labels = names;
        myChart.data.datasets[0].backgroundColor = pieColors;
        myChart.data.datasets[0].data = data;
        myChart.update();
    } else {
        myChart = new Chart(wheel, {
            plugins: [ChartDataLabels],
            type: "pie",
            data: {
                labels: names,
                datasets: [
                    {
                        backgroundColor: pieColors,
                        data: data,
                    },
                ],
            },
            options: {
                responsive: true,
                animation: { duration: 0 },
                plugins: {
                    tooltip: false,
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        color: "#ffffff",
                        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                        font: { size: 24 },
                    },
                },
            },
        });
    }
}

const valueGenerator = (angleValue) => {
    for (wheelElement of rotationValues) {
        if (angleValue >= wheelElement.minDegree && angleValue <= wheelElement.maxDegree) {
            finalValue.innerHTML = `<p>Gewinner: ${ wheelElement.value }</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

function spinButton() {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    let randomDegree = Math.floor(Math.random() * (360));
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation === randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
            spinBtn.disabled = false;
        }
    }, 10);
}

spinBtn.addEventListener("click", spinButton);

function removeFunc() {
    names = names.filter(function (singleName) {
        return singleName !== wheelElement.value;
    });
    textInput.innerHTML = names.join("<br>");
    finalValue.innerHTML = `<p>Click on spin button or Press ctrl + enter to start</p>`;
}

remove.addEventListener("click", () => {
    removeFunc();
    updateMyChart();
});

document.body.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && e.altKey === true) removeFunc(), updateMyChart();
})
document.body.addEventListener('keypress', (e) => {
    if (e.key === "Enter" && e.ctrlKey === true) spinButton();
})