// Admin password (change this to your desired password)
const ADMIN_PASSWORD = 'admin123'; // CHANGE THIS PASSWORD!

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showAdminPanel();
}

function login() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        loadData();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem('adminLoggedIn');
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('adminPanel').style.display = 'none';
}

function showAdminPanel() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadData();
}

function loadData() {
    // Load CV link
    document.getElementById('cvLink').value = localStorage.getItem('cvLink') || '';
    
    // Load profile picture
    document.getElementById('profilePic').value = localStorage.getItem('profilePic') || '';
    
    // Load publication links
    document.getElementById('pub1Pdf').value = localStorage.getItem('pub1Pdf') || '';
    document.getElementById('pub1Link').value = localStorage.getItem('pub1Link') || '';
    document.getElementById('pub2Pdf').value = localStorage.getItem('pub2Pdf') || '';
    document.getElementById('pub2Link').value = localStorage.getItem('pub2Link') || '';
    document.getElementById('pub3Pdf').value = localStorage.getItem('pub3Pdf') || '';
    document.getElementById('pub3Link').value = localStorage.getItem('pub3Link') || '';
}

function showSuccess() {
    const msg = document.getElementById('successMessage');
    msg.style.display = 'block';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
}

function saveCV() {
    const cvLink = document.getElementById('cvLink').value;
    localStorage.setItem('cvLink', cvLink);
    showSuccess();
}

function saveProfilePic() {
    const profilePic = document.getElementById('profilePic').value;
    localStorage.setItem('profilePic', profilePic);
    showSuccess();
}

function savePublications() {
    localStorage.setItem('pub1Pdf', document.getElementById('pub1Pdf').value);
    localStorage.setItem('pub1Link', document.getElementById('pub1Link').value);
    localStorage.setItem('pub2Pdf', document.getElementById('pub2Pdf').value);
    localStorage.setItem('pub2Link', document.getElementById('pub2Link').value);
    localStorage.setItem('pub3Pdf', document.getElementById('pub3Pdf').value);
    localStorage.setItem('pub3Link', document.getElementById('pub3Link').value);
    showSuccess();
}