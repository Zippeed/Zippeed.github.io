// --- DADOS ESTÁTICOS (NÃO TRADUZÍVEIS) ---
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/Zippeed/Zippeed.github.io@main';

const staticData = {
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
            { name: "NieR: Automata", image: `${CDN_BASE}/imagens/games/nier-automata.jpg` },
            { name: "Cyberpunk 2077", image: `${CDN_BASE}/imagens/games/cyberpunk.jpg` },
            { name: "Life is Strange", image: `${CDN_BASE}/imagens/games/life-is-strange.jpg` },
            { name: "OneShot", image: `${CDN_BASE}/imagens/games/oneshot.jpg` },
            { name: "Outer Wilds", image: `${CDN_BASE}/imagens/games/outer-wilds.jpg` }
        ]},
        { icon: "fas fa-tv", items: [
            { name: "Arcane", image: `${CDN_BASE}/imagens/series/arcane.jpg` },
            { name: "Hazbin Hotel", image: `${CDN_BASE}/imagens/series/hazbin-hotel.jpg` },
            { name: "Helluva Boss", image: `${CDN_BASE}/imagens/series/helluva-boss.jpg` },
            { name: "Rick and Morty", image: `${CDN_BASE}/imagens/series/rick-morty.jpg` },
            { name: "Smiling Friends", image: `${CDN_BASE}/imagens/series/smiling-friends.jpg` }
        ]},
        { icon: "fas fa-film", items: [
            { name: "Blade Runner 2049", image: `${CDN_BASE}/imagens/movies/blade-runner2049.jpg` },
            { name: "Eternal Sunshine", image: `${CDN_BASE}/imagens/movies/eternal-sunshine.jpg` },
            { name: "La La Land", image: `${CDN_BASE}/imagens/movies/la-la-land.jpg` },
            { name: "The Batman", image: `${CDN_BASE}/imagens/movies/batman.jpg` },
            { name: "Look Back", image: `${CDN_BASE}/imagens/movies/look-back.jpg` },
            { name: "The Wild Robot", image: `${CDN_BASE}/imagens/movies/wild-robot.jpg` }
        ]},
        { icon: "fas fa-shield-halved", items: [
            { name: "Cyberpunk: Edgerunners", image: `${CDN_BASE}/imagens/animes/edgerunners.jpg` },
            { name: "Cowboy Bebop", image: `${CDN_BASE}/imagens/animes/cowboy-bebop.jpg` },
            { name: "JoJo's Bizarre Adventure", image: `${CDN_BASE}/imagens/animes/jojo.jpg` },
            { name: "Monster", image: `${CDN_BASE}/imagens/animes/monster.jpg` },
            { name: "Beastars", image: `${CDN_BASE}/imagens/animes/beastars.jpg` }
        ]},
        { icon: "fas fa-book-open", items: [
            { name: "Bungou Stray Dogs", image: `${CDN_BASE}/imagens/manga/bsd.jpg` },
            { name: "Fire Force", image: `${CDN_BASE}/imagens/manga/fire-force.jpg` },
            { name: "Soul Eater", image: `${CDN_BASE}/imagens/manga/soul-eater.jpg` },
            { name: "Tokyo Ghoul", image: `${CDN_BASE}/imagens/manga/tokyo-ghoul.jpg` },
            { name: "Goodnight Punpun", image: `${CDN_BASE}/imagens/manga/punpun.jpg` }
        ]},
        { icon: "fas fa-book", items: [
            { name: "Solo Leveling", image: `${CDN_BASE}/imagens/manhwa/solo-leveling.jpg` },
            { name: "Omniscient Reader", image: `${CDN_BASE}/imagens/manhwa/orv.jpg` },
            { name: "The Beginning After The End", image: `${CDN_BASE}/imagens/manhwa/tbate.jpg` },
            { name: "Tower of God", image: `${CDN_BASE}/imagens/manhwa/tog.jpg` },
            { name: "Eleceed", image: `${CDN_BASE}/imagens/manhwa/eleceed.jpg` }
        ]},
        { icon: "fas fa-user-ninja", items: [
            { name: "Shadow the Hedgehog", artist: "Sonic the Hedgehog", image: `${CDN_BASE}/imagens/characters/shadow.jpg` },
            { name: "Kaneki Ken", artist: "Tokyo Ghoul", image: `${CDN_BASE}/imagens/characters/kaneki.jpg` },
            { name: "Dazai Osamu", artist: "Bungou Stray Dogs", image: `${CDN_BASE}/imagens/characters/dazai.jpg` },
            { name: "Moxxie", artist: "Helluva Boss", image: `${CDN_BASE}/imagens/characters/moxxie.jpg` },
            { name: "Death", artist: "DC (Sandman)", image: `${CDN_BASE}/imagens/characters/morte.jpg` }
        ]},
        { icon: "fas fa-music", items: [
            { name: "Die For You", artist: "Joji", image: `${CDN_BASE}/imagens/albums/DieForYou.jpg` },
            { name: "Duvet", artist: "bôa", image: `${CDN_BASE}/imagens/albums/Duvet.jpg` },
            { name: "Fake Plastic Trees", artist: "Radiohead", image: `${CDN_BASE}/imagens/albums/FakePlasticTrees.jpg` },
            { name: "Falling Down", artist: "Lil Peep", image: `${CDN_BASE}/imagens/albums/FallingDown.jpg` },
            { name: "Glimpse of Us", artist: "Joji", image: `${CDN_BASE}/imagens/albums/GlimpseOfUs.jpg` },
            { name: "Gunslinger", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/Gunslinger.jpg` },
            { name: "Hail to the King", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/HailToTheKing.jpg` },
            { name: "Let Down", artist: "Radiohead", image: `${CDN_BASE}/imagens/albums/LetDown.jpg` },
            { name: "Loser Baby", artist: "Hazbin Hotel", image: `${CDN_BASE}/imagens/albums/LoserBaby.jpg` },
            { name: "Never Fade Away", artist: "SAMURAI", image: `${CDN_BASE}/imagens/albums/NeverFadeAway.jpg` },
            { name: "No Surprises", artist: "Radiohead", image: `${CDN_BASE}/imagens/albums/NoSurprises.jpg` },
            { name: "Poison", artist: "Hazbin Hotel", image: `${CDN_BASE}/imagens/albums/Poison.jpg` },
            { name: "Reflection", artist: "The Neighbourhood", image: `${CDN_BASE}/imagens/albums/Reflection.jpg` },
            { name: "Slow Dancing", artist: "Joji", image: `${CDN_BASE}/imagens/albums/SlowDancing.jpg` },
            { name: "So Far Away", artist: "Avenged Sevenfold", image: `${CDN_BASE}/imagens/albums/SoFarAway.jpg` },
            { name: "Teenagers", artist: "My Chemical Romance", image: `${CDN_BASE}/imagens/albums/Teenagers.jpg` }
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
        `${CDN_BASE}/imagens/gallery/gallery1.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery2.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery3.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery4.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery5.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery6.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery7.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery8.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery9.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery10.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery11.jpg`,
        `${CDN_BASE}/imagens/gallery/gallery12.jpg`
    ],
    menuIcons: { profile: "fas fa-user", affinities: "fas fa-heart", records: "fas fa-book-open", gallery: "fas fa-image" },
    languageLevels: [ "100%", "60%", "30%" ],
    featuredImage: `${CDN_BASE}/imagens/shadowfocus.png`,
    setup: [
        { value: "AMD Ryzen 7 5700X", icon: "fas fa-microchip" },
        { value: "NVIDIA GeForce RTX 3060 12GB ZOTAC", icon: "fas fa-gamepad" },
        { value: "2x8GB DDR4 3200MHz", icon: "fas fa-memory" },
        { value: "K86 Attack Shark", icon: "fas fa-keyboard" },
        { value: "Delux M900 Pro", icon: "fas fa-mouse" },
        { value: "BASEUS GH02", icon: "fas fa-headset" },
        { value: "Fifine A6T", icon: "fas fa-microphone" },
        { value: "2x LG UltraGear 180Hz", icon: "fas fa-desktop" },
        { value: "HyperX FURY S (Speed Edition) XL", icon: "fas fa-mouse-pointer" },
    ]
};

