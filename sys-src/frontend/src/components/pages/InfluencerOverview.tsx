import React, {useState, useEffect} from 'react';
import axios from 'axios';
import InputMultiCheckboxDropdown from "../input/InputMultiCheckboxDropdown";
import {useForm} from "react-hook-form";


interface DataItem {
    name: string;
}

const InfluencerOverview: React.FC = () => {
    // const [data, setData] = useState<DataItem[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get<DataItem[]>('http://localhost:5001/collectData'); // Ersetze mit deiner Backend-URL
    //             setData(response.data);
    //         } catch (error: any) {
    //             setError(error.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }





    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
                <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div
                        className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                        <div className="flex items-center flex-1 space-x-4">
                            <h5>
                                <span className="text-gray-500">All Products:</span>
                                <span className="dark:text-white">123456</span>
                            </h5>
                            <h5>
                                <span className="text-gray-500">Total sales:</span>
                                <span className="dark:text-white">$88.4k</span>
                            </h5>
                        </div>
                        <div
                            className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                            <button type="button"
                                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
                                </svg>
                                Add new product
                            </button>
                            <button type="button"
                                    className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                                     fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                                Update stocks 1/250
                            </button>
                            <button type="button"
                                    className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                                </svg>
                                Export
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Product</th>
                                <th scope="col" className="px-4 py-3">Category</th>
                                <th scope="col" className="px-4 py-3">Stock</th>
                                <th scope="col" className="px-4 py-3">Sales/Day</th>
                                <th scope="col" className="px-4 py-3">Sales/Month</th>
                                <th scope="col" className="px-4 py-3">Rating</th>
                                <th scope="col" className="px-4 py-3">Sales</th>
                                <th scope="col" className="px-4 py-3">Revenue</th>
                                <th scope="col" className="px-4 py-3">Last Update</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <th scope="row"
                                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img
                                        src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                                        alt="iMac Front Image" className="w-auto h-8 mr-3"/>
                                    Apple iMac 27&#34;
                                </th>
                                <td className="px-4 py-2">
                                    <span
                                        className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Desktop PC</span>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                                        95
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">1.47</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.47</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="ml-1 text-gray-500 dark:text-gray-400">5.0</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true">
                                            <path
                                                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
                                        </svg>
                                        1.6M
                                    </div>
                                </td>
                                <td className="px-4 py-2">$3.2M</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Just
                                    now
                                </td>
                            </tr>
                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <th scope="row"
                                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img
                                        src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                                        alt="iMac Front Image" className="w-auto h-8 mr-3"/>
                                    Apple iMac 20&#34;
                                </th>
                                <td className="px-4 py-2">
                                    <span
                                        className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Desktop PC</span>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                                        108
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">1.15</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.32</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="ml-1 text-gray-500 dark:text-gray-400">5.0</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true">
                                            <path
                                                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
                                        </svg>
                                        6M
                                    </div>
                                </td>
                                <td className="px-4 py-2">$785K</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">This
                                    week
                                </td>
                            </tr>


                            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <th scope="row"
                                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img
                                        src="https://flowbite.s3.amazonaws.com/blocks/application-ui/devices/benq-ex2710q.png"
                                        alt="iMac Front Image" className="w-auto h-8 mr-3"/>
                                    Monitor BenQ EX2710Q
                                </th>
                                <td className="px-4 py-2">
                                    <span
                                        className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">TV/Monitor</span>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <div className="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                                        1242
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">4.12</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.30</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor"
                                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500"
                                             fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                        </svg>
                                        <span className="ml-1 text-gray-500 dark:text-gray-400">4.0</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                             className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true">
                                            <path
                                                d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/>
                                        </svg>
                                        211K
                                    </div>
                                </td>
                                <td className="px-4 py-2">$1.2M</td>
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">Just
                                    now
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <nav
                        className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                        aria-label="Table navigation">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">1000</span>
              </span>
                        <ul className="inline-flex items-stretch -space-x-px">
                            <li>
                                <a href="#"
                                   className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page"
                                   className="z-10 flex items-center justify-center px-3 py-2 text-sm leading-tight border text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                              clip-rule="evenodd"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
};




