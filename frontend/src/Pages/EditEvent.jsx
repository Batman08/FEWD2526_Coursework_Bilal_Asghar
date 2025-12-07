import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [requiredItems, setRequiredItems] = useState("");

  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Load current user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(stored);
    setCurrentUser(user);
  }, [navigate]);

  // Load event details
  useEffect(() => {
    if (!currentUser) return;

    fetch(`${API_URL}/event/${id}?user=${currentUser.username}&family=${currentUser.userfamily}`,
      {
        method: "GET",
        headers: {
          "Authorization": currentUser.token
        }
      }).then((res) => {
        if (!res.ok) throw new Error("Event not found or access denied");
        return res.json();
      })
      .then((data) => {
        setEventName(data.event);
        setDate(data.date);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setLocation(data.location);
        setRequiredItems(
          Array.isArray(data.requiredItems)
            ? data.requiredItems.join(", ")
            : data.requiredItems
        );
        setLoading(false);
      })
      .catch(() => {
        setMessage("Unable to load event.");
        setLoading(false);
      });
  }, [currentUser, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const payload = {
      organiser: currentUser.username,
      event: eventName,
      date,
      startTime,
      endTime,
      location,
      requiredItems: requiredItems.split(",").map((item) => item.trim()),
      username: currentUser.username,
      userfamily: currentUser.userfamily,
      userrole: currentUser.userrole,
    };

    try {
      const response = await fetch(`${API_URL}/update-event/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": currentUser.token
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();


      if (data.success) {
        setMessage("Event updated successfully!");
      }
      else {
        setMessage(data.msg || "Unable to update event.");
        return;
      }

      setTimeout(() => navigate("/events"), 600);
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 to-purple-50 px-6 py-16 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Edit Event
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Date
            </label>
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Required Items (comma separated)
            </label>
            <textarea
              value={requiredItems}
              onChange={(e) => setRequiredItems(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-teal-300"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 shadow-md transition active:scale-95"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}