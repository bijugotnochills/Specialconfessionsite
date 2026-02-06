// main.js - COMPLETE UPDATED VERSION WITH SERIAL QUOTES
document.addEventListener('DOMContentLoaded', function() {
    // App State
    const state = {
        userName: '',
        answers: {},
        currentQuestion: 0,
        noClickCount: 0,
        quoteDuration: 4, // Each quote shows for 4 seconds
        totalQuotes: 20, // We have 20 quotes
        loadingTime: 0, // Will be calculated based on quotes
        skipLoadingTimeout: null,
        skipMessageTimeout: null,
        quotes: [
            "Even Kagura's umbrella can't hide how much I want to tell you something...",
            "Angela thinks you're the Healing my heart needs.",
            "Vale whispered your name into the wind... and now it won't leave my mind.",
            "If love was a skill, you'd be my ultimate.",
            "Like Floryn's healing, your smile fixes everything.",
            "Zhetian's stars aren't as bright as your eyes.",
            "Even Luo Yi's portals couldn't take me away from you.",
            "If you were a hero, you'd be my FAV ONE in the LAND OF DAWN.",
            "My love for you has 100% magic lifesteal.",
            "You're the permanent buff my soul never knew it needed in this game called MLBB.",
            "Like Angela's ult, I want to protect you forever.",
            "Guinevere's magic isn't as enchanting as you are to me.",
            "Floryn's bloom isn't as beautiful as your cute smile ahemm.",
            "Even the Lord couldn't command me to stop thinking about you.",
            "You're the victory screen that i want to have in my Life Forever, My Player two.",
            "You're the legendary skin my soul always wanted.",
            "My heart's recall animation always brings me back to you.",
            "If you were an emote, you'd be my favorite spam.",
            "Your presence is my permanent blue buff.",
            "You're the perfect duo my heart searched for across all seasons."
        ],
        questions: [
            {
                id: 'color',
                text: "What's your favorite color?",
                type: 'options',
                options: ['Pink', 'Blue', 'Purple', 'Red', 'Green', 'Yellow', 'Rainbow!']
            },
            {
                id: 'hero',
                text: "Who's your favorite MLBB hero?",
                type: 'options',
                options: ['Kagura', 'Angela', 'Guinevere', 'Vexana', 'Floryn', 'Hanabi', 'Luo Yi', 'Other']
            },
            {
                id: 'place',
                text: "Where's your dream place to visit?",
                type: 'text'
            },
            {
                id: 'smile',
                text: "What makes you smile instantly?",
                type: 'options',
                options: ['Cute animals', 'Good food', 'Funny memes', 'Friends', 'Achievements', 'Music']
            },
            {
                id: 'comfort',
                text: "What's your ultimate comfort food?",
                type: 'text'
            },
            {
                id: 'safe',
                text: "What makes you feel safe and loved?",
                type: 'options',
                options: ['Hugs', 'Kind words', 'Quality time', 'Gifts', 'Acts of service', 'Listening']
            },
            {
                id: 'song',
                text: "What mood of music matches your heart?",
                type: 'options',
                options: ['Romantic', 'Energetic', 'Calm', 'Nostalgic', 'Hopeful', 'Dreamy']
            },
            {
                id: 'date',
                text: "What's your ideal date idea?",
                type: 'text'
            },
            {
                id: 'flutter',
                text: "What makes your heart flutter?",
                type: 'options',
                options: ['Surprises', 'Deep conversations', 'Shared laughter', 'Thoughtful gestures', 'Eye contact', 'Little notes']
            },
            {
                id: 'love',
                text: "One word that describes love for you?",
                type: 'text'
            }
        ],
        noPopupConfigs: [
            {
                emoji: "😢",
                title: "Wait! Don't go!",
                message: "Are you sure? My heart just skipped a beat! 💔",
                buttonText: "Okay, one more chance"
            },
            {
                emoji: "😔",
                title: "Please reconsider...",
                message: "Wait! Let me rephrase with more romantic emojis! 🌸✨",
                buttonText: "Okay, let me think"
            },
            {
                emoji: "😟",
                title: "My heart is breaking...",
                message: "My heart's HP is dropping! Please reconsider! ❤️‍🩹",
                buttonText: "Maybe one more try"
            },
            {
                emoji: "😭",
                title: "Don't do this...",
                message: "Even the MLBB Lord says we should be together! 👑",
                buttonText: "Alright, convince me"
            },
            {
                emoji: "😤",
                title: "I won't give up!",
                message: "I've prepared 100 more reasons why you should say yes! 📜",
                buttonText: "Show me one more"
            },
            {
                emoji: "😏",
                title: "Getting persistent, huh?",
                message: "My feelings have 90% damage reduction against 'no'! 🛡️",
                buttonText: "Fine, continue..."
            },
            {
                emoji: "😈",
                title: "Almost there...",
                message: "This is just the tutorial! The real romance is ahead! 🎮",
                buttonText: "What's next?"
            },
            {
                emoji: "😏",
                title: "No escape now!",
                message: "There is no escape now! You belong with me. 💕",
                buttonText: "I surrender! 😏"
            }
        ]
    };

    // Calculate loading time based on quotes: 20 quotes × 4s = 80 seconds
    state.loadingTime = state.totalQuotes * state.quoteDuration;

    // DOM Elements
    const screens = {
        entry: document.getElementById('entry-screen'),
        loading: document.getElementById('loading-screen'),
        questions: document.getElementById('questions-screen'),
        message: document.getElementById('message-screen'),
        confession: document.getElementById('confession-screen'),
        yes: document.getElementById('yes-screen')
    };

    const elements = {
        userNameInput: document.getElementById('userName'),
        enterBtn: document.getElementById('enter-btn'),
        loadingProgress: document.querySelector('.loading-progress'),
        countdownNumber: document.querySelector('.countdown-number'),
        quoteText: document.querySelector('.quote-text'),
        currentQ: document.getElementById('current-q'),
        questionText: document.getElementById('question-text'),
        answersContainer: document.querySelector('.answers-container'),
        textAnswer: document.getElementById('text-answer'),
        nextBtn: document.getElementById('next-btn'),
        answerCount: document.getElementById('answer-count'),
        progressFill: document.querySelector('.progress-fill'),
        messageName: document.getElementById('message-name'),
        dynamicMessage: document.getElementById('dynamic-message'),
        finalName: document.getElementById('final-name'),
        yesBtn: document.getElementById('yes-btn'),
        noBtn: document.getElementById('no-btn'),
        noPopup: document.getElementById('no-popup'),
        popupMessage: document.getElementById('popup-message'),
        popupClose: document.getElementById('popup-close'),
        proceedBtn: document.getElementById('proceed-btn'),
        restartBtn: document.getElementById('restart-btn'),
        popupEmoji: document.querySelector('.popup-emoji'),
        popupTitle: document.querySelector('.popup-title'),
        yesScreenName: document.getElementById('yes-screen-name'),
        yesScreenNameInline: document.getElementById('yes-screen-name-inline'),
        skipLoadingBtn: document.getElementById('skip-loading-btn'),
        skipMessageBtn: document.getElementById('skip-message-btn')
    };

    // Audio Elements
    const audio = {
        bgMusic: document.getElementById('bg-music'),
        clickSound: document.getElementById('click-sound'),
        heartSound: document.getElementById('heart-sound'),
        successSound: document.getElementById('success-sound')
    };

    // Variables for timeout management
    let proceedButtonTimeout = null;
    let quoteInterval = null;
    let countdownInterval = null;

    // Initialize
    function init() {
        createFloatingHearts();
        createPetals();
        createSparkles();
        setupEventListeners();
        
        // Set audio volumes
        audio.bgMusic.volume = 1.0; // Full volume for background music
        audio.clickSound.volume = 0.5;
        audio.heartSound.volume = 0.4;
        audio.successSound.volume = 0.6;
        
        // Start background music automatically (muted and then unmuted)
        startBackgroundMusic();
    }

    // Start background music with user interaction fallback
    function startBackgroundMusic() {
        // Try to play immediately (browsers may block this)
        audio.bgMusic.play().catch(e => {
            console.log("Auto-play blocked, waiting for user interaction");
            // Set up interaction listener
            document.addEventListener('click', function initAudio() {
                audio.bgMusic.play().catch(e => console.log("Audio play failed:", e));
                document.removeEventListener('click', initAudio);
            }, { once: true });
        });
        
        // Ensure music loops
        audio.bgMusic.loop = true;
    }

    // Create floating hearts background
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        const heartCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 10}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: floatHeart ${Math.random() * 20 + 20}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                z-index: 0;
            `;
            
            container.appendChild(heart);
        }
    }

    // Create falling petals
    function createPetals() {
        const container = document.querySelector('.petals-container');
        const petalCount = window.innerWidth < 768 ? 10 : 20;
        const petals = ['🌸', '💮', '🏵️', '🌺', '🌼'];
        
        for (let i = 0; i < petalCount; i++) {
            const petal = document.createElement('div');
            petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
            petal.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 15 + 15}px;
                left: ${Math.random() * 100}%;
                top: -50px;
                opacity: ${Math.random() * 0.7 + 0.3};
                animation: fallPetals ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                z-index: 0;
            `;
            
            container.appendChild(petal);
        }
    }

    // Create sparkles
    function createSparkles() {
        const container = document.querySelector('.sparkles');
        const sparkleCount = window.innerWidth < 768 ? 20 : 40;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: white;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                box-shadow: 0 0 8px 1px white;
                animation: sparkleTwinkle ${Math.random() * 3 + 2}s infinite;
                animation-delay: ${Math.random() * 2}s;
                z-index: 0;
            `;
            
            container.appendChild(sparkle);
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        // Entry screen
        elements.userNameInput.addEventListener('input', handleNameInput);
        elements.userNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && elements.enterBtn.disabled === false) {
                handleEnterClick();
            }
        });
        elements.enterBtn.addEventListener('click', handleEnterClick);
        
        // Skip buttons
        elements.skipLoadingBtn.addEventListener('click', handleSkipLoading);
        elements.skipMessageBtn.addEventListener('click', handleSkipMessage);
        
        // Questions screen
        elements.nextBtn.addEventListener('click', handleNextQuestion);
        elements.textAnswer.addEventListener('input', handleTextAnswer);
        
        // Message screen - proceed button
        elements.proceedBtn.addEventListener('click', handleProceedClick);
        
        // Confession screen
        elements.yesBtn.addEventListener('click', handleYesClick);
        elements.noBtn.addEventListener('click', handleNoClick);
        elements.popupClose.addEventListener('click', closePopup);
        
        // Yes screen
        elements.restartBtn.addEventListener('click', restartExperience);
        
        // Close popup when clicking outside
        elements.noPopup.addEventListener('click', (e) => {
            if (e.target === elements.noPopup) {
                closePopup();
            }
        });
    }

    // Handle name input
    function handleNameInput() {
        const name = elements.userNameInput.value.trim();
        elements.enterBtn.disabled = name.length < 2;
        state.userName = name;
    }

    // Handle enter click
    function handleEnterClick() {
        if (state.userName.length < 2) return;
        
        playSound('click');
        state.userName = elements.userNameInput.value.trim();
        switchScreen(screens.loading);
        startLoadingScreen();
    }

    // Switch between screens
    function switchScreen(targetScreen) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        targetScreen.classList.add('active');
    }

    // Start loading screen
    function startLoadingScreen() {
        // Set initial countdown to 80 seconds
        let timeLeft = state.loadingTime;
        elements.countdownNumber.textContent = timeLeft;
        
        // Hide skip button initially
        elements.skipLoadingBtn.classList.add('hidden');
        
        // Start showing quotes serially at 4 second intervals
        let quoteIndex = 0;
        showQuote(quoteIndex); // Show first quote immediately
        
        // Update progress based on quotes shown
        let progress = ((quoteIndex + 1) / state.totalQuotes) * 100;
        elements.loadingProgress.style.width = `${progress}%`;
        
        // Set up interval for showing quotes serially
        quoteInterval = setInterval(() => {
            quoteIndex++;
            if (quoteIndex < state.quotes.length) {
                showQuote(quoteIndex);
                
                // Update progress based on quotes shown
                progress = ((quoteIndex + 1) / state.totalQuotes) * 100;
                elements.loadingProgress.style.width = `${progress}%`;
            } else {
                // We've shown all quotes, clear the interval
                clearInterval(quoteInterval);
            }
        }, state.quoteDuration * 1000);
        
        // Update countdown every second
        countdownInterval = setInterval(() => {
            timeLeft--;
            elements.countdownNumber.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                clearInterval(quoteInterval);
                playSound('success');
                switchScreen(screens.questions);
                loadQuestion(state.currentQuestion);
            }
        }, 1000);
        
        // Show skip button after 20 seconds
        state.skipLoadingTimeout = setTimeout(() => {
            elements.skipLoadingBtn.classList.remove('hidden');
        }, 20000);
    }

    // Show quote at specific index (serially) with enhanced animation
    function showQuote(index) {
        if (index >= 0 && index < state.quotes.length) {
            const quote = state.quotes[index];
            
            // Create beautiful quote with animation
            const quoteElement = elements.quoteText;
            const quoteCard = quoteElement.parentElement;
            
            // Remove active class for animation
            quoteCard.classList.remove('active');
            
            // Wait for transition to complete, then update and show
            setTimeout(() => {
                quoteElement.textContent = quote;
                quoteCard.classList.add('active');
                
                // Add a gentle scale effect
                quoteCard.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    quoteCard.style.transform = 'scale(1)';
                }, 100);
                
            }, 300);
        }
    }

    // Handle skip loading
    function handleSkipLoading() {
        playSound('click');
        
        // Clear intervals and timeouts
        clearInterval(quoteInterval);
        clearInterval(countdownInterval);
        clearTimeout(state.skipLoadingTimeout);
        
        // Hide skip button
        elements.skipLoadingBtn.classList.add('hidden');
        
        // Skip to questions
        switchScreen(screens.questions);
        loadQuestion(state.currentQuestion);
    }

    // Handle skip message
    function handleSkipMessage() {
        playSound('click');
        
        // Clear the timeout if button is clicked before it appears
        if (proceedButtonTimeout) {
            clearTimeout(proceedButtonTimeout);
            proceedButtonTimeout = null;
        }
        
        // Hide skip button
        elements.skipMessageBtn.classList.add('hidden');
        
        // Switch to confession screen
        switchScreen(screens.confession);
    }

    // Load question
    function loadQuestion(index) {
        const question = state.questions[index];
        
        elements.currentQ.textContent = index + 1;
        elements.questionText.textContent = question.text;
        elements.progressFill.style.width = `${((index + 1) / state.questions.length) * 100}%`;
        
        // Clear previous answers
        elements.answersContainer.innerHTML = '';
        elements.nextBtn.disabled = true;
        elements.textAnswer.style.display = 'none';
        elements.textAnswer.value = '';
        
        if (question.type === 'options') {
            question.options.forEach((option, i) => {
                const optionElement = document.createElement('div');
                optionElement.className = 'answer-option';
                optionElement.textContent = option;
                optionElement.dataset.value = option;
                optionElement.addEventListener('click', () => selectOption(option, optionElement));
                elements.answersContainer.appendChild(optionElement);
            });
        } else {
            elements.textAnswer.style.display = 'block';
            elements.textAnswer.focus();
        }
    }

    // Select option
    function selectOption(value, element) {
        playSound('click');
        
        // Remove selected class from all options
        document.querySelectorAll('.answer-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        element.classList.add('selected');
        
        // Store answer
        state.answers[state.questions[state.currentQuestion].id] = value;
        elements.nextBtn.disabled = false;
        
        // Update answer count
        elements.answerCount.textContent = Object.keys(state.answers).length;
    }

    // Handle text answer
    function handleTextAnswer() {
        const value = elements.textAnswer.value.trim();
        elements.nextBtn.disabled = value.length === 0;
        
        if (value.length > 0) {
            state.answers[state.questions[state.currentQuestion].id] = value;
            elements.answerCount.textContent = Object.keys(state.answers).length;
        }
    }

    // Handle next question
    function handleNextQuestion() {
        playSound('click');
        state.currentQuestion++;
        
        if (state.currentQuestion < state.questions.length) {
            loadQuestion(state.currentQuestion);
        } else {
            generateDynamicMessage();
            switchScreen(screens.message);
            
            // Clear any existing timeout
            if (proceedButtonTimeout) {
                clearTimeout(proceedButtonTimeout);
            }
            
            // Hide proceed button initially
            elements.proceedBtn.classList.add('hidden');
            elements.skipMessageBtn.classList.add('hidden');
            
            // Show proceed button after 120 seconds (CHANGED FROM 10 to 120)
            proceedButtonTimeout = setTimeout(() => {
                elements.proceedBtn.classList.remove('hidden');
                elements.proceedBtn.classList.add('visible');
                playSound('heart'); // Gentle sound when button appears
            }, 120000); // 120 seconds = 120000 milliseconds
            
            // Show skip button after 20 seconds
            state.skipMessageTimeout = setTimeout(() => {
                elements.skipMessageBtn.classList.remove('hidden');
            }, 20000);
        }
    }

    // Handle proceed button click
    function handleProceedClick() {
        playSound('click');
        
        // Clear the timeout if button is clicked before it appears
        if (proceedButtonTimeout) {
            clearTimeout(proceedButtonTimeout);
            proceedButtonTimeout = null;
        }
        
        // Clear skip timeout
        if (state.skipMessageTimeout) {
            clearTimeout(state.skipMessageTimeout);
            state.skipMessageTimeout = null;
        }
        
        // Hide skip button
        elements.skipMessageBtn.classList.add('hidden');
        
        // Switch to confession screen
        switchScreen(screens.confession);
    }

    // Generate dynamic message
    function generateDynamicMessage() {
        elements.messageName.textContent = state.userName;
        elements.finalName.textContent = state.userName;
        elements.yesScreenName.textContent = state.userName;
        elements.yesScreenNameInline.textContent = state.userName;
        
        // Reset and ensure proper styling for dynamic message
        elements.dynamicMessage.style.maxHeight = 'none';
        elements.dynamicMessage.style.overflow = 'visible';
        elements.dynamicMessage.style.minHeight = 'auto';
        
        const userName = state.userName;
        const answers = state.answers;
        
        // Personalized responses based on each answer
        const colorResponses = {
            'Pink': `Your love for <span class="highlight">Pink</span> tells me you have a heart as soft as cherry blossoms and as bright as a sunset sky. 🌸`,
            'Blue': `Choosing <span class="highlight">Blue</span> shows you're as deep and calming as the ocean, and just as endless in your beauty. 🌊`,
            'Purple': `With <span class="highlight">Purple</span> as your favorite, you're royalty in my eyes - majestic, mysterious, and magical. 👑`,
            'Red': `Passionate <span class="highlight">Red</span>! No wonder my heart races when I think of you - you're fire and warmth combined. 🔥`,
            'Green': `<span class="highlight">Green</span> like spring! You bring growth and life to everything around you, including my heart. 🌿`,
            'Yellow': `<span class="highlight">Yellow</span> as sunshine! You radiate happiness that could outshine even the brightest gold buff. ☀️`,
            'Rainbow!': `Of course you'd pick <span class="highlight">Rainbow</span>! You contain all the colors of joy, magic, and wonder. 🌈✨`
        };
        
        const heroResponses = {
            'Kagura': `A <span class="highlight">Kagura</span> main! Just like her umbrella protects her team, I want to protect your beautiful smile. 🌂`,
            'Angela': `You chose <span class="highlight">Angela</span> - the ultimate protector. No wonder you make everyone feel safe and cherished. 👼`,
            'Guinevere': `<span class="highlight">Guinevere</span>! Powerful and graceful - just like you. Every leap you take lands straight in my heart. 💃`,
            'Floryn': `<span class="highlight">Floryn</span> the healer! You have that same nurturing spirit that makes everything bloom beautifully. 🌸`,
            'Hanabi': `Like <span class="highlight">Hanabi</span>'s ninja ways, you've stealthily captured my heart without even trying. 🥷💘`,
            'Luo Yi': `<span class="highlight">Luo Yi</span>'s portals have nothing on you - you've transported my heart to another dimension of love. 🌌`,
            'Other': `Your unique hero choice shows you're one of a kind - just like the special place you hold in my heart. 💖`
        };
        
        const smileResponses = {
            'Cute animals': `Knowing <span class="highlight">cute animals</span> make you smile makes me want to send you endless puppy and kitten videos! 🐶🐱`,
            'Good food': `If <span class="highlight">good food</span> brings you joy, I'd learn to cook every dish in the world just to see that smile. 🍜❤️`,
            'Funny memes': `Your love for <span class="highlight">funny memes</span> tells me we'll spend hours laughing together - the best kind of date! 😂📱`,
            'Friends': `That you smile at <span class="highlight">friends</span> shows your beautiful, loyal heart. Can I apply to be your favorite? 👫💕`,
            'Achievements': `You find joy in <span class="highlight">achievements</span> - well, loving you would be my greatest life achievement. 🏆✨`,
            'Music': `<span class="highlight">Music</span> moves you? Your laughter is already my favorite melody, playing on repeat in my heart. 🎵💖`
        };
        
        const safeResponses = {
            'Hugs': `You feel safe with <span class="highlight">hugs</span> - I have an infinite supply waiting just for you. Warm, tight, and full of love. 🤗`,
            'Kind words': `<span class="highlight">Kind words</span> comfort you? I'd write you poems, songs, and love letters every single day. 📝💌`,
            'Quality time': `Your perfect <span class="highlight">quality time</span>? That's all I want - hours that turn into days that turn into forever. ⏳💕`,
            'Gifts': `You appreciate <span class="highlight">thoughtful gifts</span> - my heart is the most precious gift I have, and it's yours. 🎁💝`,
            'Acts of service': `<span class="highlight">Acts of service</span> speak to you? I'd move mountains just to make your life easier and happier. ⛰️✨`,
            'Listening': `Being <span class="highlight">heard</span> makes you feel loved? I'd listen to every story, dream, and thought forever. 👂❤️`
        };
        
        const songResponses = {
            'Romantic': `Your heart matches <span class="highlight">romantic</span> music? Perfect, because every beat of my heart sings a love song for you. 🎶💘`,
            'Energetic': `<span class="highlight">Energetic</span> tunes! You bring excitement and adventure to life - can I join your adventure? 🎉🌟`,
            'Calm': `You're drawn to <span class="highlight">calm</span> music - just being near you brings me the deepest peace I've ever known. ☁️💕`,
            'Nostalgic': `<span class="highlight">Nostalgic</span> melodies speak to your soul? Every moment with you becomes a precious memory I'll treasure. 📻✨`,
            'Hopeful': `You choose <span class="highlight">hopeful</span> music - and you give me hope for a beautiful future filled with us. 🌅💖`,
            'Dreamy': `<span class="highlight">Dreamy</span> tunes match your spirit! Being with you feels like living in the sweetest dream. 💭🌸`
        };
        
        const flutterResponses = {
            'Surprises': `You love <span class="highlight">surprises</span>? Get ready for a lifetime of unexpected love notes, flowers, and "just because" hugs! 🎁💕`,
            'Deep conversations': `<span class="highlight">Deep conversations</span> make your heart flutter? I could talk with you for eternity and never run out of things to say. 💬✨`,
            'Shared laughter': `Your heart flutters at <span class="highlight">shared laughter</span> - good, because you make me laugh like no one else. Our inside jokes would be legendary! 😂❤️`,
            'Thoughtful gestures': `<span class="highlight">Thoughtful gestures</span> touch your heart? I'd spend my days finding new ways to show you how special you are. 🎀💝`,
            'Eye contact': `That <span class="highlight">eye contact</span> makes you flutter... I could get lost in your eyes forever and be perfectly happy. 👀💘`,
            'Little notes': `You adore <span class="highlight">little notes</span>? I'd hide love letters everywhere - in your books, your pockets, your heart. 📝💖`
        };
        
        // Generate the message parts
        const messageParts = [
            `<span class="message-opening">To my favorite person, ${userName}...</span>`,
            `<br><br>`,
            `<span class="message-intro">I've been collecting little pieces of you like precious gems, and each one makes me fall harder:</span>`,
            `<br><br>`,
            `${colorResponses[answers.color] || `Your favorite color is <span class="highlight">${answers.color || "perfect"}</span>, which is exactly how I'd describe you - absolutely perfect in every way. 🌈`}`,
            `<br><br>`,
            `${heroResponses[answers.hero] || `Your love for <span class="highlight">${answers.hero || "heroes"}</span> shows you appreciate strength and beauty - two things you embody completely. 💪💖`}`,
            `<br><br>`,
            `You dream of visiting <span class="highlight">${answers.place || "magical places"}</span> - well, I found my paradise every time I see your smile. ✨`,
            `<br><br>`,
            `${smileResponses[answers.smile] || `What makes you smile? <span class="highlight">${answers.smile || "Everything beautiful"}</span> - and I hope I can be one of those things someday. 😊`}`,
            `<br><br>`,
            `Your ultimate comfort is <span class="highlight">${answers.comfort || "cozy moments"}</span> - I want to be your safe haven, your warm blanket on a cold day. 🧡`,
            `<br><br>`,
            `${safeResponses[answers.safe] || `You feel safe with <span class="highlight">${answers.safe || "love"}</span> - and I promise to build a fortress of love around your heart. 🏰💕`}`,
            `<br><br>`,
            `${songResponses[answers.song] || `Your heart beats to <span class="highlight">${answers.song || "beautiful"}</span> music - and my heart has composed a symphony just for you. 🎼✨`}`,
            `<br><br>`,
            `Your perfect date is <span class="highlight">${answers.date || "spent together"}</span> - which sounds exactly like my definition of heaven. 👫💖`,
            `<br><br>`,
            `${flutterResponses[answers.flutter] || `Your heart flutters at <span class="highlight">${answers.flutter || "special moments"}</span> - I want to create a lifetime of those moments with you. 🦋`}`,
            `<br><br>`,
            `And you describe love as <span class="highlight">"${answers.love || "everything"}"</span> - which is exactly what you mean to me. <strong>Everything.</strong> 💝`,
            `<br><br>`,
            `<span class="message-conclusion">Every answer, every preference, every little detail about you fits perfectly into the space you've created in my heart.</span>`,
            `<br><br>`,
            `<span class="magic-line">There's magic in the way you exist, ${userName} - a kind of magic that makes ordinary moments extraordinary, and lonely hearts feel found. ✨</span>`,
            `<br><br>`,
            `<span class="final-line">You're not just someone I like - you're the person who makes all the love songs make sense, the reason my heart does that funny little flip, and the answer to questions I didn't even know I was asking. 💖</span>`
        ];
        
        elements.dynamicMessage.innerHTML = messageParts.join('');
    }

    // Handle yes click
    function handleYesClick() {
        playSound('success');
        
        // Create heart explosion
        createHeartExplosion();
        
        // Create confetti
        createConfetti();
        
        // Switch to yes screen
        setTimeout(() => {
            switchScreen(screens.yes);
        }, 1500);
    }

    // Handle no click
    function handleNoClick() {
        playSound('click');
        state.noClickCount++;
        
        // Get popup configuration based on click count
        const configIndex = Math.min(state.noClickCount - 1, state.noPopupConfigs.length - 1);
        const config = state.noPopupConfigs[configIndex];
        
        // Update popup content
        elements.popupEmoji.textContent = config.emoji;
        elements.popupTitle.textContent = config.title;
        elements.popupMessage.textContent = config.message;
        elements.popupClose.textContent = config.buttonText;
        
        // Show popup
        elements.noPopup.classList.add('active');
        
        // Grow yes button, shrink no button
        const yesBtn = elements.yesBtn;
        const noBtn = elements.noBtn;
        
        const currentYesSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        const currentNoSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        
        yesBtn.style.fontSize = `${currentYesSize * 1.1}px`;
        noBtn.style.fontSize = `${currentNoSize * 0.9}px`;
        
        // After 8 clicks, remove no button
        if (state.noClickCount >= 8) {
            noBtn.style.display = 'none';
            
            // Update popup for final message
            elements.popupEmoji.textContent = "😏";
            elements.popupTitle.textContent = "No Escape Now!";
            elements.popupMessage.textContent = `There is no escape now ${state.userName} 💕 You belong with me.`;
            elements.popupClose.textContent = "Fine, I surrender! 😏";
            
            // Create raining hearts
            createRainingHearts();
        }
    }

    // Close popup
    function closePopup() {
        playSound('click');
        elements.noPopup.classList.remove('active');
    }

    // Create heart explosion
    function createHeartExplosion() {
        const container = document.querySelector('.heart-explosion');
        const heartCount = window.innerWidth < 768 ? 25 : 50;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 20 + 15}px;
                left: 50%;
                top: 50%;
                opacity: 1;
                z-index: 1000;
                pointer-events: none;
            `;
            
            // Random explosion direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 4 + 1;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0;
            let y = 0;
            let opacity = 1;
            
            function explode() {
                x += vx;
                y += vy;
                opacity -= 0.02;
                
                heart.style.transform = `translate(${x}vw, ${y}vh) rotate(${x * 10}deg)`;
                heart.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(explode);
                } else {
                    heart.remove();
                }
            }
            
            container.appendChild(heart);
            requestAnimationFrame(explode);
        }
    }

    // Create confetti
    function createConfetti() {
        const container = document.querySelector('.confetti-container');
        const confettiCount = window.innerWidth < 768 ? 100 : 200;
        const colors = ['#ffafcc', '#cdb4db', '#bde0fe', '#a2d2ff', '#ffc8dd'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 3}px;
                height: ${Math.random() * 8 + 3}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                opacity: 1;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                transform: rotate(${Math.random() * 360}deg);
                z-index: 999;
                pointer-events: none;
            `;
            
            // Animation
            const animation = confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 1000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
            container.appendChild(confetti);
        }
    }

    // Create raining hearts
    function createRainingHearts() {
        const container = document.body;
        const heartCount = window.innerWidth < 768 ? 20 : 30;
        const hearts = ['💖', '💗', '💓', '💕', '💞'];
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                left: ${Math.random() * 100}%;
                top: -50px;
                opacity: ${Math.random() * 0.7 + 0.3};
                z-index: 999;
                pointer-events: none;
            `;
            
            // Animation
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            heart.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: heart.style.opacity },
                { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration * 1000,
                delay: delay * 1000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)',
                iterations: Infinity
            });
            
            container.appendChild(heart);
        }
    }

    // Play sound
    function playSound(type) {
        try {
            if (type === 'click') {
                audio.clickSound.currentTime = 0;
                audio.clickSound.play();
            } else if (type === 'heart') {
                audio.heartSound.currentTime = 0;
                audio.heartSound.play();
            } else if (type === 'success') {
                audio.successSound.currentTime = 0;
                audio.successSound.play();
            }
        } catch (e) {
            console.log("Sound play error:", e);
        }
    }

    // Restart experience
    function restartExperience() {
        playSound('click');
        
        // Reset state
        state.userName = '';
        state.answers = {};
        state.currentQuestion = 0;
        state.noClickCount = 0;
        
        // Clear any existing intervals and timeouts
        if (proceedButtonTimeout) {
            clearTimeout(proceedButtonTimeout);
            proceedButtonTimeout = null;
        }
        
        if (quoteInterval) {
            clearInterval(quoteInterval);
            quoteInterval = null;
        }
        
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
        
        if (state.skipLoadingTimeout) {
            clearTimeout(state.skipLoadingTimeout);
            state.skipLoadingTimeout = null;
        }
        
        if (state.skipMessageTimeout) {
            clearTimeout(state.skipMessageTimeout);
            state.skipMessageTimeout = null;
        }
        
        // Reset UI
        elements.userNameInput.value = '';
        elements.enterBtn.disabled = true;
        elements.yesBtn.style.fontSize = '';
        elements.noBtn.style.fontSize = '';
        elements.noBtn.style.display = 'flex';
        elements.proceedBtn.classList.remove('visible');
        elements.proceedBtn.classList.add('hidden');
        elements.skipLoadingBtn.classList.add('hidden');
        elements.skipMessageBtn.classList.add('hidden');
        
        // Clear dynamic elements
        document.querySelectorAll('.confetti-container div, .heart-explosion div').forEach(el => el.remove());
        
        // Switch to entry screen
        switchScreen(screens.entry);
        elements.userNameInput.focus();
    }

    // Initialize the app
    init();
});