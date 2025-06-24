let img1B, bgImg51;
let offsetY = 0;
let maxOffset;
let vid55;
let videoVisible = false;

let bgAudio; // 背景音乐
let audioStarted = false;
let userInteracted = false; // 添加用户交互标记

function preload() {
  img1B = loadImage("1B.png");
  bgImg51 = loadImage("51.png");
  bgAudio = loadSound("audio.mp3");
}

function setup() {
  createCanvas(1920, 1080);
  maxOffset = bgImg51.height - height;

  vid55 = createVideo("55.mp4");
  vid55.size(1920, 1080);
  vid55.hide();
  vid55.volume(0.5); // 设置视频音量（如果需要视频声音）

  // 显示提示信息
  if (!userInteracted) {
    console.log("Click to start the audio");
  }
}

function draw() {
  background(250);

  // 显示提示文本（如果音频未开始）
  if (!audioStarted) {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Click to start the audio", width/2, 50);
  }

  imageMode(CENTER);
  image(img1B, mouseX, mouseY, 1920, 1920);
  imageMode(CORNER);

  image(bgImg51, 0, -offsetY, width, bgImg51.height);

  let videoYinCanvas = (bgImg51.height - 1080) - offsetY;
  let isFullyVisible = videoYinCanvas >= 0 && videoYinCanvas + 1080 <= height;

  if (isFullyVisible && !videoVisible) {
    vid55.loop();
    videoVisible = true;
  }

  image(vid55, 0, videoYinCanvas, 1920, 1080);
}

function mouseWheel(event) {
  offsetY = constrain(offsetY + event.delta, 0, maxOffset);
  return false;
}

// 添加鼠标点击事件来启动音频
function mousePressed() {
  startAudio();
}

// 添加键盘事件来启动音频
function keyPressed() {
  startAudio();
}

function startAudio() {
  if (!audioStarted && !userInteracted) {
    userStartAudio().then(() => {
      if (bgAudio.isLoaded()) {
        bgAudio.loop(); // 自动循环播放
        bgAudio.setVolume(0.7); // 设置音量
        audioStarted = true;
        userInteracted = true;
        console.log("音频已开始播放");
      } else {
        console.log("音频文件未加载完成");
      }
    }).catch(err => {
      console.log("音频启动失败:", err);
    });
  }
}