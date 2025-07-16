let clickCounter = 0;
const maxClicks = 5;
const shareBtn = document.getElementById("shareBtn");
const clickCountText = document.getElementById("clickCount");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");

// Prevent multiple submissions
if (localStorage.getItem("submitted") === "true") {
  form.innerHTML = "<h2>✅ Already Submitted</h2>";
}

shareBtn.addEventListener("click", () => {
  if (clickCounter < maxClicks) {
    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    window.open(`https://wa.me/?text=${message}`, "_blank");
    clickCounter++;
    clickCountText.textContent = `Click count: ${clickCounter}/${maxClicks}`;
    if (clickCounter === maxClicks) {
      alert("Sharing complete. Please continue.");
      submitBtn.disabled = false;
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (clickCounter < maxClicks) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  const formData = new FormData();
  formData.append("Name", name);
  formData.append("Phone", phone);
  formData.append("Email", email);
  formData.append("College", college);
  formData.append("File", file);

  // ✅ REPLACE this URL with your own Google Apps Script Web App URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbyCxjDNkbDRC6tRrMM5g8L55Bx2VCjcxc-C0l1LHAT5xD6RFFV12E0LB4t1pN4mkcn9/exec";

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: formData
    });

    localStorage.setItem("submitted", "true");
    window.location.href = "thankyou.html";

  } catch (error) {
    alert("Submission failed. Please try again.");
    console.error("Error!", error.message);
  }
});
