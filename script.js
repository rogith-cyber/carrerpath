const API_BASE = "http://https://carrerpath-backend.onrender.com/api";

// ========== GLOBAL NAVIGATION (for multi‑page) ==========
// Since each page is a separate HTML, we use simple links.
// No need for the old 'navigateTo' SPA function.
// We still keep some shared functions (chatbot, contact forms, etc.)

// ========== AI CHATBOT ==========
document.addEventListener('DOMContentLoaded', () => {
    const aiChatbotWindow = document.getElementById('aiChatbotWindow');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatInput = document.getElementById('aiChatInput');

    if (document.getElementById('aiChatbotButton')) {
        document.getElementById('aiChatbotButton').addEventListener('click', () => {
            aiChatbotWindow.classList.toggle('ai-chatbot__window--open');
            if (aiChatbotWindow.classList.contains('ai-chatbot__window--open')) {
                aiChatInput.focus();
            }
        });
    }

    if (document.getElementById('aiChatbotClose')) {
        document.getElementById('aiChatbotClose').addEventListener('click', () => {
            aiChatbotWindow.classList.remove('ai-chatbot__window--open');
        });
    }

    window.sendAiMessage = function() {
        const message = aiChatInput.value.trim();
        if (!message) return;

        aiChatMessages.innerHTML += `<div class="ai-chatbot__message ai-chatbot__message--user">${message}</div>`;
        aiChatInput.value = '';

        let response = '';
        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('software') || lowerMsg.includes('developer') || lowerMsg.includes('coding')) {
            response = '💻 <b>Software Development</b> is an excellent career choice! You\'ll need to learn programming languages like Python, Java, or JavaScript. Start with online courses, build projects, and practice on platforms like GitHub. Average starting salary: ₹3-8 LPA. Growth is exceptional!';
        } else if (lowerMsg.includes('doctor') || lowerMsg.includes('medical') || lowerMsg.includes('mbbs')) {
            response = '🏥 <b>Medical careers</b> require dedication! After 12th with Biology, you need to clear NEET for MBBS. It\'s a 5.5-year course. Starting salary ranges from ₹6-15 LPA. Highly respected profession with guaranteed job security.';
        } else if (lowerMsg.includes('data science') || lowerMsg.includes('ai') || lowerMsg.includes('machine learning')) {
            response = '🤖 <b>Data Science & AI</b> is one of the hottest fields right now! Learn Python, Statistics, and ML frameworks. Starting salary: ₹5-15 LPA. Demand is growing 30% year-over-year. Great for problem-solvers!';
        } else if (lowerMsg.includes('salary') || lowerMsg.includes('package') || lowerMsg.includes('pay')) {
            response = '💰 Salaries vary by field and experience:<br>• Software Dev: ₹3-30 LPA<br>• Data Science: ₹5-35 LPA<br>• Medical: ₹6-25 LPA<br>• Law: ₹3-20 LPA<br>• Design: ₹3-18 LPA<br><br>Want details on a specific career? Ask me!';
        } else if (lowerMsg.includes('skill') || lowerMsg.includes('learn') || lowerMsg.includes('course')) {
            response = '📚 Great question! Key skills employers look for:<br>• Technical skills (coding, tools)<br>• Communication<br>• Problem-solving<br>• Teamwork<br>• Adaptability<br><br>I can recommend specific courses if you tell me your target career!';
        } else if (lowerMsg.includes('interview') || lowerMsg.includes('resume') || lowerMsg.includes('job')) {
            response = '📝 For interviews and jobs:<br>1. Build a strong resume<br>2. Create a portfolio<br>3. Practice mock interviews<br>4. Network on LinkedIn<br>5. Apply for internships<br><br>Need more specific tips? Tell me the role!';
        } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            response = '👋 Hello! I\'m here to help you with career guidance. Ask me about any career, required skills, education paths, or salary expectations!';
        } else {
            response = '🤔 That\'s an interesting question! I\'m still learning, but I can help you with career guidance, education planning, skill development, salary information, and interview preparation. Could you tell me more about what career or field you\'re interested in?';
        }

        setTimeout(() => {
            aiChatMessages.innerHTML += `<div class="ai-chatbot__message ai-chatbot__message--bot">${response}</div>`;
            aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        }, 600);

        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    };
});

