// --- DADOS ESTÁTICOS (NÃO TRADUZÍVEIS) ---
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
            { name: "NieR: Automata", image: "imagens/games/nier-automata.jpg" },
            { name: "Cyberpunk 2077", image: "imagens/games/cyberpunk.jpg" },
            { name: "Life is Strange", image: "imagens/games/life-is-strange.jpg" },
            { name: "OneShot", image: "imagens/games/oneshot.jpg" },
            { name: "Outer Wilds", image: "imagens/games/outer-wilds.jpg" }
        ]},
        { icon: "fas fa-tv", items: [
            { name: "Arcane", image: "imagens/series/arcane.jpg" },
            { name: "Hazbin Hotel", image: "imagens/series/hazbin-hotel.jpg" },
            { name: "Helluva Boss", image: "imagens/series/helluva-boss.jpg" },
            { name: "Rick and Morty", image: "imagens/series/rick-morty.jpg" },
            { name: "Smiling Friends", image: "imagens/series/smiling-friends.jpg" }
        ]},
        { icon: "fas fa-film", items: [
            { name: "Blade Runner 2049", image: "imagens/movies/blade-runner2049.jpg" },
            { name: "Eternal Sunshine", image: "imagens/movies/eternal-sunshine.jpg" },
            { name: "La La Land", image: "imagens/movies/la-la-land.jpg" },
            { name: "The Batman", image: "imagens/movies/batman.jpg" },
            { name: "Look Back", image: "imagens/movies/look-back.jpg" },
            { name: "The Wild Robot", image: "imagens/movies/wild-robot.jpg" }
        ]},
        { icon: "fas fa-shield-halved", items: [
            { name: "Cyberpunk: Edgerunners", image: "imagens/animes/edgerunners.jpg" },
            { name: "Cowboy Bebop", image: "imagens/animes/cowboy-bebop.jpg" },
            { name: "JoJo's Bizarre Adventure", image: "imagens/animes/jojo.jpg" },
            { name: "Monster", image: "imagens/animes/monster.jpg" },
            { name: "Beastars", image: "imagens/animes/beastars.jpg" }
        ]},
        { icon: "fas fa-book-open", items: [
            { name: "Bungou Stray Dogs", image: "imagens/manga/bsd.jpg" },
            { name: "Fire Force", image: "imagens/manga/fire-force.jpg" },
            { name: "Soul Eater", image: "imagens/manga/soul-eater.jpg" },
            { name: "Tokyo Ghoul", image: "imagens/manga/tokyo-ghoul.jpg" },
            { name: "Goodnight Punpun", image: "imagens/manga/punpun.jpg" }
        ]},
        { icon: "fas fa-book", items: [
            { name: "Solo Leveling", image: "imagens/manhwa/solo-leveling.jpg" },
            { name: "Omniscient Reader", image: "imagens/manhwa/orv.jpg" },
            { name: "The Beginning After The End", image: "imagens/manhwa/tbate.jpg" },
            { name: "Tower of God", image: "imagens/manhwa/tog.jpg" },
            { name: "Eleceed", image: "imagens/manhwa/eleceed.jpg" }
        ]},
        { icon: "fas fa-user-ninja", items: [
            { name: "Shadow the Hedgehog", image: "imagens/characters/shadow.jpg" },
            { name: "Kaneki Ken", image: "imagens/characters/kaneki.jpg" },
            { name: "Dazai Osamu", image: "imagens/characters/dazai.jpg" },
            { name: "Moxxie", image: "imagens/characters/moxxie.jpg" },
            { name: "Death", image: "imagens/characters/morte.jpg" }
        ]},
        { icon: "fas fa-music", items: [
            { name: "Die For You", image: "imagens/albums/DieForYou.jpg" },
            { name: "Duvet", image: "imagens/albums/Duvet.jpg" },
            { name: "Fake Plastic Trees", image: "imagens/albums/FakePlasticTrees.jpg" },
            { name: "Falling Down", image: "imagens/albums/FallingDown.jpg" },
            { name: "Glimpse of Us", image: "imagens/albums/GlimpseOfUs.jpg" },
            { name: "Gunslinger", image: "imagens/albums/Gunslinger.jpg" },
            { name: "Hail to the King", image: "imagens/albums/HailToTheKing.jpg" },
            { name: "Let Down", image: "imagens/albums/LetDown.jpg" },
            { name: "Loser Baby", image: "imagens/albums/LoserBaby.jpg" },
            { name: "Never Fade Away", image: "imagens/albums/NeverFadeAway.jpg" },
            { name: "No Surprises", image: "imagens/albums/NoSurprises.jpg" },
            { name: "Poison", image: "imagens/albums/Poison.jpg" },
            { name: "Reflection", image: "imagens/albums/Reflection.jpg" },
            { name: "Slow Dancing", image: "imagens/albums/SlowDancing.jpg" },
            { name: "So Far Away", image: "imagens/albums/SoFarAway.jpg" },
            { name: "Teenagers", image: "imagens/albums/Teenagers.jpg" }
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
            }
        ]}
    ],
    gallery: [
        "imagens/gallery/gallery1.jpg",
        "imagens/gallery/gallery2.jpg",
        "imagens/gallery/gallery3.jpg",
        "imagens/gallery/gallery4.jpg",
        "imagens/gallery/gallery5.jpg",
        "imagens/gallery/gallery6.jpg",
        "imagens/gallery/gallery7.jpg",
        "imagens/gallery/gallery8.jpg",
        "imagens/gallery/gallery9.jpg",
        "imagens/gallery/gallery10.jpg",
        "imagens/gallery/gallery11.jpg",
        "imagens/gallery/gallery12.jpg"
    ],
    menuIcons: { profile: "fas fa-user", affinities: "fas fa-heart", records: "fas fa-book-open", gallery: "fas fa-image" },
    languageLevels: [ "100%", "60%", "30%" ],
    featuredImage: "imagens/shadowfocus.png",
    setup: [
        { value: "AMD Ryzen 5 3600X", icon: "fas fa-microchip" },
        { value: "NVIDIA GeForce RTX 3060 12GB ZOTAC", icon: "fas fa-gamepad" },
        { value: "2x8GB DDR4 3200MHz", icon: "fas fa-memory" },
        { value: "K86 Attack Shark", icon: "fas fa-keyboard" },
        { value: "AJAZZ AJ199", icon: "fas fa-mouse" },
        { value: "BASEUS GH02", icon: "fas fa-headset" },
        { value: "Fifine A6T", icon: "fas fa-microphone" },
        { value: "Acer KG241QS 165Hz", icon: "fas fa-desktop" },
        { value: "HyperX FURY S (Speed Edition) XL", icon: "fas fa-mouse-pointer" },
    ]
};

