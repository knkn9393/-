 class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.currentTrack = null;
        this.isPlaying = false;
        
        // Add event listeners
        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.updatePlayButton();
        });
    }
    
    loadTrack(trackUrl, trackName) {
        // If same track is clicked while playing, pause it
        if (this.currentTrack === trackUrl && this.isPlaying) {
            this.pauseTrack();
            return;
        }
        
        // If different track, load and play it
        if (this.currentTrack !== trackUrl) {
            this.currentTrack = trackUrl;
            this.audio.src = trackUrl;
            this.audio.load();
        }
        
        // Update track name display if provided
        if (trackName) {
            const trackNameElement = document.getElementById('current-track-name');
            if (trackNameElement) {
                trackNameElement.textContent = trackName;
            }
        }
        
        this.playTrack();
    }
    
    playTrack() {
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.updatePlayButton();
            })
            .catch(error => {
                console.error('Error playing audio:', error);
                alert('حدث خطأ أثناء تشغيل الصوت. يرجى المحاولة مرة أخرى.');
            });
    }
    
    pauseTrack() {
        this.audio.pause();
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    stopTrack() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.updatePlayButton();
    }
    
    updatePlayButton() {
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            if (this.isPlaying) {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
    }
}

// Create a global audio player instance
const audioPlayer = new AudioPlayer();

