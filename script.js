const locations = {
    floor1: {
        chanab: { top: 50, left: 50 },
        raviLounch: { top: 150, left: 50 },
        dashat: { top: 250, left: 50 },
        controllerRoom: { top: 50, left: 450 },
        washroom: { top: 150, left: 450 },
        sindh: { top: 250, left: 450 },
        reception: { top: 400, left: 150 },
        office: { top: 400, left: 450 },
        stairs: { top: 400, left: 275 },
    },
    floor2: {
        lahore: { top: 50, left: 50 },
        multan: { top: 150, left: 50 },
        karachi: { top: 250, left: 50 },
        pindi: { top: 50, left: 450 },
        kn: { top: 150, left: 450 },
        kasur: { top: 250, left: 450 },
        stairs: { top: 400, left: 275 },
    },
};

let currentFloor = "floor1";

function drawPath(start, end) {
    const map = document.getElementById("map");
    document.querySelectorAll(".path").forEach(path => path.remove());

    const steps = 20;
    const topStep = (end.top - start.top) / steps;
    const leftStep = (end.left - start.left) / steps;

    for (let i = 0; i <= steps; i++) {
        const dot = document.createElement("div");
        dot.className = "path";
        dot.style.top = `${start.top + topStep * i}px`;
        dot.style.left = `${start.left + leftStep * i}px`;
        map.appendChild(dot);
    }
}

function switchFloor(newFloor) {
    document.querySelectorAll(`[data-floor="${currentFloor}"]`).forEach(el => el.style.display = "none");
    document.querySelectorAll(`[data-floor="${newFloor}"]`).forEach(el => el.style.display = "block");
    currentFloor = newFloor;
}

function navigate() {
    const user = document.querySelector(".user") || createUser();
    const destination = document.getElementById("destination").value;

    const startLocation = {
        top: parseInt(user.style.top || 400),
        left: parseInt(user.style.left || 275),
    };

    const destinationFloor = Object.keys(locations).find(floor => locations[floor][destination]);

    if (destinationFloor !== currentFloor) {
        const stairsLocation = locations[currentFloor].stairs;
        drawPath(startLocation, stairsLocation);

        setTimeout(() => {
            user.style.top = `${stairsLocation.top}px`;
            user.style.left = `${stairsLocation.left}px`;

            setTimeout(() => {
                switchFloor(destinationFloor);
                const newStart = locations[destinationFloor].stairs;
                const endLocation = locations[destinationFloor][destination];
                drawPath(newStart, endLocation);

                setTimeout(() => {
                    user.style.top = `${endLocation.top}px`;
                    user.style.left = `${endLocation.left}px`;
                }, 1000);
            }, 1000);
        }, 1000);
    } else {
        const endLocation = locations[currentFloor][destination];
        drawPath(startLocation, endLocation);

        setTimeout(() => {
            user.style.top = `${endLocation.top}px`;
            user.style.left = `${endLocation.left}px`;
        }, 1000);
    }
}

function createUser() {
    const user = document.createElement("div");
    user.className = "user";
    user.style.top = "400px";
    user.style.left = "275px";
    document.getElementById("map").appendChild(user);
    return user;
}