// Dados de tradução
const languageData = {
    pt: {
        profile: {
            title: "Painel de Dados: Zipped",
            fields: [
                { label: "Idade", value: "20 Anos", icon: "fa-birthday-cake" },
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
                "Tenho +10k horas de Counter-Strike e Fortnite em cada",
                "Meu primeiro console foi um PlayStation 2",
                "Prefiro jogos com narrativas profundas e que me toquem emocionalmente",
                "Ouvinte assíduo de rock alternativo",
                "Às vezes escuto a mesma música por dias sem parar",
                "Tenho uma guitarra e estou aprendendo a tocar, também queria aprender Bateria",
                "Amo Helluva Boss e Hazbin Hotel",
                "Meus personagens favoritos são Moxxie, Millie, Stolas, Husk e Angel Dust",
                "Minha música favorita de Helluva Boss é 'Just Look My Way' e de Hazbin Hotel é 'Loser, Baby'",
                "Sou viciado em ler mangás e manhwas",
                "Tenho a coleção completa de Tokyo Ghoul e Bungou Stray Dogs",
                "Tenho uma action figure do Kaneki Kakuja",
                "The past does not define me.",
                "I decide my own path.",
                "Sometimes, one must destroy to create something new.",
                "I don't need friends, but I won't turn them away.",
                "Ultimate power is a burden."
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
                { label: "Age", value: "20 Years", icon: "fa-birthday-cake" },
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
                "I have 10k+ hours in Counter-Strike and Fortnite each",
                "My first console was a PlayStation 2",
                "I prefer games with deep narratives that move me emotionally",
                "Avid listener of alternative rock",
                "Sometimes I listen to the same song for days on end",
                "I have a guitar and am learning to play, I also want to learn drums",
                "I love Helluva Boss and Hazbin Hotel",
                "My favorite characters are Moxxie, Millie, Stolas, Husk, and Angel Dust",
                "My favorite Helluva Boss song is 'Just Look My Way' and from Hazbin Hotel is 'Loser, Baby'",
                "I'm addicted to reading manga and manhwas",
                "I have the complete collection of Tokyo Ghoul and Bungou Stray Dogs",
                "I have a Kaneki Kakuja action figure",
                "The past does not define me.",
                "I decide my own path.",
                "Sometimes, one must destroy to create something new.",
                "I don't need friends, but I won't turn them away.",
                "Ultimate power is a burden."
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
                { label: "Edad", value: "20 Años", icon: "fa-birthday-cake" },
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
                { label: "年齢", value: "20歳", icon: "fa-birthday-cake" },
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
            profile: "ダッシュボード",
            affinities: "親和性",
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