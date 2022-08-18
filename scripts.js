var images = [
    "IMG_20220809_132813392_HDR.jpg[horiz]",
    "IMG_20220810_142147135.jpg",
    "IMG_20220809_141641266.jpg",
    "IMG_20220815_141916_473.jpg",
    "IMG_20220815_155651_515.jpg[horiz]",
    "IMG_20220815_155700_280.jpg",
    "IMG_20220815_124328187.jpg",
    "IMG_20220815_150336373.jpg",
    "IMG_20220817_012713_591.jpg",
    "IMG_20220817_012747_140.jpg[horiz]",
    "Snapchat-569813939.jpg",
    "IMG_20220817_012837_567.jpg",
    "IMG_20220817_012841_257.jpg",
    "screen-20220723-011053.mp4",
    "Screenshot_20220622-224731.png",
    "Screenshot_20220622-224731~3.png",
    "Screenshot_20220622-224731~4.png",
    "Snapchat-185449600.jpg",
    "Snapchat-236166079.mp4",
    "Snapchat-285124568.jpg",
    "Snapchat-328048318.jpg",
    "Snapchat-362630744.jpg",
    "Snapchat-438706666.jpg",
    "Snapchat-702442003.jpg",
    "Snapchat-775504642.jpg",
    "Snapchat-792768138.mp4",
    "Snapchat-835495953.jpg",
    "Snapchat-919393230.jpg",
    "Snapchat-932124385.jpg",
    "Snapchat-1788840141.mp4",
    "Snapchat-1036799072.jpg",
    "Snapchat-1234009688.jpg",
    "Snapchat-1250471999.jpg",
    "Snapchat-1472513354.mp4",
    "Snapchat-1572937232.jpg",
    "Snapchat-1631406770.jpg",
    "Snapchat-1651029347.jpg",
    "Snapchat-1680798407.jpg",
    "Snapchat-1862966345.jpg",
    "Snapchat-1912773293.jpg",
    "Snapchat-1913761122.jpg",
    "worship.mp4",
    "Snapchat-2089659690.jpg",
    "Snapchat-2121542255.jpg",
    "Snapchat-2128920627.jpg",
];
var inFrame = false;

for (var i in images) {
    if (images[i].endsWith('.mp4') || images[i].endsWith('.mov')) {
        $(".images").append(`
            <video>
                <source src="media/${images[i]}" type="video/mp4">
                <source src="media/${images[i]}" type="video/ogg">
            </video>
        `);
    } else if (images[i].endsWith('[vhoriz]')) {
        var first = images[i].replace("[vhoriz]", "");
        var second = images[parseInt(i) + 1];
        $(".images").append(`
            <div class="horiz">
                <img src="media/${first}" alt="prob some bad picture of Hannah" id="${i}"/>
                <video>
                    <source src="media/${second}" type="video/mp4">
                    <source src="media/${second}" type="video/ogg">
                </video>
            </div>
        `);
        images.splice(i, 1);
    } else if (images[i].endsWith("[horiz]")) {
        var first = images[i].replace("[horiz]", "");
        var second = images[parseInt(i) + 1];
        $(".images").append(`
            <div class="horiz">
                <img src="media/${first}" alt="prob some bad picture of Hannah" id="${i}"/>
                <img src="media/${second}" alt="prob some bad picture of Hannah" id="${i}"/>
            </div>
        `);
        images.splice(i, 1);
    } else {
        $(".images").append(`
            <img src="media/${images[i]}" alt="prob some bad picture of Hannah" id="${i}"/>
        `);
    }
}
$(".images").append(`
<div class="end">
    <h2>Happy Birthday</h2>
    <p>
        I asked all of your friends for pictures and videos of you and them doing shit that they thought you would
        find funny / happy. I hope you liked it 😭.
    </p>
    <p>
        On a serious note, thanks for inviting me to your birthday party, I'm sure i had a good time LOL. Remind me
        to show you the pictures that vinh tried to send to me once you open this. Also since my other gift was very
        low effort i'm gonna try to think of something else to give you but if you have something you want that's
        like $15-20 tell me and I'll probably get it for you. unless it's like something weird that my dad would
        disown me for buying. then don't.
    </p>
    <p>
        All the images and videos on this page are uploaded in the github repo that I used to host this so if you want to download any of them go <a href="https://github.com/isaacmaddox/hannah16/tree/main/media" target="_blank">to this link</a>.
    </p>
</div>
`);
$("body, html").on('scroll', function () {
    var playing = false;
    $("video").each(function () {
        if ($(this).offset().left < $("body").width() && $(this).offset().left + $(this).width() > 0) {
            $(this).addClass('playing');
            playing = true;
            if ($(this)[0].paused)
                $(this)[0].play();
        } else {
            $(this).removeClass('playing');
            $(this)[0].pause();
            if (!playing)
                playing = false;
        }
    });
    if (!playing) {
        $("audio").prop('volume', 1);
    } else {
        $('audio').prop('volume', 0.1);
    }
});

function load() {
    $('.title').addClass('open');
    $('.images').addClass('open');
    $('audio.primary')[0].play();
    setTimeout(() => {
        $(document).ready(function () {
            $("body, html").animate({
                scrollLeft: $('.images').width() - $(window).width(),
            }, 201000, "linear");
            $(".bar").animate({
                width: "100%",
            }, 201000, "linear");
        });
    }, 1000);
    setTimeout(() => {
        $("body").addClass('finished');
        $("audio.primary")[0].pause();
        $("audio.secondary")[0].play();
    }, 201000);
}

$(".images").on('mousewheel', function (event) {
    console.log($(this));
    if (event.originalEvent.wheelDelta >= 0) {
        $("body, html").animate({
            scrollLeft: $("body").scrollLeft() - 100,
        }, 0);
    }
    else {
        $("body, html").animate({
            scrollLeft: $("body").scrollLeft() + 100,
        }, 0);
    }
});

$("video").on('click', function () {
    if (!$("body").hasClass('finished'))
        return;
    if ($(this)[0].paused)
        $(this)[0].play();
    else
        $(this)[0].pause();
});