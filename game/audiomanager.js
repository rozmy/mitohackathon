'use strict';

var AudioManager = function (game) {
    return {
        game: game,
        audioCache: [],
        loadAudio: function (name, markers) {
            if (name in this.audioCache) {
                console.log(name + ' is already cached!');
                return false;
            }

            if (name === 'sounds') { // TODO fix
                var audio = this.game.add.audioSprite(name);
            } else {
                var audio = this.game.add.audio(name);
            }

            if (typeof markers !== 'undefined') {
                try {
                    for (var i = 0; i < markers.length; ++i) {
                        audio.addMarker(markers[i].name, markers[i].start, markers[i].stop - markers[i].start, markers[i].volume, markers[i].loop);
                        if (markers[i].loop) {
                            (function(marker, volume) {
                                audio.onMarkerComplete.add(function(currentMarker) {
                                    if (currentMarker != marker) {
                                        audio.play(marker, 0, volume, true);
                                    }
                                });
                            })(markers[i].name, markers[i].volume)
                        }
                    }
                } catch (err) {
                    console.log('Error at loading markers for audio: ' + name + ' ! Markers:');
                    console.log(markers);
                    console.log('Error:');
                    console.log(err);
                }
            }

            this.audioCache[name] = { audio: audio, playing: false };
        },
        play: function (name, marker, volume, loop, force) {
            if (!(name in this.audioCache)) {
                console.log(name + ' is not found in the audio cache!');
                return false;
            }

            var force = force || false;
            if (this.audioCache[name].playing && !force) {
                return true;
            }

            var volume = volume || 1;
            var loop = loop || false;

            if (typeof marker !== 'undefined') {
                if (name === 'sounds') { // TODO fix
                    this.audioCache[name].audio.play(marker, volume);
                } else {
                    this.audioCache[name].audio.play(marker, 0, volume, loop, force);
                }
            } else {
                this.audioCache[name].audio.play('', 0, volume, loop, force);
            }

            this.audioCache[name].playing = true;

            return true;
        },
        forceplay: function(name, marker) {
            return this.play(name, marker, 1, false, true);
        },
        stop: function (name, marker) {
            if (!(name in this.audioCache)) {
                console.log(name + ' is not found in the audio cache!');
                return false;
            }

            if (!this.audioCache[name].playing) {
                return true;
            }

            if (typeof marker !== 'undefined') {
                this.audioCache[name].audio.stop(marker);
            } else {
                this.audioCache[name].audio.stop();
            }

            this.audioCache[name].playing = false;

            return true;
        },
        pause: function (name) {
            if (!(name in this.audioCache)) {
                console.log(name + ' is not found in the audio cache!');
                return false;
            }

            if (!this.audioCache[name].playing) {
                return true;
            }

            this.audioCache[name].audio.pause();
            this.audioCache[name].playing = false;

            return true;
        },
        resume: function (name) {
            if (!(name in this.audioCache)) {
                console.log(name + ' is not found in the audio cache!');
                return false;
            }

            if (this.audioCache[name].playing) {
                return true;
            }

            this.audioCache[name].audio.resume();
            this.audioCache[name].playing = true;

            return true;
        },
        isLoaded: function (name) {
            return (name in this.audioCache);
        },
        isPlaying: function (name, log) {
            if (!(name in this.audioCache)) {
                if (log) {
                    console.log(name + ' is not found in the audio cache!');
                }

                return false;
            }

            return this.audioCache[name].playing;
        }
    };
};