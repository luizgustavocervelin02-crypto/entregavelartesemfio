// Dados mockados para os módulos e aulas
const modulesData = [
    {
        id: 1,
        title: "Módulo 1: Comece por aqui",
        lessons: [
            { id: 101, title: "Boas-vindas", duration: "05:20", completed: false, description: "Seja muito bem vindo à nossa área de membros. Neste vídeo explico como você vai aproveitar ao máximo este conteúdo." },
            { id: 102, title: "Como acessar o suporte", duration: "03:15", completed: false, description: "Aprenda a utilizar nossos canais de suporte para tirar todas as suas dúvidas." }
        ]
    },
    {
        id: 2,
        title: "Módulo 2: O seu Entregável",
        lessons: [
            {
                id: 201,
                title: "O Primeiro Passo",
                duration: "15:40",
                completed: false,
                description: "Nesta aula vamos dar o primeiro passo na execução do seu projeto. Preste atenção aos detalhes.",
                materials: [
                    { name: "Checklist Inicial.pdf", icon: "ph-file-pdf" },
                    { name: "Planilha de Organização.xlsx", icon: "ph-file-xls" }
                ]
            },
            { id: 202, title: "Configurando a Estrutura", duration: "25:10", completed: false, description: "Vamos configurar toda a estrutura necessária para o funcionamento do seu projeto." },
            { id: 203, title: "Colocando a mão na massa", duration: "30:00", completed: false, description: "Hora de aplicar tudo o que foi planejado." }
        ]
    },
    {
        id: 3,
        title: "Módulo 3: Avançado",
        lessons: [
            { id: 301, title: "Otimizações de Resultado", duration: "12:30", completed: false, description: "Como escalar e otimizar aquilo que já está funcionando." },
            { id: 302, title: "Próximos Passos", duration: "08:45", completed: false, description: "O que fazer após concluir todas as etapas do projeto." }
        ]
    },
    {
        id: 4,
        title: "Certificado de Conclusão",
        lessons: [
            { id: 401, title: "Seu Certificado", duration: "00:00", completed: false, description: "Aqui você poderá emitir o seu certificado de conclusão. Lembrando que ele só será liberado após 7 dias do seu primeiro acesso.", isCertificate: true }
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

        // Fake video reload
        videoPlaceholder.innerHTML = '<i class="ph ph-spinner ph-spin play-icon"></i><p>Carregando vídeo...</p>';
        setTimeout(() => {
            videoPlaceholder.innerHTML = '<i class="ph ph-play-circle play-icon"></i><p>Clique para reproduzir</p>';
        }, 500);
    }

    // Materials
    if (currentLesson.materials && currentLesson.materials.length > 0) {
        materialsList.innerHTML = '';
        currentLesson.materials.forEach(mat => {
            const a = document.createElement('a');
            a.href = "#";
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
