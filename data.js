// --- DADOS ESTÁTICOS (NÃO TRADUZÍVEIS) ---
// Usa os arquivos publicados pelo proprio GitHub Pages. Assim as imagens
// atualizam junto com o site e tambem podem ser armazenadas pelo service worker.
const CDN_BASE = '.';

export const staticData = {
    socials: [
        { name: "Twitch", user: "zippedsz", url: "https://www.twitch.tv/zippedsz", icon: "fab fa-twitch" },
        { name: "Twitter/X", user: "zippeed", url: "https://x.com/Zippeed", icon: "fab fa-x-twitter" },
        { name: "Instagram", user: "zippedsz", url: "https://www.instagram.com/zippedsz/", icon: "fab fa-instagram" },
        { name: "GitHub", user: "zippeed", url: "https://github.com/Zippeed", icon: "fab fa-github" },
        { name: "Steam", user: "♥ Zipped", url: "https://steamcommunity.com/id/ShadowZipped/", icon: "fab fa-steam" },
        { name: "Last.fm", user: "Zippeed", url: "https://www.last.fm/pt/user/Zippeed", icon: "fab fa-lastfm" },
        { name: "Letterboxd", user: "Zippeed", url: "https://letterboxd.com/Zippeed/", icon: "fas fa-ticket" }
    ],
    affinities: [
        { icon: "fas fa-gamepad", items: [
            { name: "NieR: Automata", image: `${CDN_BASE}/imagens/games/nier-automata.webp` },
            { name: "Cyberpunk 2077", image: `${CDN_BASE}/imagens/games/cyberpunk.webp` },
            { name: "Life is Strange", image: `${CDN_BASE}/imagens/games/life-is-strange.webp` },
            { name: "OneShot", image: `${CDN_BASE}/imagens/games/oneshot.webp` },
            { name: "Outer Wilds", image: `${CDN_BASE}/imagens/games/outer-wilds.webp` },
            { name: "Clair Obscur: Expedition 33", image: `${CDN_BASE}/imagens/games/expedition-33.webp` },
            { name: "If Found...", image: `${CDN_BASE}/imagens/games/if-found.webp` },
            { name: "What Remains of Edith Finch", image: `${CDN_BASE}/imagens/games/edith-finch.webp` },
            { name: "Life is Strange 2", image: `${CDN_BASE}/imagens/games/life-is-strange-2.webp` },
            { name: "Life is Strange: Before the Storm", image: `${CDN_BASE}/imagens/games/before-the-storm.webp` }
        ]},
        { icon: "fas fa-tv", items: [
            { name: "Arcane", image: `${CDN_BASE}/imagens/series/arcane.webp` },
            { name: "Hazbin Hotel", image: `${CDN_BASE}/imagens/series/hazbin-hotel.webp` },
            { name: "Helluva Boss", image: `${CDN_BASE}/imagens/series/helluva-boss.webp` },
            { name: "Rick and Morty", image: `${CDN_BASE}/imagens/series/rick-morty.webp` },
            { name: "Smiling Friends", image: `${CDN_BASE}/imagens/series/smiling-friends.webp` },
            { name: "Dr. House", image: `${CDN_BASE}/imagens/series/house.webp` },
            { name: "The Mentalist", image: `${CDN_BASE}/imagens/series/the-mentalist.webp` }
        ]},
        { icon: "fas fa-film", items: [
            { name: "Blade Runner 2049", image: `${CDN_BASE}/imagens/movies/blade-runner2049.webp` },
            { name: "Eternal Sunshine", image: `${CDN_BASE}/imagens/movies/eternal-sunshine.webp` },
            { name: "La La Land", image: `${CDN_BASE}/imagens/movies/la-la-land.webp` },
            { name: "The Batman", image: `${CDN_BASE}/imagens/movies/batman.webp` },
            { name: "Look Back", image: `${CDN_BASE}/imagens/movies/look-back.webp` },
            { name: "The Wild Robot", image: `${CDN_BASE}/imagens/movies/wild-robot.webp` },
            { name: "The Perks of Being a Wallflower", image: `${CDN_BASE}/imagens/movies/perks-of-being-a-wallflower.webp` }
        ]},
        { icon: "fas fa-shield-halved", items: [
            { name: "Cyberpunk: Edgerunners", image: `${CDN_BASE}/imagens/animes/edgerunners.webp` },
            { name: "Cowboy Bebop", image: `${CDN_BASE}/imagens/animes/cowboy-bebop.webp` },
            { name: "JoJo's Bizarre Adventure", image: `${CDN_BASE}/imagens/animes/jojo.webp` },
            { name: "Monster", image: `${CDN_BASE}/imagens/animes/monster.webp` },
            { name: "Beastars", image: `${CDN_BASE}/imagens/animes/beastars.webp` },
            { name: "Mob Psycho 100", image: `${CDN_BASE}/imagens/animes/mob-psycho-100.webp` }
        ]},
        { icon: "fas fa-book-open", items: [
            { name: "Bungou Stray Dogs", image: `${CDN_BASE}/imagens/manga/bsd.webp` },
            { name: "Fire Force", image: `${CDN_BASE}/imagens/manga/fire-force.webp` },
            { name: "Soul Eater", image: `${CDN_BASE}/imagens/manga/soul-eater.webp` },
            { name: "Tokyo Ghoul", image: `${CDN_BASE}/imagens/manga/tokyo-ghoul.webp` },
            { name: "Goodnight Punpun", image: `${CDN_BASE}/imagens/manga/punpun.webp` },
            { name: "Tokyo Ghoul:re", image: `${CDN_BASE}/imagens/manga/tokyo-ghoul-re.webp` },
            { name: "Monster", image: `${CDN_BASE}/imagens/manga/monster.webp` }
        ]},
        { icon: "fas fa-book", items: [
            { name: "Solo Leveling", image: `${CDN_BASE}/imagens/manhwa/solo-leveling.webp` },
            { name: "Omniscient Reader", image: `${CDN_BASE}/imagens/manhwa/orv.webp` },
            { name: "The Beginning After The End", image: `${CDN_BASE}/imagens/manhwa/tbate.webp` },
            { name: "Tower of God", image: `${CDN_BASE}/imagens/manhwa/tog.webp` },
            { name: "Eleceed", image: `${CDN_BASE}/imagens/manhwa/eleceed.webp` }
        ]},
        { icon: "fas fa-user-ninja", items: [
            { name: "Shadow the Hedgehog", artist: "Sonic the Hedgehog", image: `${CDN_BASE}/imagens/characters/shadow.webp` },
            { name: "Kaneki Ken", artist: "Tokyo Ghoul", image: `${CDN_BASE}/imagens/characters/kaneki.webp` },
            { name: "Dazai Osamu", artist: "Bungou Stray Dogs", image: `${CDN_BASE}/imagens/characters/dazai.webp` },
            { name: "Moxxie", artist: "Helluva Boss", image: `${CDN_BASE}/imagens/characters/moxxie.webp` },
            { name: "Death", artist: "DC (Sandman)", image: `${CDN_BASE}/imagens/characters/morte.webp` },
            { name: "2B", artist: "NieR: Automata", image: `${CDN_BASE}/imagens/characters/2b.webp` },
            { name: "Touka Kirishima", artist: "Tokyo Ghoul", image: `${CDN_BASE}/imagens/characters/touka.webp` },
            { name: "Beatrix / Bunlith", artist: "It’s Bunlith! The Witch Upstairs", image: `${CDN_BASE}/imagens/characters/beatrix-bunlith.webp` }
        ]},
        { icon: "fas fa-music", items: [
            { name: "Die For You", artist: "Joji", image: `${CDN_BASE}/imagens/albums/DieForYou.webp` },
            { name: "Duvet", artist: "bôa", image: `${CDN_BASE}/imagens/albums/Duvet.webp` },
            { name: "Fake Plastic Trees", artist: "Radiohead", image: `${CDN_BASE}/imagens/albums/FakePlasticTrees.webp` },
            { name: "Falling Down", artist: "Lil Peep", image: `${CDN_BASE}/imagens/albums/FallingDown.webp` },
            { name: "Glimpse of Us", artist: "Joji", image: `${CDN_BASE}/imagens/albums/GlimpseOfUs.webp` },
            { name: "Gunslinger", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/Gunslinger.webp` },
            { name: "Hail to the King", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/HailToTheKing.webp` },
            { name: "Let Down", artist: "Radiohead", image: `${CDN_BASE}/imagens/albums/LetDown.webp` },
            { name: "Loser Baby", artist: "Hazbin Hotel", image: `${CDN_BASE}/imagens/albums/LoserBaby.webp` },
            { name: "Never Fade Away", artist: "SAMURAI", image: `${CDN_BASE}/imagens/albums/NeverFadeAway.webp` },
            { name: "No Surprises", artist: "Radiohead", image: `${CDN_BASE}/imagens/albums/NoSurprises.webp` },
            { name: "Poison", artist: "Hazbin Hotel", image: `${CDN_BASE}/imagens/albums/Poison.webp` },
            { name: "Reflection", artist: "The Neighbourhood", image: `${CDN_BASE}/imagens/albums/Reflection.webp` },
            { name: "Slow Dancing", artist: "Joji", image: `${CDN_BASE}/imagens/albums/SlowDancing.webp` },
            { name: "So Far Away", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/SoFarAway.webp` },
            { name: "Teenagers", artist: "My Chemical Romance", image: `${CDN_BASE}/imagens/albums/Teenagers.webp` },
            { name: "Fiction", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/Fiction.webp` },
            { name: "Asleep", artist: "The Smiths", image: `${CDN_BASE}/imagens/albums/Asleep.webp` },
            { name: "Heroes", artist: "David Bowie", image: `${CDN_BASE}/imagens/albums/Heroes.webp` },
            { name: "Could It Be Another Change", artist: "The Samples", image: `${CDN_BASE}/imagens/albums/CouldItBeAnotherChange.webp` }
        ]},
        { icon: "fas fa-headphones", items: [
            { 
                name: "Feel the Feeling", 
                embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/5v25aEyBXI7UvsfY8ceWd6?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            },
            { 
                name: "Finally I can rest", 
                embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/3xJGrkzuxi97bsrfeSMZRs?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            },
            { 
                name: "I'm vengeance", 
                embed: '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4qgbAHN8xzuBdxswRinFuB?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            },
            { 
                name: "Saddest musics of all time", 
                embed: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0iqeXmwNCoIfgTDsVtZIFo?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            },
            { 
                name: "turning to ashes", 
                embed: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/057RufGmOlvTHoEbOZ6YHB?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            },
            { 
                name: "Soundtracks", 
                embed: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0vVGNOYEcdgVp2sXbteyYO?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            },
            { 
                name: "I will never be happy", 
                embed: '<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/5DaygxyL2lbFIhD44bDdFE?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
                isEmbed: true
            }
        ]}
    ],
    gallery: [
        `${CDN_BASE}/imagens/gallery/gallery1.webp`,
        `${CDN_BASE}/imagens/gallery/gallery2.webp`,
        `${CDN_BASE}/imagens/gallery/gallery3.webp`,
        `${CDN_BASE}/imagens/gallery/gallery4.webp`,
        `${CDN_BASE}/imagens/gallery/gallery5.webp`,
        `${CDN_BASE}/imagens/gallery/gallery6.webp`,
        `${CDN_BASE}/imagens/gallery/gallery7.webp`,
        `${CDN_BASE}/imagens/gallery/gallery8.webp`,
        `${CDN_BASE}/imagens/gallery/gallery9.webp`,
        `${CDN_BASE}/imagens/gallery/gallery10.webp`,
        `${CDN_BASE}/imagens/gallery/gallery11.webp`,
        `${CDN_BASE}/imagens/gallery/gallery12.webp`
    ],
    menuIcons: { profile: "fas fa-user", affinities: "fas fa-heart", records: "fas fa-book-open", gallery: "fas fa-image" },
    languageLevels: [ "100%", "60%", "30%" ],
    setup: [
        { value: "AMD Ryzen 7 5700X", icon: "fas fa-microchip" },
        { value: "NVIDIA GeForce RTX 3060 12GB ZOTAC", icon: "fas fa-gamepad" },
        { value: "2x8GB DDR4 3200MHz", icon: "fas fa-memory" },
        { value: "K86 Attack Shark", icon: "fas fa-keyboard" },
        { value: "Rapoo VT0 Air MAX", icon: "fas fa-mouse" },
        { value: "BASEUS GH02", icon: "fas fa-headset" },
        { value: "Fifine A6T", icon: "fas fa-microphone" },
        { value: "2x LG UltraGear 180Hz", icon: "fas fa-desktop" },
        { value: "HyperX FURY S (Speed Edition) XL", icon: "fas fa-mouse-pointer" },
    ]
};

// Dados de tradução
export const languageData = {
    pt: {
        profile: {
            title: "Painel de Dados: Zipped",
            fields: [
                { label: "Idade", value: "22 Anos", icon: "fa-birthday-cake" },
                { label: "Gênero", value: "Secret", icon: "fa-venus-mars" },
                { label: "Sexualidade", value: "Secret", icon: "fa-heart" },
                { label: "Localização", value: "Brasil", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "Diretiva Principal",
                value: "Olá! Sou Zipped, estudo Ciência da Computação e trabalho com DataOps. Amo tecnologia, jogos e boas histórias; meu jogo favorito é Cyberpunk 2077. Adoro conversar sobre qualquer coisa e descobrir novas músicas, filmes, mangás e manhwas. Entre os estudos e o trabalho, sobra pouco tempo para jogar, mas, se quiser jogar comigo ou só trocar uma ideia, é só me chamar."
            },
            quote: {
                text: "Todos esses momentos se perderão no tempo, como lágrimas na chuva.",
                attribution: "Roy Batty — Blade Runner (1982)"
            },
            socialsTitle: "Canais de Comunicação",
            featuredTitle: "Foco Atual",
            featured: {
                title: "Shadow the Hedgehog",
                subtitle: "The Ultimate Lifeform",
                description: "I am the shadow that protects this world. I am the ultimate life form."
            },
            setupTitle: "Arsenal / Setup",
            setup: [
                { label: "CPU" },
                { label: "GPU" },
                { label: "RAM" },
                { label: "Teclado" },
                { label: "Mouse" },
                { label: "Headset" },
                { label: "Microfone" },
                { label: "Monitor" },
                { label: "Mousepad" }
            ]
        },
        affinities: {
            title: "Logs de Dados: Afinidades",
            categories: [
                { name: "Jogos" },
                { name: "Séries" },
                { name: "Filmes" },
                { name: "Animes" },
                { name: "Mangás" },
                { name: "Manhwas" },
                { name: "Personagens" },
                { name: "Músicas" },
                { name: "Playlists" }
            ]
        },
        records: {
            title: "Registros Pessoais",
            items: [
                "Eu amo o Shadow",
                "Meus shipps favoritos são Sonadow, Huskerdust e M&M (Millie e Moxxie)",
                "Amo Helluva Boss e Hazbin Hotel",
                "Minha música favorita de Helluva Boss é 'Just Look My Way' e de Hazbin Hotel é 'Loser, Baby'",
                "Tenho uma action figure do Kaneki Kakuja",
                "Sou viciado em ler mangás e manhwas"
            ]
        },
        gallery: {
            title: "Banco de Memória Visual"
        },
        menu: {
            profile: "Painel",
            affinities: "Afinidades",
            records: "Registros",
            gallery: "Galeria"
        },
        status: {
            title: "Status do Sistema",
            chaos: "Energia Chaos",
            connection: "Conexão",
            sync: "Última Sinc.",
            languagesTitle: "Protocolos de Idioma",
            languages: [
                { name: "Português", label: "Nativo" },
                { name: "Inglês", label: "Intermediário" },
                { name: "Espanhol", label: "Básico" }
            ]
        }
    },
    en: {
        profile: {
            title: "Data Dashboard: Zipped",
            fields: [
                { label: "Age", value: "22 Years", icon: "fa-birthday-cake" },
                { label: "Gender", value: "Secret", icon: "fa-venus-mars" },
                { label: "Sexuality", value: "Secret", icon: "fa-heart" },
                { label: "Location", value: "Brazil", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "Main Directive",
                value: "Hi! I'm Zipped, a Computer Science student working in DataOps. I love technology, games and good stories; my favorite game is Cyberpunk 2077. I enjoy talking about anything and discovering new music, movies, manga and manhwa. Between studying and working, I have little time to play, but if you want to join me for a game or just chat, feel free to reach out."
            },
            quote: {
                text: "All those moments will be lost in time, like tears in rain.",
                attribution: "Roy Batty — Blade Runner (1982)"
            },
            socialsTitle: "Communication Channels",
            featuredTitle: "Current Focus",
            featured: {
                title: "Shadow the Hedgehog",
                subtitle: "The Ultimate Lifeform",
                description: "I am the shadow that protects this world. I am the ultimate life form."
            },
            setupTitle: "Arsenal / Setup",
            setup: [
                { label: "CPU" },
                { label: "GPU" },
                { label: "RAM" },
                { label: "Keyboard" },
                { label: "Mouse" },
                { label: "Headset" },
                { label: "Microphone" },
                { label: "Monitor" },
                { label: "Mousepad" }
            ]
        },
        affinities: {
            title: "Data Logs: Affinities",
            categories: [
                { name: "Games" },
                { name: "Series" },
                { name: "Movies" },
                { name: "Animes" },
                { name: "Mangas" },
                { name: "Manhwas" },
                { name: "Characters" },
                { name: "Music" },
                { name: "Playlists" }
            ]
        },
        records: {
            title: "Personal Logs",
            items: [
                "I love Shadow",
                "My favorite ships are Sonadow, Huskerdust, and M&M (Millie and Moxxie)",
                "I love Helluva Boss and Hazbin Hotel",
                "My favorite Helluva Boss song is 'Just Look My Way' and from Hazbin Hotel is 'Loser, Baby'",
                "I have a Kaneki Kakuja action figure",
                "I'm addicted to reading manga and manhwas"
            ]
        },
        gallery: {
            title: "Visual Memory Bank"
        },
        menu: {
            profile: "Dashboard",
            affinities: "Affinities",
            records: "Records",
            gallery: "Gallery"
        },
        status: {
            title: "System Status",
            chaos: "Chaos Energy",
            connection: "Connection",
            sync: "Last Sync",
            languagesTitle: "Language Protocols",
            languages: [
                { name: "Portuguese", label: "Native" },
                { name: "English", label: "Intermediate" },
                { name: "Spanish", label: "Basic" }
            ]
        }
    },
    es: {
        profile: {
            title: "Panel de Datos: Zipped",
            fields: [
                { label: "Edad", value: "22 Años", icon: "fa-birthday-cake" },
                { label: "Género", value: "Secret", icon: "fa-venus-mars" },
                { label: "Sexualidad", value: "Secret", icon: "fa-heart" },
                { label: "Ubicación", value: "Brasil", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "Directiva Principal",
                value: "¡Hola! Soy Zipped, estudio Ciencias de la Computación y trabajo en DataOps. Me encantan la tecnología, los videojuegos y las buenas historias; mi juego favorito es Cyberpunk 2077. Disfruto conversar de cualquier cosa y descubrir música, películas, mangas y manhwas. Entre los estudios y el trabajo me queda poco tiempo para jugar, pero, si quieres jugar conmigo o simplemente charlar, escríbeme."
            },
            quote: {
                text: "Todos esos momentos se perderán en el tiempo, como lágrimas en la lluvia.",
                attribution: "Roy Batty — Blade Runner (1982)"
            },
            socialsTitle: "Canales de Comunicación",
            featuredTitle: "Enfoque Actual",
            featured: {
                title: "Shadow the Hedgehog",
                subtitle: "La Forma de Vida Definitiva",
                description: "I am the shadow that protects this world. I am the ultimate life form."
            },
            setupTitle: "Arsenal / Configuración",
            setup: [
                { label: "CPU" },
                { label: "GPU" },
                { label: "RAM" },
                { label: "Teclado" },
                { label: "Ratón" },
                { label: "Auriculares" },
                { label: "Micrófono" },
                { label: "Monitor" },
                { label: "Alfombrilla" }
            ]
        },
        affinities: {
            title: "Registros de Datos: Afinidades",
            categories: [
                { name: "Juegos" },
                { name: "Series" },
                { name: "Películas" },
                { name: "Animes" },
                { name: "Mangas" },
                { name: "Manhwas" },
                { name: "Personajes" },
                { name: "Música" },
                { name: "Playlists" }
            ]
        },
        records: {
            title: "Registros Personales",
            items: [
                "Tengo más de 10k horas en Counter-Strike y Fortnite cada uno",
                "Mi primera consola fue una PlayStation 2",
                "Prefiero juegos con narrativas profundas que me conmuevan emocionalmente",
                "Oyente asiduo de rock alternativo",
                "A veces escucho la misma canción durante días",
                "Tengo una guitarra y estoy aprendiendo a tocar, también quiero aprender batería",
                "Amo Helluva Boss y Hazbin Hotel",
                "Mis personajes favoritos son Moxxie, Millie, Stolas, Husk y Angel Dust",
                "Mi canción favorita de Helluva Boss es 'Just Look My Way' y de Hazbin Hotel es 'Loser, Baby'",
                "Soy adicto a leer mangas y manhwas",
                "Tengo la colección completa de Tokyo Ghoul y Bungou Stray Dogs",
                "Tengo una figura de acción de Kaneki Kakuja",
                "El pasado no me define.",
                "Yo decido mi propio camino.",
                "A veces, es necesario destruir para crear algo nuevo.",
                "No necesito amigos, pero no los rechazaré.",
                "El poder supremo es una carga."
            ]
        },
        gallery: {
            title: "Banco de Memoria Visual"
        },
        menu: {
            profile: "Panel",
            affinities: "Afinidades",
            records: "Registros",
            gallery: "Galería"
        },
        status: {
            title: "Estado del Sistema",
            chaos: "Energía Chaos",
            connection: "Conexión",
            sync: "Última Sinc.",
            languagesTitle: "Protocolos de Idioma",
            languages: [
                { name: "Portugués", label: "Nativo" },
                { name: "Inglés", label: "Intermedio" },
                { name: "Español", label: "Básico" }
            ]
        }
    },
    ja: {
        profile: {
            title: "データダッシュボード: Zipped",
            fields: [
                { label: "年齢", value: "22歳", icon: "fa-birthday-cake" },
                { label: "性別", value: "Secret", icon: "fa-venus-mars" },
                { label: "セクシュアリティ", value: "Secret", icon: "fa-heart" },
                { label: "場所", value: "ブラジル", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "主な指令",
                value: "こんにちは！Zippedです。大学でコンピュータサイエンスを学びながら、DataOpsの仕事をしています。テクノロジー、ゲーム、心に残る物語が大好きで、一番好きなゲームはCyberpunk 2077です。いろいろな話をしたり、新しい音楽や映画、マンガ、マンファに出会うのが好きです。勉強と仕事でゲームの時間は少なめですが、一緒に遊びたいときや話したいときは、気軽に声をかけてください。"
            },
            quote: {
                text: "そうした瞬間はすべて、時の中に消えてしまう。雨の中の涙のように。",
                attribution: "Roy Batty — Blade Runner (1982)"
            },
            socialsTitle: "通信チャネル",
            featuredTitle: "現在の焦点",
            featured: {
                title: "シャドウ・ザ・ヘッジホッグ",
                subtitle: "究極生命体",
                description: "I am the shadow that protects this world. I am the ultimate life form."
            },
            setupTitle: "アーセナル / セットアップ",
            setup: [
                { label: "CPU" },
                { label: "GPU" },
                { label: "RAM" },
                { label: "キーボード" },
                { label: "マウス" },
                { label: "ヘッドセット" },
                { label: "マイク" },
                { label: "モニター" },
                { label: "マウスパッド" }
            ]
        },
        affinities: {
            title: "データログ：親和性",
            categories: [
                { name: "ゲーム" },
                { name: "シリーズ" },
                { name: "映画" },
                { name: "アニメ" },
                { name: "漫画" },
                { name: "ウェブトゥーン" },
                { name: "キャラクター" },
                { name: "音楽" },
                { name: "プレイリスト" }
            ]
        },
        records: {
            title: "個人的な記録",
            items: [
                "Counter-StrikeとFortniteでそれぞれ1万時間以上プレイしています",
                "最初のコンソールはPlayStation 2でした",
                "感情に訴える深い物語のあるゲームが好きです",
                "オルタナティブロックの熱心なリスナーです",
                "同じ曲を何日も繰り返し聴くことがあります",
                "ギターを持っていて、演奏を学んでいます。ドラムも学びたいです",
                "Helluva BossとHazbin Hotelが大好きです",
                "お気に入りのキャラクターはモクシー、ミリー、ストラス、ハスク、エンジェルダストです",
                "Helluva Bossで一番好きな曲は「Just Look My Way」、Hazbin Hotelでは「Loser, Baby」です",
                "マンガとマンファを読むのが大好きです",
                "東京喰種と文豪ストレイドッグスの全巻を持っています",
                "カネキカクジャのアクションフィギュアを持っています",
                "過去は私を定義しない。",
                "自分の道は自分で決める。",
                "時には、新しいものを創造するために破壊しなければならない。",
                "友達は必要ないが、拒絶はしない。",
                "究極の力は負担だ。"
            ]
        },
        gallery: {
            title: "視覚的記憶バンク"
        },
        menu: {
            profile: "パネル",
            affinities: "好み",
            records: "記録",
            gallery: "ギャラリー"
        },
        status: {
            title: "システムステータス",
            chaos: "カオスエネルギー",
            connection: "接続",
            sync: "最終同期",
            languagesTitle: "言語プロトコル",
            languages: [
                { name: "ポルトガル語", label: "ネイティブ" },
                { name: "英語", label: "中級" },
                { name: "スペイン語", label: "初級" }
            ]
        }
    }
}; 
