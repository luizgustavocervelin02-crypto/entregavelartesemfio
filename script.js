// Dados mockados para os módulos e aulas
const modulesData = [
    {
        id: 1,
        title: "Módulo 1: Iniciante (O Despertar do Crochê)",
        lessons: [
            { id: 101, title: "Crochê do Zero: Aula Completa", duration: "10:00", completed: false, description: "Guia definitivo para iniciantes, ensinando desde como segurar a agulha até os primeiros pontos.", videoUrl: "https://www.youtube.com/embed/Tmpu-L82dU0" },
            { id: 102, title: "Pontos Básicos e Fundamentais", duration: "15:00", completed: false, description: "Aula detalhada sobre correntinha, ponto baixo e ponto alto com um dos maiores mestres do Brasil.", videoUrl: "https://www.youtube.com/embed/cgiycyM5kFs" },
            { id: 103, title: "Aprenda Crochê em 5 Passos", duration: "18:30", completed: false, description: "Um método simplificado para dominar a técnica inicial de forma rápida e prática.", videoUrl: "https://www.youtube.com/embed/ZQM1GS3uDz8" },
            { id: 104, title: "Primeira Peça Passo a Passo", duration: "24:00", completed: false, description: "Tutorial focado em aplicar os pontos aprendidos em uma estrutura simples e funcional.", videoUrl: "https://www.youtube.com/embed/s6bX_52dZ44" }
        ]
    },
    {
        id: 2,
        title: "Módulo 2: Intermediário (Evoluindo a Técnica)",
        lessons: [
            { id: 201, title: "Como Ler Gráficos de Crochê", duration: "35:30", completed: false, description: "Desmistificando os símbolos e diagramas para que o aluno consiga seguir qualquer receita.", videoUrl: "https://www.youtube.com/embed/0fkBczqcMbo" },
            { id: 202, title: "Blusa de Crochê Intermediária", duration: "45:00", completed: false, description: "Passo a passo de uma peça de vestuário moderna, ideal para praticar modelagem simples.", videoUrl: "https://www.youtube.com/embed/HmAdVlWTdS4" },
            { id: 203, title: "Tutorial Blusa Fácil (Marie Castro)", duration: "30:00", completed: false, description: "Técnica de construção de peças sem costura, elevando o nível de acabamento.", videoUrl: "https://www.youtube.com/embed/vA_ku21x3Wc" },
            { id: 204, title: "Bicos e Barrados Elaborados", duration: "25:00", completed: false, description: "Aula sobre acabamentos que valorizam qualquer peça, focando em pontos combinados.", videoUrl: "https://www.youtube.com/embed/060Xe0Rtuxg" }
        ]
    },
    {
        id: 3,
        title: "Módulo 3: Avançado (Maestria e Arte)",
        lessons: [
            { id: 301, title: "Introdução ao Crochê Irlandês", duration: "35:00", completed: false, description: "A técnica mais sofisticada do crochê, focada em relevos e motivos florais complexos.", videoUrl: "https://www.youtube.com/embed/rPWyxG1JEpQ" },
            { id: 302, title: "Flor de Crochê Irlandês Avançada", duration: "40:00", completed: false, description: "Tutorial detalhado de um motivo clássico que exige alta precisão e controle de tensão.", videoUrl: "https://www.youtube.com/embed/RwnHzq2Vzwk" },
            { id: 303, title: "Bico de Crochê Nível 117", duration: "25:00", completed: false, description: "Um dos bicos mais complexos e detalhados, ideal para peças de alto valor agregado.", videoUrl: "https://www.youtube.com/embed/ehMuPaE_9W8" },
            { id: 304, title: "Técnica de Canto Xadrez", duration: "30:00", completed: false, description: "Geometria avançada no crochê para criar padrões visuais impactantes e simétricos.", videoUrl: "https://www.youtube.com/embed/4Nna4tkW4z8" }
        ]
    },
    {
        id: 4,
        title: "Módulo 4: Business (Lucrando com sua Arte)",
        lessons: [
            { id: 401, title: "Como Vender Mais pela Internet", duration: "20:00", completed: false, description: "Estratégias práticas para usar as redes sociais como vitrine e atrair clientes reais.", videoUrl: "https://www.youtube.com/embed/ioZL9p2vnNY" },
            { id: 402, title: "Precificação Descomplicada", duration: "25:00", completed: false, description: "Aprenda a calcular o valor da sua hora, materiais e lucro sem medo de errar no preço.", videoUrl: "https://www.youtube.com/embed/I7CJriiiA3o" },
            { id: 403, title: "4 Formas de Vender Online", duration: "15:00", completed: false, description: "Um panorama sobre marketplaces, Instagram, WhatsApp e vendas diretas.", videoUrl: "https://www.youtube.com/embed/RvjySdwHAAg" },
            { id: 404, title: "5 Dicas de Ouro para o Sucesso", duration: "22:00", completed: false, description: "Mentalidade empreendedora e gatilhos mentais para valorizar seu trabalho artesanal.", videoUrl: "https://www.youtube.com/embed/PpS93qukmy8" }
        ]
    },
    {
        id: 5,
        title: "Módulo 5: Bônus Exclusivos",
        lessons: [
            {
                id: 501,
                title: "Material Bônus e Gráficos",
                duration: "00:00",
                completed: false,
                description: "Neste módulo você tem acesso liberado à pasta com todos os gráficos e receitas do curso.",
                driveUrl: "https://drive.google.com/drive/folders/1zhgOoitWSV1867HspQGkpKI_FrMjMbV2?usp=drive_link",
                isBonus: true
            }
        ]
    },
    {
        id: 6,
        title: "Certificado",
        lessons: [
            { id: 601, title: "Seu Certificado", duration: "00:00", completed: false, description: "Aqui você poderá emitir o seu certificado de conclusão. Lembrando que ele só será liberado após 7 dias do seu primeiro acesso.", isCertificate: true }
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
    } else if (currentLesson.isBonus) {
        certificateWrapper.style.display = 'none';
        videoWrapper.style.display = 'block';

        videoWrapper.innerHTML = `
            <div class="video-placeholder" style="background: var(--bg-card); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; text-align: center;">
                <i class="ph ph-folder-open play-icon" style="color: var(--accent); font-size: 5rem; margin-bottom: 1rem; cursor: default;"></i>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Meus Bônus e Gráficos</h3>
                <p style="color: var(--text-muted); margin-bottom: 2rem; line-height: 1.5;">Aqui está a pasta completa hospedada no Google Drive com todos os seus gráficos extras, tabelas e receitas para baixar com comodidade.</p>
                <a href="${currentLesson.driveUrl}" target="_blank" rel="noopener noreferrer" style="background-color: var(--accent); color: white; padding: 1rem 2rem; border-radius: 8px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; transition: background-color 0.2s;">
                    <i class="ph ph-link" style="font-size: 1.25rem;"></i> ACESSAR PASTA NO DRIVE
                </a>
            </div>
        `;
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
