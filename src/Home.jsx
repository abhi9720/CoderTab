import React from "react";
import "tailwindcss/tailwind.css";
import './Home.css'
import codeditorimg from './codeeditor.jpeg'
import jsonditorimg from './jsoneditor.jpeg'
import Card from "./Card";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Home() {
    return (
        <div
            className="home min-h-screen flex flex-col justify-center items-center isolate bg-white">

            <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 w-full sticky top-0">
                <div class="container flex flex-wrap items-center justify-between mx-auto">
                    <a href="https://flowbite.com/" class="flex items-center">
                        <img src="../assets/logo-full.png" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
                        {/* <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CoderTab</span> */}
                    </a>
                </div>
            </nav>
            <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
                    <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
                    <defs>
                        <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#9089FC" />
                            <stop offset="1" stop-color="#FF80B5" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="herobanner">
                {/*  */}
                {/* <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">CoderTab</h1>
                <p>
                    Efficient Programming Made Easy with Code Editor and Versatile JSON Editing Using JsonEditor
                </p> */}


                <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl text-center">
                    Elevate Your Programming Game with
                    <span class="relative whitespace-nowrap text-blue-600">
                        <svg aria-hidden="true" viewBox="0 0 418 42" class="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none"><path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z">
                        </path>
                        </svg>
                        <span class="relative"> CodeTab </span>
                    </span>
                    <br />
                </h1>

                <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-normal text-slate-900">A full-fledged code editor From Writing code to running against test cases and tons of custom themes and sharing code text files.</p>

                <div className="flex flex-wrap justify-center gap-8 mt-20">
                    <Card title="Code Editor" description="Write/run code in multiple languages with custom input, themes, shortcuts, and internet status indicator for programmers." image="https://user-images.githubusercontent.com/68281476/221411823-1e5222a1-dc0b-4f14-af09-eebb20c531c9.png" link="./codeeditor" />

                    <Card title="Json Editor" description="Upload JSON, convert to CSV/XML/YAML, Beautify JSON, validate syntax. Essential tool for working with JSON data." image="https://user-images.githubusercontent.com/68281476/221411720-2b5bb125-e066-4cd9-9655-98d7a813f965.jpeg" link="./jsoneditor" />

                </div>

            </div>


            <div className="mt-8 flex justify-center flex-col items-center bannerdisplay">

                <div className="editor1display">
                    <article className="description">
                        <h1 className="font-display text-3xl tracking-tight sm:text-4xl mb-6">Code Editor: The Ultimate Web App for Efficient Programming</h1>
                        <p className="mt-4 text-lg text-slate-800 text-lg">
                            <strong>Code Editor</strong> is a web app that allows users to write and run code in multiple programming languages with custom input. With its user-friendly interface, <strong> multiple themes, and font sizes </strong>, along with convenient shortcuts for code execution, Code Editor is a valuable tool for programmers of all levels. The app also includes an <strong> internet status</strong> indicator to ensure users are always connected.
                        </p>



                    </article>
                    <div className="screenshot ">
                        <img src={codeditorimg} alt="CodePad 1" className="w-1/2 mb-4" />
                    </div>

                </div>

                <div className="editor2display">
                    <article className="description">
                        <h1 className="font-display text-3xl tracking-tight  sm:text-4xl mb-6">JsonEditor: A Versatile Tool for Converting, and Validating JSON Data</h1>
                        <p className="text-lg mt-4 text-lg text-slate-800">
                            <strong>JsonEditor </strong>  is a powerful web application that can read JSON code from <strong>uploaded files </strong> and convert it into <strong> CSV, XML, and YAML formats.</strong> The app also includes a feature to easily <strong>Beautify JSON code </strong> and validate its syntax. With its diverse range of functions, JsonEditor is an essential tool for working with JSON data.
                        </p>


                    </article>
                    <div className="screenshot">
                        <img src={jsonditorimg} alt="CodePad 1" className="w-1/2 mb-4" />
                    </div>

                </div>


            </div>



            <footer className="bg-gray-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold text-white gap-7">
                                Stay connected with us!
                                <hr className="my-3" />
                                <a href="https://abhi-9720.github.io/">

                                    <div class="flex items-center space-x-4 my-4">
                                        <img class="w-10 h-10 rounded-full" src="https://abhi-9720.github.io/favicon.ico" alt="" />
                                        <div class="font-medium dark:text-white">
                                            <div>Abhishek Tiwari</div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400">Software Developer</div>
                                        </div>
                                    </div>

                                    {/* <img class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://abhi-9720.github.io/favicon.ico" alt="Bordered avatar" /> */}
                                </a>
                            </h4>
                            <h5 className="text-lg mt-0 mb-2 text-gray-400 flex">
                                Follow us on social media
                            </h5>
                            <div className="mt-2">
                                <a
                                    href="https://github.com/abhi9720"
                                    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <FaGithub className="mr-1" /> Github
                                </a>


                                <a
                                    href="https://twitter.com/ishutiw85007243?t=ZvpoW3_PhYVNQ60pO7pKUA&s=08"
                                    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <FaTwitter className="mr-1" /> Twitter
                                </a>
                                <a
                                    href="https://instagram.com/ishutiwari75"
                                    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <FaInstagram className="mr-1" />   Instagram
                                </a>
                                <a
                                    href="https://linkedin.com/in/abhi9720"
                                    className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 mr-2 mb-2"
                                    type="button"
                                    style={{ transition: 'all .15s ease' }}
                                >
                                    <FaLinkedinIn className="mr-1" /> LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-700" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full  px-4">
                            <div className="text-sm text-white font-semibold py-1">
                                © {new Date().getFullYear()} CoderTab
                            </div>
                        </div>


                        <div className="w-full md:w-8/12 px-4">

                            <ul className="flex flex-wrap list-none md:justify-end justify-center">
                                <li>
                                    <span className="text-white font-bold text-lg">Checkout Other Project :  </span>
                                </li>
                                <li>
                                    <a href="https://dailyapps.netlify.app/" className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3">
                                        DailyApps
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://postgram-social.netlify.app/"
                                        className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3">Postgram
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://helptofixit.netlify.app/"
                                        className="text-white hover:text-gray-400 text-sm font-semibold block py-1 px-3">
                                        DevConnector
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
