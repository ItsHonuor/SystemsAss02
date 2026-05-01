import Link from "next/link";

const menuData: Record<string, {
    title: string;
    hours: string;
    description: string;
    dishes: { name: string; price: string; desc: string }[];
    }> = {
    breakfast: {
        title: "Breakfast Menu",
        hours: "07:00 — 11:00",
        description: "Start the day with elegant classics and fresh seasonal options.",
        dishes: [
        { name: "Truffle Eggs Benedict", price: "£18", desc: "Poached eggs, toasted muffin, hollandaise and black truffle." },
        { name: "Continental Selection", price: "£14", desc: "Fresh pastries, fruit, yoghurt and preserves." },
        { name: "Avocado Sourdough", price: "£13", desc: "Crushed avocado, chilli, lime and seeded sourdough." },
        ],
    },
    lunch: {
        title: "Lunch Menu",
        hours: "12:30 — 15:30",
        description: "Light, refined dishes designed for relaxed afternoon dining.",
        dishes: [
        { name: "Seared Bluefin Tuna", price: "£26", desc: "Sesame crust, citrus dressing and shaved fennel." },
        { name: "Heritage Tomato Salad", price: "£16", desc: "Burrata, basil oil and aged balsamic." },
        { name: "Lobster Roll", price: "£28", desc: "Warm brioche, lemon mayo and crisp fries." },
        ],
    },
    dinner: {
        title: "Dinner Menu",
        hours: "18:30 — 22:30",
        description: "Signature evening dishes with premium ingredients and careful presentation.",
        dishes: [
        { name: "Wagyu A5 Filet", price: "£72", desc: "Charred baby leeks, jus and smoked potato purée." },
        { name: "Pan-Roasted Sea Bass", price: "£34", desc: "Saffron risotto, samphire and lemon butter." },
        { name: "Dark Chocolate Fondant", price: "£14", desc: "Vanilla bean ice cream and salted caramel." },
        ],
    },
    };

    export default function MenuPage({ params }: { params: { menu: string } }) {
    const selectedMenu = menuData[params.menu];

    if (!selectedMenu) {
        return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
            <div className="text-center">
            <h1 className="text-4xl font-black mb-6">Menu not found</h1>
            <Link href="/dining" className="font-bold underline">
                Back to Dining
            </Link>
            </div>
        </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-24 text-[#1d1d1f]">
        <section className="max-w-4xl mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-[48px] p-12 shadow-xl">
            <Link href="/dining" className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-black">
            ← Back to Dining
            </Link>

            <div className="mt-12 mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-600 mb-4">
                {selectedMenu.hours}
            </p>
            <h1 className="text-6xl font-black tracking-tight mb-6">
                {selectedMenu.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
                {selectedMenu.description}
            </p>
            </div>

            <div className="space-y-6">
            {selectedMenu.dishes.map((dish) => (
                <div key={dish.name} className="bg-white/70 rounded-[28px] p-8 border border-white/50">
                <div className="flex justify-between gap-6">
                    <div>
                    <h2 className="text-2xl font-bold">{dish.name}</h2>
                    <p className="text-gray-500 mt-2">{dish.desc}</p>
                    </div>
                    <p className="text-xl font-black">{dish.price}</p>
                </div>
                </div>
            ))}
            </div>
        </section>
        </main>
    );
    }

