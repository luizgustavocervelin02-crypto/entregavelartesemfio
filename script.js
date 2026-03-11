// Dados mockados para os módulos e aulas
const modulesData = [
    {
        id: 1,
        title: "Módulo 1 - Iniciantes",
        lessons: [
            { id: 101, title: "Aula 1: Materiais e Agulhas", duration: "10:00", completed: false, description: "Aprenda sobre os fundamentos do crochê, desde a escolha dos fios, agulhas ideais e materiais corretos para o seu primeiro laço.", videoUrl: "https://www.youtube.com/embed/V5kXXY1rLcw" },
            { id: 102, title: "Aula 2: Ponto Correntinha (O Início)", duration: "15:00", completed: false, description: "A correntinha é a base de quase todos os trabalhos em crochê. Acompanhe o passo a passo para destrinchar esse começo.", videoUrl: "https://www.youtube.com/embed/l8n9D7RmsfU" },
            { id: 103, title: "Aula 3: Ponto Baixo Passo a Passo", duration: "18:30", completed: false, description: "Como fazer o ponto baixo com precisão e manter sua peça reta." },
            { id: 104, title: "Aula 4: Ponto Alto Descomplicado", duration: "24:00", completed: false, description: "Aumentando a altura do trabalho com o famoso Ponto Alto." }
        ]
    },
    {
        id: 2,
        title: "Módulo 2 - Suas Primeiras Peças",
        lessons: [
            { id: 201, title: "Fazendo um tapete retangular simples", duration: "35:30", completed: false, description: "Domine a confecção de tapetes retangulares e aprendendo a leitura correta das receitas e da contagem de pontos." },
            { id: 202, title: "Cesto organizador em Fio de Malha", duration: "45:00", completed: false, description: "Utilizando fio de malha para criar uma peça útil e rápida." }
        ]
    },
    {
        id: 3,
        title: "Módulo 3 - Avançado",
        lessons: [
            { id: 301, title: "Técnicas Avançadas de Acabamento", duration: "35:00", completed: false, description: "Técnicas avançadas para criar peças com acabamento invisível, profissional e detalhes que valorizam seu trabalho." }
        ]
    },
    {
        id: 4,
        title: "Módulo 4 - Gráficos e Bônus",
        lessons: [
            {
                id: 401,
                title: "Acesso aos Gráficos e Receitas",
                duration: "00:00",
                completed: false,
                description: "Acesse o link abaixo para abrir a pasta exclusiva do Google Drive com centenas de gráficos, tabelas e bônus.",
                materials: [
                    { name: "ACESSAR PASTA DE GRÁFICOS (Google Drive)", icon: "ph-link", url: "https://drive.google.com/drive/folders/1zhgOoitWSV1867HspQGkpKI_FrMjMbV2?usp=drive_link" }
                ]
            },
            { id: 402, title: "50 Bolsas de Crochê (Bônus)", duration: "20:00", completed: false, description: "Acesse lindos modelos exclusivos de bolsas em crochê." },
            { id: 403, title: "50 Biquínis e Croppeds (Bônus)", duration: "25:00", completed: false, description: "Instruções completas de opções imperdíveis para moda praia." }
        ]
    },
    {
        id: 5,
        title: "Certificado",
        lessons: [
            { id: 501, title: "Seu Certificado", duration: "00:00", completed: false, description: "Aqui você poderá emitir o seu certificado de conclusão. Lembrando que ele só será liberado após 7 dias do seu primeiro acesso.", isCertificate: true }
        ]
    }
];


// Estado da Aplicação
let state = {
    activeLessonId: null,
    lessons: [], // Flattened list of lessons for easy navigation
};

// DOM Elements
const moduleListEl = document.getElementById('moduleList');
const lessonTitleEl = document.getElementById('lessonTitle');
const lessonDescriptionEl = document.getElementById('lessonDescription');
const pageTitleEl = document.getElementById('pageTitle');
const completeBtn = document.getElementById('completeBtn');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const materialsSection = document.getElementById('materialsSection');
const materialsList = document.getElementById('materialsList');

// Video & Certificate Area
const videoWrapper = document.getElementById('videoWrapper');
const videoPlaceholder = document.getElementById('videoPlaceholder');
const certificateWrapper = document.getElementById('certificateWrapper');

// Login & User DOM
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const studentNameInput = document.getElementById('studentNameInput');
const userNameDisplay = document.getElementById('userNameDisplay');
const userAvatar = document.getElementById('userAvatar');
const certStudentName = document.getElementById('certStudentName');
const certDate = document.getElementById('certDate');
const downloadCertBtn = document.getElementById('downloadCertBtn');