// const initialData = [
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="gray" /%3E%3C/svg%3E',
//         productName: 'Neil Sims',
//         productEmail: 'neil.sims@flowbite.com',
//         position: 'React Developer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['Desktop PC', 'React Developer', 'Affe', 'Affe'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="red" /%3E%3C/svg%3E',
//
//         productName: 'John Doe',
//         productEmail: 'john.doe@example.com',
//         position: 'Frontend Developer',
//         status: 'Offline',
//         statusColor: 'bg-red-500',
//         categories: ['Web Development', 'JavaScript', 'Frontend', 'UI/UX'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="green" /%3E%3C/svg%3E',
//         productName: 'Jane Smith',
//         productEmail: 'jane.smith@example.com',
//         position: 'UX Designer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="gray" /%3E%3C/svg%3E',
//         productName: 'Neil Sims',
//         productEmail: 'neil.sims@flowbite.com',
//         position: 'React Developer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['Desktop PC', 'React Developer', 'Affe', 'Affe'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="red" /%3E%3C/svg%3E',
//
//         productName: 'John Doe',
//         productEmail: 'john.doe@example.com',
//         position: 'Frontend Developer',
//         status: 'Offline',
//         statusColor: 'bg-red-500',
//         categories: ['Web Development', 'JavaScript', 'Frontend', 'UI/UX'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="green" /%3E%3C/svg%3E',
//         productName: 'Jane Smith',
//         productEmail: 'jane.smith@example.com',
//         position: 'UX Designer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="gray" /%3E%3C/svg%3E',
//         productName: 'Neil Sims',
//         productEmail: 'neil.sims@flowbite.com',
//         position: 'React Developer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['Desktop PC', 'React Developer', 'Affe', 'Affe'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="red" /%3E%3C/svg%3E',
//
//         productName: 'John Doe',
//         productEmail: 'john.doe@example.com',
//         position: 'Frontend Developer',
//         status: 'Offline',
//         statusColor: 'bg-red-500',
//         categories: ['Web Development', 'JavaScript', 'Frontend', 'UI/UX'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="green" /%3E%3C/svg%3E',
//         productName: 'Jane Smith',
//         productEmail: 'jane.smith@example.com',
//         position: 'UX Designer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="gray" /%3E%3C/svg%3E',
//         productName: 'Neil Sims',
//         productEmail: 'neil.sims@flowbite.com',
//         position: 'React Developer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['Desktop PC', 'React Developer', 'Affe', 'Affe'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="red" /%3E%3C/svg%3E',
//
//         productName: 'John Doe',
//         productEmail: 'john.doe@example.com',
//         position: 'Frontend Developer',
//         status: 'Offline',
//         statusColor: 'bg-red-500',
//         categories: ['Web Development', 'JavaScript', 'Frontend', 'UI/UX'],
//     },
//     {
//         productImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="green" /%3E%3C/svg%3E',
//         productName: 'Jane Smith',
//         productEmail: 'jane.smith@example.com',
//         position: 'UX Designer',
//         status: 'Online',
//         statusColor: 'bg-green-500',
//         categories: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
//     },
// ];




// Funktion zur Generierung eines Hash-Wertes aus einem String
const stringToHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Konvertierung zu 32bit Integer
    }
    return hash;
};

// Funktion zur Generierung einer hellen Farbe aus einem String
const stringToColor = (str: string): string => {
    const hash = stringToHash(str);
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = hash & 0x0000FF;

    // Helle Farbe erzeugen
    const lightColor = `rgba(${r + 128}, ${g + 128}, ${b + 128}, 0.7)`;
    return lightColor;
};

interface IUserData {
    profileImage: string;
    gender: string;
    name: string;
    //age: number;                // gibt es nicht
    advertisingDivision: string[];  // = hashtags im Backend
    nationality: string;
    language: string;
    statusColor: string;
    instagram_username: string;
    instagram_followers: string;
    instagram_comments_avg: string;
    instagram_likes_avg: string;
    instagram_engagement_rate: string;
    instagram_time_since_last_post: string;
    about_me: string;
}


