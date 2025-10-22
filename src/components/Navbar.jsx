import React from 'react';
import { Icon } from '@iconify/react';

const Navbar = () => {
    const activeMenu = 'beranda';

    return (
        <nav className="w-full bg-light px-6 py-2.5">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-1">
                    <img
                        src="/images/logo_navbar_footer.png"
                        alt="Kudus Logo"
                        className="h-14 w-auto"
                    />
                </div>

                <div className="flex items-center space-x-8">
                    <a
                        href="#"
                        className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 ${activeMenu === 'beranda'
                            ? 'text-dark font-semibold border-b-2 border-orange'
                            : 'text-dark font-medium hover:text-orange'
                            }`}
                    >
                        <span>Beranda</span>
                    </a>

                    <div className="relative group">
                        <button
                            className={`text-base transition-colors duration-200 flex items-center space-x-1 pb-0.5 cursor-pointer ${activeMenu === 'kategori'
                                ? 'text-dark font-bold border-b-2 border-orange'
                                : 'text-dark font-medium hover:text-orange'
                                }`}
                        >
                            <span>Kategori</span>
                            <Icon
                                icon="tabler:chevron-down"
                                className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180"
                            />
                        </button>

                        <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl py-3 z-50 border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                            <div className="space-y-1">
                                <a href="#" className="group flex items-center px-5 py-3 text-sm text-gray-600 font-normal hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange transition-all duration-200">
                                    <Icon icon="fluent:food-16-regular" className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange" />
                                    Makanan
                                </a>
                                <a href="#" className="group flex items-center px-5 py-3 text-sm text-gray-600 font-normal hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange transition-all duration-200">
                                    <Icon icon="fluent:drink-to-go-24-regular" className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange" />
                                    Minuman
                                </a>
                                <a href="#" className="group flex items-center px-5 py-3 text-sm text-gray-600 font-normal hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange transition-all duration-200">
                                    <Icon icon="ph:wrench" className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange" />
                                    Jasa
                                </a>
                                <a href="#" className="group flex items-center px-5 py-3 text-sm text-gray-600 font-normal hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange transition-all duration-200">
                                    <Icon icon="lucide:package-open" className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange" />
                                    Barang
                                </a>
                                <a href="#" className="group flex items-center px-5 py-3 text-sm text-gray-600 font-normal hover:bg-linear-to-r hover:from-orange/5 hover:to-orange/10 hover:text-orange transition-all duration-200">
                                    <Icon icon="basil:other-1-outline" className="w-4 h-4 mr-3 text-gray-400 group-hover:text-orange" />
                                    Lainnya
                                </a>
                            </div>
                        </div>
                    </div>

                    <a
                        href="#"
                        className={`text-base transition-colors duration-200 pb-0.5 ${activeMenu === 'umkm'
                            ? 'text-dark font-bold border-b-2 border-orange'
                            : 'text-dark font-medium hover:text-orange'
                            }`}
                    >
                        Tentang UMKM
                    </a>

                    <a
                        href="#"
                        className={`text-base transition-colors duration-200 pb-0.5 ${activeMenu === 'kontak'
                            ? 'text-dark font-bold border-b-2 border-orange'
                            : 'text-dark font-medium hover:text-orange'
                            }`}
                    >
                        Kontak
                    </a>

                    <a
                        href="#"
                        className={`text-base transition-colors duration-200 pb-0.5 ${activeMenu === 'kami'
                            ? 'text-dark font-bold border-b-2 border-orange'
                            : 'text-dark font-medium hover:text-orange'
                            }`}
                    >
                        Tentang Kami
                    </a>
                </div>

                <a
                    href="#"
                    className="px-5 py-2.5 bg-orange text-white text-base font-medium rounded-md hover:bg-[#D96230] transition-colors duration-200 whitespace-nowrap"
                >
                    Explore UMKM Kudus
                </a>
            </div>
        </nav>
    );
};

export default Navbar;