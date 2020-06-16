import React from 'react' ;
import AgoraRTC from 'agora-rtc-sdk';

const rtc = {
    client: null,
    joined: false,
    published: false,
    localStream: null,
    remoteStream: [],
    params: {}
};

const option = {
    appID: "d7bef4a65cf24ff382e16409ae72fbe3",
    channel: "react-demo",
    uid: null,
    token: "006d7bef4a65cf24ff382e16409ae72fbe3IACwVpWN2oTrU2pevL4b8gdbor0zvazGKUXdVAAM1aDqqrurOf8AAAAAEACtIROL9nTpXgEAAQD0dOle"
};

export default class MyComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()}
    }

    componentDidMount() {

        let self = this;
        rtc.client = AgoraRTC.createClient({mode: 'live', codec: 'h264'});
        rtc.client.init(option.appID, () => {
            console.log('init success');
            console.log(' the date is ' + this.state.date);
        }, (err) => {
            console.error("init error", err);
        });

        rtc.client.setClientRole('host');
        // Join a channel
        rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? +option.uid : null, (uid) => {
            console.log("join channel: " + option.channel + " success, uid: " + uid);
            rtc.params.uid = uid;

            // Create a local stream
            rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
            });

            // Initialize the local stream
            rtc.localStream.init(function () {
                console.log("init local stream success");
                // play stream with html element id "local_stream"
                rtc.localStream.play("local_stream");
            }, function (err) {
                console.error("init local stream failed ", err);
            });
        }, (err) => {
            console.error("client join failed", err)
        })
    }

    render() {
        return <div id="local_stream">
            <span>OK</span>
        </div>
    }
}