// ========== CONTACT FORM (contact page) ==========
// ========== CONTACT FORM ==========
async function submitContactForm() {

    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const phone = document.getElementById('contactPhone')?.value.trim();
    const requirement = document.getElementById('contactRequirement')?.value.trim();

    if (!name || !email || !phone || !requirement) {
        alert('Please fill in all required fields.');
        return;
    }

    try {

        const response = await fetch(`${API_BASE}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject: "Contact Form",
                message: `Phone: ${phone}\n\n${requirement}`
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Failed to send message.");
            return;
        }

        const success = document.getElementById('contactSuccess');

        if (success) {
            success.style.display = 'block';
            setTimeout(() => {
                success.style.display = 'none';
            }, 4000);
        }

        ['contactName','contactEmail','contactPhone','contactRequirement'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

    } catch (error) {
        console.error(error);
        alert("Cannot connect to backend.");
    }

}
// ========== FOOTER ENQUIRY FORM ==========
// ========== FOOTER ENQUIRY FORM ==========
async function submitFooterForm() {

    const name = document.getElementById('footerName')?.value.trim();
    const phone = document.getElementById('footerPhone')?.value.trim();
    const email = document.getElementById('footerEmail')?.value.trim();
    const requirement = document.getElementById('footerRequirement')?.value.trim();

    if (!name || !phone || !email || !requirement) {
        alert('Please fill all enquiry fields.');
        return;
    }

    try {

        const response = await fetch("http://https://carrerpath-backend.onrender.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject: "Footer Enquiry",
                message: `Phone: ${phone}\n\n${requirement}`
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.message || "Failed to send enquiry.");
            return;
        }

        const success = document.getElementById('footerSuccess');

        if (success) {
            success.style.display = 'block';
            setTimeout(() => {
                success.style.display = 'none';
            }, 4000);
        }

        ['footerName','footerPhone','footerEmail','footerRequirement'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

    } catch (error) {
        console.error(error);
        alert("Cannot connect to backend.");
    }

}
// ========== CAREER DATABASE & AUTOCOMPLETE ==========
const careerDatabase = [
    "Software Development", "Web Development", "Mobile App Development", "Frontend Developer", "Backend Developer", "Full Stack Developer",
    "DevOps Engineer", "Cloud Architect", "Cloud Computing", "Data Science", "Data Analyst", "Machine Learning Engineer", "AI & Machine Learning",
    "Cyber Security", "Ethical Hacker", "Security Analyst", "Game Development", "UI/UX Design", "Graphic Designer",
    "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Electronics Engineering", "Chemical Engineering",
    "Medical (Doctor)", "Surgeon", "Dentist", "Nursing", "Pharmacist", "Physiotherapy", "Veterinary",
    "Chartered Accountant", "Financial Analyst", "Investment Banker", "Business Management", "Marketing", "Digital Marketing", "Human Resources",
    "Lawyer", "Judge", "Civil Services (IAS/IPS/IFS)", "Police", "Army", "Navy", "Air Force",
    "Journalism", "Journalist", "News Reporter", "Content Writer", "Animation", "Fashion Design", "Architecture", "Interior Design",
    "Teaching", "Professor", "Research Scientist", "Agriculture", "Pilot", "Chef", "Hotel Management", "Sports", "Psychologist",
    "Economist", "Statistician", "Biotechnologist", "Microbiologist", "Food Technologist", "Firefighter", "Bank PO"
];



function selectCareerFromSuggestion(name) {
    const input = document.getElementById('careerSearch');
    if (!input) return;
    const query = input.value.trim().toLowerCase();
    const suggestionsDiv = document.getElementById('careerSuggestions');

    if (query === '') {
        suggestionsDiv.style.display = 'none';
        return;
    }

    const matches = careerDatabase.filter(c => c.toLowerCase().includes(query));

    if (matches.length === 0) {
        suggestionsDiv.innerHTML = `
            <div style="padding:12px 16px;color:var(--text-tertiary);text-align:center;">No matching career found.</div>
            <div style="padding:8px 16px;border-top:1px solid var(--border-subtle);text-align:center;">
                <button onclick="useCustomCareer()" style="background:none;border:none;color:var(--primary-light);cursor:pointer;font-family:Inter,sans-serif;font-size:0.85rem;">
                    ✏️ Use "${input.value}" as custom career
                </button>
            </div>`;
        suggestionsDiv.style.display = 'block';
        return;
    }

    const top = matches.slice(0, 8);
    suggestionsDiv.innerHTML = top.map(c => `
        <div onclick="selectCareerFromSuggestion('${c.replace(/'/g, "\\'")}')"
             style="padding:10px 16px;cursor:pointer;font-size:0.9rem;color:var(--text-secondary);"
             onmouseover="this.style.background='rgba(37,99,235,0.1)';this.style.color='#fff';"
             onmouseout="this.style.background='transparent';this.style.color='var(--text-secondary)';">
            ${c}
        </div>`).join('');
    suggestionsDiv.style.display = 'block';
}

function selectCareerFromSuggestion(name) {
    document.getElementById('careerSearch').value = name;
    document.getElementById('careerSuggestions').style.display = 'none';
    window.selectedCareer = name;
    document.getElementById('careerContinueBtn').disabled = false;
}

function useCustomCareer() {
    const custom = document.getElementById('careerSearch').value.trim();
    if (custom) {
      window.selectedCareer = custom;
        document.getElementById('careerContinueBtn').disabled = false;
        document.getElementById('careerSuggestions').style.display = 'none';
    }
}

function selectCareerFromTag(tag, name) {
    document.querySelectorAll('#careerTags .career-tag').forEach(t => t.classList.remove('career-tag--selected'));
    tag.classList.add('career-tag--selected');
    window.selectedCareer = name;
    document.getElementById('careerSearch').value = name;
    document.getElementById('careerContinueBtn').disabled = false;
    document.getElementById('careerSuggestions').style.display = 'none';
}

document.addEventListener('click', function(e) {
    const search = document.getElementById('careerSearch');
    const sugg = document.getElementById('careerSuggestions');
    if (sugg && e.target !== search && !sugg.contains(e.target)) {
        sugg.style.display = 'none';
    }
});

// ========== MULTI‑STEP FORM LOGIC (student-form.html) ==========
let currentStep = 1;

function showStep(step) {
    for (let i = 1; i <= 4; i++) {
        const el = document.getElementById('formStep' + i);
        if (el) el.style.display = (i === step) ? 'block' : 'none';
    }
    document.querySelectorAll('.progress-bar__step').forEach((s, idx) => {
        s.classList.remove('progress-bar__step--active', 'progress-bar__step--done');
        if (idx + 1 < step) s.classList.add('progress-bar__step--done');
        if (idx + 1 === step) s.classList.add('progress-bar__step--active');
    });
    document.querySelectorAll('.progress-bar__label').forEach((l, idx) => {
        l.classList.remove('progress-bar__label--active');
        if (idx + 1 === step) l.classList.add('progress-bar__label--active');
    });
    currentStep = step;
    window.scrollTo({ top: 200, behavior: 'smooth' });
}

function nextStep(step) {

    // ==========================
    // STEP 1 VALIDATION
    // ==========================
    if (step === 2 && currentStep === 1) {

        const fullName = document.getElementById("fullName")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const school = document.getElementById("school")?.value.trim();
        const studentClass = document.getElementById("class")?.value;
        const gender = document.getElementById("gender")?.value;
        const state = document.getElementById("state")?.value;
        const district = document.getElementById("district")?.value;

        if (!fullName) {
            alert("Please enter your Full Name.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            alert("Please enter a valid 10-digit Phone Number.");
            return;
        }

       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid Email Address.");
    return;
}

        if (!school) {
            alert("Please enter your School Name.");
            return;
        }

        if (!studentClass) {
            alert("Please select your Class.");
            return;
        }

        if (!gender) {
            alert("Please select your Gender.");
            return;
        }

        if (!state) {
            alert("Please select your State.");
            return;
        }

        if (!district) {
            alert("Please select your District.");
            return;
        }
    }

    // ==========================
    // STEP 2 VALIDATION
    // ==========================
    if (step === 3 && !window.selectedCareer) {
        alert("Please select a career.");
        return;
    }

    // ==========================
    // STEP 3 DETAILS
    // ==========================
    if (step === 3 && window.selectedCareer) {

        document.getElementById("selectedCareerName").textContent = window.selectedCareer;

        const overviews = {
            "Software Development": "Build applications and systems that power the digital world.",
            "AI & ML": "Design intelligent systems that learn from data.",
            "Data Science": "Extract insights from complex data.",
            "Cyber Security": "Protect organizations from digital threats.",
            "UI/UX Design": "Create beautiful digital experiences."
        };

        document.getElementById("careerOverview").textContent =
            overviews[window.selectedCareer] ||
            "This career path offers excellent growth opportunities.";
    }

    showStep(step);
}

function prevStep(step) { showStep(step); }
async function finishForm() {

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;

    const selectedCareer = sessionStorage.getItem("selectedCareer");

    if (!name || !email || !phone || !state || !district || !selectedCareer) {
        alert("Please complete all required fields.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/students`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                state,
                district,
                selectedCareer
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log("Student saved:", result);
            window.location.href = "thank-you.html";
        } else {
            alert(result.message || "Failed to save student.");
        }

    } catch (error) {
        console.error(error);
        alert("Cannot connect to the backend server.");
    }
}

