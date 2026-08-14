// --- FUNÇÕES DE RENDERIZAÇÃO ---
function typeOutText(element, text, speed = 30) {
    if (!element) return;
    let i = 0;
    element.innerHTML = ''; 
    const intervalId = setInterval(() => {
        if (i >= text.length) {
            clearInterval(intervalId);
            const cursor = element.querySelector('.cursor');
            if (cursor) cursor.remove();
        } else {
            element.innerHTML = text.substring(0, i + 1) + '<span class="animate-pulse cursor">_</span>';
            i++;
        }
    }, speed);
}

function renderProfile(t) {
    const gridFieldsHtml = t.fields.map((field, index) => `
        <div class="bg-gray-900/50 p-3 sm:p-4 border border-red-800/50 flex items-center gap-3 sm:gap-4">
            <i class="fas ${field.icon} text-red-500 text-xl sm:text-2xl w-6 sm:w-8 text-center"></i>
            <div class="min-w-0 flex-1">
                <p class="text-red-500 font-bold text-xs sm:text-sm uppercase tracking-widest">${field.label}</p>
                <p class="text-gray-300 text-sm sm:text-lg" id="profile-field-${index}"></p>
            </div>
        </div>
    `).join('');

    const directiveHtml = `
        <div class="mt-4 lg:col-span-2 bg-gray-900/50 p-3 sm:p-4 border border-red-800/50">
            <p class="text-red-500 font-bold text-xs sm:text-sm uppercase tracking-widest">${t.directive.label}</p>
            <p class="text-gray-300 text-sm sm:text-lg mt-2" id="profile-field-directive"></p>
        </div>
    `;

    const socialClassMap = {
        'Twitch': 'social-twitch', 'Twitter/X': 'social-twitter',
        'Instagram': 'social-instagram', 'GitHub': 'social-github',
        'Steam': 'social-steam', 'Last.fm': 'social-lastfm', 'Letterboxd': 'social-letterboxd'
    };

    const socialsHtml = `
        <div class="mt-4 lg:col-span-2 bg-gray-900/50 p-3 sm:p-4 border border-red-800/50">
            <p class="text-red-500 font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">${t.socialsTitle}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                ${staticData.socials.map(social => `
                    <a href="${social.url}" target="_blank" rel="noopener noreferrer"
                       class="social-link ${socialClassMap[social.name] || ''} flex items-center gap-2 sm:gap-3 text-gray-400 bg-gray-800/70 p-2 sm:p-3 border border-transparent">
                        <i class="${social.icon} w-4 sm:w-5 text-center"></i>
                        <div class="min-w-0 flex-1">
                            <p class="font-bold text-white text-xs sm:text-sm truncate">${social.name}</p>
                            <p class="text-xs truncate">${social.user}</p>
                        </div>
                    </a>
                `).join('')}
            </div>
        </div>`;
    
    const setupHtml = `
        <div class="mt-4 lg:col-span-2 bg-gray-900/50 p-3 sm:p-4 border border-red-800/50">
            <p class="text-red-500 font-bold text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4">${t.setupTitle}</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                ${staticData.setup.map((item, index) => `
                    <div class="setup-card flex items-center gap-2 sm:gap-3 bg-gray-800/70 p-2 sm:p-3">
                        <i class="fas ${item.icon} text-red-500 w-4 sm:w-5 text-center"></i>
                        <div class="min-w-0 flex-1">
                            <p class="font-bold text-white text-xs truncate">${t.setup[index].label}</p>
                            <p class="text-xs text-gray-400 truncate">${item.value}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    setTimeout(() => {
        t.fields.forEach((field, index) => {
            const el = document.getElementById(`profile-field-${index}`);
            typeOutText(el, field.value, 30);
        });
        const directiveEl = document.getElementById('profile-field-directive');
        typeOutText(directiveEl, t.directive.value, 20);
    }, 10);

    return `<div class="flex flex-col gap-4">
                <div class="w-full flex flex-col">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">${gridFieldsHtml}</div>
                    ${directiveHtml}
                    ${socialsHtml}
                    ${setupHtml}
                </div>
            </div>`;
}

