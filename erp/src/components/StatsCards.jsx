export default function StatsCards() {
  const cards = [
    { title: "Pending Tasks", value: "5", color: "bg-orange-500" },
    { title: "Today's Attendance", value: "Present", color: "bg-green-500" },
    { title: "Leave Balance", value: "8 Days", color: "bg-blue-500" },
    { title: "Upcoming Holiday", value: "Diwali - 4 Nov", color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map(card => (
        <div
          key={card.title}
          className={`${card.color} text-white p-6 rounded-xl shadow`}
        >
          <p className="text-sm">{card.title}</p>
          <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
        </div>
      ))}
    </div>
  );
}
