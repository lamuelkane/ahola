import React, { useEffect } from 'react'

const video = () => {

    useEffect(() => {
        var script = document.createElement("script");
  script.type = "text/javascript";

  script.addEventListener("load", function (event) {
      alert('hey')
    const meeting = new VideoSDKMeeting();

    const config = {
      name: "John Doe",
      apiKey: "8fd5deb6-4b9c-4350-9908-93eb7afde08e", // generated in Setup
      meetingId: "milkyway", // enter your meeting id

      containerId: null,
      redirectOnLeave: "/calender",

      micEnabled: true,
      webcamEnabled: true,
      participantCanToggleSelfWebcam: true,
      participantCanToggleSelfMic: true,

      chatEnabled: true,
      screenShareEnabled: true,
      pollEnabled: true,
      whiteBoardEnabled: true,
      raiseHandEnabled: true,

      recordingEnabled: true,
      recordingWebhookUrl: "https://www.videosdk.live/callback",
      participantCanToggleRecording: true,

      brandingEnabled: true,
      brandLogoURL: "https://picsum.photos/200",
      brandName: "Awesome startup",
      poweredBy: true,

      participantCanLeave: true, // if false, leave button won't be visible

      // Live stream meeting to youtube
      livestream: {
        autoStart: true,
        outputs: [
          // {
          //   url: "rtmp://x.rtmp.youtube.com/live2",
          //   streamKey: "<STREAM KEY FROM YOUTUBE>",
          // },
        ],
      },

      permissions: {
        askToJoin: false, // Ask joined participants for entry in meeting
        toggleParticipantMic: true, // Can toggle other participant's mic
        toggleParticipantWebcam: true, // Can toggle other participant's webcam
      },

      joinScreen: {
        visible: true, // Show the join screen ?
        title: "Daily scrum", // Meeting title
        meetingUrl: window.location.href, // Meeting joining url
      },
    };

    meeting.init(config);
  });

  script.src =
    "https://sdk.videosdk.live/rtc-js-prebuilt/0.1.5/rtc-js-prebuilt.js";
  document.getElementsByTagName("head")[0].appendChild(script);
    })


    return (
        <div>
            
        </div>
    )
}

export default video