function renderAffinities(t) {
    let activeCategoryIndex = 0;
    // Lightbox para afinidades (compartilhado com galeria)
    if (!document.getElementById('affinity-lightbox-modal')) {
        const modal = document.createElement('div');
        modal.id = 'affinity-lightbox-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div id="affinity-lightbox-backdrop" style="position:fixed;z-index:50;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;">
                <button id="affinity-lightbox-close" style="position:absolute;top:16px;right:16px;font-size:1.5rem;color:#fff;background:none;border:none;cursor:pointer;z-index:60;">&times;</button>
                <button id="affinity-lightbox-prev" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:2rem;color:#fff;background:none;border:none;cursor:pointer;z-index:60;">&#8592;</button>
                <img id="affinity-lightbox-img" src="" style="max-width:95vw;max-height:70vh;border:4px solid #a00;box-shadow:0 0 32px #a00;object-fit:contain;background:#111;" />
                <button id="affinity-lightbox-next" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:2rem;color:#fff;background:none;border:none;cursor:pointer;z-index:60;">&#8594;</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    // Função para abrir o lightbox de afinidades
    window.openAffinityLightbox = function(idx) {
        const modal = document.getElementById('affinity-lightbox-modal');
        const img = document.getElementById('affinity-lightbox-img');
        const items = staticData.affinities[activeCategoryIndex].items.filter(item => item.image);
        img.src = items[idx].image;
        modal.style.display = 'block';
        modal.setAttribute('data-idx', idx);
        modal.setAttribute('data-cat', activeCategoryIndex);
    };
    // Função para fechar
    window.closeAffinityLightbox = function() {
        document.getElementById('affinity-lightbox-modal').style.display = 'none';
    };
    // Função para navegar
    window.affinityLightboxNav = function(dir) {
        const modal = document.getElementById('affinity-lightbox-modal');
        let idx = parseInt(modal.getAttribute('data-idx'));
        const cat = parseInt(modal.getAttribute('data-cat'));
        const items = staticData.affinities[cat].items.filter(item => item.image);
        idx = (idx + dir + items.length) % items.length;
        document.getElementById('affinity-lightbox-img').src = items[idx].image;
        modal.setAttribute('data-idx', idx);
    };
    // Adicionar listeners (uma vez só)
    setTimeout(() => {
        const modal = document.getElementById('affinity-lightbox-modal');
        if (modal && !modal.hasListeners) {
            modal.hasListeners = true;
            document.getElementById('affinity-lightbox-close').onclick = window.closeAffinityLightbox;
            document.getElementById('affinity-lightbox-backdrop').onclick = (e) => { if (e.target.id === 'affinity-lightbox-backdrop') window.closeAffinityLightbox(); };
            document.getElementById('affinity-lightbox-prev').onclick = (e) => { e.stopPropagation(); window.affinityLightboxNav(-1); };
            document.getElementById('affinity-lightbox-next').onclick = (e) => { e.stopPropagation(); window.affinityLightboxNav(1); };
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'block') {
                    if (e.key === 'Escape') window.closeAffinityLightbox();
                    if (e.key === 'ArrowLeft') window.affinityLightboxNav(-1);
                    if (e.key === 'ArrowRight') window.affinityLightboxNav(1);
                }
            });
        }
    }, 0);

    const renderContent = () => {
        const items = staticData.affinities[activeCategoryIndex].items;
        return items.map((item, idx) => {
            if (item.isEmbed) {
                return `
                    <div class="playlist-card border-2 border-gray-800 bg-gray-900/50" onclick="togglePlaylist(this)">
                        <div class="flex items-center justify-between p-3 sm:p-4 select-none">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-compact-disc text-red-500"></i>
                                <h3 class="text-white text-sm sm:text-base font-bold">${item.name}</h3>
                            </div>
                            <i class="fas fa-chevron-down text-gray-500 playlist-chevron"></i>
                        </div>
                        <div class="playlist-embed hidden px-3 pb-3">
                            <div class="spotify-embed">
                                ${item.embed}
                            </div>
                        </div>
                    </div>
                `;
            } else {
                const skelId = `sk-${activeCategoryIndex}-${idx}`;
                return `
                    <div class="relative group border-2 border-gray-800 hover:border-red-500 transition-colors cursor-pointer overflow-hidden"
                         style="aspect-ratio:2/3;" onclick="openAffinityLightbox(${idx})">
                        <div class="skeleton-box absolute inset-0" id="${skelId}"></div>
                        <img src="${item.image}" alt="${item.name}"
                             class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                             loading="lazy" decoding="async"
                             onload="this.style.opacity='1'; var s=document.getElementById('${skelId}'); if(s) s.style.display='none';" />
                        <div class="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                            <p class="text-white text-xs sm:text-sm font-bold truncate">${item.name}</p>
                            ${item.artist ? `<p class="text-gray-300 text-[10px] sm:text-xs truncate" style="line-height: 1.1;">${item.artist}</p>` : ''}
                        </div>
                    </div>
                `;
            }
        }).join('');
    };
    
    const buttonsHtml = t.categories.map((cat, index) => `
        <button data-index="${index}" class="affinity-cat-button flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm border-b-2 transition-colors duration-200 ${index === 0 ? 'border-red-500 text-white' : 'border-gray-700 text-gray-400 hover:text-white'}">
            <i class="${staticData.affinities[index].icon}"></i>
            <span>${cat.name}</span>
        </button>
    `).join('');
    
    const html = `
        <div>
            <div class="flex flex-wrap gap-x-2 sm:gap-x-4 gap-y-2 mb-4 sm:mb-6">${buttonsHtml}</div>
            <div id="affinities-content" class="${staticData.affinities[activeCategoryIndex].icon === 'fas fa-headphones' ? 'flex flex-col gap-3' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4'}">${renderContent()}</div>
        </div>`;

    setTimeout(() => {
        document.querySelectorAll('.affinity-cat-button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.affinity-cat-button').forEach(btn => {
                    btn.classList.remove('border-red-500', 'text-white');
                    btn.classList.add('border-gray-700', 'text-gray-400', 'hover:text-white');
                });
                button.classList.add('border-red-500', 'text-white');
                button.classList.remove('border-gray-700', 'text-gray-400', 'hover:text-white');
                
                activeCategoryIndex = parseInt(button.dataset.index);
                const container = document.getElementById('affinities-content');
                const isHeadphones = staticData.affinities[activeCategoryIndex].icon === 'fas fa-headphones';
                container.className = isHeadphones 
                    ? 'flex flex-col gap-3' 
                    : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4';
                container.innerHTML = renderContent();
            });
        });
    }, 0);

    return html;
}