const InfluencerOverview2: React.FC = () => {

    // profileImage
    // name
    // advertisingDivision
    // nationality
    // language
    // instagram_username
    // statusColor: 'bg-green-500'
    // gender
    // age
    // const newData: IUserData[];

    const [data, setData] = useState<IUserData[]>([]);

    useEffect(() => {
        axios.get('https://randomuser.me/api/?inc=gender,name,nat,location,email,picture,dob&results=50')
            .then(response => {


                const newData: IUserData[] = response.data.results.map((user :any)=> ({
                    gender: user.gender,
                    name: user.name.last + ' ' + user.name.first,
                    instagram_comments_avg: user.dob.age,
                    instagram_username: '@' + user.location.city + user.name.last,
                    language: 'Deutsch',
                    nationality: user.location.country,
                    profileImage: user.picture.medium,
                    advertisingDivision: ['UX Design', 'UI Design', 'Prototyping', 'User Research'],
                    statusColor: 'bg-green-500',
                    about_me: 'Guten Tag, ich heiße Sebastian Weidner und bin der berühmteste Influencer den es auf der ganzen Welt gibt!'
                }));

                setData(newData);

            })
            .catch(error => {
                console.error('There was an error making the request!', error);
            });
    }, []);




    //___________________ Suchleiste ___________________

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    //__________________ Filterung der Spalten ___________________
    // Definiere das assoziative Array
    const options: { [key: string]: string } = {
        name: "Name",
        //age: "Alter",
        advertisingDivision: "Werbesparte",
        nationality: "Nationalität",
        language: "Sprache",
        instagram_username: "Instagram-Account",

        instagram_followers: "Instagram-Follower",
        instagram_comments_avg: "\u00D8 Kommentare",
        instagram_likes_avg: "\u00D8 Likes",
        instagram_engagement_rate: "Score",
        instagram_time_since_last_post: "letzter Post",
        about_me: "Über mich"
    };
    const initialSelectedOptions = ['name', 'age', 'instagram_username', 'language', 'nationality', 'advertisingDivision'];
    const [selectedColumns, setSelectedColumns] = useState<string[]>(initialSelectedOptions);

    // Funktion zum Behandeln von Änderungen der ausgewählten Optionen
    const handleDropdownChange = (selectedOptions: string[]) => {
        setSelectedColumns(selectedOptions);
    };


    return (
        <div className="max-w-full mx-auto mt-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between mb-4">

                {/* Anzahl Tabelleneinträge */}
                <div className="flex items-center space-x-4">
                    <div className="text-gray-700 font-medium">
                        Einträge: {filteredData.length}
                    </div>
                </div>


                {/* Suchfunktion */}
                <div className="w-1/3">
                    <input type="text" placeholder="Search by name..."
                           className="w-full px-3 py-2 border border-gray-300 rounded-md"
                           value={searchTerm} onChange={handleSearchChange}/>
                </div>

                {/* Spaltenfilter */}
                <InputMultiCheckboxDropdown selectOptions={options} label="Filter" onChange={handleDropdownChange}
                                            initialSelectedOptions={selectedColumns}/>

            </div>


            {/*// overflow-hidden*/}
            <div className="bg-white shadow-md sm:rounded-lg flex-1">
                <div
                    // className="overflow-x-auto h-2/3"
                >


                    <table className="w-full text-sm text-left text-gray-700 ">


                        <thead
                            className="text-xs text-gray-200 uppercase bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-3 xl:py-4 xl:px-6">
                        <tr>
                            <th scope="col" className="pl-6 pr-3 py-3 xl:py-4 bg-blue-700">
                                #
                            </th>
                            {selectedColumns.includes('name') && (
                                <th scope="col" className="pl-3 pr-6 py-3 xl:py-4 xl:px-6">
                                    Name
                                </th>
                            )}
                            {/*{selectedColumns.includes('age') && (*/}
                            {/*    <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">*/}
                            {/*        Alter*/}
                            {/*    </th>*/}
                            {/*)}*/}
                            {selectedColumns.includes('advertisingDivision') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Werbesparte
                                </th>
                            )}
                            {selectedColumns.includes('nationality') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Nationalität
                                </th>
                            )}
                            {selectedColumns.includes('language') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Sprache
                                </th>
                            )}
                            {selectedColumns.includes('instagram_username') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Instagram-Account
                                </th>
                            )}
                            {selectedColumns.includes('instagram_followers') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Follower
                                </th>
                            )}
                            {selectedColumns.includes('instagram_comments_avg') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    \u00D8 Kommentare
                                </th>
                            )}
                            {selectedColumns.includes('instagram_likes_avg') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    \u00D8 Likes
                                </th>
                            )}
                            {selectedColumns.includes('instagram_engagement_rate') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Score
                                </th>
                            )}
                            {selectedColumns.includes('instagram_time_since_last_post') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    letzter Post
                                </th>
                            )}
                            {selectedColumns.includes('about_me') && (
                                <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                    Über mich
                                </th>
                            )}
                            <th scope="col" className="px-6 py-3 xl:py-4 xl:px-6">
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                {/* Tabellenindex */}
                                <th className="pl-6 pr-3 py-4 text-blue-700">
                                    {index + 1}
                                </th>

                                {/* Name */}
                                {selectedColumns.includes('name') && (
                                    <th
                                        scope="row"
                                        className="pl-3 pr-6 py-4 text-gray-900 whitespace-nowrap"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                className="w-10 h-10 rounded-full"
                                                src={item.profileImage}
                                                alt={'Bild'}
                                            />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">
                                                    {item.name}
                                                </div>
                                                <div className="font-normal text-gray-500">
                                                    {item.gender}
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                )}
                                {/*{selectedColumns.includes('age') && (*/}
                                {/*    <td className="px-6 py-4">*/}
                                {/*        {item.age}*/}
                                {/*    </td>*/}
                                {/*)}*/}

                                {/* Werbesparte */}
                                {selectedColumns.includes('advertisingDivision') && (
                                    <td className="px-2 sm:px-4 py-4 min-w-80">
                                        <div className="flex flex-wrap gap-0.5">
                                            {item.advertisingDivision.map(
                                                (category, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs font-medium px-2 py-1 m-0.5 rounded-md whitespace-nowrap"
                                                        style={{
                                                            backgroundColor: stringToColor(
                                                                category
                                                            ),
                                                        }}
                                                    >
                                                            {category}
                                                        </span>
                                                )
                                            )}
                                        </div>
                                    </td>
                                )}

                                {/* Nationalität */}
                                {selectedColumns.includes('nationality') && (
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full ${item.statusColor} mr-2`}
                                            ></div>
                                            {' '}
                                            {item.nationality}
                                        </div>
                                    </td>
                                )}

                                {/* Sprache */}
                                {selectedColumns.includes('language') && (
                                    <td className="px-6 py-4">
                                        {item.language}
                                    </td>
                                )}

                                {/* Instagram Username */}
                                {selectedColumns.includes('instagram_username') && (
                                    <td className="px-6 py-4">
                                        <a href="https://www.instagram.com/festdamen.ffwschoenkirch2024/"
                                            className="font-medium hover:text-blue-600 hover:underline whitespace-nowrap">
                                            {item.instagram_username}
                                        </a>
                                    </td>
                                )}

                                {/* Instagram - Follower  */}
                                {selectedColumns.includes('instagram_followers') && (
                                    <td className="px-6 py-4">
                                        {item.instagram_followers}
                                    </td>
                                )}

                                {/* Instagram - durchschnittliche Kommentare  */}
                                {selectedColumns.includes('instagram_comments_avg') && (
                                    <td className="px-6 py-4">
                                        {item.instagram_comments_avg}
                                    </td>
                                )}

                                {/* Instagram - durchschnittliche Likes  */}
                                {selectedColumns.includes('instagram_likes_avg') && (
                                    <td className="px-6 py-4">
                                        {item.instagram_likes_avg}
                                    </td>
                                )}

                                {/* Instagram - Score  */}
                                {selectedColumns.includes('instagram_engagement_rate') && (
                                    <td className="px-6 py-4">
                                        {item.instagram_engagement_rate}
                                    </td>
                                )}

                                {/* Instagram - wann war letzter Post  */}
                                {selectedColumns.includes('instagram_time_since_last_post') && (
                                    <td className="px-6 py-4">
                                        {item.instagram_time_since_last_post}
                                    </td>
                                )}

                                {/* Über mich  */}
                                {selectedColumns.includes('about_me') && (
                                    <td className="px-6 py-4 text-xs min-w-80">
                                        {item.about_me}
                                    </td>
                                )}

                                {/* Button */}
                                <td className="px-6 py-4">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:underline whitespace-nowrap"
                                    >
                                        Edit user
                                    </a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
        </div>
    );
};




export default InfluencerOverview2;