document.addEventListener('DOMContentLoaded', function() {
    // Set up play, pause, and stop buttons if they exist
    const playBtn = document.getElementById('play-btn');
    const stopBtn = document.getElementById('stop-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', function() {
            if (audioPlayer.isPlaying) {
                audioPlayer.pauseTrack();
            } else if (audioPlayer.currentTrack) {
                audioPlayer.playTrack();
            }
        });
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            audioPlayer.stopTrack();
        });
    }
    
    // Set up example tracks
    const exampleItems = document.querySelectorAll('.examples-list li');
    exampleItems.forEach(item => {
        item.addEventListener('click', function() {
            const trackUrl = this.getAttribute('data-audio');
            const trackName = this.textContent;
            
            if (trackUrl) {
                // استخدام Tone.js مباشرة لإنشاء صوت المقامات بدلاً من استخدام ملفات صوتية
                // هذا سيضمن عمل الأصوات حتى بدون اتصال بالإنترنت
                loadToneJS();
                
                setTimeout(() => {
                    if (typeof Tone !== 'undefined') {
                        const synth = new Tone.Synth().toDestination();
                        const now = Tone.now();
                        
                        // إيقاف التشغيل الحالي إن وجد
                        audioPlayer.stopTrack();
                        
                        // تحديث اسم المسار
                        const trackNameElement = document.getElementById('current-track-name');
                        if (trackNameElement) {
                            trackNameElement.textContent = trackName;
                        }
                        
                        // إنشاء نغمات بسيطة بحسب نوع المقام المناسب للمثال
                        let notes = [];
                        let durations = [];
                        let interval = 0.3;
                        
                        // اختيار النغمات بحسب الآلة
                        switch (trackUrl) {
                            case 'piano':
                                notes = ['C4', 'D4', 'E4b', 'F4', 'G4', 'A4', 'B4b', 'C5'];
                                break;
                            case 'guitar':
                                notes = ['D4', 'E4b', 'F4', 'G4', 'A4', 'B4b', 'C5', 'D5'];
                                break;
                            case 'harp':
                                notes = ['G3', 'A3', 'B3b', 'C4', 'D4', 'E4b', 'F4', 'G4'];
                                break;
                            case 'bass':
                                notes = ['A2', 'B2b', 'C3', 'D3', 'E3b', 'F3', 'G3', 'A3'];
                                break;
                            case 'trumpet':
                                notes = ['E4', 'F4#', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'];
                                break;
                            case 'casio':
                                notes = ['C3', 'D3', 'E3b', 'F3', 'G3', 'A3b', 'B3', 'C4'];
                                break;
                            default:
                                notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
                        }
                        
                        // عزف النغمات بالتتابع
                        for (let i = 0; i < notes.length; i++) {
                            synth.triggerAttackRelease(notes[i], '8n', now + (i * interval));
                        }
                        
                        // تحديث الحالة
                        audioPlayer.isPlaying = true;
                        audioPlayer.updatePlayButton();
                        
                        // إعادة الوضع بعد الانتهاء
                        setTimeout(() => {
                            audioPlayer.isPlaying = false;
                            audioPlayer.updatePlayButton();
                        }, notes.length * interval * 1000 + 500);
                        
                    } else {
                        alert('مكتبة Tone.js غير متوفرة. يرجى تحميل الصفحة مرة أخرى.');
                    }
                }, 500); // انتظار تحميل المكتبة
                
                // Visual feedback
                exampleItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Create a simple scale player for demonstration
    const playScaleBtn = document.getElementById('play-scale-btn');
    if (playScaleBtn) {
        playScaleBtn.addEventListener('click', function() {
            const maqamType = this.getAttribute('data-maqam');
            
            // Use Tone.js for scale playback
            if (typeof Tone !== 'undefined') {
                const synth = new Tone.Synth().toDestination();
                
                // Define scales based on maqam type
                let notes = [];
                let durations = [];
                
                switch(maqamType) {
                    case 'rast':
                        // مقام الراست: دو - ري - مي نصف بيمول (شرقية) - فا - صول - لا - سي نصف بيمول - دو
                        notes = ['C4', 'D4', 'E4b', 'F4', 'G4', 'A4', 'B4b', 'C5', 'B4b', 'A4', 'G4', 'F4', 'E4b', 'D4', 'C4'];
                        break;
                    case 'bayati':
                        // مقام البياتي: ري - مي نصف بيمول - فا - صول - لا - سي بيمول - دو - ري
                        notes = ['D4', 'E4b', 'F4', 'G4', 'A4', 'B4b', 'C5', 'D5', 'C5', 'B4b', 'A4', 'G4', 'F4', 'E4b', 'D4'];
                        break;
                    case 'sikah':
                        // مقام السيكاه: مي نصف بيمول - فا - صول - لا بيمول - سي بيمول - دو - ري - مي نصف بيمول
                        notes = ['E4b', 'F4', 'G4', 'A4b', 'B4b', 'C5', 'D5', 'E5b', 'D5', 'C5', 'B4b', 'A4b', 'G4', 'F4', 'E4b'];
                        break;
                    case 'hijaz':
                        // مقام الحجاز: ري - مي بيمول - فا دييز - صول - لا - سي بيمول - دو - ري
                        notes = ['D4', 'E4b', 'F4#', 'G4', 'A4', 'B4b', 'C5', 'D5', 'C5', 'B4b', 'A4', 'G4', 'F4#', 'E4b', 'D4'];
                        break;
                    case 'saba':
                        // مقام الصبا: ري - مي نصف بيمول - فا - صول بيمول - لا - سي بيمول - دو - ري
                        notes = ['D4', 'E4b', 'F4', 'G4b', 'A4', 'B4b', 'C5', 'D5', 'C5', 'B4b', 'A4', 'G4b', 'F4', 'E4b', 'D4'];
                        break;
                    case 'kurd':
                        // مقام الكرد: ري - مي بيمول - فا - صول - لا - سي بيمول - دو - ري
                        notes = ['D4', 'E4b', 'F4', 'G4', 'A4', 'B4b', 'C5', 'D5', 'C5', 'B4b', 'A4', 'G4', 'F4', 'E4b', 'D4'];
                        break;
                    case 'nahawand':
                        // مقام النهاوند: دو - ري - مي بيمول - فا - صول - لا بيمول - سي - دو
                        notes = ['C4', 'D4', 'E4b', 'F4', 'G4', 'A4b', 'B4', 'C5', 'B4', 'A4b', 'G4', 'F4', 'E4b', 'D4', 'C4'];
                        break;
                    case 'ajam':
                        // مقام العجم: دو - ري - مي - فا - صول - لا - سي بيمول - دو
                        notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4b', 'C5', 'B4b', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
                        break;
                    default:
                        notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4', 'C4'];
                }
                
                // Set up note durations (all eighth notes)
                durations = Array(notes.length).fill('8n');
                
                // Schedule the notes
                let time = Tone.now();
                for (let i = 0; i < notes.length; i++) {
                    synth.triggerAttackRelease(notes[i], durations[i], time);
                    time += 0.3; // Add time between notes
                }
            } else {
                alert('مكتبة Tone.js غير متوفرة. يرجى التحقق من اتصالك بالإنترنت.');
            }
        });
    }
});

// Add Tone.js library dynamically
function loadToneJS() {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js';
    script.async = true;
    document.head.appendChild(script);
}

// Load Tone.js when page loads
loadToneJS();