// Accordion de playlists
window.togglePlaylist = function(card) {
    const embed   = card.querySelector('.playlist-embed');
    const chevron = card.querySelector('.playlist-chevron');
    const isOpen  = !embed.classList.contains('hidden');

    // Fecha todos
    document.querySelectorAll('.playlist-card').forEach(c => {
        c.querySelector('.playlist-embed').classList.add('hidden');
        c.querySelector('.playlist-chevron').style.transform = '';
        c.classList.remove('border-red-500');
        c.classList.add('border-gray-800');
    });

    // Abre este se estava fechado
    if (!isOpen) {
        embed.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
        card.classList.remove('border-gray-800');
        card.classList.add('border-red-500');
    }
};

function renderRecords(t) {
    const icons = ['fa-microchip', 'fa-fingerprint', 'fa-database', 'fa-satellite-dish', 'fa-memory', 'fa-network-wired', 'fa-bolt'];
    
    const items = t.items.map((item, index) => {
        // Gerar um ID pseudo-aleatório baseado no index para parecer um arquivo do sistema
        const hexId = (index * 37 + 1024).toString(16).toUpperCase().padStart(4, '0');
        const icon = icons[index % icons.length];
        
        return `
        <div class="bg-gray-800/40 border border-gray-800/80 hover:border-red-500/40 p-4 sm:p-5 transition-all duration-300
                    group hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(255,50,50,0.12)] flex flex-col relative overflow-hidden"
             style="opacity:0; animation: recordFadeIn 0.5s ease ${(index * 0.08).toFixed(2)}s forwards;">
            
            <!-- Card Accent Background -->
            <div class="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-red-500/10 transition-colors pointer-events-none"></div>

            <!-- Dossier Header -->
            <div class="flex justify-between items-center mb-3 pb-2 border-b border-gray-700/50 relative z-10">
                <div class="flex items-center gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-red-500/40 group-hover:bg-red-500 group-hover:shadow-[0_0_8px_rgba(255,50,50,0.8)] transition-all"></div>
                    <span class="text-[0.65rem] sm:text-xs font-mono text-gray-500 tracking-wider group-hover:text-red-400/80 transition-colors">LOG_0x${hexId}</span>
                </div>
                <i class="fas ${icon} text-gray-700/50 text-[0.7rem] group-hover:text-red-500/40 transition-colors"></i>
            </div>

            <!-- Content -->
            <p class="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-100 transition-colors relative z-10">
                ${item}
            </p>
        </div>
    `}).join('');

    return `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${items}</div>`;
}

