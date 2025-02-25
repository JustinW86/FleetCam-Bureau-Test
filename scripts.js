let currentQuestion = 0;
let answers = [];
let questionStartTime = Date.now();
let totalTime = 30 * 60 * 1000; // 30 minutes in milliseconds
let remainingTime = totalTime;
let agentName, agentEmail;

const questions = [
  {
    question: "What is the primary responsibility of FleetCam Bureau?",
    options: [
      "Full Risk Mitigation",
      "Managing vehicle fleet maintenance",
      "Providing customer service to clients",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does SVR stand for in FleetCam Bureau operations?",
    options: [
      "Speed Violation Reporting",
      "Stolen Vehicle Recovery",
      "System Vehicle Reset",
    ],
    correctAnswer: 1,
  },
  {
    question: "What type of data is monitored in FleetCam Bureau's Geo-Zoning service?",
    options: [
      "GPS positions and vehicle movements",
      "Customer service feedback",
      "Employee performance data",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is FleetCam Bureau, and what are its core functions?",
    options: [
      "Monitor fleet operations, including geo-zoning, VVT, SVR, and investigations.",
      "Chatting to drivers.",
      "Only track vehicles in specific zones.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is FleetCam Tiplock?",
    options: [
      "A Advanced AI Camera.",
      "A geofence-based Dynamic Power Take-Off control and management technology that ensures vehicles only tip in authorized locations, preventing unauthorized tipping attempts and safeguarding business interests.",
      "A device that is added to the VVT and Tracking unit to aid in sending alerts when a truck is stolen.",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is CAN BUS?",
    options: [
      "CAN BUS aids the Tracking unit in gathering more GPS Satilites.",
      "CAN BUS is a device that communicates with Busses.",
      "CAN bus, short for Controller Area Network bus, is a vehicle bus standard that allows electronic control units (ECUs) in a vehicle to communicate with each other efficiently and reliably, without a central host computer.",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the meaning of VVT?",
    options: [
      "Vehicle Video Telematics.",
      "Vehicle Visual Telematics",
      "Very Vivid Tracking.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the SOP for responding to a Hijacking Incident?",
    options: [
      "Dispatch a SVR Team, notify SAPS, and track the vehicle until recovered.",
      "Ignore the alert and continue monitoring.",
      "Send a confirmation to the dispatcher.",
    ],
    correctAnswer: 0,
  },
  {
    question: "How often should Bureau agents check VVT Agile Client camera statuses?",
    options: [
      "At least four times per shift or as per the monitoring schedule.",
      "Only when a vehicle enters an illegal geo-zone.",
      "Once a month as part of the report generation.",
    ],
    correctAnswer: 0,
  },
  {
    question: "How often should Bureau agents Send standard Virtual Escort updates?",
    options: [
      "Every 10 Minutes.",
      "Every 60 Minutes.",
      "Every 30 Minutes.",
    ],
    correctAnswer: 2,
  },
  {
    question: "A vehicle enters a blacklisted Geo-Zone at night. What do you do?",
    options: [
      "Immediately investigate, notify Mine role players, and verify the vehicle's last loading area and status.",
      "Wait for the vehicle to leave the area and monitor the next alert.",
      "Ignore it and continue with routine monitoring.",
    ],
    correctAnswer: 0,
  },
  {
    question: "If you detect a driver tampering with the GPS unit, what is your first course of action?",
    options: [
      "Report the incident to the Client and await SVR Dispatch confirmation.",
      "Let the driver finish, then notify the supervisor after the shift.",
      "Disable the GPS system to prevent further tampering.",
    ],
    correctAnswer: 0,
  },
  {
    question: "A vehicle is seen speeding in a restricted area. What should you do?",
    options: [
      "Immediately log the violation, notify the Client, and investigate the vehicle's destination.",
      "Wait for the vehicle to exit the area before taking action.",
      "Ignore the speed violation and continue monitoring.",
    ],
    correctAnswer: 0,
  },
  {
    question: "If you are alerted to an unauthorized PTO use, what do you do?",
    options: [
      "Investigate the event, confirm with the driver, and ensure the proper procedure is followed.",
      "Do nothing until you receive further reports from the fleet manager.",
      "Report it to the supervisor but do not investigate immediately.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the proper response if a truck is found in a restricted area without authorization?",
    options: [
      "Activate an investigation, notify the Client, and log the incident for future review.",
      "Wait for the truck to leave the area before taking action.",
      "Ignore the alert if it doesn’t appear serious.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What do you do if you receive a Panic alarm on a Vehicle and you cannot reach the Client telephonically?",
    options: [
      "Check the VVT and Tracking status, and then dispatch a SVR Team if needed while continuing to reach the Client",
      "Discard the event.",
      "Send the Client a email.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What do you do if a Universal loaded truck enters a Illegal Coal Yard?",
    options: [
      "Telephonically contact Universal role players and notify them while determining that the load came from NCC or NBC",
      "Discard the event.",
      "Post the Illegal Entry on the WhattsApp group.",
    ],
    correctAnswer: 0,
  },
  {
    question: "An Adhoc Client calls in stating his vehicle has been stolen from his Depot, what steps do you take?",
    options: [
      "Obtain all the necessary information on the vehicle, dispatch a SVR team, and when updating the Client on the next call Quote them the standard SVR rates",
      "Inform the Client that they are an Adhoc Client and we cannot assist.",
      "Inform the Client that everything will be ok and that you will hand the SVR recovery over to another Station.",
    ],
    correctAnswer: 0,
  },
  {
    question: "A SVR Charges are costed at?",
    options: [
      "R1050,00 per hour Excluding VAT and R5.00 Per Km driven",
      "R1050,50 per hour Including VAT",
      "R1650,00 per hour Including VAT and R2.50 a Km driven.",
    ],
    correctAnswer: 0,
  },
  {
    question: "What Client types do we have at FleetCam?",
    options: [
      "Bureau Agile and SVR",
      "Bureau Agile, SVR and Adhoc",
      "Adhoc,SVR and Self monitoring Clients.",
    ],
    correctAnswer: 1,
  },
  {
    question: "How often do we update a Client on an SVR dispatch?",
    options: [
      "Once and Hour",
      "Every 15 Minutes.",
      "On dispatch, recovered and stand down time.",
    ],
    correctAnswer: 1,
  },
  {
    question: "If a vehicle presents multiple alerts what do you do?",
    options: [
      "Contact the Client and advise him of the alerts",
      "Check VVT and discard the events.",
      "Make contact with the Client, explain that there were multiple alerts from the vehicle and dispatch a SVR Team",
    ],
    correctAnswer: 2,
  },
  {
    question: "How many types of SVR scenario's are there?",
    options: [
      "Hijacking, stolen vehicle, and Coal Theft",
      "Request, Vehicle Guard, Hijacking, and Theft.",
      "Request, Hijacking, and Theft",
    ],
    correctAnswer: 1,
  },
  {
    question: "A vehicle is involved in an accident, what do you do?",
    options: [
      "Call the Client and inform them.",
      "Dispatch FleetCam Pulse and contact the Client asking if they would like an SVR team to secure the load, while you download the VVT footage.",
      "Dispatch an SVR team to recover the vehicle",
    ],
    correctAnswer: 1,
  },
  {
    question: "An Irate Client calls into the Bureau stating that he needs a Tracking report ASAP and that he has been sending emails the entire day with no joy?",
    options: [
      "Calm the Client down and ask the Client to send another Email.",
      "Calmly ask the Client to confirm the email address he has sent the requests through to (As the email address might be wrong), Obtain the vehicle details, date and time period as well as his email address so you can generate the desired report and send it to them.",
      "Calmly Send a email to Support or All Bureau Staff to assist.",
    ],
    correctAnswer: 1,
  },
  {
    question: "A FleetCam Director calls in stating they want a SVR Team dispatched to their vehicle ABC123GP, as they have a puncture on the N14.",
    options: [
      "You quote the FleetCam Director and Dispatch FleetCam Pulse.",
      "You dispatch a SVR Team to the GPS position of the said vehicle.",
      "You tell the FleetCam Director that you will call Justin.",
    ],
    correctAnswer: 1,
  },
  {
    question: "A suspended Client calls in wanting VVT footage on a vehicle.",
    options: [
      "You inform the Client that the VVT footage will be sent shortly.",
      "You inform the Client that their account is suspended and that they will have to make contact with the FleetCam Accounts department in office hours.",
      "You tell the Client to pay back the money!.",
    ],
    correctAnswer: 1,
  },
  {
    question: "You see a Driver smoking while driving, his load is LP Gas, what do you do?",
    options: [
      "You log the event on the Bureau portal.",
      "You inform the Client of your findings and log the event on the Bureau portal.",
      "You monitor the trip until its done.",
    ],
    correctAnswer: 1,
  },
  {
    question: "You see a vehicle has been pulled over by SAPS while conducting your VVT checks. What are your next steps?",
    options: [
      "You log the event on the Bureau portal and move on.",
      "You inform the Client of your findings and send him an Email.",
      "You make contact with the Client, log the event on the Bureau portal and monitor the situation.",
    ],
    correctAnswer: 2,
  },
  {
    question: "A vehicle is parked off at a Truck stop however you see the fuel side camera has just been covered, what process do you follow?",
    options: [
      "You log the event on the Bureau portal.",
      "You inform the Client of your findings and start downloading the VVT footage, awaiting your offer of dispatching an SVR team.",
      "You make contact with the Client, log the event on the Bureau portal and dispatch FleetCam Pulse.",
    ],
    correctAnswer: 1,
  },
  {
    question: "A FleetCam Technician is doing a New Installation, and requests Tiplock Configurations to be sent to the VVT Unit, You do the following.",
    options: [
      "You load the desired Configuration to the VVT unit.",
      "You inform the FleetCam Technician that you cannot send configurations to a VVT unit.",
      "You ask Tony/Support",
    ],
    correctAnswer: 1,
  },
  {
    question: "When a FleetCam Technician requests configurations for a Teltonika, what information do you require?",
    options: [
      "What Sim card (APN, Normal, Global), Requirements of Client (Driver Tag, Tiplock, CanBus) and Unit type (FMB130, FMB140 and FMB640).",
      "Device ID, Drivers license, and VVT port.",
      "Send any Configuration as they are all the same.",
    ],
    correctAnswer: 0,
  },
  {
    question: "When a FleetCam Technician De-Installs a VVT, what does the FleetCam Bureau Agent have to check?",
    options: [
      "All systems and Channels are functioning, GPS positioning, rename the registration number to state De-Installed next to the registration number.",
      "Check all systems and Channels are functioning, and leave it on the Clients company profile.",
      "Tell the FleetCam Technician to hold on as it is shift change.",
    ],
    correctAnswer: 0,
  },
  {
    question: "When testing a DMS camera, what must be checked/confirmed?",
    options: [
      "AI Block, Camera positioning vs Driver positioning, triggered alerts, confirm vehicle idling when being tested.",
      "Check that the Technician is sitting up straight, Confirm that the camera has colour.",
      "Make sure that the DSM Camera is facing the road.",
    ],
    correctAnswer: 0,
  },
  {
    question: "How to check unit storage and if its recording correctly?",
    options: [
      "Right click on parameter config on CMS, select recording, under recording select storage, where you can activate SD1 and SD 2.",
      "Ask the Technician if they have enabled it.",
      "Check VMS for the SD1 and SD2 storage icon appears on the HUD.",
    ],
    correctAnswer: 0,
  },
  {
    question: "How do you to flip/correct camera Angle.",
    options: [
      "Hold in Ctrl, alt and arrow on your key board.",
      "Go into Parameter config on CMS. select record setup, and select the desired camera to be flipped.",
      "Right click on parameter config on CMS, select recording, under recording select storage.",
    ],
    correctAnswer: 1,
  },
  {
    question: "At what number are sats stable for a VVT?",
    options: ["32", "7", "8"],
    correctAnswer: 2,
  },
  {
    question: "What is the standard IO for a panic button?",
    options: ["IO2", "IO1", "IO3"],
    correctAnswer: 1,
  },
  {
    question: "What channels are the road and cab normally connected to?",
    options: ["ch1 and 2", "ch2 and 1", "ch3 and 4"],
    correctAnswer: 0,
  },
  {
    question: "On a standard 4ch camera install what are the cameras named?",
    options: [
      "CAB, ROAD, RIGHT SIDE, LEFT SIDE",
      "ROAD, CAB, R SIDE, L SIDE",
      "ROAD FACING, INCAB, R SIDE VIEW, L SIDE VIEW",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is the standard IO for Security Box?",
    options: ["IO2", "IO1", "IO3"],
    correctAnswer: 0,
  },
  {
    question: "Which program do we try to get our reports from (as they have the most information)?",
    options: ["CMS", "VMS", "Bureau Portal"],
    correctAnswer: 1,
  },
  {
    question: "What do we use CMS for?",
    options: ["Cameras and footage", "Tracking and Reports", "Logging Events"],
    correctAnswer: 0,
  },
  {
    question: "What do we use VMS for?",
    options: ["Cameras and footage", "Tracking and Reports", "Logging Events"],
    correctAnswer: 1,
  },
  {
    question: "What do we use Bureau Portal for?",
    options: ["Cameras and footage", "Tracking and Reports", "Logging Events"],
    correctAnswer: 2,
  },
  {
    question: "What does it mean when the unit states 'no record' on the CMS program?",
    options: ["Storage is not working", "Cameras are not working", "All of the above"],
    correctAnswer: 2,
  },
  {
    question: "What does it mean when a vehicle is pink/purple on the CMS program?",
    options: ["Vehicle is idling", "Vehicle is ACC off", "GPS is invalid"],
    correctAnswer: 2,
  },
  {
    question: "What does it mean when you are asked to adjust or set the ignition on-off time?",
    options: [
      "Check when the vehicle goes on and off",
      "Set an alarm for ignition on and off",
      "Set the amount of time it takes for the unit to turn off after the ignition is turned off",
    ],
    correctAnswer: 2,
  },
  {
    question: "What is the correct way to receive a request from a customer?",
    options: ["Via WhatsApp", "Via Phone call", "Via Email"],
    correctAnswer: 2,
  },
  {
    question: "What do you do when testing a unit but there is an issue such as camera not working or storage not working?",
    options: ["Fail the test", "Pass the test", "Tell the tech to fix the issues so that you can pass the test"],
    correctAnswer: 2,
  },
  {
    question: "What information would you require from a customer to download footage?",
    options: [
      "Time, date, reg and a brief description of the incident",
      "Date, colour of the vehicle, model",
      "Driver name, make, model",
    ],
    correctAnswer: 0,
  },
  {
    question: "If a vehicle works Monday to Friday 8 to 5, how much footage would a 256GB SD card hold?",
    options: ["2 weeks", "A month", "2 days"],
    correctAnswer: 1,
  },
  {
    question: "If a vehicle is offline due to a severe accident, what would be the best way to get the footage?",
    options: [
      "Ask the customer to turn the vehicle on",
      "Ask the service controller to arrange a tech to pull the storage",
      "Load more data on the sim card",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which software do we get the test ref from?",
    options: ["CMS", "VMS", "Bureau portal"],
    correctAnswer: 2,
  },
  {
    question: "When a customer cannot view a vehicle on CMS, what would be required to assist them?",
    options: [
      "Registration number and user",
      "Sim cell number to load data",
      "Software the customer is using",
    ],
    correctAnswer: 0,
  },
  {
    question: "What do you do when a Battery Tamper alarm comes into the Bureau portal?",
    options: ["Check to see if everything is ok", "Check, log and call", "Check and log"],
    correctAnswer: 1,
  },
  {
    question: "What do you do in a test if they are replacing or swapping out the VVT unit?",
    options: [
      "Rename the old unit to reg-de-installed and move to de-installed group",
      "Edit the device id",
      "Delete the VVT",
    ],
    correctAnswer: 0,
  },
  {
    question: "What is the purpose of a DT20D status?",
    options: [
      "For making calls on a communicator",
      "For the communicator to have a status on VMS",
      "To help it to report to CMS",
    ],
    correctAnswer: 1,
  },
  {
    question: "What does EMS mean?",
    options: [
      "Empire Meditation Skill",
      "Emergency Medical Services",
      "To help it to report to CMS",
    ],
    correctAnswer: 1,
  },
  {
    question: "What is a Teltonika used for?",
    options: ["Cameras", "Communication", "Tracking"],
    correctAnswer: 2,
  },
];

function startTest() {
    agentName = document.getElementById("agentName").value;
    agentEmail = document.getElementById("agentEmail").value;

    const takenAgents = JSON.parse(localStorage.getItem("takenAgents") || "[]");
    if (takenAgents.includes(agentName)) {
        alert("This agent has already taken the test. Only one attempt is allowed per agent.");
        return;
    }

    if (!agentName || !agentEmail) {
        alert("Please enter both your name and email address.");
        return;
    }

    takenAgents.push(agentName);
    localStorage.setItem("takenAgents", JSON.stringify(takenAgents));

    document.getElementById("signIn").style.display = "none";
    document.getElementById("testContent").style.display = "block";
    startTimer();
    loadQuestion();
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    const interval = setInterval(function () {
        remainingTime -= 1000;
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timerElement.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (remainingTime <= 0) {
            clearInterval(interval);
            finishTest();
        }
    }, 1000);
}

function loadQuestion() {
    const question = questions[currentQuestion];
    const questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        <form id="questionForm">
            ${question.options
              .map(
                (option, index) => `
                <input type="radio" id="q${currentQuestion}${index}" name="q${currentQuestion}" value="${index}">
                <label for="q${currentQuestion}${index}">${option}</label><br>
            `
              )
              .join("")}
        </form>
    `;
    questionStartTime = Date.now();
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
    if (selectedOption) {
        const answerTime = (Date.now() - questionStartTime) / 1000;
        answers.push({
            question: questions[currentQuestion].question,
            selected: selectedOption.value,
            correct: questions[currentQuestion].correctAnswer,
            timeTaken: answerTime,
        });

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            finishTest();
        }
    } else {
        alert("Please select an answer.");
    }
}

function finishTest() {
    let correctAnswers = 0;
    answers.forEach((answer) => {
        if (parseInt(answer.selected) === answer.correct) {
            correctAnswers++;
        }
    });

    const score = (correctAnswers / questions.length) * 100;
    const result = document.getElementById("result");
    result.innerHTML = `
        <h2>Your Score: ${score.toFixed(2)}%</h2>
        <p>${score >= 98 ? "Pass 😊" : "Fail 😢"}</p>
    `;
    result.style.display = "block";
    document.getElementById("export").style.display = "block";
    document.getElementById("nextBtn").style.display = "none";
}

function exportResults() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer) => {
        if (parseInt(answer.selected) === answer.correct) {
            correctAnswers++;
        }
    });
    const score = (correctAnswers / questions.length) * 100;

    // Add title
    doc.setFontSize(20);
    doc.text("FleetCam Bureau Agent Test Results", 10, 20);

    // Add agent information and total percentage
    doc.setFontSize(12);
    doc.text(`Agent Name: ${agentName}`, 10, 30);
    doc.text(`Agent Email: ${agentEmail}`, 10, 40);
    doc.text(`Total Score: ${score.toFixed(2)}% ${score >= 98 ? "😊 (Pass)" : "😢 (Fail)"}`, 10, 50);

    // Add results
    let y = 60;
    answers.forEach((answer, index) => {
        const questionIndex = currentQuestion - answers.length + index;
        const question = questions[questionIndex];
        
        // Question text
        doc.setFontSize(12);
        doc.text(`Question ${index + 1}: ${answer.question}`, 10, y);
        
        // Your Answer
        const selectedText = `Your Answer: ${question.options[answer.selected]}`;
        if (parseInt(answer.selected) === answer.correct) {
            doc.setFillColor(0, 255, 0); // Green for correct
        } else {
            doc.setFillColor(255, 0, 0); // Red for incorrect
        }
        doc.rect(10, y + 5, 190, 10, 'F'); // Background rectangle
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(selectedText, 10, y + 12);

        // Correct Answer (always green)
        const correctText = `Correct Answer: ${question.options[answer.correct]}`;
        doc.setFillColor(0, 255, 0); // Green for correct
        doc.rect(10, y + 15, 190, 10, 'F'); // Background rectangle
        doc.setTextColor(0, 0, 0); // Black text
        doc.text(correctText, 10, y + 22);

        // Result and Time Taken (no highlight)
        const isCorrect = parseInt(answer.selected) === answer.correct ? "Correct" : "Incorrect";
        doc.text(`Result: ${isCorrect}`, 10, y + 32);
        doc.text(`Time Taken: ${answer.timeTaken.toFixed(2)} seconds`, 10, y + 42);

        y += 50;

        if (y > 280) {
            doc.addPage();
            y = 10;
        }
    });

    // Save the PDF
    doc.save(`${agentName}_test_results.pdf`);
}