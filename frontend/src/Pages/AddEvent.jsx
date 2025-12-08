import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddEvent() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [requiredItems, setRequiredItems] = useState("");
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    //voice recognition states
    const [recordingField, setRecordingField] = useState(null);
    const recognitionRef = useRef(null);
    const recordingFieldRef = useRef(null);
    const finalTranscriptRef = useRef({
        eventName: "",
        location: "",
        requiredItems: ""
    });

    const navigate = useNavigate();

    // Load logged in user
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (!stored) {
            navigate("/login");
            return;
        }

        const user = JSON.parse(stored);
        setCurrentUser(user);
    }, [navigate]);

    // Setup speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return console.warn("Speech recognition not supported");

        const recog = new SpeechRecognition();
        recog.continuous = true;          // keep listening
        recog.interimResults = true;      // partial results
        recog.lang = "en-GB";

        recog.onresult = (event) => {
            let interimTranscript = "";

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    // append final transcript
                    if (recordingFieldRef.current === "eventName") {
                        finalTranscriptRef.current.eventName += transcript + " ";
                        setEventName(finalTranscriptRef.current.eventName);
                    } else if (recordingFieldRef.current === "location") {
                        finalTranscriptRef.current.location += transcript + " ";
                        setLocation(finalTranscriptRef.current.location);
                    }
                    else if (recordingFieldRef.current === "requiredItems") {
                        finalTranscriptRef.current.requiredItems += transcript + " ";
                        setRequiredItems(finalTranscriptRef.current.requiredItems);
                    }
                } else {
                    // show live interim transcript
                    interimTranscript += transcript;
                    if (recordingFieldRef.current === "eventName") {
                        setEventName(finalTranscriptRef.current.eventName + interimTranscript);
                    } else if (recordingFieldRef.current === "location") {
                        setLocation(finalTranscriptRef.current.location + interimTranscript);
                    } else if (recordingFieldRef.current === "requiredItems") {
                        setRequiredItems(finalTranscriptRef.current.requiredItems + interimTranscript);
                    }
                }
            }
        };

        recog.onstart = () => {
            console.log("Recognition started");
        };

        recog.onend = () => {
            if (recordingFieldRef.current && recognitionRef.current) {
                recognitionRef.current.start();
            }

            console.log("Recognition ended");
        }

        recognitionRef.current = recog;
    }, []);

    const handleVoiceClick = (field) => {
        if (!recognitionRef.current) return;

        if (recordingFieldRef.current === field) {
            recognitionRef.current.stop();
            recordingFieldRef.current = null;
            setRecordingField(null);
        } else {
            recordingFieldRef.current = field;
            setRecordingField(field);
            recognitionRef.current.start();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (!currentUser) {
            setMessage("You must be logged in to add an event.");
            return;
        }

        const payload = {
            event: eventName,
            date,
            startTime,
            endTime,
            location,
            requiredItems,
            username: currentUser.username,
            userfamily: currentUser.userfamily,
            userrole: currentUser.userrole, // MUST be administrator per backend
        };

        try {
            const response = await fetch(`${API_URL}/new-event-entry`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": currentUser.token
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!data.success) {
                setMessage(data.msg || "Unable to add event.");
                return;
            }

            setMessage("Event added successfully!");
            setTimeout(() => navigate("/events"), 600);
        } catch (error) {
            console.error("Error adding event:", error);
            setMessage("An unexpected error occurred.");
        }
        finally {
            setLoading(false);
        }
    };

    // Prevent UI flashing before user loads
    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-purple-50">
                <p className="text-gray-700 text-lg">Checking login...</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 px-6 py-16 flex items-center justify-center">
            <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                    <FontAwesomeIcon icon={['fa', 'calendar-plus']} /> Add New Event
                </h1>

                {message && (
                    <div className={`mb-4 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium
                                    ${message.toLowerCase().includes("success") ? "bg-green-50 border-green-400 text-green-700" : "bg-red-50 border-red-400 text-red-700"
                        }`}>
                        <span className="text-xl">{message.toLowerCase().includes("success") ? <FontAwesomeIcon icon={['fa', 'tick']} /> : <FontAwesomeIcon icon={['fa', 'circle-exclamation']} />}</span>
                        <p>{message}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block text-sm font-semibold text-gray-700 mb-0">
                        Event Name
                    </label>
                    <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-teal-300">
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full px-4 py-2 outline-none"
                            placeholder="e.g. Swimming Lesson"
                            required
                        />
                        <button type="button" onClick={() => handleVoiceClick("eventName")} className={`px-4 py-2 border-l border-gray-300 focus:outline-none cursor-pointer bg-gray-100 text-gray-700`}>
                            <FontAwesomeIcon icon={['fa', 'microphone']} className={`${recordingField === "eventName" ? "text-red-500" : "text-gray-700"}`} />
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300 outline-none"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Start Time
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300 outline-none"
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-semibold text-gray-700">
                                End Time
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-teal-300 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <label className="block text-sm font-semibold text-gray-700 mb-0">
                        Location
                    </label>
                    <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-teal-300">
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Local Leisure Centre"
                            className="flex-1 px-4 py-2 outline-none"
                            required
                        />
                        <button type="button" onClick={() => handleVoiceClick("location")} className={`px-4 py-2 border-l border-gray-300 focus:outline-none cursor-pointer bg-gray-100 text-gray-700`}>
                            <FontAwesomeIcon icon={['fa', 'microphone']} className={`${recordingField === "location" ? "text-red-500" : "text-gray-700"}`} />
                        </button>
                    </div>


                    <label className="block text-sm font-semibold text-gray-700 mb-0">
                        Required Items
                    </label>
                    <div className="flex items-center rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-teal-300">
                        <textarea
                            value={requiredItems}
                            onChange={(e) => setRequiredItems(e.target.value)}
                            placeholder="e.g. swimming bag, towel"
                            className="w-full px-4 py-2 outline-none"
                            rows={3}
                        />
                        <button type="button" onClick={() => handleVoiceClick("requiredItems")} className={`px-4 py-2 h-[-webkit-fill-available] border-l border-gray-300 focus:outline-none cursor-pointer bg-gray-100 text-gray-700`}>
                            <FontAwesomeIcon icon={['fa', 'microphone']} className={`${recordingField === "requiredItems" ? "text-red-500" : "text-gray-700"}`} />
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className="w-full rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 shadow-md transition active:scale-95 cursor-pointer">
                        {loading ? (<FontAwesomeIcon icon={['fa', 'spinner']} spin />) : <FontAwesomeIcon icon={['fa', 'plus']} />} {loading ? "Adding..." : "Add Event"}
                    </button>
                </form>
            </div>
        </div>
    );
}