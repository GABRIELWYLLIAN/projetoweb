// ============================================================
//  DADOS
// ============================================================

const movimentosData = [
    { id: 0, ano: 1905, nome: 'Fauvismo', desc: 'Uso explosivo da cor e pinceladas soltas, buscando expressar emoções sem preocupação realista.', artistas: ['Matisse', 'Derain', 'Vlaminck'] },
    { id: 1, ano: 1907, nome: 'Cubismo', desc: 'Fragmentação da realidade em formas geométricas, múltiplos pontos de vista e planos simultâneos.', artistas: ['Picasso', 'Braque', 'Gris'] },
    { id: 2, ano: 1909, nome: 'Futurismo', desc: 'Exaltação da velocidade, tecnologia e dinamismo da vida moderna. Rejeição do passado.', artistas: ['Boccioni', 'Marinetti', 'Carrà'] },
    { id: 3, ano: 1916, nome: 'Dadaísmo', desc: 'Movimento de protesto contra a lógica e a razão, utilizando o absurdo e a ironia como crítica social.', artistas: ['Duchamp', 'Arp', 'Tzara'] },
    { id: 4, ano: 1924, nome: 'Surrealismo', desc: 'Exploração do inconsciente, dos sonhos e do irracional, com imagens oníricas e justaposições inusitadas.', artistas: ['Dalí', 'Magritte', 'Miró'] },
    { id: 5, ano: 1945, nome: 'Expressionismo Abstrato', desc: 'Ênfase na gestualidade, na ação e na expressão emocional através de formas abstratas e cores intensas.', artistas: ['Pollock', 'de Kooning', 'Rothko'] },
    { id: 6, ano: 1960, nome: 'Pop Art', desc: 'Apropriação de imagens da cultura de massa, publicidade e quadrinhos, questionando as fronteiras entre alta e baixa cultura.', artistas: ['Warhol', 'Lichtenstein', 'Rauschenberg'] },
    { id: 7, ano: 1965, nome: 'Minimalismo', desc: 'Redução à essência, formas geométricas simples, monocromia e ênfase na materialidade e no espaço.', artistas: ['Judd', 'Flavin', 'Andre'] },
    { id: 8, ano: 1970, nome: 'Arte Conceitual', desc: 'A ideia prevalece sobre o objeto. A arte é o conceito, podendo ser apresentada em textos, fotografias ou instalações.', artistas: ['Kosuth', 'Weiner', 'Broodthaers'] },
    { id: 9, ano: 1980, nome: 'Pós-Modernismo', desc: 'Citação, pastiche, ironia e mistura de estilos. Rejeição das narrativas universais e celebração da diversidade.', artistas: ['Salle', 'Fischl', 'Clemente'] }
];

const artistasData = [
    { nome: 'Pablo Picasso', movimento: 'Cubismo', emoji: '🎨' },
    { nome: 'Henri Matisse', movimento: 'Fauvismo', emoji: '🖌️' },
    { nome: 'Salvador Dalí', movimento: 'Surrealismo', emoji: '⏳' },
    { nome: 'Andy Warhol', movimento: 'Pop Art', emoji: '🥫' },
    { nome: 'Jackson Pollock', movimento: 'Expressionismo Abstrato', emoji: '💧' },
    { nome: 'Marcel Duchamp', movimento: 'Dadaísmo', emoji: '🚽' },
    { nome: 'Frida Kahlo', movimento: 'Surrealismo', emoji: '🌺' },
    { nome: 'Wassily Kandinsky', movimento: 'Expressionismo Abstrato', emoji: '🔺' },
    { nome: 'Roy Lichtenstein', movimento: 'Pop Art', emoji: '💥' },
    { nome: 'Piet Mondrian', movimento: 'Cubismo', emoji: '▣' },
    { nome: 'Giorgio de Chirico', movimento: 'Surrealismo', emoji: '🏛️' },
    { nome: 'Alexander Calder', movimento: 'Minimalismo', emoji: '🌀' }
];

