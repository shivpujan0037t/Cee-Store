// Stored data
let chapters = JSON.parse(localStorage.getItem("chapters")) || {
  Physics: {
    Motion: {
      video: "videos/motion.mp4",
      pdf: "pdfs/motion.pdf",
      quiz: [{ q: "Unit of speed?", o: ["m/s", "kg", "J"], a: 0 }]
    }
  }
};

// -------- STUDENT LOGIN --------
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === "shivpujan" && p === "Shivpuj@n123") {
    document.getElementById("studentLogin").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
    showSubjects();
  } else {
    document.getElementById("loginError").innerText = "Invalid credentials.";
  }
}

// -------- SHOW SUBJECTS & CHAPTERS --------
function showSubjects() {
  const subDiv = document.getElementById("subjects");
  subDiv.innerHTML = "";
  for (let subject in chapters) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = subject;
    card.onclick = () => showChapters(subject);
    subDiv.appendChild(card);
  }
}

function showChapters(subject) {
  const chapDiv = document.getElementById("chapters");
  chapDiv.innerHTML = "";
  document.getElementById("chapterTitle").innerText = subject + " Chapters";
  document.getElementById("chapterTitle").classList.remove("hidden");

  for (let ch in chapters[subject]) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = ch;
    card.onclick = () => loadContent(subject, ch);
    chapDiv.appendChild(card);
  }
}

function loadContent(subject, chapter) {
  const data = chapters[subject][chapter];
  const video = document.getElementById("videoPlayer");
  const pdf = document.getElementById("pdfLink");
  const quizDiv = document.getElementById("quizSection");

  video.src = data.video;
  pdf.href = data.pdf;

  quizDiv.innerHTML = "<h4>Quiz</h4>";
  data.quiz.forEach((q, i) => {
    quizDiv.innerHTML += `<p>${q.q}</p>`;
    q.o.forEach((opt, j) => {
      quizDiv.innerHTML += `<input type='radio' name='q${i}' value='${j}'/> ${opt}<br/>`;
    });
  });

  quizDiv.innerHTML += `<button onclick='submitQuiz("${subject}", "${chapter}")'>Submit</button>`;
  document.getElementById("progressStatus").innerText =
    localStorage.getItem(subject + "_" + chapter) === "1" ? "Completed ✅" : "Not completed";
  document.getElementById("content").classList.remove("hidden");
}

function submitQuiz(subject, chapter) {
  const quiz = chapters[subject][chapter].quiz;
  let score = 0;
  quiz.forEach((q, i) => {
    const ans = document.querySelector(`input[name='q${i}']:checked`);
    if (ans && parseInt(ans.value) === q.a) score++;
  });
  alert(`You scored ${score}/${quiz.length}`);
  localStorage.setItem(subject + "_" + chapter, "1");
  document.getElementById("progressStatus").innerText = "Completed ✅";
}

// -------- ADMIN LOGIN --------
function adminLogin() {
  const u = document.getElementById("adminUser").value;
  const p = document.getElementById("adminPass").value;
  if (u === "admin" && p === "Admin@123") {
    document.getElementById("adminLogin").style.display = "none";
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    document.getElementById("adminError").innerText = "Invalid admin credentials.";
  }
}

// -------- ADMIN UPLOAD CHAPTER --------
function uploadChapter() {
  const subject = document.getElementById("newSubject").value;
  const chapter = document.getElementById("newChapter").value;
  const video = "videos/" + document.getElementById("newVideo").value;
  const pdf = "pdfs/" + document.getElementById("newPDF").value;
  const quizQ = document.getElementById("quizQ").value;
  const opts = document.getElementById("quizOpts").value.split(",");
  const ans = parseInt(document.getElementById("quizAns").value);

  if (!chapters[subject]) chapters[subject] = {};
  chapters[subject][chapter] = {
    video: video,
    pdf: pdf,
    quiz: [{ q: quizQ, o: opts, a: ans }]
  };

  localStorage.setItem("chapters", JSON.stringify(chapters));
  document.getElementById("uploadStatus").innerText = "Chapter uploaded successfully ✅";
}
