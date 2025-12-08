import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EventCard from "../Components/EventCard";

export default function EventsPage() {
    const API_URL = import.meta.env.VITE_API_URL;

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Delete event
    const handleDelete = async (id) => {
        if (!currentUser) {
            alert("You must be logged in to delete events.");
            navigate("/login");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            const res = await fetch(`${API_URL}/delete-event/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${currentUser.token}`
                },
                body: JSON.stringify({
                    username: currentUser.username,
                    userfamily: currentUser.userfamily,
                }),
            });

            const data = await res.json();

            if (data.success) {
                // Remove event locally
                setEvents((prev) => prev.filter((ev) => ev._id !== id));
            }
            else {
                alert(data.message || "Could not delete event.");
                return;
            }
        } catch (err) {
            console.error("Error deleting event:", err);
            alert("Could not delete event. Please try again later.");
        }
    };

    // Load family events
    useEffect(() => {
        const stored = localStorage.getItem("user");
        const user = JSON.parse(stored);
        setCurrentUser(user);

        const fetchEvents = async () => {
            try {
                const res = await fetch(`${API_URL}/get-family-events`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": user.token
                    },
                    body: JSON.stringify({ familyId: user.userfamily }),
                });

                const data = await res.json();
                if (data != undefined && data != null) {
                    setEvents(data || []);
                    setLoading(false);
                }
                else {
                    setError(data.msg || "Failed to load events.");
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Could not load events. Please try again later.");
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Search filter
    const filteredEvents = events.filter((ev) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        return (
            ev.event?.toLowerCase().includes(term) ||
            ev.location?.toLowerCase().includes(term) ||
            ev.organiser?.toLowerCase().includes(term) ||
            ev.date?.toLowerCase().includes(term)
        );
    });

    // Loading UI
    if (loading)
        return (
            <div className="relative min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 px-6 py-16">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Events</h1>
                    <p className="text-lg text-gray-700"><FontAwesomeIcon icon={['fa', 'spinner']} spin /> Loading events...</p>
                    <p className="text-sm text-yellow-700 mt-2"><FontAwesomeIcon icon={['fa', 'circle-exclamation']} /> Note: This may take a little while if the backend service is warming up.</p>
                </div>
            </div>
        );

    // Error UI
    if (error)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-purple-50 p-6">
                <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center">
                    <p className="text-red-500 font-semibold mb-4">{error}</p>
                </div>
            </div>
        );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 px-6 py-16">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Family Events</h1>

                <p className="text-gray-600 mb-4">
                    You have <span className="font-semibold">{events.length}</span> events
                </p>

                {currentUser && (
                    <p className="text-gray-700 mb-6">
                        Viewing events for family:{" "}
                        <span className="text-teal-600 font-semibold">
                            {currentUser.userfamily}
                        </span>
                    </p>
                )}

                {/* Add New Event Button */}
                <div className="text-end">
                    <button className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-green-800 text-white font-medium shadow-sm transition mb-4 cursor-pointer" onClick={() => navigate("/events/add")}>
                        <FontAwesomeIcon icon={['fa', 'calendar-plus']} /> Add new event
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <label className="block mb-1 font-medium text-gray-700">
                        Search events
                    </label>
                    <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by event, location, organiser, or date"
                    />
                </div>

                {/* Events List */}
                {filteredEvents.length === 0 ? (
                    <p className="text-gray-500">No events match your search.</p>
                ) : (
                    <div className="space-y-4">
                        {filteredEvents.map((ev) => (
                            <EventCard key={ev._id} event={ev}>
                                {currentUser && ev.organiser === currentUser.username && (
                                    <div className="flex gap-3 mt-3">
                                        <button type="button" onClick={() => handleDelete(ev._id)}
                                            className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium shadow-sm transition cursor-pointer">
                                            <FontAwesomeIcon icon={['fa', 'calendar-xmark']} /> Delete
                                        </button>

                                        <button type="button" onClick={() => navigate(`/events/edit/${ev._id}`)}
                                            className="px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm transition cursor-pointer">
                                            <FontAwesomeIcon icon={['fa', 'pen-to-square']} /> Edit
                                        </button>
                                    </div>
                                )}
                            </EventCard>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
