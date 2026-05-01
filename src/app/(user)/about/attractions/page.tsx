import Link from "next/link";

const attractions = [
  {
    title: "The River Walk",
    distance: "8 minutes away",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=900",
    desc: "A scenic walking route along the Thames, ideal for evening views and relaxed city photography.",
  },
  {
    title: "Royal Gardens",
    distance: "12 minutes away",
    img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&q=80&w=900",
    desc: "Peaceful green space with landscaped gardens, quiet seating areas and seasonal flower displays.",
  },
  {
    title: "Historic Market Quarter",
    distance: "15 minutes away",
    img: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=900",
    desc: "A lively district with boutique shops, cafés, local food vendors and weekend artisan stalls.",
    },
    ];

    export default function AttractionsPage() {
    return (
        <main className="min-h-screen bg-[#FBFBFD] text-[#1d1d1f] px-6 py-24">
        <section className="max-w-[1400px] mx-auto">
            <Link href="/about" className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black">
            ← Back to Experience
            </Link>

            <div className="mt-16 mb-16">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                Around Atlantica
            </p>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                Local Attractions
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
                Explore curated nearby experiences for guests staying at Atlantica.
            </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {attractions.map((item) => (
                <div key={item.title} className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-[44px] overflow-hidden border border-gray-300/50 shadow-sm hover:shadow-2xl transition-all duration-500">
                <img src={item.img} alt={item.title} className="h-72 w-full object-cover" />
                <div className="p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-3">
                    {item.distance}
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                    {item.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </section>
        </main>
    );
    }