let img1B, bgImg51;
let offsetY = 0;
let maxOffset;
let vid55;
let videoVisible = false;
let bgAudio; // 背景音乐
let audioStarted = false;
let userInteracted = false; // 添加用户交互标记
let assetsLoaded = false; // 添加资源加载标记

function preload() {
  try {
    img1B = loadImage("1B.png");
    bgImg51 = loadImage("51.png");
    bgAudio = loadSound("audio.mp3");
  } catch (error) {
    console.log("Error loading assets:", error);
  }
}

function setup() {
  createCanvas(1920, 1080);
  
  // 检查图片是否加载成功
  if (bgImg51 && bgImg51.height > 0) {
    maxOffset = bgImg51.height - height;
    assetsLoaded = true;
  } else {
    console.log("Background image failed to load");
    maxOffset = 0;
  }
  
  // 创建视频元素
  try {
    vid55 = createVideo("55.mp4");
    vid55.size(1920, 1080);
    vid55.hide();
    vid55.volume(0.5);
    
    // 添加视频加载事件监听
    vid55.elt.addEventListener('loadeddata', () => {
      console.log("Video loaded successfully");
    });
    
    vid55.elt.addEventListener('error', (e) => {
      console.log("Video failed to load:", e);
    });
  } catch (error) {
    console.log("Error creating video:", error);
  }
  
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
  
  // 只有在资源加载成功时才绘制
  if (assetsLoaded && img1B) {
    imageMode(CENTER);
    image(img1B, mouseX, mouseY, 1920, 1920);
  }
  
  if (assetsLoaded && bgImg51) {
    imageMode(CORNER);
    image(bgImg51, 0, -offsetY, width, bgImg51.height);
    
    let videoYinCanvas = (bgImg51.height - 1080) - offsetY;
    let isFullyVisible = videoYinCanvas >= 0 && videoYinCanvas + 1080 <= height;
    
    if (isFullyVisible && !videoVisible && vid55) {
      try {
        vid55.loop();
        videoVisible = true;
      } catch (error) {
        console.log("Error playing video:", error);
      }
    }
    
    if (vid55) {
      image(vid55, 0, videoYinCanvas, 1920, 1080);
    }
  }
}

function mouseWheel(event) {
  if (assetsLoaded) {
    offsetY = constrain(offsetY + event.delta, 0, maxOffset);
  }
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
    // 移除了 userStartAudio() 调用，直接启动音频
    userInteracted = true;
    
    if (bgAudio && bgAudio.isLoaded()) {
      try {
        bgAudio.loop(); // 自动循环播放
        bgAudio.setVolume(0.7); // 设置音量
        audioStarted = true;
        console.log("Audio started playing");
      } catch (error) {
        console.log("Error playing audio:", error);
      }
    } else {
      console.log("Audio file not loaded or doesn't exist");
    }
  }
}