// Initialize form on student-form.html
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('formStep1')) {
        showStep(1);
        document.getElementById('careerContinueBtn').disabled = true;
    }
});
/* ==========================================================
   Student Form Validation
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const continueBtn = document.querySelector(".btn--primary.btn--full");

    if (!phone || !email) return;

    // Phone: numbers only
    phone.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");

        if (this.value.length > 10) {
            this.value = this.value.slice(0, 10);
        }

        validateForm();
    });

    // Email validation
    email.addEventListener("input", validateForm);

    // Validate all required fields
    function validateForm() {

        const name = document.getElementById("name")?.value.trim();
        const studentClass = document.getElementById("class")?.value;
        const gender = document.getElementById("gender")?.value;
        const school = document.getElementById("school")?.value.trim();
        const state = document.getElementById("state")?.value;
        const district = document.getElementById("district")?.value;

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

        const phoneValid = /^\d{10}$/.test(phone.value);

        const valid =
            name &&
            studentClass &&
            gender &&
            school &&
            state &&
            district &&
            emailValid &&
            phoneValid;

        if (continueBtn) {
            continueBtn.disabled = !valid;
        }
    }

});

// ================================
// State & District Dropdown
// ================================

const indiaStatesAndDistricts = {
   "Andhra Pradesh": [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", 
        "Kurnool", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", 
        "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa",
        "Alluri Sitharama Raju", "Anakapalli", "Annamayya", "Bapatla", 
        "Eluru", "Kakinada", "Nandyal", "NTR", "Palnadu", 
        "Parvathipuram Manyam", "Sri Sathya Sai", "Tirupati", "Konaseema"
    ],
    "Arunachal Pradesh": [
        "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", 
        "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", 
        "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", 
        "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", 
        "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
    ],
    "Assam": [
        "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", 
        "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", 
        "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", 
        "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", 
        "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", 
        "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", 
        "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    "Bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", 
        "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", 
        "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", 
        "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", 
        "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", 
        "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", 
        "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", 
        "Supaul", "Vaishali", "West Champaran"
    ],
    "Chhattisgarh": [
        "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", 
        "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", 
        "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kanker", 
        "Kondagaon", "Korba", "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur",
        "Mohla-Manpur-Ambagarh Chowki", "Mungeli", "Narayanpur", "Raigarh", "Raipur", 
        "Rajnandgaon", "Sakti", "Sarangarh-Bilaigarh", "Sukma", "Surajpur", "Surguja"
    ],
    "Goa": [
        "North Goa", "South Goa"
    ],
    "Gujarat": [
        "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", 
        "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", 
        "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", 
        "Junagadh", "Kutch", "Kheda", "Mahisagar", "Mehsana", 
        "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", 
        "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", 
        "Tapi", "Vadodara", "Valsad"
    ],
    "Haryana": [
        "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", 
        "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", 
        "Karnal", "Mahendragarh", "Mahendragarh", "Nuh", "Palwal", 
        "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", 
        "Sonipat", "Yamunanagar"
    ],
    "Himachal Pradesh": [
        "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", 
        "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", 
        "Solan", "Una"
    ],
    "Jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", 
        "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", 
        "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", 
        "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", 
        "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ],
    "Karnataka": [
        "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", 
        "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", 
        "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", 
        "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", 
        "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", 
        "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir", "Vijayanagara"
    ],
    "Kerala": [
        "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", 
        "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", 
        "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    "Madhya Pradesh": [
        "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", 
        "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", 
        "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", 
        "Dhar", "Dindori", "Guna", "Gwalior", "Harda", 
        "Narmadapuram", "Indore", "Jabalpur", "Jhabua", "Katni", 
        "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", 
        "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", 
        "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", 
        "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", 
        "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", 
        "Umaria", "Vidisha", "Mauganj"
    ],
    "Maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Chhatrapati Sambhajinagar", "Beed", 
        "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", 
        "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", 
        "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", 
        "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", 
        "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", 
        "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    "Manipur": [
        "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", 
        "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", 
        "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    "Meghalaya": [
        "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "Eastern West Khasi Hills",
        "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", 
        "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ],
    "Mizoram": [
        "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", 
        "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"
    ],
    "Nagaland": [
        "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", 
        "Mokokchung", "Mon", "Niuland", "Noklak", "Peren", 
        "Phek", "Shamator", "Tseminyü", "Tuensang", "Wokha", "Zunheboto"
    ],
    "Odisha": [
        "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", 
        "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", 
        "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", 
        "Kandhamal", "Kendrapara", "Keonjhar", "Khurda", "Koraput", 
        "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
        "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
    ],
    "Punjab": [
        "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", 
        "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", 
        "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", 
        "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", 
        "Sangrur", "Shahid Bhagat Singh Nagar", "Sri Muktsar Sahib", "Tarn Taran"
    ],
    "Rajasthan": [
        "Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar",
        "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa",
        "Deeg", "Dholpur", "Didwana-Kuchaman", "Dudu", "Dungarpur", "Ganganagar",
        "Gangapur City", "Hanumangarh", "Jaipur", "Jaipur Rural", "Jaisalmer", "Jalore",
        "Jhalawar", "Jhunjhunu", "Jodhpur", "Jodhpur Rural", "Karauli", "Kekri", "Kota",
        "Kotputli-Behror", "Nagaur", "Neem Ka Thana", "Pali", "Phalodi", "Pratapgarh",
        "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar",
        "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    "Sikkim": [
        "Gyalshing", "Mangan", "Namchi", "Pakyong", "Soreng", "Gangtok"
    ],
    "Tamil Nadu": [
        "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", 
        "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", 
        "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", 
        "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
        "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", 
        "Thanjavur", "Theni", "Thiruvallur", "Thiruvanannamalai", "Thiruvarur", 
        "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", 
        "Vellore", "Viluppuram", "Virudhunagar"
    ],
    "Telangana": [
        "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", 
        "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", 
        "Kumuram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", 
        "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", 
        "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", 
        "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", 
        "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri"
    ],
    "Tripura": [
        "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", 
        "South Tripura", "Unakoti", "West Tripura"
    ],
    "Uttar Pradesh": [
        "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", 
        "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", 
        "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", 
        "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", 
        "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", 
        "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", 
        "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", 
        "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", 
        "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", 
        "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", 
        "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", 
        "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", 
        "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", 
        "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", 
        "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ],
    "Uttarakhand": [
        "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", 
        "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", 
        "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ],
    "West Bengal": [
        "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", 
        "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", 
        "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", 
        "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", 
        "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ],
    "Andaman and Nicobar Islands": [
        "Nicobar", "North and Middle Andaman", "South Andaman"
    ],
    "Chandigarh": [
        "Chandigarh"
    ],
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Dadra and Nagar Haveli", "Daman", "Diu"
    ],
    "Delhi": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
        "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
    ],
    "Jammu and Kashmir": [
        "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", 
        "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", 
        "Kupwara", "Mambu", "Poonch", "Pulwama", "Rajouri", 
        "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ],
    "Ladakh": [
        "Kargil", "Leh"
    ],
    "Lakshadweep": [
        "Lakshadweep"
    ],
    "Puducherry": [
        "Karaikal", "Mahhe", "Puducherry", "Yanam"
    ]
};

function populateStates() {

    const stateSelect = document.getElementById("state");

    if (!stateSelect) return;

    stateSelect.innerHTML = '<option value="">Select State</option>';

    Object.keys(indiaStatesAndDistricts).sort().forEach(state => {

        stateSelect.innerHTML += `<option value="${state}">${state}</option>`;

    });

}

function populateDistricts() {

    const state = document.getElementById("state").value;

    const districtSelect = document.getElementById("district");

    districtSelect.innerHTML = '<option value="">Select District</option>';

    if (!state) return;

    indiaStatesAndDistricts[state].forEach(district => {

        districtSelect.innerHTML += `<option value="${district}">${district}</option>`;

    });

}

document.addEventListener("DOMContentLoaded", () => {

    populateStates();

    const state = document.getElementById("state");

    if (state) {

        state.addEventListener("change", populateDistricts);

    }

});
async function openCareerDetails() {

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const state = document.getElementById("state").value;
    const district = document.getElementById("district").value;

    const selectedCareer = window.selectedCareer;

    if (!selectedCareer) {
        alert("Please select a career.");
        return;
    }

    try {

        // Save Student
        const studentResponse = await fetch("https://carrerpath-backend.onrender.com/api/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                phone,
                state,
                district,
                selectedCareer
            })

        });

        const studentResult = await studentResponse.json();

        if (!studentResponse.ok) {

            alert(studentResult.message || "Failed to save student.");

            return;

        }

        // Check Career
        const careerResponse = await fetch("https://carrerpath-backend.onrender.com/api/careers/open", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                career: selectedCareer
            })

        });

        const careerResult = await careerResponse.json();

        if (careerResult.exists) {

    sessionStorage.setItem("selectedCareer", selectedCareer);

    window.location.href = "carrerdetails.html";

    return;

}

// ============================
// Career NOT found → Go to AI page
// ============================

sessionStorage.setItem("selectedCareer", selectedCareer);

window.location.href = "carrerdetails.html";

return;
    }
    catch(error){

        console.error(error);

        alert("Cannot connect to backend.");

    }

}

const careerData = {

    "Data Science": {

        overview: "Data Scientists collect, analyze and visualize data to help companies make better decisions."

    },

    "Cyber Security": {

        overview: "Cyber Security professionals protect networks, computers and data from cyber attacks."

    },

    "Software Development": {

        overview: "Software Developers design and build websites, apps and software."

    }

};

async function showCareerSuggestions() {

    const input = document.getElementById("careerSearch");
    const suggestionsDiv = document.getElementById("careerSuggestions");

    if (!input || !suggestionsDiv) return;

    const query = input.value.trim();

    if (query === "") {
        suggestionsDiv.style.display = "none";
        return;
    }

    try {

        const response = await fetch(
            `https://carrerpath-backend.onrender.com/api/careers/search?q=${encodeURIComponent(query)}`
        );

        const result = await response.json();

        const careers = result.data || [];
        const suggestions = result.suggestions || [];

        let html = "";

        // =========================
        // MongoDB Careers
        // =========================
        careers.forEach(career => {

            html += `
                <div
                    onclick="selectCareerFromSuggestion('${career.name}')"
                    style="
                        padding:10px 16px;
                        cursor:pointer;
                        border-bottom:1px solid rgba(255,255,255,0.08);
                    "
                >
                    📘 ${career.name}
                </div>
            `;

        });

        // =========================
        // Suggestion Careers
        // =========================
        suggestions.forEach(name => {

            // Don't repeat MongoDB careers
            if (careers.some(c => c.name === name)) return;

            html += `
                <div
                    onclick="selectCareerFromSuggestion('${name}')"
                    style="
                        padding:10px 16px;
                        cursor:pointer;
                        color:#9ecbff;
                    "
                >
                    💡 ${name}
                </div>
            `;

        });

        // =========================
        // Nothing Found
        // =========================
        if (html === "") {

            html = `
<div style="padding:12px;text-align:center;color:#aaa;">
    No matching career found.
</div>
`;

        }

        suggestionsDiv.innerHTML = html;
        suggestionsDiv.style.display = "block";

    }
    catch(error){

        console.error("Career search error:", error);

    }

}

