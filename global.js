let API_BASE_URL = "https://api.ecooncologia.com.br:3000";

if (window.location.href.includes('/teste/')) {
    API_BASE_URL = "https://api.ecooncologia.com.br:4000";
}

const API_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': 'EcoOnco_Smart_Seguranca_2026!@'
};

const APP_PAGES = [
    { id: 'dashboard', label: 'Dashboard', file: 'dashboard.html', perm: 'dashboard' },
    { id: 'helpdesk', label: 'Helpdesk', file: 'helpdesk.html', perm: 'helpdesk' }, 
    { id: 'helpdesk_admin', label: 'Gestão Helpdesk', file: 'helpdesk-admin.html', perm: 'helpdesk_admin' },
    { id: 'helpdesk_dash', label: 'Dashboard Helpdesk', file: 'helpdesk-dash.html', perm: 'helpdesk_dash' },
    { id: 'indicadores_enf', label: 'Indicadores', file: 'indicadores-enfermagem.html', perm: 'indicadores_enf' },
    { id: 'enfermagem', label: 'Enfermagem (Triagem)', file: 'enfermagem.html', perm: 'enfermagem' },
    { id: 'transporte', label: 'Recepção (Triagem)', file: 'transporte.html', perm: 'transporte' },
    { id: 'budget', label: 'Novo Orçamento', file: 'budget.html', perm: 'orcamentos' },
    { id: 'budgets', label: 'Orçamentos', file: 'budgets.html', perm: 'orcamentos' },
    { id: 'sales', label: 'Particulares', file: 'sales.html', perm: 'consultas' },
    { id: 'procedures', label: 'Procedimentos', file: 'procedures.html', perm: 'procedimentos' },
    { id: 'doctors', label: 'Médicos', file: 'doctors.html', perm: 'medicos' },
    { id: 'shifts', label: 'Plantão', file: 'shifts.html', perm: 'plantao' },
    { id: 'repass', label: 'Repasse', file: 'medical-repass.html', perm: 'repasse' },
    { id: 'stenci', label: 'Stenci', file: 'stenci.html', perm: 'stenci' },
    { id: 'selos', label: 'Selos', file: 'selos.html', perm: 'selos' },
    { id: 'eventos', label: 'Eventos', file: 'eventos.html', perm: 'eventos' },
    { id: 'atas', label: 'Mural de ATAs', file: 'atas.html', perm: 'atas' },
    { id: 'tuss', label: 'Tabela TUSS', file: 'tuss.html', perm: 'tuss' },
    { id: 'admin', label: 'Admin', file: 'admin.html', perm: 'admin' }
];

async function initGlobal(currentPageId, pageTitle) {
    try {
        const userJson = localStorage.getItem('ecoUser');
        const isLogin = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/');
        const isNoAccess = window.location.pathname.includes('no-access');

        if (!userJson) {
            if (!isLogin && !isNoAccess) {
                console.warn("Usuário não logado. Redirecionando...");
                window.location.href = 'index.html';
            }
            return;
        }

        let user = JSON.parse(userJson);
        const localPhoto = localStorage.getItem('ecoUserPhoto');
        const displayPhoto = (localPhoto && localPhoto.length > 50) ? localPhoto : (user.photo || '');

        if (!isNoAccess) {
            renderHeader(user, pageTitle, displayPhoto);
            await checkPermissionsAndRenderMenu(user, currentPageId);
        }
        
    } catch (e) {
        console.error("Erro initGlobal:", e);
    }
}

