import React, { Component } from 'react';
import './VideoComponent.css';
import Video from 'twilio-video';
import Parse from 'parse';
import ParseHelper from './helpers/ParseHelper';

export default class VideoComponent extends Component {
	constructor(props) {
		super();
		this.state = {
			identity: null,
			roomName: '',
			roomNameErr: false, // Track error for room name TextField
			previewTracks: null,
			localMediaAvailable: false,
			hasJoinedRoom: false,
			activeRoom: '', // Track the current active room
			student: null,
			teacher: null
		};
		this.joinRoom = this.joinRoom.bind(this);
		this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
		this.roomJoined = this.roomJoined.bind(this);
		this.leaveRoom = this.leaveRoom.bind(this);
		this.detachTracks = this.detachTracks.bind(this);
		this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
		this.fetchClassInformation = this.fetchClassInformation.bind(this);
	}

	handleRoomNameChange(e) {
		let roomName = e.target.value;
		this.setState({ roomName });
	}

	joinRoom() {
		if (!this.state.roomName.trim()) {
			this.setState({ roomNameErr: true });
			return;
		}

		console.log("Joining room '" + this.state.roomName + "'...");
		let connectOptions = {
			name: this.state.roomName
		};

		if (this.state.previewTracks) {
			connectOptions.tracks = this.state.previewTracks;
		}

		// Join the Room with the token from the server and the
		// LocalParticipant's Tracks.
		Video.connect(this.state.token, connectOptions).then(this.roomJoined, error => {
			alert('Could not connect to Twilio: ' + error.message);
		});
	}

	attachTracks(tracks, container) {
		tracks.forEach(track => {
			container.appendChild(track.attach());
		});
	}

	// Attaches a track to a specified DOM container
	attachParticipantTracks(participant, container) {
		var tracks = Array.from(participant.tracks.values());
		this.attachTracks(tracks, container);
	}

	detachTracks(tracks) {
		tracks.forEach(track => {
			track.detach().forEach(detachedElement => {
				detachedElement.remove();
			});
		});
	}

	detachParticipantTracks(participant) {
		var tracks = Array.from(participant.tracks.values());
		this.detachTracks(tracks);
	}

	roomJoined(room) {
		// Called when a participant joins a room
		console.log("Joined as '" + this.state.identity + "'");
		this.setState({
			activeRoom: room,
			localMediaAvailable: true,
			hasJoinedRoom: true
		});

		// Attach LocalParticipant's Tracks, if not already attached.
		var previewContainer = this.refs.localMedia;
		if (!previewContainer.querySelector('video')) {
			this.attachParticipantTracks(room.localParticipant, previewContainer);
		}

		// Attach the Tracks of the Room's Participants.
		room.participants.forEach(participant => {
			console.log("Already in Room: '" + participant.identity + "'");
			var previewContainer = this.refs.remoteMedia;
			this.attachParticipantTracks(participant, previewContainer);
		});

		// When a Participant joins the Room, log the event.
		room.on('participantConnected', participant => {
			console.log("Joining: '" + participant.identity + "'");
		});

		// When a Participant adds a Track, attach it to the DOM.
		room.on('trackAdded', (track, participant) => {
			console.log(participant.identity + ' added track: ' + track.kind);
			var previewContainer = this.refs.remoteMedia;
			this.attachTracks([track], previewContainer);
		});

		// When a Participant removes a Track, detach it from the DOM.
		room.on('trackRemoved', (track, participant) => {
			this.log(participant.identity + ' removed track: ' + track.kind);
			this.detachTracks([track]);
		});

		// When a Participant leaves the Room, detach its Tracks.
		room.on('participantDisconnected', participant => {
			console.log("Participant '" + participant.identity + "' left the room");
			this.detachParticipantTracks(participant);
		});

		// Once the LocalParticipant leaves the room, detach the Tracks
		// of all Participants, including that of the LocalParticipant.
		room.on('disconnected', () => {
			if (this.state.previewTracks) {
				this.state.previewTracks.forEach(track => {
					track.stop();
				});
			}
			this.detachParticipantTracks(room.localParticipant);
			room.participants.forEach(this.detachParticipantTracks);
			this.state.activeRoom = null;
			this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
		});
	}

	componentDidMount() {
        this.getToken()
        .then(res => this.setState({
            identity: res.identity,
            token: res.token
		}))
		.then(this.fetchClassInformation(this.props.notificationID))
        .catch(err => console.log(err));
    }
    
    getToken = async () => {
        const response = await fetch('/token-video');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    }

	leaveRoom() {
		this.state.activeRoom.disconnect();
		this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
	}

	render() {

		// Only show video track after user has joined a room
		let showLocalTrack = this.state.localMediaAvailable ? (
			<div ref="localMedia" className="video-contained" />
		) : (
			''
		);
		// Hide 'Join Room' button if user has already joined a room.
		let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
			<button className="btn btn-secondary" onClick={this.leaveRoom}>Leave Room</button>
		) : (
			<button className="btn btn-primary" onClick={this.joinRoom}>Join Room</button>
		);
		return (
			<div className="VideoComponent row">
				<div className="col-md-3">
					<div  className="leftCol">
						{showLocalTrack}
						<div className="room-info">
							{this.state.teacher && this.state.student &&
								<div>
									<div><b>Participants</b></div>
									<div>Teacher: {this.state.teacher.get("name")}</div>
									<div>Student: {this.state.student.get("name")}</div>
								</div>
							}
							<br/>
							{joinOrLeaveRoomButton}
						</div>
					</div>
				</div>
				<div className="col-md-9">
					<div ref="remoteMedia" id="remote-media" />
				</div>
			</div>
		);
	}

	fetchClassInformation(notificationID) {
		var notificationPromise = ParseHelper.fetchNotificationByID(notificationID);
		return Parse.Promise.when(notificationPromise).then((notif) => {
			var student = notif.get("student");
			var teacher = notif.get("teacher");
			this.setState({
				student: student,
				teacher: teacher,
				roomName: notif.id
			})
		});
	}
}