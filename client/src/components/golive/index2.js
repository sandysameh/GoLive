import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting, fetchHlsDownstreamUrl } from "../api/API.js";
import ReactPlayer from "react-player";
import { Button } from "react-bootstrap";
import "../../stylesheet/index2.css";
import TextField from "@mui/material/TextField";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div>
      <Button variant="outline-danger" onClick={onClick}>
        Create Live
      </Button>
    </div>
  );
}

function HLSJoinScreen({ onDownstreamUrl }) {
  const [meetingId, setMeetingId] = useState(null);

  const handleOnClick = async (meetingId) => {
    const downstreamUrl = await fetchHlsDownstreamUrl({ meetingId });

    onDownstreamUrl(downstreamUrl);
  };

  return (
    <div>
      <br />
      <TextField
        id="outlined-basic"
        label="Meeting Id"
        variant="standard"
        className="input-border inputLabel"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />

      {/* <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      /> */}
      <Button
        className="bEdit"
        variant="outline-primary"
        onClick={() => {
          handleOnClick(meetingId);
        }}
      >
        Join
      </Button>
    </div>
  );
}
function VideoComponent(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn } = useParticipant(
    props.participantId
  );

  const videoStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={props.participantId}>
      {micOn && micRef && <audio ref={micRef} autoPlay />}
      {webcamOn && (
        <ReactPlayer
          className="reactPlayercss"
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={true}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //

          height={"40%"}
          width={"70%"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}
function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <Button variant="outline-danger" onClick={leave}>
        Leave
      </Button>
      {/* <ToggleButton
        type="checkbox"
        variant="danger"
        checked={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        toggleMic
      </ToggleButton> */}
      {/* <button onClick={toggleWebcam}>toggleWebcam</button> */}
    </div>
  );
}
function Container(props) {
  const { join, participants, isMeetingJoined, startHls } = useMeeting({
    onMeetingJoined: () => {
      startHls();
    },
    onHlsStarted: (downstreamUrl) => {},
  });

  return (
    <div className="container">
      <h3>Meeting Id : {props.meetingId}</h3>
      {isMeetingJoined ? (
        <div>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <VideoComponent key={participantId} participantId={participantId} />
          ))}
        </div>
      ) : (
        <Button variant="outline-danger" onClick={join}>
          Start Now
        </Button>
      )}
    </div>
  );
}

export function MeetingContainer() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: false,
        webcamEnabled: true,
        name: ".", // Change it to the name of the creater
      }}
      token={authToken}
    >
      <Container meetingId={meetingId} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}
function HLSPlayer({ url, handleOnLeave }) {
  return (
    <>
      <Button variant="outline-danger" onClick={handleOnLeave}>
        Leave
      </Button>
      <ReactPlayer
        className="reactPlayercss"
        playing={true}
        playsinline
        height={"40%"}
        width={"70%"}
        url={url}
      />
    </>
  );
}

export function HLSContainer() {
  const [downstreamUrl, setDownstreamUrl] = useState("");

  const isJoined = useMemo(() => !!downstreamUrl, [downstreamUrl]);

  return isJoined ? (
    <HLSPlayer
      url={downstreamUrl}
      handleOnLeave={() => {
        setDownstreamUrl("");
      }}
    />
  ) : (
    <HLSJoinScreen
      onDownstreamUrl={(_downstreamUrl) => {
        setDownstreamUrl(_downstreamUrl);
      }}
    />
  );
}