// Mobile Menu Elements
const menuBtn = document.getElementById('menuBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Initialize
function init() {
    checkUserLogin();

    // Flatten lessons array to keep track of navigation (prev/next)
    state.lessons = modulesData.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id })));

    // Set first lesson as active by default
    if (state.lessons.length > 0) {
        state.activeLessonId = state.lessons[0].id;
    }

    renderSidebar();
    updateLessonView();
    updateProgress();
    setupEventListeners();
}

// User Login Logic
function checkUserLogin() {
    const savedName = localStorage.getItem('studentName');
    const firstAccess = localStorage.getItem('firstAccessDate');

    if (savedName && firstAccess) {
        loginModal.style.display = 'none';
        updateUserDisplay(savedName);
    } else {
        loginModal.style.display = 'flex';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const name = studentNameInput.value.trim();
    if (name) {
        localStorage.setItem('studentName', name);
        localStorage.setItem('firstAccessDate', new Date().toISOString());
        loginModal.style.display = 'none';
        updateUserDisplay(name);
        updateLessonView(); // Update view to check cert permissions
    }
}

function updateUserDisplay(name) {
    userNameDisplay.textContent = name.split(' ')[0]; // Show first name
    certStudentName.textContent = name;
    userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff`;
}

function renderSidebar() {
    moduleListEl.innerHTML = '';

    modulesData.forEach((mod, index) => {
        const li = document.createElement('li');
        li.className = `module-item ${index === 0 ? 'active' : ''}`; // Open first module

        // Module Header
        const header = document.createElement('div');
        header.className = 'module-header';
        header.innerHTML = `
            <span class="module-title">${mod.title}</span>
            <span class="module-icon"><i class="ph ph-caret-down"></i></span>
        `;

        header.addEventListener('click', () => {
            li.classList.toggle('active');
        });

        // Lessons List
        const ul = document.createElement('ul');
        ul.className = 'lesson-list';

        mod.lessons.forEach(lesson => {
            const lessonLi = document.createElement('li');
            lessonLi.className = `lesson-item ${lesson.id === state.activeLessonId ? 'active' : ''} ${lesson.completed ? 'completed' : ''}`;
            lessonLi.dataset.id = lesson.id;

            lessonLi.innerHTML = `
                <i class="ph ph-circle"></i>
                <i class="ph ph-check-circle" style="display:none"></i>
                <span>${lesson.title}</span>
            `;

            lessonLi.addEventListener('click', () => {
                selectLesson(lesson.id);
                if (window.innerWidth <= 900) {
                    toggleMobileMenu();
                }
            });

            ul.appendChild(lessonLi);
        });

        li.appendChild(header);
        li.appendChild(ul);
        moduleListEl.appendChild(li);
    });
}

function selectLesson(id) {
    state.activeLessonId = id;

    // Update active class in sidebar
    document.querySelectorAll('.lesson-item').forEach(el => {
        el.classList.remove('active');
        if (parseInt(el.dataset.id) === id) {
            el.classList.add('active');
            // Ensure parent module is open
            el.closest('.module-item').classList.add('active');
        }
    });

    updateLessonView();
}

function updateLessonView() {
    const currentLesson = state.lessons.find(l => l.id === state.activeLessonId);
    if (!currentLesson) return;

    // Update Texts
    lessonTitleEl.textContent = currentLesson.title;
    lessonDescriptionEl.innerHTML = `<p>${currentLesson.description}</p>`;
    pageTitleEl.textContent = currentLesson.title;

    // Complete Button State
    if (currentLesson.completed) {
        completeBtn.classList.add('completed');
        completeBtn.innerHTML = '<i class="ph ph-check-circle"></i> Concluída';
    } else {
        completeBtn.classList.remove('completed');
        completeBtn.innerHTML = '<i class="ph ph-check-circle"></i> Marcar como concluída';
    }

    // Nav Buttons
    const currentIndex = state.lessons.findIndex(l => l.id === state.activeLessonId);
    prevBtn.disabled = currentIndex === 0;

    if (currentIndex === state.lessons.length - 1) {
        nextBtn.innerHTML = 'Finalizar Curso <i class="ph ph-flag-checkered"></i>';
        nextBtn.classList.remove('next-btn'); // optional styling change if wanted
    } else {
        nextBtn.innerHTML = 'Próxima Aula <i class="ph ph-caret-right"></i>';
        nextBtn.classList.add('next-btn');
    }

    // Toggle Video vs Certificate View
    if (currentLesson.isCertificate) {
        videoWrapper.style.display = 'none';
        certificateWrapper.style.display = 'flex';
        checkCertificatePermission();
    } else {
        certificateWrapper.style.display = 'none';
        videoWrapper.style.display = 'block';

        if (currentLesson.videoUrl) {
            videoWrapper.innerHTML = `<iframe width="100%" height="100%" src="${currentLesson.videoUrl}" style="border:0; border-radius:16px; min-height: 400px; width: 100%; aspect-ratio: 16/9;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            videoWrapper.innerHTML = `
                <div class="video-placeholder" id="videoPlaceholder">
                    <i class="ph ph-play-circle play-icon"></i>
                    <p>Carregando aula...</p>
                </div>
            `;
            const videoPlaceholder = document.getElementById('videoPlaceholder');
            // Fake video reload
            videoPlaceholder.innerHTML = '<i class="ph ph-spinner ph-spin play-icon"></i><p>Carregando vídeo...</p>';
            setTimeout(() => {
                videoPlaceholder.innerHTML = '<i class="ph ph-play-circle play-icon"></i><p>Clique para reproduzir</p>';
            }, 500);
        }
    }

    // Materials
    if (currentLesson.materials && currentLesson.materials.length > 0) {
        materialsList.innerHTML = '';
        currentLesson.materials.forEach(mat => {
            const a = document.createElement('a');
            a.href = mat.url || "#";
            if (mat.url) a.target = "_blank";
            if (mat.url) a.rel = "noopener noreferrer";
            a.className = 'material-item';
            a.innerHTML = `
                <i class="ph ${mat.icon} material-icon"></i>
                <span>${mat.name}</span>
            `;
            materialsList.appendChild(a);
        });
        materialsSection.style.display = 'block';
    } else {
        materialsSection.style.display = 'none';
    }
}

function checkCertificatePermission() {
    const firstAccess = localStorage.getItem('firstAccessDate');
    if (!firstAccess) return;

    const accessDate = new Date(firstAccess);
    const now = new Date();
    const diffTime = Math.abs(now - accessDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const requiredDays = 7;

    if (diffDays >= requiredDays) {
        // Liberado
        const today = new Date().toLocaleDateString('pt-BR');
        certDate.textContent = today;
        document.querySelector('.certificate-content').style.opacity = '1';
        document.querySelector('.certificate-content').style.filter = 'none';
        lessonDescriptionEl.innerHTML = `<p>Parabéns por chegar até aqui! Seu certificado está liberado para download abaixo.</p>`;
        downloadCertBtn.style.display = 'flex';
        completeBtn.style.display = 'flex';
    } else {
        // Bloqueado
        const daysLeft = requiredDays - diffDays;
        document.querySelector('.certificate-content').style.opacity = '0.5';
        document.querySelector('.certificate-content').style.filter = 'grayscale(100%) blur(2px)';
        lessonDescriptionEl.innerHTML = `<p><strong>Falta pouco!</strong> Por razões de segurança, seu certificado será liberado em <strong>${daysLeft} dia(s)</strong>, a partir do seu primeiro acesso.</p>`;
        downloadCertBtn.style.display = 'none';
        completeBtn.style.display = 'none';
    }
}

function toggleComplete() {
    const currentLesson = state.lessons.find(l => l.id === state.activeLessonId);
    if (!currentLesson) return;

    currentLesson.completed = !currentLesson.completed;

    // Update original data as well
    const modIndex = modulesData.findIndex(m => m.id === currentLesson.moduleId);
    const lesIndex = modulesData[modIndex].lessons.findIndex(l => l.id === currentLesson.id);
    modulesData[modIndex].lessons[lesIndex].completed = currentLesson.completed;

    updateLessonView();
    renderSidebar(); // refresh sidebar to show checkmarks
    updateProgress();

    // Auto advance if just completed
    if (currentLesson.completed) {
        goToNext();
    }
}

function goToNext() {
    const currentIndex = state.lessons.findIndex(l => l.id === state.activeLessonId);
    if (currentIndex < state.lessons.length - 1) {
        selectLesson(state.lessons[currentIndex + 1].id);
    }
}

function goToPrev() {
    const currentIndex = state.lessons.findIndex(l => l.id === state.activeLessonId);
    if (currentIndex > 0) {
        selectLesson(state.lessons[currentIndex - 1].id);
    }
}

function updateProgress() {
    const total = state.lessons.length;
    const completed = state.lessons.filter(l => l.completed).length;
    const perc = Math.round((completed / total) * 100) || 0;

    progressText.textContent = `${perc}%`;
    progressFill.style.width = `${perc}%`;
}

function toggleMobileMenu() {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('show');
}

function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
    completeBtn.addEventListener('click', toggleComplete);
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    menuBtn.addEventListener('click', toggleMobileMenu);
    closeSidebarBtn.addEventListener('click', toggleMobileMenu);
    sidebarOverlay.addEventListener('click', toggleMobileMenu);

    downloadCertBtn.addEventListener('click', () => {
        alert("Baixando certificado...");
        // Aqui no futuro podemos integrar HTML2Canvas ou jspdf para gerar baixar a imagem do certifcado
    });
}

// Start
document.addEventListener('DOMContentLoaded', init);
