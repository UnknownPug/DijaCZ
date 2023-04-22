$(function () {
    let playerTrack = $("#player-track"),
        albumName = $("#album-name"),
        trackName = $("#track-name"),
        albumArt = $("#album-art"),
        sArea = $("#s-area"),
        seekBar = $("#seek-bar"),
        trackTime = $("#track-time"),
        insTime = $("#ins-time"),
        sHover = $("#s-hover"),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find("i"),
        nTime = 0,
        buffInterval = null,
        tFlag = false,
        albums = [
            "Radiožurnál",
            "Dvojka",
            "Vltava",
            "International",
            "D-Dur",
            "Jazz",
            "Junior Maxi",
            "Plus",
            "Pohoda",
            "DAB Praha",
            "Sport",
            "Wave"
        ],
        trackNames = ["Český Rozhlas"],
        albumArtworks = ["_1", "_2", "_3", "_4", "_5", "_6", "_7", "_8", "_9", "_10", "_11", "_12"],
        trackUrl = [
            "https://rozhlas.stream/radiozurnal_mp3_128.mp3",
            "https://rozhlas.stream/dvojka_mp3_128.mp3",
            "https://rozhlas.stream/vltava_mp3_128.mp3",
            "https://rozhlas.stream/cro7_mp3_128.mp3",
            "https://rozhlas.stream/ddur_mp3_128.mp3",
            "https://rozhlas.stream/jazz_mp3_128.mp3",
            "https://rozhlas.stream/juniormaxi_mp3_128.mp3",
            "https://rozhlas.stream/plus_mp3_128.mp3",
            "https://rozhlas.stream/pohoda_mp3_128.mp3",
            "https://rozhlas.stream/regina_mp3_128.mp3",
            "https://rozhlas2.stream/sport_mp3_128.mp3",
            "https://rozhlas.stream/wave_mp3_128.mp3"
        ],
        playPreviousTrackButton = $("#play-previous"),
        playNextTrackButton = $("#play-next"),
        currIndex = -1;

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass("active");
                albumArt.addClass("active");
                checkBuffering();
                i.attr("class", "fas fa-pause");
                audio.play();
            } else {
                playerTrack.removeClass("active");
                albumArt.removeClass("active");
                clearInterval(buffInterval);
                albumArt.removeClass("buffering");
                i.attr("class", "fas fa-play");
                audio.pause();
            }
        }, 300);
    }

    function showHover(event) {
        let seekBarPos = sArea.offset();
        let seekT = event.clientX - seekBarPos.left;
        let seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        let cM = seekLoc / 60;

        let ctMinutes = Math.floor(cM);
        let ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if (ctMinutes < 0 || ctSeconds < 0) {
            return;
        }
        if (ctMinutes < 0 || ctSeconds < 0) {
            return;
        }
        if (ctMinutes < 10) {
            ctMinutes = "0" + ctMinutes;
        }
        if (ctSeconds < 10) {
            ctSeconds = "0" + ctSeconds;
        }
        if (isNaN(ctMinutes) || isNaN(ctSeconds)) {
            insTime.text("--:--");
        } else {
            insTime.text(ctMinutes + ":" + ctSeconds);
        }
        insTime.css({left: seekT, "margin-left": "-21px"}).fadeIn(0);
    }

    function hideHover() {
        sHover.width(0);
        insTime.text("00:00").css({left: "0px", "margin-left": "0px"}).fadeOut(0);
    }

    function playFromClickedPos() {
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass("active");
        }

        let curMinutes = Math.floor(audio.currentTime / 60);
        let curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        let durMinutes = Math.floor(audio.duration / 60);
        let durSeconds = Math.floor(audio.duration - durMinutes * 60);

        let playProgress = (audio.currentTime / audio.duration) * 100;
        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds)) {
            trackTime.removeClass("active");
        } else {
            trackTime.addClass("active");
        }
        seekBar.width(playProgress + "%");
        if (playProgress === 100) {
            i.attr("class", "fa fa-play");
            seekBar.width(0);
            albumArt.removeClass("buffering").removeClass("active");
            clearInterval(buffInterval);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
    }

    function selectTrack(flag) {
        if (flag === 0 || flag === 1) ++currIndex;
        else --currIndex;

        let currAlbum;
        let currTrackName;
        let currArtwork;
        if (currIndex > -1 && currIndex < albumArtworks.length) {
            if (flag === 0) i.attr("class", "fa fa-play");
            else {
                albumArt.removeClass("buffering");
                i.attr("class", "fa fa-pause");
            }
            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];

            nTime = 0;

            if (flag !== 0) {
                audio.play();
                playerTrack.addClass("active");
                albumArt.addClass("active");

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find("img.active").removeClass("active");
            $(`#${currArtwork}`).addClass("active");
        } else {
            if (flag === 0 || flag === 1) --currIndex;
            else ++currIndex;
        }
    }

    function initPlayer() {
        audio = new Audio();
        selectTrack(0);
        audio.loop = false;
        playPauseButton.on("click", playPause);
        sArea.mousemove(function (event) {
            showHover(event);
        });
        sArea.mouseout(hideHover);
        sArea.on("click", playFromClickedPos);
        $(audio).on("timeupdate", updateCurrTime);
        playPreviousTrackButton.on("click", function () {
            selectTrack(-1);
        });
        playNextTrackButton.on("click", function () {
            selectTrack(1);
        });
    }
    initPlayer();
});