// Dados de tradução
const languageData = {
    pt: {
        profile: {
            title: "Painel de Dados: Zipped",
            fields: [
                { label: "Idade", value: "21 Anos", icon: "fa-birthday-cake" },
                { label: "Gênero", value: "Gênero Fluido", icon: "fa-venus-mars" },
                { label: "Sexualidade", value: "Pansexual", icon: "fa-heart" },
                { label: "Localização", value: "Brasil", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "Diretiva Principal",
                value: "Olá! Sou Zipped, amo tecnologias e jogos. Adoro conversar sobre qualquer coisa, atualmente estou estudando, trabalhando e jogando bem pouco mas se quiser jogar comigo é só me chamar."
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
                { label: "Age", value: "21 Years", icon: "fa-birthday-cake" },
                { label: "Gender", value: "Genderfluid", icon: "fa-venus-mars" },
                { label: "Sexuality", value: "Pansexual", icon: "fa-heart" },
                { label: "Location", value: "Brazil", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "Main Directive",
                value: "Hi! I'm Zipped, I love technology and games. I love to talk about anything, currently I'm studying, working and playing very little but if you want to play with me just call me."
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
                { label: "Edad", value: "21 Años", icon: "fa-birthday-cake" },
                { label: "Género", value: "Género Fluido", icon: "fa-venus-mars" },
                { label: "Sexualidad", value: "Pansexual", icon: "fa-heart" },
                { label: "Ubicación", value: "Brasil", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "Directiva Principal",
                value: "¡Hola! Soy Zipped, amo la tecnología y los juegos. Me encanta hablar de cualquier cosa, actualmente estoy estudiando, trabajando y jugando muy poco pero si quieres jugar conmigo solo llámame."
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
                { label: "年齢", value: "21歳", icon: "fa-birthday-cake" },
                { label: "性別", value: "ジェンダーフルイド", icon: "fa-venus-mars" },
                { label: "セクシュアリティ", value: "パンセクシュアル", icon: "fa-heart" },
                { label: "場所", value: "ブラジル", icon: "fa-map-marker-alt" }
            ],
            directive: {
                label: "主な指令",
                value: "こんにちは！Zippedです。テクノロジーとゲームが大好きです。何でも話すのが好きで、現在は勉強したり、働いたり、少しだけゲームをしたりしていますが、一緒に遊びたいなら声をかけてください。"
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
