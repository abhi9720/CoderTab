import React from "react";
import "tailwindcss/tailwind.css";
import './Home.css'

import Card from "./Card";

function Home() {
    return (
        <div
            className="home min-h-screen flex flex-col justify-center items-center">

            <div className="herobanner">
                <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">CoderTab</h1>
                <div className="flex flex-wrap justify-center gap-8 ">
                    <Card title="Code Editor" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                                sodales ex justo, vel congue nisl feugiat id." image="https://user-images.githubusercontent.com/68281476/221411823-1e5222a1-dc0b-4f14-af09-eebb20c531c9.png" link="./codeeditor" />

                    <Card title="Json Editor" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                                sodales ex justo, vel congue nisl feugiat id." image="https://user-images.githubusercontent.com/68281476/221411720-2b5bb125-e066-4cd9-9655-98d7a813f965.jpeg" link="./jsoneditor" />

                </div>

            </div>


            <div className="mt-8 flex justify-center flex-col items-center bannerdisplay">

                <div className="editor1display">
                    <article className="description">
                        <h1 className="text-4xl font-bold mb-8">Garlic bread with cheese: What the science tells us</h1>
                        <p>
                            For years parents have espoused the health benefits of eating garlic bread with cheese to their
                            children, with the food earning such an iconic status in our culture that kids will often dress
                            up as warm, cheesy loaf for Halloween.
                        </p>
                        <p>
                            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
                            springing up around the country.
                        </p>

                    </article>
                    <img src={"https://www.remoteinterview.io/assets/img/codepad.jpg"} alt="CodePad 1" className="w-1/2 mb-4" />

                </div>

                <div className="editor2display">
                    <article className="description">
                        <h1 className="text-4xl font-bold mb-8">Garlic bread with cheese: What the science tells us</h1>
                        <p>
                            For years parents have espoused the health benefits of eating garlic bread with cheese to their
                            children, with the food earning such an iconic status in our culture that kids will often dress
                            up as warm, cheesy loaf for Halloween.
                        </p>
                        <p>
                            But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
                            springing up around the country.
                        </p>

                    </article>
                    <img src={"https://www.remoteinterview.io/assets/img/codepad.jpg"} alt="CodePad 1" className="w-1/2 mb-4" />

                </div>


            </div>



            <footer className="bg-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold text-white">
                                Stay connected with us!
                            </h4>
                            <h5 className="text-lg mt-0 mb-2 text-gray-400">
                                Follow us on social media
                            </h5>
                            <div className="mt-6">
                                <button
                                    className="bg-white text-gray-900 active:bg-gray-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <i className="fab fa-twitter"></i> Twitter
                                </button>
                                <button
                                    className="bg-white text-gray-900 active:bg-gray-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <i className="fab fa-facebook"></i> Facebook
                                </button>
                                <button
                                    className="bg-white text-gray-900 active:bg-gray-100 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <i className="fab fa-linkedin"></i> LinkedIn
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-700" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-sm text-white font-semibold py-1">
                                © {new Date().getFullYear()} Your Company
                            </div>
                        </div>
                        <div className="w-full md:w-8/12 px-4">
                            <ul className="flex flex-wrap list-none md:justify-end justify-center">
                                <li>
                                    <a
                                        href="#"
                                        className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                    >
                                        Your Company
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                    >
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3"
                                    >
                                        MIT License
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div >



    );
}

export default Home;
