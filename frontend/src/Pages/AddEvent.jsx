import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEvent() {
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [requiredItems, setRequiredItems] = useState("");
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const response = await fetch("http://localhost:3002/new-event-entry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                    Add New Event
                </h1>

                {message && (
                    <p className="text-center text-sm text-teal-600 mb-4">{message}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Event Name
                        </label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
                            placeholder="e.g. Swimming Lesson"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
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
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Local Leisure Centre"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Required Items
                        </label>
                        <textarea
                            value={requiredItems}
                            onChange={(e) => setRequiredItems(e.target.value)}
                            placeholder="e.g. swimming bag, towel"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
                            rows={3}
                        />
                    </div>

                    <button type="submit" className="w-full rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 shadow-md transition active:scale-95 cursor-pointer">
                        Add Event
                    </button>
                </form>
            </div>
        </div>
    );
}