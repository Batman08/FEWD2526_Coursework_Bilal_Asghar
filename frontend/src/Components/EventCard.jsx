export default function EventCard({ event, children }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
      {/* Event Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.event}</h3>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Date:</span> {event.date}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Time:</span> {event.startTime} – {event.endTime}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Location:</span> {event.location}
      </p>

      <p className="text-gray-700 mb-1">
        <span className="font-semibold">Required Items:</span>{" "}
        {Array.isArray(event.requiredItems)
          ? event.requiredItems.join(", ")
          : event.requiredItems}
      </p>

      <p className="text-gray-700 mb-4">
        <span className="font-semibold">Organiser:</span> {event.organiser}
      </p>

      {/* Map */}
      {event.location && (
        <button
          type="button"
          className="px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium shadow-sm transition mb-4 cursor-pointer"
          onClick={() => {
            const query = encodeURIComponent(event.location);
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${query}`,
              "_blank"
            );
          }}
        >
          <i className="bi bi-geo-alt-fill mr-2"></i>
          View on Map
        </button>
      )}

      {/* Edit + Delete Buttons (Right-Aligned) */}
      {children && (
        <div className="flex justify-end gap-3 mt-2">
          {children}
        </div>
      )}
    </div>
  );
}