function renderHeader(user, title, photoSrc) {
    const headerEl = document.getElementById('global-header');
    if(!headerEl) return;
    
    headerEl.className = 'header';

    const hour = new Date().getHours();
    let greeting = (hour < 12) ? 'Bom dia' : (hour < 18) ? 'Boa tarde' : 'Boa noite';
    
    let displayName = user.nome || "Usuário";
    if (user.nome && user.nome.split(' ').length > 1) {
        displayName = `${user.nome.split(' ')[0]} ${user.nome.split(' ')[1]}`;
    }

    let avatarHTML = (photoSrc) 
        ? `<img src="${photoSrc}" style="width:100%; height:100%; object-fit:cover;">` 
        : `<div style="display:flex;justify-content:center;align-items:center;width:100%;height:100%;font-weight:bold;">${displayName.charAt(0)}</div>`;

    headerEl.innerHTML = `
        <div class="header-logo"><img src="https://i.imgur.com/kpCeqqJ.png" alt="ECO"></div>
        <div class="header-center"><h1>ONCO SMART</h1><p>${title}</p></div>
        <div class="user-profile">
            <div class="user-info"><div class="user-greeting">${greeting},</div><div class="user-name">${displayName}</div></div>
            <div class="user-avatar">${avatarHTML}</div>
            <button class="logout-btn" onclick="logout()" title="Sair"><i class="fas fa-sign-out-alt"></i></button>
        </div>
    `;
}

async function checkPermissionsAndRenderMenu(user, activeId) {
    let perms = user.permissoes || {}; 
    
    try {
        // AQUI ESTÁ A MÁGICA: Passando a chave de segurança no header
        const res = await fetch(`${API_BASE_URL}/usuarios`, {
            headers: API_HEADERS
        });
        
        if (res.ok) {
            const allUsers = await res.json();
            const emailKey = user.email.replace(/\./g, ',');
            let found = allUsers[emailKey] || Object.values(allUsers).find(u => u.email === user.email);
            if (found) {
                perms = (typeof found.permissoes === 'string') ? JSON.parse(found.permissoes) : found.permissoes;
                user.permissoes = perms;
                localStorage.setItem('ecoUser', JSON.stringify(user));
            }
        } else {
            console.error("Erro de permissão na API:", res.status);
        }
    } catch(e) {
        console.error("Falha ao buscar usuários:", e);
    }

    // --- RENDERIZAÇÃO DO MENU ---
    const nav = document.getElementById('global-nav');
    if(!nav) return;
    
    let html = '<div class="nav-scroller"><div class="nav-tabs">';
    let hasVisibleMenu = false;
    
    APP_PAGES.forEach(page => {
        let show = false;
        
        if (page.id === 'helpdesk') {
            show = true;
        } else if (page.id === 'admin') {
            if (perms.admin === true) show = true;
        } else {
            if (perms[page.perm] === true) show = true;
        }

        if (show) {
            hasVisibleMenu = true;
            const active = (page.id === activeId) ? 'active' : '';
            html += `<button class="nav-tab ${active}" onclick="window.location.href='${page.file}'">${page.label}</button>`;
        }
    });
    
    html += '</div></div>';
    nav.innerHTML = html;

    // --- ROTEADOR ---
    const pageConfig = APP_PAGES.find(p => p.id === activeId);
    if (pageConfig) {
        const req = pageConfig.perm;
        const allowed = (perms.admin === true && pageConfig.id === 'admin') || 
                        (req === 'helpdesk') || 
                        (perms[req] === true);
        
        if (!allowed) {
            // Se foi bloqueado, procura a primeira página válida
            const firstValidPage = APP_PAGES.find(p => {
                if (p.id === activeId) return false; 
                if (p.id === 'helpdesk') return true;
                if (p.id === 'admin' && perms.admin) return true;
                return perms[p.perm] === true;
            });

            if (firstValidPage) {
                window.location.href = firstValidPage.file;
            } else {
                window.location.href = 'no-access-teste.html';
            }
        }
    } else if (!hasVisibleMenu && !perms.admin) {
        window.location.href = 'no-access-teste.html';
    }
}

function logout() {
    localStorage.removeItem('ecoUser'); localStorage.removeItem('ecoUserPhoto');
    window.location.href = 'https://ecooncologia.com.br/smart/';
}
