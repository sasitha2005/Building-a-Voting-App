// Mock API Data
let polls = [
    {
      id: 1,
      question: 'What is your favorite color?',
      options: ['Red', 'Green', 'Blue'],
      votes: [5, 3, 7]
    },
    {
      id: 2,
      question: 'What is your favorite programming language?',
      options: ['JavaScript', 'Python', 'Java'],
      votes: [10, 15, 5]
    }
  ];
   
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyDiE1Cxv9AhBAk1OuhZCDbPqGYV7gCOCuU",
      authDomain: "building-a-voting-app.firebaseapp.com",
      projectId: "building-a-voting-app",
      storageBucket: "building-a-voting-app.firebasestorage.app",
      messagingSenderId: "4923011230",
      appId: "1:4923011230:web:815c4d225df854aadc8b8f",
      measurementId: "G-THF8LDFVGB"
    };
  
    // Initialize Firebase
    
  
  document.addEventListener('DOMContentLoaded', () => {
    const pollForm = document.getElementById('poll-form');
    const pollsSection = document.getElementById('polls');
  
    // Load polls from mock API
    function loadPolls() {
      displayPolls();
    }
  
    // Display polls
    function displayPolls() {
      pollsSection.innerHTML = '';
      polls.forEach(poll => {
        const pollDiv = document.createElement('div');
        pollDiv.className = 'poll';
        const pollQuestion = document.createElement('h3');
        pollQuestion.textContent = poll.question;
        pollDiv.appendChild(pollQuestion);
  
        poll.options.forEach((option, index) => {
          const optionDiv = document.createElement('div');
          optionDiv.className = 'option';
          const optionLabel = document.createElement('label');
          optionLabel.textContent = `${option}: ${poll.votes[index]} votes`;
          const optionButton = document.createElement('button');
          optionButton.textContent = 'Vote';
          optionButton.addEventListener('click', () => {
            vote(poll.id, index);
          });
          optionDiv.appendChild(optionLabel);
          optionDiv.appendChild(optionButton);
          pollDiv.appendChild(optionDiv);
        });
  
        const chartCanvas = document.createElement('canvas');
        pollDiv.appendChild(chartCanvas);
        displayChart(poll, chartCanvas);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Poll';
        deleteButton.addEventListener('click', () => {
          deletePoll(poll.id);
        });
        pollDiv.appendChild(deleteButton);
  
        const addOptionButton = document.createElement('button');
        addOptionButton.textContent = 'Add Option';
        addOptionButton.addEventListener('click', () => {
          addOption(poll.id);
        });
        pollDiv.appendChild(addOptionButton);
  
        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share Poll';
        shareButton.addEventListener('click', () => {
          sharePoll(poll.id);
        });
        pollDiv.appendChild(shareButton);
  
        pollsSection.appendChild(pollDiv);
      });
    }
  
    // Handle voting
    function vote(pollId, optionIndex) {
      const poll = polls.find(p => p.id === pollId);
      poll.votes[optionIndex]++;
      displayPolls();
    }
  
    // Handle poll deletion
    function deletePoll(pollId) {
      polls = polls.filter(p => p.id !== pollId);
      displayPolls();
    }
  
    // Handle new poll submission
    pollForm.addEventListener('submit', event => {
      event.preventDefault();
      const question = document.getElementById('poll-question').value;
      const options = document.getElementById('poll-options').value.split(',').map(opt => opt.trim());
      const newPoll = {
        id: polls.length + 1,
        question,
        options,
        votes: new Array(options.length).fill(0)
      };
      polls.push(newPoll);
      displayPolls();
      pollForm.reset();
    });
  
    // Add a new option to a poll
    function addOption(pollId) {
      const newOption = prompt('Enter new option:');
      if (newOption) {
        const poll = polls.find(p => p.id === pollId);
        poll.options.push(newOption);
        poll.votes.push(0);
        displayPolls();
      }
    }
  
    // Share poll
    function sharePoll(pollId) {
      const shareUrl = `${window.location.origin}?pollId=${pollId}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Poll link copied to clipboard: ' + shareUrl);
      });
    }
  
    // Display chart using Chart.js
    function displayChart(poll, canvas) {
      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: poll.options,
          datasets: [{
            label: 'Votes',
            data: poll.votes,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    // Initial load
    loadPolls();
  });
  
