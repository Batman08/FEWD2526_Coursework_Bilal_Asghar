import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    return (

        <div className="page" style={{ textAlign: "center" }}>

            {/* HERO */}
            <header className="bg-[#82A69C] text-white py-20 px-6 shadow-lg">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Family Organiser App
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-green-50">
                        A calm and organised way to manage your family&apos;s schedule.
                    </p>

                    <a
                        href="/register"
                        className="mt-8 inline-block bg-white text-[#4F6F67] font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
                    >
                        Get Started
                    </a>
                </div>
            </header>

            {/* FEATURES */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">
                        Simple, Clean & Organised
                    </h2>

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">

                        {/* Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-center mb-4">
                                <FontAwesomeIcon
                                    icon={['fa', 'users']}
                                    className="text-[#5BBEA6] text-4xl"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 text-center">Family Groups</h3>
                            <p className="text-gray-500 mt-2 text-center">
                                Keep events secure and private to your family.
                            </p>
                        </div>

                        {/* Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-center mb-4">
                                <FontAwesomeIcon
                                    icon={['fa', 'calendar-days']}
                                    className="text-[#5BBEA6] text-4xl"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 text-center">Event Scheduling</h3>
                            <p className="text-gray-500 text-center mt-2">
                                Create, update and track family activities effortlessly.
                            </p>
                        </div>

                        {/* Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-center mb-4">
                                <FontAwesomeIcon
                                    icon={['fa', 'magnifying-glass']}
                                    className="text-[#5BBEA6] text-4xl"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 text-center">Search & Filter</h3>
                            <p className="text-gray-500 text-center mt-2">
                                Find events quickly with simple filtering tools.
                            </p>
                        </div>

                        {/* Card */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex justify-center mb-4">
                                <FontAwesomeIcon
                                    icon={['fa', 'shield-halved']}
                                    className="text-[#5BBEA6] text-4xl"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 text-center">Secure Access</h3>
                            <p className="text-gray-500 text-center mt-2">
                                Only your authorised family members can view the data.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-bold text-gray-700">
                        Start Organising with Calm & Clarity
                    </h2>
                    <p className="mt-3 text-gray-500">
                        Build a simple, structured routine for your family.
                    </p>

                    <a
                        href="/register"
                        className="mt-6 inline-block bg-[#5BBEA6] text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-[#4FAE97] transition"
                    >
                        Create Account
                    </a>
                </div>
            </section>


        </div>

    );
};

export default Home;