// ============================================================
//  TIMELINE – SLIDER
// ============================================================

let currentIndex = 0;
const track = document.getElementById('timelineTrack');
const detailYear = document.getElementById('tlYear');
const detailTitle = document.getElementById('tlTitle');
const detailDesc = document.getElementById('tlDesc');
const detailArtists = document.getElementById('tlArtists');

function renderTimelineItems() {
    track.innerHTML = '';
    movimentosData.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = `timeline-item${idx === currentIndex ? ' active' : ''}`;
        div.dataset.index = idx;
        div.innerHTML = `<span class="year">${item.ano}</span><span class="name">${item.nome}</span>`;
        div.addEventListener('click', () => selectTimelineItem(idx));
        track.appendChild(div);
    });
}

function selectTimelineItem(index) {
    currentIndex = index;
    const items = track.querySelectorAll('.timeline-item');
    items.forEach((el, i) => el.classList.toggle('active', i === index));
    updateDetail(index);
    // scroll para centralizar o item (opcional)
    const activeEl = items[index];
    if (activeEl) {
        const sliderWidth = document.getElementById('timelineSlider').offsetWidth;
        const elLeft = activeEl.offsetLeft;
        const elWidth = activeEl.offsetWidth;
        const scrollTo = elLeft - sliderWidth / 2 + elWidth / 2;
        track.style.transform = `translateX(-${Math.max(0, scrollTo)}px)`;
    }
}

function updateDetail(index) {
    const data = movimentosData[index];
    detailYear.textContent = data.ano;
    detailTitle.textContent = data.nome;
    detailDesc.textContent = data.desc;
    detailArtists.innerHTML = data.artistas.map(a => `<span>${a}</span>`).join('');
}

// Controles
document.getElementById('tlPrev').addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + movimentosData.length) % movimentosData.length;
    selectTimelineItem(newIndex);
});
document.getElementById('tlNext').addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % movimentosData.length;
    selectTimelineItem(newIndex);
});

// ============================================================
//  MOVEMENTS CARDS
// ============================================================

function renderMovements() {
    const grid = document.getElementById('movementsGrid');
    grid.innerHTML = '';
    movimentosData.forEach(m => {
        const card = document.createElement('div');
        card.className = 'movement-card';
        card.innerHTML = `
            <span class="emoji">${getEmojiForMovement(m.nome)}</span>
            <h3>${m.nome}</h3>
            <p>${m.desc}</p>
            <div class="artists-list">${m.artistas.map(a => `<span>${a}</span>`).join('')}</div>
        `;
        grid.appendChild(card);
    });
}

function getEmojiForMovement(name) {
    const map = {
        'Fauvismo': '🎨',
        'Cubismo': '🔲',
        'Futurismo': '⚡',
        'Dadaísmo': '🃏',
        'Surrealismo': '🌙',
        'Expressionismo Abstrato': '🌀',
        'Pop Art': '🍔',
        'Minimalismo': '◻️',
        'Arte Conceitual': '🧠',
        'Pós-Modernismo': '🌀'
    };
    return map[name] || '✦';
}

// ============================================================
//  ARTISTS CARDS
// ============================================================

function renderArtists() {
    const grid = document.getElementById('artistsGrid');
    grid.innerHTML = '';
    artistasData.forEach(a => {
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.innerHTML = `
            <span class="avatar">${a.emoji}</span>
            <h4>${a.nome}</h4>
            <span class="movement-tag">${a.movimento}</span>
        `;
        grid.appendChild(card);
    });
}

// ============================================================
//  MENU MOBILE
// ============================================================

document.getElementById('navToggle').addEventListener('click', function() {
    document.getElementById('navMenu').classList.toggle('open');
});

// Fecha menu ao clicar em link (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('open');
    });
});

// ============================================================
//  INICIALIZAÇÃO
// ============================================================

renderTimelineItems();
selectTimelineItem(0); // exibe o primeiro
renderMovements();
renderArtists();