// Temple page interactions
document.addEventListener('DOMContentLoaded', function() {
    const iconButtons = document.querySelectorAll('.icon-btn');

    iconButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Get action type
            const soundType = this.dataset.sound;
            const actionType = this.dataset.action;

            if (soundType) {
                // Play sound if available
                playSound(soundType);
            }

            if (actionType) {
                handleAction(actionType);
            }
        });
    });

    // Homage page offerings (献花 / 上香)
    const offerButtons = document.querySelectorAll('.offer-btn');

    offerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            handleOffering(this.dataset.offering);
        });
    });
});

function handleOffering(type) {
    const messages = {
        'flower': '🪷 献花功德 · Flowers offered',
        'incense': '🕯️ 香供养 · Incense offered',
        'lamp': '🪔 燃灯续命 · Lamp offered'
    };

    if (messages[type]) {
        showNotification(messages[type]);
    }
}

function playSound(type) {
    // Sound playback - will work when audio files are added
    const soundMap = {
        'bell': 'sounds/bell.mp3',
        'woodenfish': 'sounds/wooden-fish.mp3',
        'beads': 'sounds/beads.mp3',
        'chanting': 'sounds/chanting.mp3'
    };

    const soundFile = soundMap[type];
    if (soundFile) {
        const audio = new Audio(soundFile);
        audio.play().catch(e => {
            // Audio file not found - show visual feedback instead
            showNotification('Audio coming soon...');
        });
    }
}

function handleAction(type) {
    const messages = {
        'lotus': '🪷 Lotus offering presented',
        'incense': '🙏 Incense offering presented'
    };

    if (messages[type]) {
        showNotification(messages[type]);
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(139, 0, 0, 0.9);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}