function renderGallery() {
    // Lightbox container (inserido apenas uma vez)
    if (!document.getElementById('lightbox-modal')) {
        const modal = document.createElement('div');
        modal.id = 'lightbox-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div id="lightbox-backdrop" style="position:fixed;z-index:50;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;">
                <button id="lightbox-close" style="position:absolute;top:16px;right:16px;font-size:1.5rem;color:#fff;background:none;border:none;cursor:pointer;z-index:60;">&times;</button>
                <button id="lightbox-prev" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:2rem;color:#fff;background:none;border:none;cursor:pointer;z-index:60;">&#8592;</button>
                <img id="lightbox-img" src="" style="max-width:95vw;max-height:70vh;border:4px solid #a00;box-shadow:0 0 32px #a00;object-fit:contain;background:#111;" />
                <button id="lightbox-next" style="position:absolute;right:16px;top:50%;transform:translateY(-50%);font-size:2rem;color:#fff;background:none;border:none;cursor:pointer;z-index:60;">&#8594;</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Função para abrir o lightbox
    window.openLightbox = function(idx) {
        const modal = document.getElementById('lightbox-modal');
        const img = document.getElementById('lightbox-img');
        img.src = staticData.gallery[idx];
        modal.style.display = 'block';
        modal.setAttribute('data-idx', idx);
    };
    // Função para fechar
    window.closeLightbox = function() {
        document.getElementById('lightbox-modal').style.display = 'none';
    };
    // Função para navegar
    window.lightboxNav = function(dir) {
        const modal = document.getElementById('lightbox-modal');
        let idx = parseInt(modal.getAttribute('data-idx'));
        idx = (idx + dir + staticData.gallery.length) % staticData.gallery.length;
        document.getElementById('lightbox-img').src = staticData.gallery[idx];
        modal.setAttribute('data-idx', idx);
    };
    // Adicionar listeners (uma vez só)
    setTimeout(() => {
        const modal = document.getElementById('lightbox-modal');
        if (modal && !modal.hasListeners) {
            modal.hasListeners = true;
            document.getElementById('lightbox-close').onclick = window.closeLightbox;
            document.getElementById('lightbox-backdrop').onclick = (e) => { if (e.target.id === 'lightbox-backdrop') window.closeLightbox(); };
            document.getElementById('lightbox-prev').onclick = (e) => { e.stopPropagation(); window.lightboxNav(-1); };
            document.getElementById('lightbox-next').onclick = (e) => { e.stopPropagation(); window.lightboxNav(1); };
            document.addEventListener('keydown', (e) => {
                if (modal.style.display === 'block') {
                    if (e.key === 'Escape') window.closeLightbox();
                    if (e.key === 'ArrowLeft') window.lightboxNav(-1);
                    if (e.key === 'ArrowRight') window.lightboxNav(1);
                }
            });
        }
    }, 0);

    // Renderizar galeria com skeleton + aspect-ratio
    return `<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">${staticData.gallery.map((src, idx) => {
        const skelId = `gsk-${idx}`;
        return `<div class="relative border-2 border-gray-800 hover:border-red-500 transition-colors cursor-pointer overflow-hidden"
                    style="aspect-ratio:1/1;" onclick="openLightbox(${idx})">
                    <div class="skeleton-box absolute inset-0" id="${skelId}"></div>
                    <img src="${src}" loading="lazy" decoding="async" alt="Gallery ${idx + 1}"
                         class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500"
                         onload="this.style.opacity='1'; var s=document.getElementById('${skelId}'); if(s) s.style.display='none';" />
               </div>`;
    }).join('')}</div>`;
}

function renderSystemStatus(t) {
    const container = document.getElementById('system-status-container');
    const languagesHtml = t.languages.map((lang, index) => `
        <div>
            <div class="flex justify-between items-center text-gray-400 text-xs sm:text-sm">
                <span>${lang.name}</span>
                <span>${lang.label}</span>
            </div>
            <div class="w-full bg-gray-800 border border-gray-700 h-1 sm:h-2 mt-1">
                <div class="bg-red-600 h-full" style="width: ${staticData.languageLevels[index]};"></div>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div class="border-t-2 border-red-900/50 pt-3 sm:pt-4 mt-3 sm:mt-4">
            <h3 class="text-base sm:text-lg text-red-500 text-glow mb-2 sm:mb-3">${t.title}</h3>
            <div class="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div>
                    <p class="text-gray-400 mb-1.5">${t.chaos}:</p>
                    <div class="flex gap-1 sm:gap-1.5 justify-center items-center py-1 bg-gray-900/50 rounded border border-gray-800" id="chaos-emeralds">
                        <div class="emerald emerald-green cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                        <div class="emerald emerald-red cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                        <div class="emerald emerald-blue cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                        <div class="emerald emerald-yellow cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                        <div class="emerald emerald-purple cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                        <div class="emerald emerald-cyan cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                        <div class="emerald emerald-white cursor-pointer hover:scale-110" onclick="window.activateEmerald(this)"></div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-gray-400">${t.connection}:</p>
                    <div class="flex items-center gap-1 sm:gap-2">
                        <span class="text-green-400 text-xs sm:text-sm">STABLE</span>
                        <div class="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-gray-400">${t.sync}:</p>
                    <p id="sync-time" class="text-gray-300 text-xs sm:text-sm"></p>
                </div>
                <div class="pt-2">
                     <h4 class="text-sm sm:text-md text-red-500 mb-2">${t.languagesTitle}</h4>
                     <div class="space-y-1.5 sm:space-y-2">${languagesHtml}</div>
                </div>
            </div>
        </div>`;
    
    // Minigame das esmeraldas (ativadas por clique)
    window.activateEmerald = function(el) {
        if(el.classList.contains('active')) return;
        el.classList.add('active');
        
        const allEmeralds = document.querySelectorAll('.emerald');
        const activeEmeralds = document.querySelectorAll('.emerald.active');
        
        if(activeEmeralds.length === allEmeralds.length) {
            const containerEl = document.getElementById('chaos-emeralds');
            if(containerEl) containerEl.classList.add('emeralds-charged');
            
            // Trigger easter egg
            if(typeof window.triggerEasterEgg === 'function') {
                setTimeout(window.triggerEasterEgg, 500); // 500ms delay for dramatic effect
            }
        }
    };
} 
